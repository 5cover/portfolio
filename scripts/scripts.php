<?php
require_once 'start.php';
pushd(__DIR__);
?>
<script src="https://code.jquery.com/jquery-3.7.1.slim.min.js"
    integrity="sha256-kmHvs0B+OpCW5GVHUNjv9rOmY0IvSIRcf7zGUDTDQM8=" crossorigin="anonymous"></script>
<script src="/portfolio/js/base.js"></script>
<?php
$g = glob_web_filename('/portfolio/js/' . THIS_PAGE_NAME . '.js');
if (count($g) == 1) { ?>
    <script src="<?php echo get_web_path($g[0]); ?>"></script>
<?php } ?>
<?php popd(); ?>