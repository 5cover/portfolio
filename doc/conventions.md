# Conventions

## Automatic cleanup of SVGs

PHP scripts automatically select the `<svg>` element of issued SVG files, discarding XML declarations and DTDs.

## Naming conventions

JSON HTML CSS: *kebab-case*

JS: *camelCase*

## Reference citations

num: reference number. serial.

### Attributes

attribute|value
-|-
id|`cite-ref-`num
href|`#ref-`num

## Reference, project link or link?

- Reference: brings context and supplemental information to the project story
- Project link: to a page dedicated to the project (often managed by myself)
- Link: other resources

## HTML `<img>` elements

Lazy: always unless eager loading is critical to the correct display of the page

## SCSS documentation

Markdown inline format allowed.

Format:

```scss
/* name
 *
 * description
 *
 * $paremeter1name: type -> desc
 * $paremeter2name: type -> desc
 * ...
 *
 * information
 */
```

- *name*: brief name
- *description*: brief description
- *information*: unrestricted text

## Components and utilities

Definition of a component:

- semantics over utilities
- name related to the content
- reusing requires a similar markup structure
- can be specialized in page stylesheets

- Mixin: use to reference the component from stylesheet
- Class: use to reference the component from HTML with the default arguments (do not use @extend)
