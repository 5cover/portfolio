write a step by step plan you will execute later to implement concretely a transition from out current approach to translation and i18n to what astro recommends: the i18n wiki page has been copied to `doc/Astro i18n.md`, read it. 

goals:
- remove the lang collection
- store translated strings as markup in pages directly
- minimize code and html structure duplication (since .astro files will now be duplicated per lang) by outsourcing them to locale-agnostic components and helpers
- update all documentation accordingly