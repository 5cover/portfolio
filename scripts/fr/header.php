<?php
chdir(__DIR__);
require_once('../start.php');
?>
<header>
    <nav>
        <h1><a href="<?php echo get_page_link('index.html'); ?>">Raphaël Bardini</a></h1>
        <ul>
            <li><a href="<?php echo get_page_link('projects.html'); ?>">Projets</a></li>
            <li><a href="<?php echo get_page_link('history.html'); ?>">Parcours</a></li>
            <li><a href="<?php echo get_page_link('passions.html'); ?>">Passions</a></li>
            <li><a href="<?php echo get_page_link('perspectives.html'); ?>">Perspectives</a></li>
        </ul>
    </nav>
    <ul class="list-flags">
        <li><a class="fi fi-us gray-when-not-hover" href="/portfolio/en/<?php echo THIS_PAGE_NAME; ?>.html"></a></li>
        <li><a class="fi fi-fr" href="#"></a></li>
    </ul>
    <div class="theme-switch-wrapper">
        <svg class="themed-fill" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path
                d="M4.069 13H0v-2h4.069c-.041.328-.069.661-.069 1s.028.672.069 1m3.034-7.312L4.222 2.807 2.808 4.221l2.881 2.881a8 8 0 0 1 1.414-1.414m11.209 1.414 2.881-2.881-1.414-1.414-2.881 2.881a8 8 0 0 1 1.414 1.414M12 4c.339 0 .672.028 1 .069V0h-2v4.069A8 8 0 0 1 12 4m0 16c-.339 0-.672-.028-1-.069V24h2v-4.069A8 8 0 0 1 12 20m7.931-9c.041.328.069.661.069 1s-.028.672-.069 1H24v-2zm-3.033 7.312 2.88 2.88 1.415-1.414-2.88-2.88a8 8 0 0 1-1.415 1.414m-11.21-1.415-2.88 2.88 1.414 1.414 2.88-2.88a8 8 0 0 1-1.414-1.414M12 6a6 6 0 1 0 0 12 6 6 0 0 0 0-12" />
        </svg>
        <label class="theme-switch" for="checkbox">
            <input type="checkbox" id="checkbox">
            <span class="slider round"></span>
        </label>
        <svg class="themed-fill" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path
                d="M12 10.999A4.51 4.51 0 0 1 14.999 14 4.52 4.52 0 0 1 18 11a4.52 4.52 0 0 1-3.001-3A4.51 4.51 0 0 1 12 10.999m8.001.001a3.01 3.01 0 0 1 2 2.001A3 3 0 0 1 24 11a3.01 3.01 0 0 1-2-2 3.01 3.01 0 0 1-1.999 2m-1-9a4.51 4.51 0 0 1-2.998 3.001 4.52 4.52 0 0 1 3.001 3.002A4.51 4.51 0 0 1 22 5.001 4.52 4.52 0 0 1 19.001 2M12 24C5.383 24 0 18.617 0 12S5.383 0 12 0c1.894 0 3.63.497 5.37 1.179C14.422 1.683 8 4.445 8 12c0 7.454 5.917 10.208 9.37 10.821C15.87 23.667 13.894 24 12 24" />
        </svg>
    </div>
</header>