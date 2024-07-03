<?php
require_once 'help.php';
require_once 'content.php';
require_once 'detail.php';

define('MAX_PROJECTS_PER_SKILL', 4);

[$lang, $page] = parse_args();

$projects = array_map(fn($p) => new Project($p), $lang->get_data_json('projects'));

function put_skill_project_list($skillId) {
    global $lang, $projects;
    Project::put_cards_list($lang,
        array_slice(
            array_filter($projects,
                fn($p) => in_array($skillId, $p->data['tags'])), 0, MAX_PROJECTS_PER_SKILL, true));
}

?> <?php put_doctype_html($page, $lang) ?>
<?php put_head($page, $lang) ?>

<body>
    <?php put_header($page, $lang) ?>
    <main>
        <div id="titre">
            <h1><abbr title="Bachelor Universitaire Technologique">BUT</abbr> Informatique</h1>
            <img src="/portfolio/img/but.webp" alt="Logo BUT Informatique" width="95" height="96" loading="lazy" title="Logo BUT Informatique">
        </div>
        <div id="presentation" class="text">
            <p>Concevoir, réaliser et mettre en œuvre des solutions informatiques qui répondent aux besoins de transformation numérique des entreprises, voilà le quotidien du titulaire du BUT informatique, quel que soit le secteur dans lequel travaille son entreprise.</p>
            <p>En trois ans après le bac, le BUT offre une formation universitaire qui mêle théorie et pratique, avec un accent mis sur une professionnalisation progressive pour une insertion rapide, tout en garantissant un niveau scientifique suffisant pour permettre de continuer des études pour ceux qui le souhaitent.</p>
            <p>Le titulaire du BUT spécialité informatique est compétent sur les plans technique et méthodologique tout en étant sensibilisé aux problématiques actuelles (sécurité des données, <em>cloud computing</em>, intelligence artificielle), sur les questions sociétales, juridiques, éthiques et environnementales liées aux usages du numérique.</p>
            <p>À l’issue d’un tronc commun d’un an, l’étudiant pourra, en fonction de son projet professionnel, choisir l’un des quatre parcours proposés par la spécialité informatique.</p>
        </div>
        <a class="lvl button-link" target="_blank" rel="noopener noreferrer" href="https://www.enseignementsup-recherche.gouv.fr/sites/default/files/annexe-2-licence-professionnelle-bachelor-universitaire-de-technologie-informatique-29016.pdf">Programme officiel du BUT Informatique</a>
        <section id="competences">
            <h3>Compétences du BUT</h3>
            <p class="text">Les apprentissages du BUT sont organisés en 6 compétences&nbsp;:</p>
            <ul class="lvl">
                <li style="--bg-img: url(/portfolio/img/skill/1.jpg)">
                    <h4>Compétence 1. Réaliser</h4>
                    <p class="text">Développer — c’est-à-dire concevoir, coder, tester et intégrer une solution informatique pour un client.</p>
                    <?php put_skill_project_list('but-realiser') ?>
                </li>
                <li style="--bg-img: url(/portfolio/img/skill/2.jpg)">
                    <h4>Compétence 2. Optimiser</h4>
                    <p class="text">Proposer des applications informatiques optimisées en fonction de critères spécifiques&nbsp;: temps d’exécution, précision, consommation de ressources.</p>
                    <?php put_skill_project_list('but-optimiser') ?>
                </li>
                <li style="--bg-img: url(/portfolio/img/skill/3.jpg)">
                    <h4>Compétence 3. Administrer</h4>
                    <p class="text">Installer, configurer, mettre à disposition, maintenir en conditions opérationnelles des infrastructures, des services et des réseaux et optimiser le système informatique d’une organisation. </p>
                    <?php put_skill_project_list('but-administrer') ?>
                </li>
                <li style="--bg-img: url(/portfolio/img/skill/4.jpg)">
                    <h4>Compétence 4. Gérer</h4>
                    <p class="text">Concevoir, gérer, administrer et exploiter les données de l’entreprise et mettre à disposition toutes les informations pour un bon pilotage de l’entreprise.</p>
                    <?php put_skill_project_list('but-gerer') ?>
                </li>
                <li style="--bg-img: url(/portfolio/img/skill/5.jpg)">
                    <h4>Compétence 5. Conduire</h4>
                    <p class="text">Satisfaire les besoins des utilisateurs au regard de la chaîne de valeur du client, organiser et piloter un projet informatique avec des méthodes classiques ou agiles.</p>
                    <?php put_skill_project_list('but-conduire') ?>
                </li>
                <li style="--bg-img: url(/portfolio/img/skill/6.jpg)">
                    <h4>Compétence 6. Collaborer</h4>
                    <p class="text">Acquérir, développer et exploiter les aptitudes nécessaires pour travailler efficacement dans une équipe informatique.</p>
                    <?php put_skill_project_list('but-collaborer') ?>
                </li>
            </ul>
        </section>
        <div class="lvl" id="resultat-pour-moi">
            <div>
                <article>
                    <h3>Pourquoi ai-je choisi le BUT Informatique&nbsp;?</h3>
                    <ul>
                        <li>L'affiliation de la formation avec mes intérêts et mes passions &rarr; le développement informatique&nbsp;;</li>
                        <li>La proximité de mon domicile à l'IUT de Lannion</li>
                    </ul>
                </article>
                <article>
                    <h3>Mon bilan sur cette première année&nbsp;?</h3>
                    <ul>
                        <li>J'ai énormément étendu mes horizons, j'ai découvert une pléthore de nouvelles disciplines de l'informatique&nbsp;;</li>
                        <li>J'ai maintenant la tête remplie d'idées de projets que je souhaite réaliser&nbsp;;</li>
                        <li>L'ambiance de formation a été conviviale. Le climat est propice à l'entraide et à la coopération, aussi bien entre étudiants qu'avec les professeurs.</li>
                    </ul>
                </article>
                <p><strong>Conclusion</strong>&nbsp;: je suis euphorique.</p>
            </div>
            <figure class="figure">
                <img src="/portfolio/img/iut-lannion.jpg" alt="IUT de Lannion" width="768" height="576" loading="lazy" title="Entrée de l'IUT de Lannion">
                <figcaption>L'IUT de Lannion (Côtes d'Armor). C'est ici que je fais mon BUT Informatique.</figcaption>
            </figure>
        </div>
    </main>
    <?php put_footer($page, $lang) ?>
</body>

</html>