<?php
require_once 'start.php';
pushd(__DIR__);
?>
<!DOCTYPE html>
<html lang="en">
<?php include '../head.php'; ?>

<body>
    <?php include 'header.php'; ?>
    <main>
        <ul class="list-piano-tiles hover-sensitive-list">
            <li>
                <figure>
                    <img src="/portfolio/img/piano-tile/1.jpg" alt="Val d'Isère" width="240" height="480" loading="lazy"
                        title="Ski station in the Alpes">
                    <figcaption>
                        <h2><a href="passions.html#mountain">Val d'Isère</a></h2>
                        <p>Ski station in the Alpes</p>
                    </figcaption>
                </figure>
            </li>
            <li>
                <figure>
                    <img src="/portfolio/img/piano-tile/2.png" alt="Sandbox videogames" width="240" height="480"
                        loading="lazy" title="Joint art and functionality">
                    <figcaption>
                        <h2><a href="passions.html#sandbox-videogames">Jeu-vidéo bac-à-sable</a></h2>
                        <p>Joint art and functionality</p>
                    </figcaption>
                </figure>
            </li>
            <li>
                <figure>
                    <img src="/portfolio/img/piano-tile/3.png" alt="A virtual world" width="240" height="480"
                        loading="lazy" title="Infinite possibilities">
                    <figcaption>
                        <h2><a href="project/tregoria.html">A virtual world</a></h2>
                        <p>Infinite possibilities</p>
                    </figcaption>
                </figure>
            </li>
            <li>
                <figure>
                    <img src="/portfolio/img/piano-tile/4.png" alt="Blender" width="240" height="480" loading="lazy"
                        title="3D modeling and video editing">
                    <figcaption>
                        <h2><a href="project/2l2w-french-rural-road.html">Blender</a></h2>
                        <p>3D modeling and video editing</p>
                    </figcaption>
                </figure>
            </li>
            <li>
                <figure>
                    <img src="/portfolio/img/piano-tile/5.png" alt="Data science" width="240" height="480"
                        loading="lazy" title="Statistics and data mining">
                    <figcaption>
                        <h2><a href="project/ethercrash.html">Data science</a></h2>
                        <p>Statistics and data mining</p>
                    </figcaption>
                </figure>
            </li>
            <li>
                <figure>
                    <img src="/portfolio/img/piano-tile/6.png" alt="Formal grammars" width="240" height="480"
                        loading="lazy" title="Following Noam Chomsky's footsteps…">
                    <figcaption>
                        <h2><a href="project/psdc.html">Formal grammars</a></h2>
                        <p>Following Noam Chomsky's footsteps…</p>
                    </figcaption>
                </figure>
            </li>
            <li>
                <figure>
                    <img src="/portfolio/img/piano-tile/7.png" alt="Optimization" width="240" height="480"
                        loading="lazy" title="Optimization never ends">
                    <figcaption>
                        <h2><a href="project/sudone.html">Optimization</a></h2>
                        <p>Optimization never ends</p>
                    </figcaption>
                </figure>
            </li>
            <li>
                <figure>
                    <img src="/portfolio/img/piano-tile/8.png" alt="User Experience" width="240" height="480"
                        loading="lazy" title="My passion project">
                    <figcaption>
                        <h2><a href="project/winclean.html">User Experience</a></h2>
                        <p>My passion project</p>
                    </figcaption>
                </figure>
            </li>
        </ul>
        <article class="content-block" id="me">
            <h2>Moi</h2>
            <div>
                <p>Je suis étudiant en 1<sup>re</sup> année de <abbr
                        title="Brevet Universitaire Technologique">BUT</abbr> informatique, etc...</p><img
                    src="/portfolio/img/me.jpg" alt="Ma photo" width="1600" height="1600" loading="lazy"
                    title="Ma photo">
            </div>
        </article>
        <section id="ongoing-projects">
            <h2>My ongoing projects</h2>
            <ul class="list-projects">
                <?php
                $data = get_data_json('en/projects.json');
                $tags = get_data_json('en/tags.json');
                $anchors = get_data_json('anchors.json');

                foreach ($data as $id => $project) {
                    $title = $project['title'];

                    if (array_key_exists('end-date', $project)) {
                        continue;
                    }

                    ?>
                    <li <?php if ($bg = $project['background'] ?? null) {
                        echo "style=\"--bg-img: url($bg)\"";
                    } ?>>
                        <ul class="list-tag">
                            <?php foreach ($project['tags'] as $tagId) {
                                echo "<li><a href=\"projects.html?tag=$tagId\">{$tags[$tagId]}</a></li>";
                            } ?>
                        </ul>
                        <?php if ($logo = $project['logo'] ?? null) {
                            echo get_icon_element($logo['isThemedSvg'], $logo['url'], "$title logo", 'logo');
                        } ?>
                        <h3><a href="project/<?php echo $id; ?>.html"><?php echo $title; ?></a></h3>
                        <p class="context"><small><?php echo ucfirst($project['context']); ?></small></p>
                        <p class="status">
                            <small><?php echo "{$project['start-date']} \u{2013} ongoing"; ?></small>
                        </p>
                        <p class="abstract"><?php echo $project['abstract']; ?></p>
                        <ul class="list-anchors">
                            <?php foreach ($project['anchors'] as $name => $anchor) { ?>
                                <li>
                                    <a href="<?php echo $anchor['href']; ?>" title="<?php echo $name; ?>" target="_blank">
                                        <?php
                                        $a = $anchors[$anchor['id']];
                                        echo get_icon_element($a['isThemedSvg'], $a['url']); ?>
                                    </a>
                                </li>
                            <?php } ?>
                        </ul>
                    </li>
                <?php } ?>
            </ul>
            <a href="projects.html">All my projects</a>
            <small>Last updated on&nbsp;: <time datetime="2024-05-21">05-21-2024</time></small>
        </section>
        <article class="content-block" id="contact">
            <div>
                <h2>Contact</h2>
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
            <a href="/portfolio/cv.pdf" target="_blank">
                <img src="/portfolio/img/cv_preview.webp" alt="Aperçu de mon CV" width="1241" height="1755"
                    loading="lazy">
                <span>My resume</span>
            </a>
        </article>
    </main>
    <?php include 'footer.php'; ?>
    <?php include '../scripts.php'; ?>
</body>

</html>
<?php popd(); ?>