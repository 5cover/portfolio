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
        <ul class="list-piano-tiles hover-sensitive-list">
            <li>
                <figure>
                    <img src="/portfolio/img/piano-tile/1.jpg" alt="<?php echo $lang->indexPianoTile1Title ?>"
                        width="240" height="480" loading="lazy"
                        title="<?php echo strip_tags($lang->indexPianoTile1Desc); ?>">
                    <figcaption>
                        <h2><a href="passions.html#mountain"><?php echo $lang->indexPianoTile1Title ?></a></h2>
                        <p><?php echo $lang->indexPianoTile1Desc ?></p>
                    </figcaption>
                </figure>
            </li>
            <li>
                <figure>
                    <img src="/portfolio/img/piano-tile/2.png" alt="<?php echo $lang->indexPianoTile2Title ?>"
                        width="240" height="480" loading="lazy"
                        title="<?php echo strip_tags($lang->indexPianoTile2Desc); ?>">
                    <figcaption>
                        <h2><a href="passions.html#sandbox-videogames"><?php echo $lang->indexPianoTile2Title ?></a>
                        </h2>
                        <p><?php echo $lang->indexPianoTile2Desc ?></p>
                    </figcaption>
                </figure>
            </li>
            <li>
                <figure>
                    <img src="/portfolio/img/piano-tile/3.png" alt="<?php echo $lang->indexPianoTile3Title ?>"
                        width="240" height="480" loading="lazy"
                        title="<?php echo strip_tags($lang->indexPianoTile3Desc); ?>">
                    <figcaption>
                        <h2><a href="project/tregoria.html"><?php echo $lang->indexPianoTile3Title ?></a></h2>
                        <p><?php echo $lang->indexPianoTile3Desc ?></p>
                    </figcaption>
                </figure>
            </li>
            <li>
                <figure>
                    <img src="/portfolio/img/piano-tile/4.png" alt="<?php echo $lang->indexPianoTile4Title ?>"
                        width="240" height="480" loading="lazy"
                        title="<?php echo strip_tags($lang->indexPianoTile4Desc); ?>">
                    <figcaption>
                        <h2><a href="project/2l2w-french-rural-road.html"><?php echo $lang->indexPianoTile4Title ?></a>
                        </h2>
                        <p><?php echo $lang->indexPianoTile4Desc ?></p>
                    </figcaption>
                </figure>
            </li>
            <li>
                <figure>
                    <img src="/portfolio/img/piano-tile/5.png" alt="<?php echo $lang->indexPianoTile5Title ?>"
                        width="240" height="480" loading="lazy"
                        title="<?php echo strip_tags($lang->indexPianoTile5Desc); ?>">
                    <figcaption>
                        <h2><a href="project/ethercrash.html"><?php echo $lang->indexPianoTile5Title ?></a></h2>
                        <p><?php echo $lang->indexPianoTile5Desc ?></p>
                    </figcaption>
                </figure>
            </li>
            <li>
                <figure>
                    <img src="/portfolio/img/piano-tile/6.png" alt="<?php echo $lang->indexPianoTile6Title ?>"
                        width="240" height="480" loading="lazy"
                        title="<?php echo strip_tags($lang->indexPianoTile6Desc); ?>">
                    <figcaption>
                        <h2><a href="project/psdc.html"><?php echo $lang->indexPianoTile6Title ?></a></h2>
                        <p><?php echo $lang->indexPianoTile6Desc ?></p>
                    </figcaption>
                </figure>
            </li>
            <li>
                <figure>
                    <img src="/portfolio/img/piano-tile/7.png" alt="<?php echo $lang->indexPianoTile7Title ?>"
                        width="240" height="480" loading="lazy"
                        title="<?php echo strip_tags($lang->indexPianoTile7Desc); ?>">
                    <figcaption>
                        <h2><a href="project/sudone.html"><?php echo $lang->indexPianoTile7Title ?></a></h2>
                        <p><?php echo $lang->indexPianoTile7Desc ?></p>
                    </figcaption>
                </figure>
            </li>
            <li>
                <figure>
                    <img src="/portfolio/img/piano-tile/8.png" alt="<?php echo $lang->indexPianoTile8Title ?>"
                        width="240" height="480" loading="lazy"
                        title="<?php echo strip_tags($lang->indexPianoTile8Desc); ?>">
                    <figcaption>
                        <h2><a href="project/winclean.html"><?php echo $lang->indexPianoTile8Title ?></a></h2>
                        <p><?php echo $lang->indexPianoTile8Desc ?></p>
                    </figcaption>
                </figure>
            </li>
        </ul>
        <article class="content-block" id="me">
            <h2><?php echo $lang->indexMe; ?></h2>
            <div>
                <p><?php echo $lang->indexAboutMeContent; ?></p><img
                    src="/portfolio/img/me.jpg" alt="Ma photo" width="1600" height="1600" loading="lazy"
                    title="Ma photo">
            </div>
        </article>
        <section id="ongoing-projects">
            <h2><?php echo $lang->indexOngoingProjects; ?></h2>
            <ul class="list-projects">
                <?php
                $tags = get_data_json($lang->tag.'/tags');
                $anchors = get_data_json('anchors');
                foreach (get_data_json($lang->tag.'/projects') as $id => $p) {
                    $p = new Project($p);
                    if (array_key_exists('end-date', $p->data)) {
                        continue;
                    }
                    ?>
                    <li <?php $p->put_background_style_attr('bg-img'); ?>>
                        <?php $p->put_tags($tags); ?>
                        <?php $p->put_logo($lang); ?>
                        <h3><a href="project/<?php echo $id; ?>.html"><?php echo $p->data['title']; ?></a></h3>
                        <?php $p->put_status('en cours'); ?>
                        <?php $p->put_context(); ?>
                        <?php $p->put_abstract(); ?>
                        <?php $p->put_anchor_list($anchors); ?>
                    </li>
                <?php } ?>
            </ul>
            <a href="projects.html"><?php echo $lang->indexAllMyProjects; ?></a>
            <small><?php echo $lang->indexLastUpdatedOn; ?><time datetime="2024-05-21">21/05/2024</time></small>
        </section>
        <article class="content-block" id="contact">
            <div>
                <h2><?php echo $lang->indexContact; ?></h2>
                <ul>
                    <li title="E-mail"><?php echo get_svg_element('portfolio/img/social/email.svg', baseHeight: 24) ?><a
                            class="link" href="mailto:bardini.raphael@gmail.com">bardini.raphael@gmail.com</a></li>
                    <li title="LinkedIn">
                        <?php echo get_svg_element('portfolio/img/social/linkedin.svg', baseHeight: 24) ?><a
                            class="link" href="https://www.linkedin.com/in/rapha%C3%ABl-bardini-6238432b6/">Raphaël
                            Bardini</a>
                    </li>
                    <li title="Instagram">
                        <?php echo get_svg_element('portfolio/img/social/instagram.svg', baseHeight: 24) ?><a
                            class="link" href="https://www.instagram.com/bardiniraphael/">bardiniraphael</a>
                    </li>
                    <li title="GitHub">
                        <?php echo get_svg_element('portfolio/img/social/github.svg', baseHeight: 24) ?><a class="link"
                            href="https://github.com/5cover">5cover</a>
                    </li>
                </ul>
            </div>
            <a href="/portfolio/cv_bardini_raphael.pdf" target="_blank">
                <img src="/portfolio/img/cv_preview.webp" alt="<?php echo $lang->indexMyResumePreview; ?>" width="1241" height="1755"
                    loading="lazy">
                <span><?php echo $lang->indexMyResume; ?></span>
            </a>
        </article>
    </main>
    <?php put_footer($page, $lang); ?>
    <?php put_scripts($page); ?>
</body>
</html>