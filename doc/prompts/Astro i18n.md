write the detailed step by step plan you will execute later to implement concretely a transition from out current approach to translation and i18n to what astro recommends: the i18n wiki page has been copied to `doc/Astro i18n.md`, read it. 

goals:
- remove the lang collection and stop storing translated string in strings directly
- store translated strings as markup in pages directly
- minimize code and html structure duplication (since .astro files will now be duplicated per lang) by outsourcing them to locale-agnostic components and helpers
- update all documentation accordingly
- take advantage Astro's i18n API to avoid hardcoding locale and URLs.

rationale for this change
- benefit from astro's i18n features to make translation and authoring easier
- do it in the idiomatic, approved way instead of the current lang content collection hack
- avoid storing HTML in strings (important)