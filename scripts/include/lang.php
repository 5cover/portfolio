<?php

$_langInstances = [
    'en' => new Lang('en',
        ['en' => 'English', 'fr' => 'Anglais'],
        'fi-us',
        "This site's GitHub repository",
        "Hello! My name is Raphaël Bardini. This is my portfolio website. Make yourself at home!",
        "Light theme",
        "System theme",
        "Dark theme",
        "Projects",
        "History",
        "Passions",
        "Perspectives",
        "Me",
        <<<HTML
    <p>Je suis étudiant en 1<sup>re</sup> année de <abbr
    title="Brevet Universitaire Technologique">BUT</abbr> informatique, etc...</p>
    HTML,
        "My ongoing projects",
        "All my projects",
        "Last updated on: ",
        "Contact",
        "My resume",
        "Preview my resume",
        "Val d'Isère",
        "Ski station in the Alpes",
        "Sandbox videogames",
        "Joining art and functionality",
        "A virtual world",
        "Infinite possibilities",
        "Blender",
        "3D modeling and video editing",
        "<em>Data science</em>",
        "Statistics and data mining",
        "Formal grammars",
        "Following Noam Chomsky's footsteps…",
        "Optimization",
        "Optimization never ends",
        "User Experience",
        "My passion project",
        "Project title…",
        "Sort by title",
        "Search a project",
        "Tags",
        function ($t) {
            return $t . 'LOGO';
        }),
    'fr' => new Lang('fr',
        ['en' => 'French', 'fr' => 'Français'],
        'fi-fr',
        "Dépôt GitHub de ce site",
        "Bonjour ! Je m'appelle Raphaël Bardini. Ceci est mon portfolio. Faites come chez vous !",
        "Thème clair",
        "Thème système",
        "Thème sombre",
        "Projets",
        "Parcours",
        "Passions",
        "Perspectives",
        "Moi",
        <<<HTML
    <p>Je suis étudiant en 1<sup>re</sup> année de <abbr
    title="Brevet Universitaire Technologique">BUT</abbr> informatique, etc...</p>
    HTML,
        "Mes projets en cours",
        "Tous mes projects",
        "Dernière mise à jour : ",
        "Contact",
        "Mon CV",
        "Aperçu de mon CV",
        "Val d'Isère",
        "Station de ski dans les Alpes",
        "Jeu-vidéo bac-à-sable",
        "L'art et la fonctionnalité conjointes",
        "Un monde virtuel",
        "Une infinité de possibilités",
        "Blender",
        "Modélisation 3D et montage vidéo",
        "Science des données",
        "Data science",
        "Grammaires formelles",
        "Sur les traces de Noam Chomsky…",
        "Optimisation",
        "L'optimisation ne se termine jamais",
        "Expérience utilisateur",
        'Mon projet "best-seller"',
        "Titre de projet…",
        "Trier par titre",
        "Rechercher un projet",
        "Tags",
        function ($t) {
            return 'Logo ' . $t;
        }),
];

final class Lang {
    public readonly string $tag;
    public readonly string $flagClass;
    public readonly string $footerGitHubAnchorTitle;
    public readonly string $siteDescription;
    public readonly string $nameLightTheme;
    public readonly string $nameSystemTheme;
    public readonly string $nameDarkTheme;
    public readonly string $namePageProjects;
    public readonly string $namePageHistory;
    public readonly string $namePagePassions;
    public readonly string $namePagePerspectives;
    public readonly string $indexMe;
    public readonly string $indexAboutMeContent;
    public readonly string $indexOngoingProjects;
    public readonly string $indexAllMyProjects;
    public readonly string $indexLastUpdatedOn;
    public readonly string $indexContact;
    public readonly string $indexMyResume;
    public readonly string $indexMyResumePreview;
    public readonly string $indexPianoTile1Title;
    public readonly string $indexPianoTile1Desc;
    public readonly string $indexPianoTile2Title;
    public readonly string $indexPianoTile2Desc;
    public readonly string $indexPianoTile3Title;
    public readonly string $indexPianoTile3Desc;
    public readonly string $indexPianoTile4Title;
    public readonly string $indexPianoTile4Desc;
    public readonly string $indexPianoTile5Title;
    public readonly string $indexPianoTile5Desc;
    public readonly string $indexPianoTile6Title;
    public readonly string $indexPianoTile6Desc;
    public readonly string $indexPianoTile7Title;
    public readonly string $indexPianoTile7Desc;
    public readonly string $indexPianoTile8Title;
    public readonly string $indexPianoTile8Desc;
    public readonly string $projectSearchPlaceholder;
    public readonly string $projectSearchSearch;
    public readonly string $projectSearchTags;
    public readonly string $projectSearchSort;

