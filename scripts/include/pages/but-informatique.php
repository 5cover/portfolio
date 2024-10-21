<?php
require_once 'page.php';
require_once 'details.php';

const MAX_PROJECTS_PER_SKILL = 4;

function put_skill_project_list(Lang $lang, string $skillTag)
{
    Project::put_card_list(
        array_slice(
            array_filter(
                $lang->projects(),
                fn($p) => in_array($skillTag, $p->data->get('tags')->to_array())
            ),
            0,
            MAX_PROJECTS_PER_SKILL,
            true
        ),
        4
    );
}

function put_skill(Lang $lang, LinkedData $but, int $index, string $skillTag)
{
    $skill = $but->get('skills')->get($index)
?>
<li style="--bg-img: url(/portfolio/img/skill/<?= $index ?>.jpg)">
    <h3><?= sprintf($but->get('fmt-h3-skill'), $index + 1, $skill->get('name')) ?></h3>
    <p><?= $skill->get('desc') ?></p>
    <?php put_skill_project_list($lang, $skillTag) ?>
</li>
<?php
}

function page_but_informatique(): Page
{
    return new Page('but-informatique', fn(Lang $lang) => put_regular_page($lang, 'but-informatique', function () use ($lang) {
        $but = $lang->get('but');
?>
<main>
    <div id="titre">
        <h1><?= $but->get('h1') ?></h1>
        <img src="/portfolio/img/but.webp" alt="<?= $but->get('but-logo-alt') ?>" width="95" height="96" loading="lazy" title="<?= $but->get('but-logo-alt') ?>">
    </div>
    <article id="presentation"><?= $but->get('description') ?></article>
    <a class="lvl button-link" target="_blank" rel="noopener noreferrer" href="https://www.enseignementsup-recherche.gouv.fr/sites/default/files/annexe-2-licence-professionnelle-bachelor-universitaire-de-technologie-informatique-29016.pdf"><?= $but->get('link-text-syllabus') ?></a>
    <section id="competences">
        <h2><?= $but->get('h2-skills') ?></h2>
        <p><?= $but->get('skills-abstract') ?></p>
        <ul class="lvl">
            <?php
            put_skill($lang, $but, 0, 'but-realiser');
            put_skill($lang, $but, 1, 'but-optimiser');
            put_skill($lang, $but, 2, 'but-administrer');
            put_skill($lang, $but, 3, 'but-gerer');
            put_skill($lang, $but, 4, 'but-conduire');
            put_skill($lang, $but, 5, 'but-collaborer')
            ?>
            </li>
        </ul>
    </section>
    <div class="lvl">
        <article id="resultat-pour-moi">
            <h2><?= $but->get('h2-result') ?></h2>
            <article>
                <h3><?= $but->get('h3-why') ?></h3>
                <?= $but->get('why') ?>
            </article>
            <article>
                <h3><?= $but->get('h3-assessment') ?></h3>
                <?= $but->get('assessment') ?>
            </article>
            <p><?= $but->get('conclusion') ?></p>
        </article>
        <figure class="figure">
            <img src="/portfolio/img/iut-lannion.jpg" alt="<?= $but->get('iut-alt') ?>" width="1200" height="630" loading="lazy" title="<?= $but->get('iut-alt') ?>">
            <figcaption><?= $but->get('iut-caption') ?></figcaption>
        </figure>
    </div>
</main>
<?php
    }));
}
