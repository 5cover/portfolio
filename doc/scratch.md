# Scratch area

## windows classic theme

yes. It would be awesome. Use system colors.

## Link to iut lannion website in parcours

and other relevant links as well, to connect myself to my parcours.

## Recommended projects

Compute similaritly index based on number of tags in common

At the bottom of each project page

## Projects

- JSlave
- ztest

## Perspectives page

My opiniated takes on some things

- On the future of AI : individualization after democratization

Maybe merge it with passions?

### Save.tf link?

Why not. In perspectives, "Team Fortress 2"

## Put *.SCSS in main/

That way, they won't be on the website. Also I won't need the extension anymore, i can simply compiler them in *generate.sh*.

## Generate indivudal project pages

Soo, how will this work?

I can't really have a PHP that will generate every page. That would break the THIS_PAGE_NAME system.

Or maybe not? The filename doesn't define THIS_PAGE_NAME, the argument does. So if I parse the JSON from BASH and pass the project ID as the page name... This is weird.

The flaw in my design is that each PHP matches 1 page, whose name is passed as a single argument to the script.

Soo.. Instead i should just set the page name explicitly at the start of every script, and expose it as function and not a constant?
