<?php
require_once 'page.php';

function put_card(LinkedData $history, string $year, int $index, string $imgSrc, string $imgAlt)
{
    $entry = $history->get($index)
?>
<div class="lvl js-timeline_item ag-timeline_item">
    <div class="ag-timeline-card_box">
        <?php
        if ($index % 2) {
        ?>
        <div class="ag-timeline-card_meta-box">
            <div class="ag-timeline-card_meta"><?= $entry->get('meta') ?></div>
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
            <div class="ag-timeline-card_meta"><?= $entry->get('meta') ?></div>
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
                <div class="ag-timeline-card_title"><?= $entry->get('title') ?></div>
                <div class="ag-timeline-card_desc"><?= $entry->get('body') ?></div>
            </div>
        </div>
        <div class="ag-timeline-card_arrow"></div>
    </div>
</div>
<?php
}

function page_history(): Page
{
    return new Page('history', fn(Lang $lang) => put_regular_page($lang, 'history', function () use ($lang) {
        $history = $lang->get('history');
?>

<main>
    <div class="ag-format-container">
        <div class="js-timeline ag-timeline">
            <div class="js-timeline_line ag-timeline_line">
                <div class="js-timeline_line-progress ag-timeline_line-progress"></div>
            </div>
            <div class="ag-timeline_list">
                <?php
                put_card($history, 2020, 0, '/portfolio/img/bossuet.jpeg', 'Lycée Saint-Joseph-Bossuet');
                put_card($history, 2023, 1, '/portfolio/img/cambridge-first.jpg', 'Cambridge First Certificate');
                put_card($history, 2023, 2, '/portfolio/img/iut-lannion.jpg', "L'IUT de Lannion");
                put_card($history, 2024, 3, '/portfolio/img/tro-breizh.jpg', 'Le Tro Breizh')
                ?>
            </div>
        </div>
    </div>
</main>
<?php
    }));
}
