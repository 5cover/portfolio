<?php
require_once 'start.php';
pushd(__DIR__);
?>
<!DOCTYPE html>
<html lang="fr">
<?php include '../head.php'; ?>

<body>
    <?php include 'header.php'; ?>
    <main>
        <ul class="list-piano-tiles hover-sensitive-list">
            <li>
                <figure>
                    <img src="/portfolio/img/piano-tile/1.jpg" alt="Val d'Isère" width="240" height="480" loading="lazy"
                        title="Station de ski dans les Alpes">
                    <figcaption>
                        <h2><a href="passions.html#mountain">Val d'Isère</a></h2>
                        <p>Station de ski dans les Alpes</p>
                    </figcaption>
                </figure>
            </li>
            <li>
                <figure>
                    <img src="/portfolio/img/piano-tile/2.png" alt="Jeu-vidéo bac-à-sable" width="240" height="480"
                        loading="lazy" title="L'art et la fonctionnalité conjointes">
                    <figcaption>
                        <h2><a href="passions.html#sandbox-videogames">Jeu-vidéo bac-à-sable</a></h2>
                        <p>L'art et la fonctionnalité conjointes</p>
                    </figcaption>
                </figure>
            </li>
            <li>
                <figure>
                    <img src="/portfolio/img/piano-tile/3.png" alt="Un monde virtuel" width="240" height="480"
                        loading="lazy" title="Une infinité de possibilités">
                    <figcaption>
                        <h2><a href="project/tregoria.html">Un monde virtuel</a></h2>
                        <p>Une infinité de possibilités</p>
                    </figcaption>
                </figure>
            </li>
            <li>
                <figure>
                    <img src="/portfolio/img/piano-tile/4.png" alt="Blender" width="240" height="480" loading="lazy"
                        title="Modélisation 3D et montage vidéo">
                    <figcaption>
                        <h2><a href="project/2l2w-french-rural-road.html">Blender</a></h2>
                        <p>Modélisation 3D et montage vidéo</p>
                    </figcaption>
                </figure>
            </li>
            <li>
                <figure>
                    <img src="/portfolio/img/piano-tile/5.png" alt="Science des données" width="240" height="480"
                        loading="lazy" title="Data science">
                    <figcaption>
                        <h2><a href="project/ethercrash.html">Science des données</a></h2>
                        <p><em>Data science</em></p>
                    </figcaption>
                </figure>
            </li>
            <li>
                <figure>
                    <img src="/portfolio/img/piano-tile/6.png" alt="Grammaires formelles" width="240" height="480"
                        loading="lazy" title="Sur les traces de Noam Chomsky…">
                    <figcaption>
                        <h2><a href="project/psdc.html">Grammaires formelles</a></h2>
                        <p>Sur les traces de Noam Chomsky&hellip;</p>
                    </figcaption>
                </figure>
            </li>
            <li>
                <figure>
                    <img src="/portfolio/img/piano-tile/7.png" alt="Optimisation" width="240" height="480"
                        loading="lazy" title="L'optimisation ne se termine jamais">
                    <figcaption>
                        <h2><a href="project/sudone.html">Optimisation</a></h2>
                        <p>L'optimisation ne se termine jamais</p>
                    </figcaption>
                </figure>
            </li>
            <li>
                <figure>
                    <img src="/portfolio/img/piano-tile/8.png" alt="Expérience utilisateur" width="240" height="480"
                        loading="lazy" title="Mon projet &quot;best-seller&quot;">
                    <figcaption>
                        <h2><a href="project/winclean.html">Expérience utilisateur</a></h2>
                        <p>Mon projet &quot;best-seller&quot;</p>
                    </figcaption>
                </figure>
            </li>
        </ul>
        <article class="content-block" id="me">
            <h2>Moi</h2>
            <div>
                <p>Je suis étudiant en 1<sup>re</sup> année de <abbr
                        title="Brevet Universitaire Technologique">BUT</abbr> informatique, etc...</p>
                <img src="/portfolio/img/me.jpg" alt="Ma photo" width="1600" height="1600" loading="lazy"
                    title="Ma photo">
            </div>
        </article>
        <section id="ongoing-projects">
            <h2>Mes projets en cours</h2>
            <?php include 'project-list.php' ?>
            <a href="projects.html">Tous mes projets</a>
            <small>Dernière mise à jour&nbsp;: <time datetime="2024-05-21">21/05/2024</time></small>
        </section>
        <article class="content-block" id="contact">
            <div>
                <h2>Contact</h2>
                <ul>
                    <li title="E-mail"><?php echo get_svg_element('img/social/email.svg', baseHeight: 24) ?><a
                            class="link" href="mailto:bardini.raphael@gmail.com">bardini.raphael@gmail.com</a></li>
                    <li title="LinkedIn"><?php echo get_svg_element('img/social/linkedin.svg', baseHeight: 24) ?><a
                            class="link" href="https://www.linkedin.com/in/rapha%C3%ABl-bardini-6238432b6/">Raphaël
                            Bardini</a>
                    </li>
                    <li title="Instagram"><?php echo get_svg_element('img/social/instagram.svg', baseHeight: 24) ?><a
                            class="link" href="https://www.instagram.com/bardiniraphael/">bardiniraphael</a></li>
                    <li title="GitHub"><?php echo get_svg_element('img/social/github.svg', baseHeight: 24) ?><a
                            class="link" href="https://github.com/5cover">5cover</a>
                    </li>
                </ul>
            </div>
            <a href="/portfolio/cv.pdf" target="_blank">
                <img src="/portfolio/img/cv_preview.webp" alt="Aperçu de mon CV" width="1241" height="1755"
                    loading="lazy">
                <span>Mon CV</span>
            </a>
        </article>
    </main>
    <?php include 'footer.php'; ?>
    <?php include '../scripts.php'; ?>
</body>

</html>
<?php popd(); ?>