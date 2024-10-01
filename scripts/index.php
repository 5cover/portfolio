<?php
require_once 'util.php';
require_once 'content.php';
require_once 'data.php';

[$lang, $page] = parse_args();

$piano_tiles = [
    "passions.html#mountain",
    "passions.html#sandbox-videogames",
    "project/tregoria.html",
    "project/2l2w-french-rural-road.html",
    "project/ethercrash.html",
    "project/psdc.html",
    "project/sudone.html",
    "project/winclean.html",
];

put_doctype_html($page, $lang);
put_head($page, $lang);
?>

<body>
    <?php put_header($page, $lang) ?>
    <main>
        <ul class="lvl list-piano-tiles">
            <?php foreach ($piano_tiles as $i => $href) {
                $num = $i + 1;
                $src = get_web_url(glob_web_single("/portfolio/img/piano-tile/$num.*"));
            ?>
                <li>
                    <figure>
                        <img src="<?= $src ?>" alt="<?= $lang->get("pianoTile{$num}Title") ?>" width="240" height="480" loading="lazy" title="<?= strip_tags($lang->get("pianoTile{$num}Desc")) ?>">
                        <figcaption>
                            <div>
                                <h2><a href="<?= $href ?>"><?= $lang->get("pianoTile{$num}Title") ?></a></h2>
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
            <?php Project::put_card_list(array_filter($lang->projects(), fn($p) => !array_key_exists('end-date', $p->data))) ?>
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
            <a href="/portfolio/cv_bardini_raphael.pdf" target="_blank" rel="noopener noreferrer">
                <img src="/portfolio/img/cv_preview.webp" alt="<?= $lang->get('indexMyResumePreview') ?>" width="1241" height="1755" loading="lazy">
                <span><?= $lang->get('indexMyResume') ?></span>
            </a>
        </article>
    </main>
    <?php put_footer($page, $lang) ?>
</body>

</html>