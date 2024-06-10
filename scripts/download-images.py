#!/usr/bin/env python3

from dataclasses import dataclass
import argparse as ap
from urllib.parse import urlparse
from os.path import splitext
import json
import sys
from pathlib import Path
import requests
import mimetypes
from typing import Optional, TextIO
from random_header_generator import HeaderGenerator

HEADER_GEN = HeaderGenerator()


@dataclass(frozen=True)
class ParseResult:
    dir: str
    bg: Optional[str]
    logo: Optional[str]


def parse_definitions(input: TextIO):
    data = json.load(input)

    for id, d in data.items():
        dir = f'../../portfolio/img/definition/{id}'
        logo_obj = d.get('logo')
        logo = logo_obj.get('url') if logo_obj else None
        yield ParseResult(dir, d.get('background'), logo)


def parse_projects(input: TextIO):
    data = json.load(input)

    for id, d in data.items():
        dir = f'../../portfolio/img/project/{id}'
        yield ParseResult(dir,
                          d.get('background'),
                          d.get('logo'))


def download(url: str, dir: Path, filename: str):
    ext = splitext(urlparse(url).path)[1] or mimetypes.guess_extension(rep.headers['Content-Type'])
    if not ext:
        raise ValueError(f"No extension for mime type '{rep.headers['Content-Type']}' (url: '{url}')")
    outf = Path(dir, filename + ext)

    try:
        with outf.open('xb') as output:
            rep = requests.get(url, headers=HEADER_GEN())
            rep.raise_for_status()
            output.write(rep.content)
    except FileExistsError:
        print(f"Skipping '{url}', '{outf}' already exists", file=sys.stderr)
    else:
        print(f"Downloaded '{url}' to '{outf}'", file=sys.stderr)


if __name__ == '__main__':
    parser = ap.ArgumentParser()

    kinds = {
        'definitions': parse_definitions,
        'projects': parse_projects,
    }

    parser.add_argument('kind', choices=kinds, help='Kind of JSON file to parse')

    a = parser.parse_args()

    for pr in kinds[a.kind](sys.stdin):
        dir = Path(pr.dir)
        dir.mkdir(parents=True, exist_ok=True)
        if pr.logo:
            download(pr.logo, dir, 'logo')
        if pr.bg:
            download(pr.bg, dir, 'bg')
