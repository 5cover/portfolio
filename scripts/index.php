<?php
require_once 'help.php';
require_once 'content.php';
require_once 'project.php';

[$lang, $page] = parse_args();

$projects = array_map(fn($p) => new Project($p), $lang->get_data('projects'));
?>
<?php put_doctype_html($page, $lang) ?>
<?php put_head($page, $lang) ?>

<body>
    <?php put_header($page, $lang) ?>
    <main>
        <ul class="list-piano-tiles">
            <li>
                <figure>
                    <img src="/portfolio/img/piano-tile/1.jpg" alt="<?php echo $lang->get('indexPianoTile1Title') ?>"
                        width="240" height="480" loading="lazy"
                        title="<?php echo strip_tags($lang->get('indexPianoTile1Desc')) ?>">
                    <figcaption>
                        <h2><a href="passions.html#mountain"><?php echo $lang->get('indexPianoTile1Title') ?></a></h2>
                        <p><?php echo $lang->get('indexPianoTile1Desc') ?></p>
                    </figcaption>
                </figure>
            </li>
            <li>
                <figure>
                    <img src="/portfolio/img/piano-tile/2.png" alt="<?php echo $lang->get('indexPianoTile2Title') ?>"
                        width="240" height="480" loading="lazy"
                        title="<?php echo strip_tags($lang->get('indexPianoTile2Desc')) ?>">
                    <figcaption>
                        <h2><a
                                href="passions.html#sandbox-videogames"><?php echo $lang->get('indexPianoTile2Title') ?></a>
                        </h2>
                        <p><?php echo $lang->get('indexPianoTile2Desc') ?></p>
                    </figcaption>
                </figure>
            </li>
            <li>
                <figure>
                    <img src="/portfolio/img/piano-tile/3.png" alt="<?php echo $lang->get('indexPianoTile3Title') ?>"
                        width="240" height="480" loading="lazy"
                        title="<?php echo strip_tags($lang->get('indexPianoTile3Desc')) ?>">
                    <figcaption>
                        <h2><a href="project/tregoria.html"><?php echo $lang->get('indexPianoTile3Title') ?></a></h2>
                        <p><?php echo $lang->get('indexPianoTile3Desc') ?></p>
                    </figcaption>
                </figure>
            </li>
            <li>
                <figure>
                    <img src="/portfolio/img/piano-tile/4.png" alt="<?php echo $lang->get('indexPianoTile4Title') ?>"
                        width="240" height="480" loading="lazy"
                        title="<?php echo strip_tags($lang->get('indexPianoTile4Desc')) ?>">
                    <figcaption>
                        <h2><a
                                href="project/2l2w-french-rural-road.html"><?php echo $lang->get('indexPianoTile4Title') ?></a>
                        </h2>
                        <p><?php echo $lang->get('indexPianoTile4Desc') ?></p>
                    </figcaption>
                </figure>
            </li>
            <li>
                <figure>
                    <img src="/portfolio/img/piano-tile/5.png" alt="<?php echo $lang->get('indexPianoTile5Title') ?>"
                        width="240" height="480" loading="lazy"
                        title="<?php echo strip_tags($lang->get('indexPianoTile5Desc')) ?>">
                    <figcaption>
                        <h2><a href="project/ethercrash.html"><?php echo $lang->get('indexPianoTile5Title') ?></a></h2>
                        <p><?php echo $lang->get('indexPianoTile5Desc') ?></p>
                    </figcaption>
                </figure>
            </li>
            <li>
                <figure>
                    <img src="/portfolio/img/piano-tile/6.png" alt="<?php echo $lang->get('indexPianoTile6Title') ?>"
                        width="240" height="480" loading="lazy"
                        title="<?php echo strip_tags($lang->get('indexPianoTile6Desc')) ?>">
                    <figcaption>
                        <h2><a href="project/psdc.html"><?php echo $lang->get('indexPianoTile6Title') ?></a></h2>
                        <p><?php echo $lang->get('indexPianoTile6Desc') ?></p>
                    </figcaption>
                </figure>
            </li>
            <li>
                <figure>
                    <img src="/portfolio/img/piano-tile/7.png" alt="<?php echo $lang->get('indexPianoTile7Title') ?>"
                        width="240" height="480" loading="lazy"
                        title="<?php echo strip_tags($lang->get('indexPianoTile7Desc')) ?>">
                    <figcaption>
                        <h2><a href="project/sudone.html"><?php echo $lang->get('indexPianoTile7Title') ?></a></h2>
                        <p><?php echo $lang->get('indexPianoTile7Desc') ?></p>
                    </figcaption>
                </figure>
            </li>
            <li>
                <figure>
                    <img src="/portfolio/img/piano-tile/8.png" alt="<?php echo $lang->get('indexPianoTile8Title') ?>"
                        width="240" height="480" loading="lazy"
                        title="<?php echo strip_tags($lang->get('indexPianoTile8Desc')) ?>">
                    <figcaption>
                        <h2><a href="project/winclean.html"><?php echo $lang->get('indexPianoTile8Title') ?></a></h2>
                        <p><?php echo $lang->get('indexPianoTile8Desc') ?></p>
                    </figcaption>
                </figure>
            </li>
        </ul>
        <article class="content-block" id="me">
            <div>
                <h2><?php echo $lang->get('indexMe') ?></h2>
                <?php echo $lang->get('indexAboutMeContent') ?>
            </div>
            <img src="/portfolio/img/me.jpg" alt="<?php echo $lang->get('indexMyPhoto') ?>" width="1600" height="1600"
                loading="lazy" title="<?php echo $lang->get('indexMyPhoto') ?>">
        </article>
        <section id="ongoing-projects">
            <h2><?php echo $lang->get('indexOngoingProjects') ?></h2>
            <?php put_project_cards_list($lang, array_filter($projects, fn($p) => !array_key_exists('end-date', $p->data))) ?>
            <a href="projects.html" class="button-link"><?php echo $lang->get('indexAllMyProjects') ?></a>
        </section>
        <article class="content-block" id="contact">
            <div>
                <h2><?php echo $lang->get('indexContact') ?></h2>
                <ul>
                    <li title="E-mail"><a class="link iconed-text" target="_blank" rel="noopener noreferrer"
                            href="mailto:bardini.raphael@gmail.com"><?php
                            echo get_svg_element('portfolio/img/social/email.svg', baseHeight: 24) ?>bardini.raphael@gmail.com</a>
                    </li>
                    <li title="LinkedIn"><a class="link iconed-text" target="_blank" rel="noopener noreferrer"
                            href="https://www.linkedin.com/in/rapha%C3%ABl-bardini-6238432b6/"><?php
                            echo get_svg_element('portfolio/img/social/linkedin.svg', baseHeight: 24) ?>Raphaël
                            Bardini</a>
                    </li>
                    <li title="Instagram"><a class="link iconed-text" target="_blank" rel="noopener noreferrer"
                            href="https://www.instagram.com/bardiniraphael/"><?php
                            echo get_svg_element('portfolio/img/social/instagram.svg', baseHeight: 24) ?>bardiniraphael</a>
                    </li>
                    <li title="GitHub"><a class="link iconed-text" target="_blank" rel="noopener noreferrer"
                            href="https://github.com/5cover"><?php
                            echo get_svg_element('portfolio/img/social/github.svg', baseHeight: 24) ?>5cover</a>
                    </li>
                </ul>
            </div>
            <a href="/portfolio/cv_bardini_raphael.pdf" target="_blank" rel="noopener noreferrer">
                <img src="/portfolio/img/cv_preview.webp" alt="<?php echo $lang->get('indexMyResumePreview') ?>"
                    width="1241" height="1755" loading="lazy">
                <span><?php echo $lang->get('indexMyResume') ?></span>
            </a>
        </article>
    </main>
    <?php put_footer($page, $lang) ?>
    <?php put_scripts($page) ?>
</body>

</html>