# Types

## Copy type

The data type Copy is used below. It refers to text with inline formatting, expressed in a semantic format agnostic to HTML or other presentation languages.

Example of copy in YAML:

```yaml
- 'A shell program and command language supported by the '
- title: Free Software Foundation
  abbr: FSF
- ' and first developed for the '
- title: GNU is Not Unix
  abbr: GNU
- ' Project by Brian Fox.'
```

## Textual type

The data type Textual is used below. It refers to arbitrary content that is primarily meant to be read (text) but is also rich (emphasis, bold, etc) and can contain images, figures and arbitrary representations, as well as **Def** card displayed as tooltips. Effectively, it is HTML. However, it is only semantic, and should not carry its own styling information, rather it inherits the page's styles.

The site must be available in multiple languages (fr and en to start), so Text and textual content are localized.

Textual can be implemented with MDX.

Localization notes:

- Locale-specific pages live under `src/pages/` (default locale) and `src/pages/<locale>/` for others.
- Localized UI copy is authored directly in those pages or shared via small locale helpers (no lang content collection).
- Long-form copy lives in `src/content/textual/<locale>/<kind>/<id>.mdx`.