    /** Names of this lang in all other langs. Keyed by lang tag. */
    public readonly array $names;
    private readonly Closure $fFormatTitle;
    public function __construct(
        string $tag,
        array $names,
        string $flagClass,
        string $footerGitHubAnchorTitle,
        string $siteDescription,
        string $nameLightTheme,
        string $nameSystemTheme,
        string $nameDarkTheme,
        string $namePageProjects,
        string $namePageHistory,
        string $namePagePassions,
        string $namePagePerspectives,
        string $indexMe,
        string $indexAboutMeContent,
        string $indexOngoingProjects,
        string $indexAllMyProjects,
        string $indexLastUpdatedOn,
        string $indexContact,
        string $indexMyResume,
        string $indexMyResumePreview,
        string $indexPianoTile1Title,
        string $indexPianoTile1Desc,
        string $indexPianoTile2Title,
        string $indexPianoTile2Desc,
        string $indexPianoTile3Title,
        string $indexPianoTile3Desc,
        string $indexPianoTile4Title,
        string $indexPianoTile4Desc,
        string $indexPianoTile5Title,
        string $indexPianoTile5Desc,
        string $indexPianoTile6Title,
        string $indexPianoTile6Desc,
        string $indexPianoTile7Title,
        string $indexPianoTile7Desc,
        string $indexPianoTile8Title,
        string $indexPianoTile8Desc,
        string $projectSearchPlaceholder,
        string $projectSearchSort,
        string $projectSearchSearch,
        string $projectSearchTags,
        Closure $formatTitle,
    ) {
        $this->tag = $tag;
        $this->flagClass = $flagClass;
        $this->names = $names;
        $this->fFormatTitle = $formatTitle;
        $this->footerGitHubAnchorTitle = $footerGitHubAnchorTitle;
        $this->siteDescription = $siteDescription;
        $this->nameLightTheme = $nameLightTheme;
        $this->nameSystemTheme = $nameSystemTheme;
        $this->nameDarkTheme = $nameDarkTheme;
        $this->namePageProjects = $namePageProjects;
        $this->namePageHistory = $namePageHistory;
        $this->namePagePassions = $namePagePassions;
        $this->namePagePerspectives = $namePagePerspectives;
        $this->indexMe = $indexMe;
        $this->indexAboutMeContent = $indexAboutMeContent;
        $this->indexOngoingProjects = $indexOngoingProjects;
        $this->indexAllMyProjects = $indexAllMyProjects;
        $this->indexLastUpdatedOn = $indexLastUpdatedOn;
        $this->indexContact = $indexContact;
        $this->indexMyResume = $indexMyResume;
        $this->indexMyResumePreview = $indexMyResumePreview;
        $this->indexPianoTile1Title = $indexPianoTile1Title;
        $this->indexPianoTile1Desc = $indexPianoTile1Desc;
        $this->indexPianoTile2Title = $indexPianoTile2Title;
        $this->indexPianoTile2Desc = $indexPianoTile2Desc;
        $this->indexPianoTile3Title = $indexPianoTile3Title;
        $this->indexPianoTile3Desc = $indexPianoTile3Desc;
        $this->indexPianoTile4Title = $indexPianoTile4Title;
        $this->indexPianoTile4Desc = $indexPianoTile4Desc;
        $this->indexPianoTile5Title = $indexPianoTile5Title;
        $this->indexPianoTile5Desc = $indexPianoTile5Desc;
        $this->indexPianoTile6Title = $indexPianoTile6Title;
        $this->indexPianoTile6Desc = $indexPianoTile6Desc;
        $this->indexPianoTile7Title = $indexPianoTile7Title;
        $this->indexPianoTile7Desc = $indexPianoTile7Desc;
        $this->indexPianoTile8Title = $indexPianoTile8Title;
        $this->indexPianoTile8Desc = $indexPianoTile8Desc;
        $this->projectSearchPlaceholder = $projectSearchPlaceholder;
        $this->projectSearchSort = $projectSearchSort;
        $this->projectSearchSearch = $projectSearchSearch;
        $this->projectSearchTags = $projectSearchTags;
    }

    public function formatTitle(string $title): string {
        return ($this->fFormatTitle)($title);
    }

    public function get_data(string $name): string {
        return $this->tag . '/' . $name;
    }

    public static function instances(): array {
        global $_langInstances;
        return $_langInstances;
    }

    public static function instance(string $tag): static {
        return static::instances()[$tag];
    }
}