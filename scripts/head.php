<?php
require_once 'start.php';
pushd(__DIR__);
?>

<head>
    <link rel="apple-touch-icon" sizes="180x180" href="/portfolio/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/portfolio/favicon-16x16.png">
    <link rel="icon" type="image/png" sizes="32x32" href="/portfolio/favicon-32x32.png">
    <link rel="shortcut icon" href="/portfolio/favicon.ico" type="image/x-icon">
    <link rel="manifest" href="/portfolio/site.webmanifest">
    <link rel="mask-icon" href="/portfolio/safari-pinned-tab.svg" color="#5bbad5">
    <?php
    $g = glob_web_filename('css/' . THIS_PAGE_NAME . '.css');
    if (count($g) == 1) { ?>
        <link rel="stylesheet" type="text/css" href="<?php echo get_web_path($g[0]); ?>">
    <?php } else { ?>
        <link rel="stylesheet" type="text/css" href="/portfolio/css/base.css">
    <?php } ?>
    <link rel="stylesheet" type="text/css"
        href="https://cdn.jsdelivr.net/gh/lipis/flag-icons@7.0.0/css/flag-icons.min.css">
    <meta charset="UTF-8">
    <meta name="author" content="Raphaël Bardini">
    <meta name="description" content="Portfolio - Acceuil">
    <meta name="msapplication-TileColor" content="#2d89ef">
    <meta name="theme-color" content="#ffffff">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Raphaël Bardini</title>
    <script>document.documentElement.setAttribute('data-theme', localStorage.getItem('theme') || 'system');</script>
</head>
<?php popd(); ?>