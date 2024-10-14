<?php
require_once 'util.php';
require_once 'content.php';
require_once 'data.php';

[$lang, $page] = parse_args();
put_doctype_html($page, $lang);
put_head_light($page, $lang, function () {
?>
    <script type="module">
        import {
            getDataJson
        } from "./js/modules/util.js";

        async function getPreferredLanguage() {
            const langs = Object.keys(await getDataJson('langs'));

            for (const prefLang of navigator.languages || [navigator.language]) {
                const lang = langs.find(l => prefLang.startsWith(l));
                if (lang !== undefined) return lang;
            }
            return 'en'; // Default to English if no preferred language is found. English should always be available as a language.
        }
        window.location.href = `/portfolio/${await getPreferredLanguage()}`;
    </script>
<?php
                             });
?>

<body>
</body>

</html>