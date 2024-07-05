import * as util from "./modules/util.js";
import * as dom from "./modules/dom.js";
import * as i12y from "./modules/i12y.js";

$(async () => {

    const titleDataList = document.getElementById('project-titles');
    const projectList = document.getElementById('project-list');
    const searchInput = document.getElementById('search-input');
    const listTags = document.getElementById('list-tag');

    {
        const dateFmt = new Intl.DateTimeFormat(document.documentElement.lang, {
            "dateStyle": "long"
        });
        var formatDate = function (date) {
            return `<time datetime="${date}">${dateFmt.format(Date.parse(date))}</time>`
        }
    }

    const [projects, tags, anchors] = await Promise.all([
        util.getDataJson(`${document.documentElement.lang}/projects`),
        util.getDataJson(`${document.documentElement.lang}/tags`),
        util.getDataJson('anchors'),
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
        listTags.appendChild(dom.createLi(label));
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
            .map(([key, project]) => {
                project.title = dom.parseHtml(project.title).textContent;
                return [key, project]
            })
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
        const projectListHTML = (await Promise.all(filteredProjects.map(([id, project]) => getProjectCardHtml(id, project)))).join('');

        // Update the project list
        projectList.innerHTML = projectListHTML;
        i12y.setupElementInteractivity(projectList);
    }

    async function getProjectCardHtml(id, project) {
        return `<li${util.map(project.background, b => ` style="--bg-img-card: url(${b})"`, '')}>
        <ul class="list-rect">${project.tags.map(id => `<li><a href="?tag=${id}">${tags[id]}</a></li>`).join('')}</ul>
            ${await util.map(project.logo, async info =>
            (await dom.getGraphicElement(info, project.title /* todo: format title*/, ['logo'])).outerHTML,
            '')}
            <h3><a href="project/${id}.html">${project.title}</a></h3>
            <small class="context">${util.ucfirst(project.context)}</small>
            <small class="status">${getStatus(project)}</small>
            <p class="abstract">${project.abstract}</p>
            <ul class="list-link">
                ${(await Promise.all(Object.entries(project.links).map(async ([name, link]) => {
                const icon = await dom.getGraphicElement(anchors[link.anchor]);
                return `<li><a href="${link.href}" title="${name}" target="_blank" rel="noopener noreferrer">${icon.outerHTML}</a></li>`;
            }))).join('')}
            </ul>
        </li>`
    }

    function getStatus(project) {
        const startDate = formatDate(project['start-date']);
        const endDate = util.map(project['end-date'], formatDate, 'en cours');
        return `${startDate} – ${endDate}`;
    }
});