<?php
require_once 'util.php';
require_once 'content.php';

[$lang, $page] = parse_args();

put_doctype_html($page, $lang);
put_head($page, $lang) ?>

<body>
    <pre><?php phpinfo() ?></pre>
</body>

</html>