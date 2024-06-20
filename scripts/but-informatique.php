<?php
require_once 'help.php';
require_once 'content.php';
require_once 'project.php';

[$lang, $page] = parse_args();
?>
<?php put_doctype_html($page, $lang); ?>
<?php put_head($page, $lang); ?>

<body>
    <?php put_header($page, $lang); ?>
    <main>
        <div id="titre">
            <h2><abbr title="Bachelor Universitaire Technologique">BUT</abbr> Informatique</h2>
            <img src="/portfolio/img/but.webp" alt="Logo BUT Informatique" width="95" height="96" loading="lazy"
                title="Logo BUT Informatique">
        </div>
        <div id="presentation">
            <p>Concevoir, réaliser et mettre en œuvre des solutions informatiques qui répondent aux besoins de
                transformation numérique des entreprises, voilà le quotidien du titulaire du BUT informatique, quel que
                soit le secteur dans lequel travaille son entreprise.</p>
            <p>En trois ans après le bac, le BUT offre une formation universitaire qui mêle théorie et pratique, avec un
                accent mis sur une professionnalisation progressive pour une insertion rapide, tout en garantissant un
                niveau scientifique suffisant pour permettre de continuer des études pour ceux qui le souhaitent.</p>
            <p>Le titulaire du BUT spécialité informatique est compétent sur les plans technique et méthodologique tout
                en étant sensibilisé aux problématiques actuelles (sécurité des données, <em>cloud computing</em>, intelligence
                artificielle), sur les questions sociétales, juridiques, éthiques et environnementales liées aux usages
                du numérique.</p>
            <p>À l’issue d’un tronc commun d’un an, l’étudiant pourra, en fonction de son projet professionnel, choisir
                l’un des quatre parcours proposés par la spécialité informatique.</p>
        </div>
        <a class="button-link" target="_blank"
            href="https://www.enseignementsup-recherche.gouv.fr/sites/default/files/annexe-2-licence-professionnelle-bachelor-universitaire-de-technologie-informatique-29016.pdf">Programme
            officiel du BUT Informatique</a>
        <section id="competences">
            <h3>Compétences du BUT</h3>
            <p>Les apprentissages du BUT sont organisés en 6 compétences&nbsp;:</p>
            <article style="--bg-img-skill: url(/portfolio/img/skill/1.jpg)">
                <h4>Compétence 1. Réaliser</h4>
                <p>Développer — c’est-à-dire concevoir, coder, tester et intégrer — une solution informatique pour un
                    client.</p>
                <?php put_project_cards_list($lang, fn($p) => in_array('but-realiser', $p->data['tags'])) ?>
            </article>
            <article style="--bg-img-skill: url(/portfolio/img/skill/2.jpg)">
                <h4>Compétence 2. Optimiser</h4>
                <p>Proposer des applications informatiques optimisées en fonction de critères spécifiques&nbsp;: temps
                    d’exécution, précision, consommation de ressources.</p>
                <?php put_project_cards_list($lang, fn($p) => in_array('but-optimiser', $p->data['tags'])) ?>
            </article>
            <article style="--bg-img-skill: url(/portfolio/img/skill/3.jpg)">
                <h4>Compétence 3. Administrer</h4>
                <p>Installer, configurer, mettre à disposition, maintenir en conditions opérationnelles des
                    infrastructures, des services et des réseaux et optimiser le système informatique d’une organisation.
                </p>
                <?php put_project_cards_list($lang, fn($p) => in_array('but-administrer', $p->data['tags'])) ?>
            </article>
            <article style="--bg-img-skill: url(/portfolio/img/skill/4.jpg)">
                <h4>Compétence 4. Gérer</h4>
                <p>Concevoir, gérer, administrer et exploiter les données de l’entreprise et mettre à disposition toutes
                    les informations pour un bon pilotage de l’entreprise.</p>
                <?php put_project_cards_list($lang, fn($p) => in_array('but-gerer', $p->data['tags'])) ?>
            </article>
            <article style="--bg-img-skill: url(/portfolio/img/skill/5.jpg)">
                <h4>Compétence 5. Conduire</h4>
                <p>Satisfaire les besoins des utilisateurs au regard de la chaîne de valeur du client, organiser et
                    piloter un projet informatique avec des méthodes classiques ou agiles.</p>
                <?php put_project_cards_list($lang, fn($p) => in_array('but-conduire', $p->data['tags'])) ?>
            </article>
            <article style="--bg-img-skill: url(/portfolio/img/skill/6.jpg)">
                <h4>Compétence 6. Collaborer</h4>
                <p>Acquérir, développer et exploiter les aptitudes nécessaires pour travailler efficacement dans une
                    équipe informatique.</p>
                <?php put_project_cards_list($lang, fn($p) => in_array('but-collaborer', $p->data['tags'])) ?>
            </article>
        </section>
        <div id="resultat-pour-moi">
            <div>
                <h3>Pourquoi ai-je choisi le BUT Informatique&nbsp;?</h3>
                <ul>
                    <li>L'affiliation de la formation avec mes intérêts et mes passions &rarr; le développement
                        informatique&nbsp;;</li>
                    <li>La proximité de mon domicile à l'IUT de Lannion</li>
                </ul>
                <h3>Mon bilan sur cette première année&nbsp;?</h3>
                <ul>
                    <li>J'ai énormément étendu mes horizons, j'ai découvert une pléthore de nouvelles disciplines de
                        l'informatique&nbsp;;</li>
                    <li>J'ai maintenant la tête remplie d'idées de projets que je souhaite réaliser&nbsp;;</li>
                    <li>L'ambiance de formation a été conviviale. Le climat est propice à l'entraide et à la
                        coopération, aussi bien entre étudiants qu'avec les professeurs.</li>
                </ul>
                <p><strong>Conclusion</strong>&nbsp;: je suis euphorique.</p>
            </div>
            <figure class="figure">
                <img src="/portfolio/img/iut-lannion.jpg" alt="IUT de Lannion" width="768" height="576" loading="lazy"
                    title="Entrée de l'IUT de Lannion">
                <figcaption>L'IUT de Lannion (Côtes d'Armor). C'est ici que je fais mon BUT Informatique.</figcaption>
            </figure>
        </div>
    </main>
    <?php put_footer($page, $lang); ?>
    <?php put_scripts($page); ?>
</body>

</html>