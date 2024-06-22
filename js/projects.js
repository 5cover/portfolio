jQuery(document).ready(async $ => {
    const titleDataList = document.getElementById('project-titles');
    const projectList = document.getElementById('project-list');
    const searchInput = document.getElementById('search-input');
    const listTags = document.getElementById('list-tag');

    const lang = document.getElementsByTagName('html')[0].lang

    // Fetch project data from JSON file

    const [projects, tags, anchors] = await Promise.all([
        fetch(`/portfolio/data/${lang}/projects.json`).then(res => res.json()).catch(err => { throw err }),
        fetch(`/portfolio/data/${lang}/tags.json`).then(res => res.json()).catch(err => { throw err }),
        fetch(`/portfolio/data/anchors.json`).then(res => res.json()).catch(err => { throw err }),
    ]);

    const allowedTags = new Set();
    const requestedTag = new URLSearchParams(window.location.search).get('tag');
    if (requestedTag !== null) {
        allowedTags.add(requestedTag);
    }

    // Fill the title datalist
    for (const id in projects) {
        const option = document.createElement('option');
        option.innerHTML = projects[id].title;
        titleDataList.appendChild(option);
    }

    // Create tags in the tag list
    for (const id in tags) {
        const input = document.createElement('input');
        input.type = 'checkbox';
        input.value = id;
        input.checked = allowedTags.has(id);

        const label = document.createElement('label');
        label.innerHTML = tags[id];

        const htmlId = 'tag-' + id;
        label.htmlFor = input.id = htmlId;

        label.appendChild(input);
        listTags.appendChild(label);
    }

    document.querySelectorAll('input').forEach(input => {
        if (input.type === 'checkbox') {
            input.addEventListener('change', () => {
                if (input.checked) {
                    allowedTags.add(input.value);
                }
                else {
                    allowedTags.delete(input.value);
                }
                renderProjectList();
            });
        } else {
            input.addEventListener('change', renderProjectList);
        }
    });

    // Initial rendering
    await renderProjectList(requestedTag);

    async function renderProjectList() {
        const searchTerm = searchInput.value || '';
        const sortBy = document.querySelector('input[name="sorting"]:checked').value; // asc or desc
        const filteredProjects = Object.entries(projects)
            .filter(([_, project]) =>
                project.title.toLowerCase().includes(searchTerm.toLowerCase())
                && Array.from(allowedTags).every(t => project.tags.includes(t)))
            .sort((/** @type {{ title: string; }} */ a, /** @type {{ title: string; }} */ b) => {
                // Sort by title
                if (sortBy === 'asc') {
                    return a[1].title.localeCompare(b[1].title);
                } else {
                    return b[1].title.localeCompare(a[1].title);
                }
            });

        // Generate the project list HTML
        const projectListHTML = (await Promise.all(filteredProjects.map(([id, project]) => getProjectHtml(id, project)))).join('');

        // Update the project list
        projectList.innerHTML = projectListHTML;
    }

    async function getProjectHtml(id, project) {
        return `<li${map(b => ` style="--bg-img: url(${b})"`, '', project.background)}>
        <ul class="list-tag">${project.tags.map(id => `<li><a href="?tag=${id}">${tags[id]}</a></li>`).join('')}</ul>
            ${await map(async info => (await getIconElement(info.isThemedSvg, `${info.url}`, `Logo ${project.title}`, ['logo'])).outerHTML,
            '', project.logo)}
            <h3><a href="project/${id}.html">${project.title}</a></h3>
            <p class="context"><small>${ucfirst(project.context)}</small></p>
            <p class="status"><small>${project['start-date']} – ${project['end-date'] || 'en cours'}</small></p>
            <p class="abstract">${project.abstract}</p>
            <ul class="list-anchor">
                ${(await Promise.all(Object.entries(project.anchors).map(async ([name, anchor]) => {
                const icon = await getIconElement(anchors[anchor.id].isThemedSvg, anchors[anchor.id].url);
                return `<li><a href="${anchor.href}" title="${name}" target="_blank" rel="noopener noreferrer">${icon.outerHTML}</a></li>`;
            }))).join('')}
            </ul>
        </li>`
    }
});