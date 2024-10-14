<?php
require_once 'util.php';
require_once 'content.php';
require_once 'data.php';

const MAX_PROJECTS_PER_SKILL = 4;

[$lang, $page] = parse_args();
$but           = $lang->get('but');

put_doctype_html($page, $lang);
put_head($page, $lang);

function put_skill_project_list(string $skillTag)
{
    global $lang;
    Project::put_card_list(
        array_slice(
            array_filter(
                $lang->projects(),
                fn($p) => in_array($skillTag, $p->data['tags'])
            ),
            0,
            MAX_PROJECTS_PER_SKILL,
            true
        ),
        4
    );
}

function put_skill(int $index, string $skillTag)
{
    global $but;
    $skill = $but['skills'][$index];
    ?>
    <li style="--bg-img: url(/portfolio/img/skill/<?= $index ?>.jpg)">
        <h3><?= sprintf($but['fmt-h3-skill'], $index + 1, $skill['name']) ?></h3>
        <p><?= $skill['desc'] ?></p>
        <?php put_skill_project_list($skillTag) ?>
    </li>
<?php } ?>

<body>
    <?php put_header($page, $lang) ?>
    <main>
        <div id="titre">
            <h1><?= $but['h1'] ?></h1>
            <img src="/portfolio/img/but.webp" alt="<?= $but['but-logo-alt'] ?>" width="95" height="96" loading="lazy" title="<?= $but['but-logo-alt'] ?>">
        </div>
        <article id="presentation"><?= $but['description'] ?></article>
        <a class="lvl button-link" target="_blank" rel="noopener noreferrer" href="https://www.enseignementsup-recherche.gouv.fr/sites/default/files/annexe-2-licence-professionnelle-bachelor-universitaire-de-technologie-informatique-29016.pdf"><?= $but['link-text-syllabus'] ?></a>
        <section id="competences">
            <h2><?= $but['h2-skills'] ?></h2>
            <p><?= $but['skills-abstract'] ?></p>
            <ul class="lvl">
                <?php
                    put_skill(0, 'but-realiser');
                    put_skill(1, 'but-optimiser');
                    put_skill(2, 'but-administrer');
                    put_skill(3, 'but-gerer');
                    put_skill(4, 'but-conduire');
                    put_skill(5, 'but-collaborer')
                ?>
                </li>
            </ul>
        </section>
        <div class="lvl">
            <article id="resultat-pour-moi">
                <h2><?= $but['h2-result'] ?></h2>
                <article>
                    <h3><?= $but['h3-why'] ?></h3>
                    <?= $but['why'] ?>
                </article>
                <article>
                    <h3><?= $but['h3-assessment'] ?></h3>
                    <?= $but['assessment'] ?>
                </article>
                <p><?= $but['conclusion'] ?></p>
            </article>
            <figure class="figure">
                <img src="/portfolio/img/iut-lannion.jpg" alt="<?= $but['iut-alt'] ?>" width="1200" height="630" loading="lazy" title="<?= $but['iut-alt'] ?>">
                <figcaption><?= $but['iut-caption'] ?></figcaption>
            </figure>
        </div>
    </main>
    <?php put_footer($page, $lang) ?>
</body>

</html>