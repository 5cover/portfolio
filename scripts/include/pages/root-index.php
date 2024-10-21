<?php
require_once 'page.php';
require_once 'content.php';

function page_root_index(): Page
{
    return new Page('index', function (Lang $lang) {
        put_doctype_html($lang)
?>

<head>
    <link rel="apple-touch-icon" sizes="180x180" href="/portfolio/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/portfolio/favicon-16x16.png">
    <link rel="icon" type="image/png" sizes="32x32" href="/portfolio/favicon-32x32.png">
    <link rel="shortcut icon" href="/portfolio/favicon.ico" type="image/x-icon">
    <link rel="manifest" href="/portfolio/site.webmanifest">
    <link rel="mask-icon" href="/portfolio/safari-pinned-tab.svg" color="#5bbad5">
    <link rel="stylesheet" type="text/css" href="/portfolio/css/base.css">
    <meta charset="UTF-8">
    <meta name="author" content="Raphaël Bardini">
    <meta name="description" content="<?= $lang->get('siteDescription') ?>">
    <meta name="msapplication-TileColor" content="#2d89ef">
    <meta name="theme-color" content="#ffffff">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Raphaël Bardini</title>
    <script type="module">
    document.documentElement.setAttribute('data-theme', localStorage.getItem('theme') || 'system');
    import { getDataJson } from "./js/modules/util.js";
    async function getPreferredLanguage() {
        const langs = await getDataJson('langs');
        for (const prefLang of navigator.languages || [navigator.language]) {
            const lang = langs.find(l => prefLang.startsWith(l));
            if (lang !== undefined) return lang;
        }
        return 'en'; // Default to English if no preferred language is found. English should always be available as a language.
    }
    window.location.href = `/portfolio/${await getPreferredLanguage()}`;
    </script>
</head>

<body></body>

</html><?php
    });
}
