<?php
require_once 'util.php';
require_once 'content.php';

[$lang, $page] = parse_args();

put_doctype_html($page, $lang);
put_head($page, $lang);

$history = $lang->get('history');

function put_card(string $year, int $index, string $imgSrc, string $imgAlt)
{
    /** @var array */
    global $history;
    /** @var array<string, string> */
    $entry = $history[$index];
    ?>
    <div class="lvl js-timeline_item ag-timeline_item">
        <div class="ag-timeline-card_box">
            <?php
            if ($index % 2) {
                ?>
                <div class="ag-timeline-card_meta-box">
                    <div class="ag-timeline-card_meta"><?= $entry['meta'] ?></div>
                </div>
                <div class="js-timeline-card_point-box ag-timeline-card_point-box">
                    <div class="ag-timeline-card_point"><?= $year ?></div>
                </div>
            <?php
            } else {
                ?>
                <div class="js-timeline-card_point-box ag-timeline-card_point-box">
                    <div class="ag-timeline-card_point"><?= $year ?></div>
                </div>
                <div class="ag-timeline-card_meta-box">
                    <div class="ag-timeline-card_meta"><?= $entry['meta'] ?></div>
                </div>
            <?php
            }
                    ?>
        </div>
        <div class="ag-timeline-card_item">
            <div class="ag-timeline-card_inner">
                <div class="ag-timeline-card_img-box">
                    <img src="<?= $imgSrc ?>" alt="<?= $imgAlt ?>" class="ag-timeline-card_img" />
                </div>
                <div class="ag-timeline-card_info">
                    <div class="ag-timeline-card_title"><?= $entry['title'] ?></div>
                    <div class="ag-timeline-card_desc"><?= $entry['body'] ?></div>
                </div>
            </div>
            <div class="ag-timeline-card_arrow"></div>
        </div>
    </div>
<?php } ?>

<body>
    <?php put_header($page, $lang) ?>
    <main>
        <div class="ag-format-container">
            <div class="js-timeline ag-timeline">
                <div class="js-timeline_line ag-timeline_line">
                    <div class="js-timeline_line-progress ag-timeline_line-progress"></div>
                </div>
                <div class="ag-timeline_list">
                    <?php
                        put_card(2020, 0, '/portfolio/img/bossuet.jpeg', 'Lycée Saint-Joseph-Bossuet');
                        put_card(2023, 1, '/portfolio/img/cambridge-first.jpg', 'Cambridge First Certificate');
                        put_card(2023, 2, '/portfolio/img/iut-lannion.jpg', "L'IUT de Lannion");
                        put_card(2024, 3, '/portfolio/img/tro-breizh.jpg', 'Le Tro Breizh');
                    ?>
                </div>
            </div>
        </div>
    </main>
    <?php put_footer($page, $lang) ?>
</body>

</html>