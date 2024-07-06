<?php

require_once 'page.php';
require_once 'lang.php';

function put_doctype_html(Page $page, Lang $lang) { ?>
    <!DOCTYPE html>
    <html lang="<?= $lang->tag ?>">
<?php }

function put_footer(Page $page, Lang $lang) { ?>
    <footer class="lvl">
        <small>&copy; <time datetime="2024">2024</time> Raphaël Bardini</small>
        <a target="_blank" rel="noopener noreferrer" href="https://github.com/5cover/portfolio" title="<?= $lang->get('footerGitHubAnchorTitle') ?>"><?php
          echo get_svg_element('portfolio/img/social/github.svg', baseHeight: 60) ?></a>
    </footer>
<?php }

function put_head(Page $page, Lang $lang, string $fallbackStylesheet = 'base.css') { ?>

    <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/portfolio/apple-touch-icon.png">
        <link rel="icon" type="image/png" sizes="16x16" href="/portfolio/favicon-16x16.png">
        <link rel="icon" type="image/png" sizes="32x32" href="/portfolio/favicon-32x32.png">
        <link rel="shortcut icon" href="/portfolio/favicon.ico" type="image/x-icon">
        <link rel="manifest" href="/portfolio/site.webmanifest">
        <link rel="mask-icon" href="/portfolio/safari-pinned-tab.svg" color="#5bbad5">

        <?php
        $g = glob_web('/portfolio/css/' . $page->name . '.css');
        if (count($g) == 1) { ?>
            <link rel="stylesheet" type="text/css" href="<?= get_web_url($g[0]) ?>">
        <?php } else { ?>
            <link rel="stylesheet" type="text/css" href="/portfolio/css/<?= $fallbackStylesheet ?>">
        <?php } ?>
        <?php #echo implode('', array_map(fn($url) => "<link rel=\"stylesheet\" href=\"/portfolio/css/$url\">", $additionalStylesheets)) ?>
        <meta charset="UTF-8">
        <meta name="author" content="Raphaël Bardini">
        <meta name="description" content="<?= $lang->get('siteDescription') ?>">
        <meta name="msapplication-TileColor" content="#2d89ef">
        <meta name="theme-color" content="#ffffff">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Raphaël Bardini</title>
        <script>
            document.documentElement.setAttribute('data-theme', localStorage.getItem('theme') || 'system');
        </script>
        <!-- Flag icons -->
        <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/gh/lipis/flag-icons@7.0.0/css/flag-icons.min.css">
        <!-- JQuery -->
        <script async src="https://code.jquery.com/jquery-3.7.1.slim.min.js" integrity="sha256-kmHvs0B+OpCW5GVHUNjv9rOmY0IvSIRcf7zGUDTDQM8=" crossorigin="anonymous"></script>
        <!-- Highlight.JS -->
        <link rel="stylesheet" href="https://unpkg.com/@highlightjs/cdn-assets@11.9.0/styles/default.min.css">
        <script async src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js"></script>
        <script type="module" src="/portfolio/js/base.js"></script>
        <?php
        $g = glob_web('/portfolio/js/' . $page->name . '.js');
        if (count($g) == 1) { ?>
            <script type="module" src="<?= get_web_url($g[0]) ?>"></script>
        <?php } ?>
    </head>
<?php }
function put_header(Page $page, Lang $lang) { ?>
    <template id="template-definition-tooltip">
        <article class="lvl definition-tooltip" role="tooltip">
            <h4 class="title"><a target="_blank" rel="noopener noreferrer">
                    <!-- href="wiki"; name -->
                </a></h4>
            <!-- logo graphic -->
            <p class="type"><small>
                    <!-- type -->
                </small></p>
            <p class="synopsis">
                <!-- synopsis -->
            </p>
        </article>
    </template>
    <header class="lvl">
        <nav>
            <a href="<?= $page->get_nav_href($lang, "index") ?>">Raphaël Bardini</a>
            <ul>
                <li><a href="<?= $page->get_nav_href($lang, "projects") ?>"><?= $lang->get('namePageProjects') ?></a>
                </li>
                <li><a href="<?= $page->get_nav_href($lang, "history") ?>"><?= $lang->get('namePageHistory') ?></a>
                </li>
                <li><a href="<?= $page->get_nav_href($lang, "passions") ?>"><?= $lang->get('namePagePassions') ?></a>
                </li>
                <li><a href="<?= $page->get_nav_href($lang, "perspectives") ?>"><?= $lang->get('namePagePerspectives') ?></a>
                <li><a href="<?= $page->get_nav_href($lang, "but-informatique") ?>"><?= $lang->get('namePageButInformatique') ?></a>
                </li>
            </ul>
        </nav>
        <ul class="list-flags">
            <?php foreach (Lang::instances() as $otherLang) {
                $isSameLang = $lang->equals($otherLang);
                $class = 'fi ' . $otherLang->get('flagClass') . ($isSameLang ? '' : ' gray-when-not-hover');
                $title = $otherLang->name . ($isSameLang ? '' : " / {$otherLang->nameof($lang)}");
                ?>
                <li><a class="<?= $class ?>" title="<?= $title ?>" href="/portfolio/<?= $otherLang->tag ?>/<?= $page->name ?>.html"></a></li>
            <?php } ?>
        </ul>
        <div class="theme-switches">
            <label for="theme-switch-light" title="<?= $lang->get('nameLightTheme') ?>">
                <svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.9966 13.3333C12.8804 13.3333 14.4075 11.8409 14.4075 10C14.4075 8.15905 12.8804 6.66666 10.9966 6.66666C9.11284 6.66666 7.58575 8.15905 7.58575 10C7.58575 11.8409 9.11284 13.3333 10.9966 13.3333Z" style="stroke:var(--color-fg);fill:var(--color-fg);" stroke-width="1.46667" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M10.9966 1.66666V3.33333" style="stroke:var(--color-fg);" stroke-width="1.46667" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M10.9966 16.6667V18.3333" style="stroke:var(--color-fg);" stroke-width="1.46667" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M4.9679 4.10833L6.17022 5.28333" style="stroke:var(--color-fg);" stroke-width="1.46667" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M15.8229 14.7167L17.0253 15.8917" style="stroke:var(--color-fg);" stroke-width="1.46667" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M2.46942 10H4.17485" style="stroke:var(--color-fg);" stroke-width="1.46667" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M17.8183 10H19.5237" style="stroke:var(--color-fg);" stroke-width="1.46667" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M6.17022 14.7167L4.9679 15.8917" style="stroke:var(--color-fg);" stroke-width="1.46667" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M17.0253 4.10833L15.8229 5.28333" style="stroke:var(--color-fg);" stroke-width="1.46667" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                <input id="theme-switch-light" name="theme" value="auto" type="radio" onclick="">
            </label>
            <label for="theme-switch-system" title="<?= $lang->get('nameSystemTheme') ?>">
                <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="15.0014" cy="15.0014" r="9" style="stroke:var(--color-fg);" stroke-width="2" />
                    <mask id="path-2-inside-1_316_18" style="fill:var(--color-bg);">
                        <path d="M22.0732 22.0732C23.9486 20.1978 25.0021 17.6543 25.0021 15.0021C25.0021 12.35 23.9486 9.80643 22.0732 7.93107C20.1978 6.05571 17.6543 5.00214 15.0021 5.00214C12.35 5.00214 9.80643 6.0557 7.93107 7.93107L15.0021 15.0021L22.0732 22.0732Z" />
                    </mask>
                    <path d="M22.0732 22.0732C23.9486 20.1978 25.0021 17.6543 25.0021 15.0021C25.0021 12.35 23.9486 9.80643 22.0732 7.93107C20.1978 6.05571 17.6543 5.00214 15.0021 5.00214C12.35 5.00214 9.80643 6.0557 7.93107 7.93107L15.0021 15.0021L22.0732 22.0732Z" style="fill:var(--color-fg);stroke:var(--color-fg);" stroke-width="4" mask="url(#path-2-inside-1_316_18)" />
                </svg>
                <input id="theme-switch-system" name="theme" value="light" type="radio" onclick="">
            </label>
            <label for="theme-switch-dark" title="<?= $lang->get('nameDarkTheme') ?>">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.99939 1.5C8.00483 2.49456 7.44609 3.84348 7.44609 5.25C7.44609 6.65652 8.00483 8.00544 8.99939 9C9.99395 9.99456 11.3429 10.5533 12.7494 10.5533C14.1559 10.5533 15.5048 9.99456 16.4994 9C16.4994 10.4834 16.0595 11.9334 15.2354 13.1668C14.4113 14.4001 13.24 15.3614 11.8695 15.9291C10.4991 16.4968 8.99107 16.6453 7.53622 16.3559C6.08136 16.0665 4.74499 15.3522 3.69609 14.3033C2.6472 13.2544 1.93289 11.918 1.6435 10.4632C1.35411 9.00832 1.50264 7.50032 2.0703 6.12987C2.63795 4.75943 3.59925 3.58809 4.83262 2.76398C6.06598 1.93987 7.51603 1.5 8.99939 1.5Z" style="stroke:var(--color-fg);" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                <input id="theme-switch-dark" name="theme" value="dark" type="radio" onclick="">
            </label>
        </div>
    </header>
<?php }

function get_background_style_attr(string $bg, string $varname = 'bg-img'): string {
    return <<<END
     style="--$varname: url($bg)"
    END;
}

function get_iframe(string $src, string $title): string {
    return '<iframe src="' . $src . '" frameborder="0" loading="lazy" width="300" height="300" title="' . $title . '"></iframe>';
}