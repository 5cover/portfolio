# Display

Some invariants about things should be displayed on the site consistently:

These is already done in the V1 site and should be done in this version too:

- Show background images as the background of cards and pages with a reduced opacity
- anchors (elements that navigate the page when clicked) grow when hovered and gain a background in the accent color (the accent color signals interactivity), unless prefers-reduced-motion is set or the anchor is a basic hypertext link (already underlined on hover, and its text color is the accent color)
- abbrevations are in abbr elements
- target blank anchors (open in a newtabs) are reserved to hypertext links (no styled link button) that underline when hovered, and an arrow glyph is displayed

Preserve the style, colors, sizes, fonts and general layout of the V1 site as accurately as possible.

## Locale Links

- Build internal links and language switcher URLs with Astro i18n helpers.
- Do not hardcode locale prefixes or language-specific base paths.

## Theming

themes that define the colors and styles of the site. themes i already have formalized:

- light
- dark

themes i want in the future; no need to make them now but code should be logically decoupled from light/dark only assumptions so that they can be added later.

- engie fluid
- chalkboard (dark but white solid borders)
- windows classic
