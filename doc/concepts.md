# Site-wide concepts

## Blocks

Moi, Intéréssé.e

Width: max 640, pref $1/3$vw, min ?

Height: max 113/384vw, pref content, min content

## Definition popups

Appear on hover of a definition link.

## Localization

How will it work? I think the language icons should be grayed out except the current one. They should retrieve their color on hover.

For the implementation we could have directory named based on the IETF language tags and put the version of each HTML files in there

```text
site
    style.css
    img
        ...
    fr
        index.html
    en-us
        index.html
    he
        style.css
        index.html
```

Imagine I had Hebrew and i needed right to left layout in CSS. I can link my hebrew-specific stylesheet.

### JSON markup processing

Markup string expressed in JSON support special instructions evaluated in PHP.
