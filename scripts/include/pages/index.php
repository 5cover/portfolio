<?php
require_once 'page.php';

const PIANO_TILES = [
    'passions.html#mountain',
    'passions.html#sandbox-videogames',
    'projects/tregoria.html',
    'projects/2l2w-french-rural-road.html',
    'projects/ethercrash.html',
    'projects/psdc.html',
    'projects/s1.02.html',
    'projects/winclean.html',
];

function page_index(): Page
{
    return new Page('index', fn(Lang $lang) => put_regular_page($lang, 'index', function () use ($lang) {
?>
<main>
    <ul class="lvl list-piano-tiles">
        <?php
        foreach (PIANO_TILES as $i => $href) {
            $num = $i + 1;
            $src = get_web_url(glob_web_single("img/piano-tile/$num.*"))
        ?>
        <li>
            <figure>
                <img src="<?= $src ?>" alt="<?= $lang->get("pianoTile{$num}Title") ?>" width="240" height="480" loading="lazy" title="<?= strip_tags($lang->get("pianoTile{$num}Desc")) ?>">
                <figcaption>
                    <div>
                        <h2><a class="foil" href="<?= $href ?>"><?= $lang->get("pianoTile{$num}Title") ?></a></h2>
                        <p><?= $lang->get("pianoTile{$num}Desc") ?></p>
                    </div>
                </figcaption>
            </figure>
        </li>
        <?php } ?>
    </ul>
    <article id="me" class="lvl content-block">
        <div>
            <h2><?= $lang->get('indexMe') ?></h2>
            <?= $lang->get('indexAboutMeContent') ?>
        </div>
        <img src="/portfolio/img/me.jpg" alt="<?= $lang->get('indexMyPhoto') ?>" width="1600" height="1600" loading="lazy" title="<?= $lang->get('indexMyPhoto') ?>">
    </article>
    <section id="ongoing-projects" class="lvl">
        <h2><?= $lang->get('indexOngoingProjects') ?></h2>
        <?php Project::put_card_list(array_filter($lang->projects(), fn($p) => !array_key_exists('end-date', $p->data->to_array()))) ?>
        <a href="projects.html" class="lvl button-link"><?= $lang->get('indexAllMyProjects') ?></a>
    </section>
    <article id="contact" class="lvl content-block">
        <div>
            <h2><?= $lang->get('indexContact') ?></h2>
            <address>
                <ul>
                    <li title="E-mail"><a class="link iconed-text" target="_blank" rel="noopener noreferrer" href="mailto:bardini.raphael@gmail.com"><?= get_svg_element('portfolio/img/social/email.svg', baseHeight: 24) ?><span>bardini.raphael@gmail.com</span></a>
                    </li>
                    <li title="LinkedIn"><a class="link iconed-text" target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/rapha%C3%ABl-bardini-6238432b6/"><?= get_svg_element('portfolio/img/social/linkedin.svg', baseHeight: 24) ?><span>Raphaël Bardini</span></a>
                    </li>
                    <li title="Instagram"><a class="link iconed-text" target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/bardiniraphael/"><?= get_svg_element('portfolio/img/social/instagram.svg', baseHeight: 24) ?><span>bardiniraphael</span></a>
                    </li>
                    <li title="GitHub"><a class="link iconed-text" target="_blank" rel="noopener noreferrer" href="https://github.com/5cover"><?= get_svg_element('portfolio/img/social/github.svg', baseHeight: 24) ?><span>5cover</span></a>
                    </li>
                </ul>
            </address>
        </div>
        <?php
        $CV_PREVIEW_WIDTH = 212;
        $CV_PREVIEW_HEIGHT = 300;
        $CV_URL = 'cv-bardini-raphael.pdf';
        $CV_URL_PREVIEW = 'cv-bardini-raphael-preview.jpg';
        $COMMAND = "gs -g{$CV_PREVIEW_WIDTH}x$CV_PREVIEW_HEIGHT -dPDFFitPage -dSAFER -dBATCH -dNOPAUSE -sDEVICE=jpeg -sOutputFile='"
        . root_path("portfolio/$lang->name/$CV_URL_PREVIEW") . "' '"
        . root_path("portfolio/$lang->name/$CV_URL") . "'";
        $result_code = null;
        exec($COMMAND, result_code: $result_code);
        assert($result_code === 0, $COMMAND);
        ?>
        <a
            href="<?= $CV_URL ?>"
            target="_blank"
            rel="noopener noreferrer">
            <img
                src="<?= $CV_URL_PREVIEW ?>"
                alt="<?= $lang->get('indexMyResumePreview') ?>"
                width="<?= $CV_PREVIEW_WIDTH ?>"
                height="<?= $CV_PREVIEW_HEIGHT ?>"
                loading="lazy">
            <span><?= $lang->get('indexMyResume') ?></span>
        </a>
    </article>
    <article class="lvl content-block">
        <h2><?= $lang->get('indexVideoCv') ?></h2>
        <iframe src="https://www.youtube-nocookie.com/embed/6VqtL5oogwk?modestbranding=1&rel=0" width="640" height="360" title="Video CV - Raphaël Bardini" frameborder="0" allowfullscreen></iframe>
    </article>
</main>
<?php
    }));
}
