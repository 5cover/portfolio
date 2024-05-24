# Prompt

Hi, i'm a programmer and i'm currently creating a portfolio website.

Here's what I got so far for the structure of the site:

## Pages

### Home page

This page contains :

1. An introduction paragraph describing who I am
2. My ongoing projects
3. A link to the project search page
4. A link to my resume PDF. The PDF should be viewable in browser and downloadable
5. A fixed contact footer at the bottom with information such as e-mail, phone number...

### Project search page

This page contains all my projects in a grid of their logo images, similarly to what you'd see on a streaming website.

When a project is hovered, it shows an overlay over the logo with the project's abstract. When a project is clicked on, it leads this project's individual page.

A search area at the top can be used to filter projects by title or tag.

### Experience page

This page contains a timeline akin the one you'd find on a resume.

### Interests page

This page contains my interests besides programming (such as art or sandbox videogames), with access to related projects.

### Individual project pages

I have many projects not only related to programming but also art and content creation. So i decided to have individual pages for each project.

In the context of my website, a project carries the following information :

- A title
- A one-sentence description used as an abstract (i would like it to be under the title in italics)
- A logo image
- A start date (month and year)
- A context (personnal, university, high school...)
- Whether the project is done or not
- A list of tags
- A list of links to external resources (GitHub repo, news article...)
- A list of programming languages used
- A list of the software used
- A gallery with several labeled images (such as screenshots)
- A "story" that describes the idea backing the project, the thought process, etc. Consists in several paragraphs of text. (should probably constitute the main body of the page)

Tags have an id and a display name, and will be used to search for projects by tag in my website. Each tag should be a link that leads to a project search for this specific tag.

## Site-wide considerations

## Navigation bar

Every page has a navigation bar at the top, with links to the home page, the experience page, the interests page and the about page.

This is also the place where the theme and language can be changed.

### Technical terms

As the reader of my website may not be an tech-savvy person, I want technical terms (including programming language and sofware names) expressed anywhere in the site to provide more information :

- A type (videogame, programming language, software, ...)
- A short synopsis
- Optionally, a logo image
- A link to an official wiki page for more information (most likely a wikipedia article)

I'm not sure how to design this. Maybe the term should be a link to the wiki page, with additional information shown on hover?

### Styling

In the styling of the website, a primary focus is put on:

- comfort
- readability

That means no fancy colors schemes or anything complicated. Keep it simple.

Theming is supported with a choice between a dark and light theme.

### Responsivity

The site is as easy to navigate on mobile devices than on computers.

Hover interactions may be problematic for responsivity. I'll need your input on this.

### Localization

The site is available in english and french.

## What i need help with

I need your help for 3 things :

1. A detailed review of the design choices and information provided on the site : do you see any problems with the current site structure? Are there things that would be interesting to add?
2. Your propositions for UI, layout and styling : I've already expressed some ideas in the above description, you can review them. Make a detailed report of the UI components to use, layout and styling.
3. A guide on implementing this site. I'm not very good in HTML/CSS, let alone JavaScript, so I will need your help to implement this website.

Base your output on the title structure of the aforementioned description (pages and site-wide considerations).
