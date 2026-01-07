# Yggdrasil - The Infonode graph that tells my story

## Notation

Used in the docs directory, not just in this file.

Property names are in *italics* and camelCase: *propertyName*.

Infonode type names are in in **bold** and PascalCase: **Project**.

For the infonode graph, we will talk about the existence of an edge `A --> B` as B being a successor of A, and A being a predecessor of B.

## Infonodes

Information on the site is represented by infonodes -- objects that know how to render themselves on a webpage and have a named string type.

One should be able to modify this data without changing the code.

All infonodes are of a specific role, either `content` (semantic content), or `layout` (layout and arrangement).

- `content` infonodes may reference other `content` infonodes semantically. They are sourced from data-oriented documents or code decoupled from the generation logic (YAML, markdown, MDX, images and document files). They represent pure information and are layout-agnostic
- `layout` infonodes may not be successors, meaning no edge in the graph should target them. They are programmed directly.

They also have a visibility, either `public` or `private`. Infonodes of `public` visibility are included in the Yggdrasil graph and the global search, whereas infonodes of `private` visibility are not.

Infonodes link to other infonodes, creating a directed graph of all infonodes. This graph is called Yggdrasil. Effectively, each infonode has a list of successor infonodes. Each knows how to render itself so we don't need to know its type to render it. However, the types of infonode linked affect the parent structure (for instance in the **Project** detail a "Gallery" heading is added if there are linked Media infonodes) so we can read infonode types from the list. A list implies an order in successors, which is sometimes meaningful. **Media** successor order makes sense for **Project**, for instance, whereas **Tags** are always ordered alphabetically.

We could have a whole page (Yggdrasil) that renders this graph as a pannable-explorable render, excluding internal/display only infonodes such as **PianoTiles**.

Every detail page includes a "See in Yggdrasil" link that navigates to the Yggdrasil page with the current infonode selected.

Any infonode can be linked to any other. This is the point.

Infonodes have the ability render themselves in two forms: Card and Detail.

- Card renders a card to be embedded in another page that introduces the infonode and gives a short summary. If the infonode provides Detail rendering, the card is clickable and clicking it navigates to the detail page.
  - Card also provides CardList which renders a list of instances of itself as a list of cards and pages reuse that instead of implementing their own lists. The rendering can be parameterized by the caller (to change order for instance).
- Detail renders an HTML `<main>` element that represents all information of the infonode.

Card rendering is always available. Detail rendering may not be available.

Infonodes types define properties to hold primitive data and "Successors", that is, supported types of infonodes that can be connected and rendered in a specific way. Other infonodes are still rendered in the infonode's detail page, in a "More..." section and are of course displayed in Yggdrasil.

An Infonode can also have properties that are of infonode types in addition to its successors. This is used to name edges and specify multiplicities to treat them specially in rendering. The `successors` property, present in all infonodes, includes them in the returned iterable/array for use by the Yggdrasil renderer, in insignificant order. This allows for intuitive data shape in YAML.

Infonodes are built from data YAML files and rendered at generation-time. Adding an infonode of a known type or amending one should be as simple as modifying the YAML corresponding file and redeploying.

## Textual type

The conceptual data type Textual is used below. It refers to arbitrary content that is primarily meant to be read (text) but is also rich (emphasis, bold, etc) and can contain images, figures and arbitrary representations, as well as **Definition** card displayed as tooltips. Effectively, it is HTML. However, it is only semantic, and should not carry its own styling information, rather it inherits the page's styles.

The site must be available in multiple languages (fr and en to start), so Text and textual content are localized.

Textual can be implemented with MDX.

## **Project**

Common property|Value
-|-
Role|`content`
Visibility|`public`
Detail rendering available?|Y

Something concrete I've made.

Property|Description|Required?
-|-|-
*title*|Line of text|Y
*summary*|Line of text|N
*technologies*|List of definitions|N
*links*|List of links. steam (for my workshop stuff), github, random websites...|N
*context*|link to an history element, optional for personal stuff|N
*dates*|Start and end, maybe milestones? able to provide properties *start* and *end* for the whole project, in addition to milestones|N
*details*|Textual that goes in depth in the project|N
*image*|**Image**, represents the main logo or icon of the project|N
*backgroundImage*|**Image**, represents the background image, can be a screenshot or an illustrative large image|N

Successors

Successor type|Description|Order significant?
-|-|-
**Tag**|Tags that describe this infonode|N
**Connector**|Connectors related to this infonode|N
**Definition**|Linked definitions. People definitions correspond to the project's team members. Other definitions correspond to the project's technologies.|Y

## **Image**

Common property|Value
-|-
Role|`content`
Visibility|`private`
Detail rendering available?|N

A captioned image. Used to abstract figures. For images, clicking it opens a modal with the image shown large and caption displayed

Property|Description|Required?
-|-|-
*src*|URL, source of the image|N
*alt*|Text (html alt attribute)|Y
*caption*|Text, caption (html title or figcaption)|N
*kind*|one of `img`, `svg` (embedding an SVG image as markup instead of an img element so that they are affected by global theming)|N

## **Document**

Common property|Value
-|-
Role|`content`
Visibility|`public`
Detail rendering available?|N

