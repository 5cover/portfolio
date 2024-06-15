<?php
require_once 'start.php';
pushd(__DIR__);
?>
<footer>
    <p><small>&copy; 2024 Raphaël Bardini</small></p>
    <p><a href="https://github.com/5cover/portfolio" title="This site's GitHub repository"><?php
    echo get_svg_element('portfolio/img/social/github.svg', baseHeight: 40); ?></a></p>
</footer>
<?php popd(); ?>