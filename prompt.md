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

### About page

This page contains meta information such as a link to the GitHub repository (the site will be hosted on GitHub pages). There won't be much there but I see it as necessary.

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

## Answer

Review of Design Choices and Information Provided

Pages
Home Page

    The introduction paragraph, ongoing projects, and links to the project search page and resume PDF are all essential elements for a home page.
    Consider adding a call-to-action (CTA) to encourage visitors to explore your projects or learn more about you.

Project Search Page

    The grid layout with logo images and hover overlays is a great way to showcase your projects.
    The search area at the top is a must-have for filtering projects by title or tag.
    Consider adding a pagination system or infinite scrolling to handle a large number of projects.

Experience Page

    A timeline is a great way to visualize your experience.
    Consider adding brief descriptions or annotations to each timeline entry to provide more context.

Interests Page

    This page is a great way to showcase your personality and interests beyond programming.
    Consider adding images or icons to break up the text and make the page more visually appealing.

Individual Project Pages

    You've provided a comprehensive list of information for each project.
    Consider using a consistent layout and design for each project page to make it easy to scan and compare projects.

About Page

    This page is necessary for providing meta information about your site.
    Consider adding a brief description of your site's purpose and goals.

Site-Wide Considerations
Navigation Bar

    The navigation bar should be simple and easy to use.
    Consider using a hamburger menu or dropdown menu on mobile devices to save space.

Technical Terms

    Providing additional information for technical terms is a great idea.
    A tooltip or popover on hover could be a good way to display this information without cluttering the page.
    Alternatively, you could use a footnote or annotation system to provide additional information.

Styling

    Your focus on comfort and readability is spot on.
    A simple, consistent design language will make your site easy to navigate and understand.

Responsivity

    You're right to be concerned about hover interactions on mobile devices.
    Consider using touch-friendly interactions, such as tap-to-reveal or swipe gestures, to replace hover effects.

Localization

    Providing translations for your site is a great idea.
    Consider using a translation management system to make it easy to update and manage translations.

Propositions for UI, Layout, and Styling
UI Components

    Use a simple, sans-serif font (e.g., Open Sans, Lato) for body text.
    Use a serif font (e.g., Merriweather, Georgia) for headings and titles.
    Use a consistent color scheme with a primary color, secondary color, and accent color.
    Use a card-based layout for individual project pages to make it easy to scan and compare projects.
    Use a grid system to layout projects on the project search page.

Layout

    Use a responsive grid system to layout pages and adapt to different screen sizes.
    Use a consistent margin and padding system to create a harmonious layout.
    Use a max-width container to prevent lines of text from becoming too long.

Styling

    Use a simple, consistent design language throughout the site.
    Use a dark theme and light theme to provide options for users.
    Use a subtle animation system to enhance the user experience.

Guide on Implementing the Site
HTML Structure

    Use a semantic HTML structure to organize content and provide meaning to search engines.
    Use ARIA attributes to provide accessibility information for screen readers.

CSS

    Use a preprocessor like Sass or Less to write more efficient and modular CSS.
    Use a CSS framework like Bootstrap or Tailwind CSS to speed up development.
    Use a consistent naming convention and organization system for CSS classes.

JavaScript

    Use a JavaScript framework like React or Vue.js to build interactive components.
    Use a library like jQuery to simplify DOM manipulation and event handling.
    Use a build tool like Webpack or Rollup to bundle and optimize JavaScript code.

Implementation Steps

    Create a wireframe of each page using a tool like Figma or Sketch.
    Write HTML and CSS for each page, using a preprocessor and framework as needed.
    Add interactive components using JavaScript and a framework or library.
    Implement responsive design and accessibility features.
    Test and iterate on the design and implementation.

I hope this helps you with your portfolio website. Good luck!

If you have any questions or need assistance, please feel free to reach out.

## 2

A dark, calm, monchromic animation of individual tiny segments moving towards the right in a continuous movement. The movement singifies progress of an ongoing operation. The animation is to be used as a background in a card-based UI.