For pdf: The card renders a thumbnail of the document. Clicking the card opens a viewer for the document in a new tab.
For video: the card renders the video with controls

Property|Description|Required?
-|-|-
*src*|URL, source of the document|N
*alt*|Text (html alt attribute)|Y
*caption*|Text, caption (html title or figcaption)|N
*type*|`pdf`,`video`

## **Connector**

Common property|Value
-|-
Role|`content`
Visibility|`private`
Detail rendering available?|N

A connector links an external webpage. GitHub repository, Steam Workshop item, or even an arbitrary URL.

Property|Description|Required?
-|-|-
*title*|Link tooltip|Y
*icon*|**Image**, icon of the connector|N
*link*|URL to the relevant webpage|Y
*backgroundImage*|**Image**, the background image|N

## **Literature**

Common property|Value
-|-
Role|`content`
Visibility|`public`
Detail rendering available?|Y

A flexible content for textual not directly affiliated to a **Project**.

3 kinds:

- Blog: Something I believe worth knowing
- Passion: Something I believe worth sharing
- Story: self-explanatory

A **Literature** can contain multiple chapters with their own titles. In which case, a navigation interface to move to the next/previous chapter and preview its title is displayed. If there is only one chapter (as it will be the case most of the time), no navigation UI is displayed.

Property|Description|Required?
-|-|-
*kind*|blog/passion/story|Y
*title*|Line of text|Y
*summary*|Line of text|N
*chapters*|Non-empty list of chapters, objects with a *title* (line of text, optional, unnamed chapters are named in the UI has chapter 1,2,3 based on their index in the *chapters* list + 1.) and a *body* of type Textual|Y
*image*|**Image**, represents the main logo/icon|N
*backgroundImage*|**Image**, background image|N

Successors

Successor type|Description|Order significant?
-|-|-
**Tag**|Tags that describe this infonode|N
**Connector**|Connectors related to this infonode|N

## **History**

Common property|Value
-|-
Role|`content`
Visibility|`public`
Detail rendering available?|Y

Description of a period of my existence. can be nested. Links other infonodes to show not just what I did, but what it meant and what came from it.

Property|Description|Required?
-|-|-
*title*|Line of text|Y
*lead*|Text, lead paragraph|N
*body*|Textual, in depth explanation of the period|N
*start*|Date|Y
*end*|Date|N
*image*|**Image**, illustrates the period|N

Successors

Successor type|Description|Order significant?
-|-|-
**Tag**|Tags that describe this infonode|N
**Connector**|Connectors related to this infonode|N

## **Definition**

Common property|Value
-|-
Role|`content`
Visibility|`public`
Detail rendering available?|N

A definition of a term or a concept not part of common language.

Cards appear in other contents via definition tooltips.

Property|Description|Required?
-|-|-
*id*|ID kebab-case slug, unique|Y
*title*|Text, Name of the object defined|Y
*synopsis*|Text (paragraph), synopsis of the definition|Y
*backgroundImage*|background image|N
*image*|**Image**, Main logo/icon

Successors

Successor type|Description|Order significant?
-|-|-
**Tag**|Tags that type the object defined|N
**Connector**|Connectors related to this infonode. Ideally, one trusted, stable wiki link is expected and rendered at the bottom of the card.|N

## **PianoTile**

Common property|Value
-|-
Role|`content`
Visibility|`private`
Detail rendering available?|N

A short summary that navigates to another content on click.

Property|Description|Required?
-|-|-
*title*|line of text|Y
*summary*|line of text, leading line to incite clicking|Y
*backgroundImage*|**Image**, background image|Y

Linked to exactly one content, with have detail rendering available. Clicking the **PianoTile** card navigates to this content's detail.

## **Contact**

Common property|Value
-|-
Role|`content`
Visibility|`private`
Detail rendering available?|N

A contact link to my profile in a particular platform.

Property|Description|Required?
-|-|-
*icon*|Icon of the contact link|N
*platform*|Line of text, name of the platform|Y
*name*|Line of text, name of my profile|Y
*url*|Target URL|Y

## **Tag**

Common property|Value
-|-
Role|`content`
Visibility|`private`
Detail rendering available?|N

A tag from a known list.

Property|Description|Required?
-|-|-
*title*|Tag name|Y
*icon*|**Image**, tag icon|N

## **Page**

Common property|Value
-|-
Role|`layout`
Visibility|`public`
Detail rendering available?|Y

The content of a page.

**Pages** don't have common properties besides the polymorphic infonode rendering methods.

More detail on each page in [Pages.md](./Pages.md).

## **Header**

Common property|Value
-|-
Role|`layout`
Visibility|`private`
Detail rendering available?|N

The common header of every page.

Arranges horizontally: links to successor **Pages** (navbar), (language selector), (theme selector)

Successors

Successor type|Description|Order significant?
-|-|-
**Page**|Pages to show in the navbar|Y

## **Footer**

Common property|Value
-|-
Role|`layout`
Visibility|`private`
Detail rendering available?|N

Arranged horizontally: copyright (current year calculated client side so it never goes outdated), site github link, "contact me" link that opens a modal with all **Contact** infonodes rendered as well as my resume as a clickable thumbnail (**Document** card) that opens the pdf in a new tab.
