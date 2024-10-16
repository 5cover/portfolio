#!/usr/bin/env python3

# $1: output directory
# $@:2: full names of each json file (use globstar)

# What is linking ?
# TLDR; HTML fragments are linked to the data JSONs

# The Problem
# - Writing HTML in JSON is unpractical
# - Sometimes we need to run PHP too

# The solution
# - Replace the string value by an object with a single key : "$include" (the filename of the PHP script to run)
# - The PHP script is run and the standard output is "linked" to form the final JSON file

# Implementation
# - This Python script is run on the JSON files
# - The JSON files are parsed and the "$include" values are replaced by the output of the PHP scripts
# - The JSON files are written to the output directory

import json
import os
from os import path
import argparse as ap
import subprocess as sp
import pathlib
import sys

os.chdir(sys.path[0])

PROP_INCLUDE = '$include'
PHP_D_INCLUDE_PATH = 'include_path="include"'


def indent(text: str, count: int) -> str:
    prefix = ' ' * count
    return prefix + text.replace('\n', '\n' + prefix)


def get_lang(data_json_filename: str) -> str:
    """ Gets the lang of a canonical data json filename """
    parts = tuple(reversed(pathlib.PurePath(data_json_filename).parts))
    dataIndex = parts.index('data')
    return parts[dataIndex - 1] if dataIndex > 1 else ''


def evaluate_fragment(filename: str) -> str:
    cp = sp.run(('php', '-d', PHP_D_INCLUDE_PATH, '-f', filename), capture_output=True)
    try:
        cp.check_returncode()
    except sp.CalledProcessError:
        print('Standard output:', file=sys.stderr)
        print(indent(cp.stdout.decode(), 4), file=sys.stderr)
        print('Standard error:', file=sys.stderr)
        print(indent(cp.stderr.decode(), 4), file=sys.stderr)
        raise

    return cp.stdout.decode()


def link(obj: dict, lang: str) -> dict | str:
    # Link fragments
    return evaluate_fragment(f'../fragments/{lang}/{obj[PROP_INCLUDE]}') if obj.keys() == {PROP_INCLUDE} else obj


def read_data_json(filename: str):
    lang = get_lang(filename)
    with open(filename) as file:
        return json.load(file, object_hook=lambda obj: link(obj, lang))


if __name__ == '__main__':
    # Parse arguments
    parser = ap.ArgumentParser(description='Link HTML fragments to the data JSONs')
    parser.add_argument('outdir', help='output directory of the linked JSON files')
    parser.add_argument('input', nargs='+', help='input JSON files')
    args = parser.parse_args()
    
    outdir = path.realpath(args.outdir)

    data_filenames = [path.realpath(filename, strict=True) for filename in args.input]

    # Write JSONs to output
    common_head = path.commonpath(data_filenames)
    output_files = tuple(path.join(outdir, path.relpath(filename, common_head)) for filename in data_filenames)

    for filename, output_file in zip(data_filenames, output_files):
        os.makedirs(path.dirname(output_file), exist_ok=True)
        with open(output_file, 'w') as output:
            json.dump(read_data_json(filename), output, separators=(',', ':'), ensure_ascii=False)
