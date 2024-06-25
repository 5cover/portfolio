<?php
require_once 'help.php';
require_once 'content.php';
require_once 'project.php';

[$lang, $page] = parse_args();
?> <?php put_doctype_html($page, $lang) ?>
<?php put_head($page, $lang) ?>

<body>
    <?php put_header($page, $lang) ?>
    <main>
        <div class="ag-format-container">
            <div class="js-timeline ag-timeline">
                <div class="js-timeline_line ag-timeline_line">
                    <div class="js-timeline_line-progress ag-timeline_line-progress"></div>
                </div>
                <div class="ag-timeline_list">
                    <div class="lvl js-timeline_item ag-timeline_item">
                        <div class="ag-timeline-card_box">
                            <div class="js-timeline-card_point-box ag-timeline-card_point-box">
                                <div class="ag-timeline-card_point">2020</div>
                            </div>
                            <div class="ag-timeline-card_meta-box">
                                <div class="ag-timeline-card_meta">Lycée</div>
                            </div>
                        </div>
                        <div class="ag-timeline-card_item">
                            <div class="ag-timeline-card_inner">
                                <div class="ag-timeline-card_img-box">
                                    <img src="/portfolio/img/bossuet.jpeg" alt="Lycée Saint-Joseph-Bossuet" class="ag-timeline-card_img" />
                                </div>
                                <div class="ag-timeline-card_info">
                                    <div class="ag-timeline-card_title">Lycée</div>
                                    <div class="ag-timeline-card_desc">J'ai été scolarisé au <a class="link" href="https://www.saintjosephlannion.fr/">Lycée Saint-Joseph-Bossuet</a> à Lannion. J'ai suivi la filère générale. En première, je suis les spécialités <a class="link" href="https://www.letudiant.fr/lycee/specialites-bac-general/article/la-specialite-mathematiques-au-lycee-en-un-clin-d-oeil.html">Mathématiques</a>, <a class="link" href="https://www.education.gouv.fr/reussir-au-lycee/la-specialite-numerique-et-sciences-informatiques-au-bac-325448"><abbr title="Numériques Sciences Informatiques">NSI</abbr></a> et <a class="link" href="https://www.lyceeschoelcher972.fr/specialite-llcer-amc/"><abbr title="Anglais Monde Contemporain">AMC</abbr></a>. En terminale, je décide d'abandonner les mathématiques au profit de mes deux autres spécialités. Au baccalauréat, j'ai eu la mention Bien.</div>
                                </div>
                            </div>
                            <div class="ag-timeline-card_arrow"></div>
                        </div>
                    </div>
                    <div class="lvl js-timeline_item ag-timeline_item">
                        <div class="ag-timeline-card_box">
                            <div class="ag-timeline-card_meta-box">
                                <div class="ag-timeline-card_meta">Cambridge</div>
                            </div>
                            <div class="js-timeline-card_point-box ag-timeline-card_point-box">
                                <div class="ag-timeline-card_point">2023</div>
                            </div>
                        </div>
                        <div class="ag-timeline-card_item">
                            <div class="ag-timeline-card_inner">
                                <div class="ag-timeline-card_img-box">
                                    <img src="/portfolio/img/cambridge-first.jpg" alt="Cambridge First Certificate" class="ag-timeline-card_img" />
                                </div>
                                <div class="ag-timeline-card_info">
                                    <div class="ag-timeline-card_title">Cambridge First Certificate</div>
                                    <div class="ag-timeline-card_desc">J'ai pu passer cette certification d'anglais dans le contexte de ma spécialité AMC. Il y avait un test oral et écrit. Passer cette épreuve m'a permis de certifier mon niveau en anglais (C1).</div>
                                </div>
                            </div>
                            <div class="ag-timeline-card_arrow"></div>
                        </div>
                    </div>
                    <div class="lvl js-timeline_item ag-timeline_item">
                        <div class="ag-timeline-card_box">
                            <div class="js-timeline-card_point-box ag-timeline-card_point-box">
                                <div class="ag-timeline-card_point">2023</div>
                            </div>
                            <div class="ag-timeline-card_meta-box">
                                <div class="ag-timeline-card_meta">BUT</div>
                            </div>
                        </div>
                        <div class="ag-timeline-card_item">
                            <div class="ag-timeline-card_inner">
                                <div class="ag-timeline-card_img-box">
                                    <img src="/portfolio/img/iut-lannion.jpg" class="ag-timeline-card_img" alt="L'IUT de Lannion" />
                                </div>
                                <div class="ag-timeline-card_info">
                                    <div class="ag-timeline-card_title"><abbr title="Bachelor Universitaire Technologique">BUT</abbr> Informatique</div>
                                    <div class="ag-timeline-card_desc">Après le Bac, j'ai été accepté en BUT Informatique via Parcoursup. <a class="link" class="link" href="but-informatique.html">Plus de détails sur le <abbr title="Bachelor Universitaire Technologique">BUT</abbr> Informatique et l'<abbr title="Institut Universitaire Technologique">IUT</abbr> de Lannion</a></div>
                                </div>
                            </div>
                            <div class="ag-timeline-card_arrow"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
    <?php put_footer($page, $lang) ?>
    <?php put_scripts($page) ?>
</body>

</html>