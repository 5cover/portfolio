<?php
chdir(__DIR__);
require_once ('start.php');
?>
<script src="https://code.jquery.com/jquery-3.7.1.slim.min.js"
    integrity="sha256-kmHvs0B+OpCW5GVHUNjv9rOmY0IvSIRcf7zGUDTDQM8=" crossorigin="anonymous"></script>
<script src="/portfolio/js/base.js"></script>
<?php if (file_exists('portfolio/js/' . THIS_PAGE_NAME . '.js')) { ?>
    <script src="/portfolio/js/<?php echo THIS_PAGE_NAME; ?>.js"></script>
<?php } ?>