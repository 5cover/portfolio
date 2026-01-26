import type { PageCopy } from './types';

export default {
    skills: {
        realiser: {
            name: "Réaliser un développement d'application",
            desc: "Développer — c'est-à-dire concevoir, coder, tester et intégrer une solution informatique pour un client.",
        },
        optimiser: {
            name: 'Optimiser des applications',
            desc: "Proposer des applications informatiques optimisées en fonction de critères spécifiques\u00a0: temps d'exécution, précision, consommation de ressources.",
        },
        administrer: {
            name: 'Administrer des systèmes informatiques communicants',
            desc: "Installer, configurer, mettre à disposition, maintenir en conditions opérationnelles des infrastructures, des services et des réseaux et optimiser le système informatique d'une organisation.",
        },
        gerer: {
            name: "Gérer des données de l'information",
            desc: "Concevoir, gérer, administrer et exploiter les données de l'entreprise et mettre à disposition toutes les informations pour un bon pilotage de l'entreprise.",
        },
        conduire: {
            name: 'Conduire un projet',
            desc: 'Satisfaire les besoins des utilisateurs au regard de la chaîne de valeur du client, organiser et piloter un projet informatique avec des méthodes classiques ou agiles.',
        },
        collaborer: {
            name: 'Collaborer et travailler dans une équipe informatique',
            desc: 'Acquérir, développer et exploiter les aptitudes nécessaires pour travailler efficacement dans une équipe informatique.',
        },
    },
    years: {
        'but-1': {
            label: 'BUT 1',
            title: 'Découverte et pratique',
            description: 'Objectif principal : comprendre comment les choses fonctionnent, concrètement.',
            bilan: 'Une année “artisanale”, centrée sur le faire, où la complexité reste maîtrisable et visible.',
            skills: {
                realiser: {
                    ac: [
                        "Implémentation de fonctionnalités simples à partir d'un besoin exprimé.",
                        "Traduction d'un problème en algorithmes élémentaires.",
                        'Production de code lisible, testé, documenté.',
                        'Premiers projets applicatifs individuels ou en binôme.',
                    ],
                },
                optimiser: {
                    ac: [
                        'Analyse de solutions algorithmiques simples.',
                        'Comparaison de performances et de complexités.',
                        "Choix raisonné d'algorithmes adaptés à un contexte donné.",
                        "Premiers réflexes d'optimisation du code.",
                    ],
                },
                administrer: {
                    ac: [
                        "Installation et configuration d'un poste de travail.",
                        "Découverte des systèmes d'exploitation et des services réseau de base.",
                        'Compréhension des échanges réseau et des rôles client/serveur.',
                        'Respect des bonnes pratiques de sécurité élémentaires.',
                    ],
                },
                gerer: {
                    ac: [
                        "Conception et création d'une base de données relationnelle.",
                        'Écriture de requêtes SQL simples.',
                        'Exploitation de données pour répondre à un besoin fonctionnel.',
                        'Sensibilisation à la qualité et à la cohérence des données.',
                    ],
                },
                conduire: {
                    ac: [
                        'Recueil et formalisation de besoins utilisateurs.',
                        'Organisation du travail en équipe.',
                        "Planification simple et suivi d'avancement.",
                        "Communication écrite et orale autour d'un projet.",
                    ],
                },

                collaborer: {
                    ac: [
                        'Collaboration dans des groupes projets.',
                        "Utilisation d'outils collaboratifs.",
                        'Prise en compte des contraintes humaines et organisationnelles.',
                        "Développement d'une posture professionnelle.",
                    ],
                },
            },
        },
        'but-2': {
            label: 'BUT 2',
            title: 'Structuration et cadre professionnel',
            description:
                "Cette année se spécialise : le BUT offrant quatre parcours. Je choisis le parcours C Administration, gestion et exploitation des données. Objectif principal : rendre la pratique lisible dans un contexte d'entreprise.",
            bilan: 'Cette année donne un vocabulaire, des méthodes et des cadres à ce qui était jusque-là intuitif.',
            skills: {
                realiser: {
                    ac: [
                        "Développement d'applications intégrant une base de données.",
                        'Interaction applicative avec un SGBD.',
                        "Respect d'une architecture logicielle simple.",
                        'Tests fonctionnels et validation des résultats.',
                    ],
                },
                optimiser: {
                    ac: [
                        'Optimisation de requêtes SQL.',
                        'Amélioration des performances applicatives liées aux données.',
                        'Choix de structures de données adaptées.',
                        "Premières démarches d'analyse de performances.",
                    ],
                },
                administrer: {
                    ac: [
                        'Mise en œuvre de services réseau avancés.',
                        'Sécurisation des échanges et des accès.',
                        'Compréhension des architectures réseau complexes.',
                        'Intégration des systèmes dans un environnement existant.',
                    ],
                },

                gerer: {
                    ac: [
                        "Développement d'applications orientées données.",
                        'Analyse et visualisation de jeux de données.',
                        "Utilisation d'outils d'analyse avancée.",
                        'Prise en compte de la volumétrie et de la qualité des données.',
                    ],
                },
                conduire: {
                    ac: [
                        'Gestion de projets techniques plus complexes.',
                        'Coordination des tâches et des livrables.',
                        'Interaction avec des parties prenantes.',
                        'Prise en compte de contraintes de délais et de qualité.',
                    ],
                },
                collaborer: {
                    ac: [
                        'Travail en équipe pluridisciplinaire.',
                        'Communication technique structurée.',
                        'Intégration dans un contexte professionnel.',
                        "Développement de l'autonomie.",
                    ],
                },
            },
        },
        'but-3': {
            label: 'BUT 3',
            title: "Passage à l'échelle et coordination",
            description: "Objectif principal: penser en systèmes plutôt qu'en éléments isolés.",
            bilan: 'On ne cherche plus seulement à faire fonctionner un programme, mais à rendre un système durable, coordonné et maintenable.',
            skills: {
                // 'realiser': {
                //     ac: [
                //         'Développement d\'applications décisionnelles.',
                //         'Intégration de données internes et externes.',
                //         'Utilisation de technologies web orientées données.',
                //         'Maintenabilité et évolutivité des solutions.',
                //     ],
                // },
                // 'optimiser': {
                //     ac: [
                //         'Exploitation de données massives.',
                //         'Mise en œuvre de techniques d\'optimisation avancées.',
                //         'Aide à la décision par analyse de données.',
                //         'Évaluation de la pertinence des solutions proposées.',
                //     ],
                // },
                // 'administrer': {
                //     ac: [
                //         'Organisation, sécurisation et protection des données.',
                //         'Administration avancée de bases de données.',
                //         'Gestion des accès, des droits et de la conformité.',
                //         'Intégration dans des environnements complexes.',
                //     ],
                // },
                gerer: {
                    ac: [
                        'Conception de systèmes décisionnels.',
                        "Exploitation de techniques d'intelligence artificielle et statistiques.",
                        'Gouvernance des données.',
                        "Valorisation stratégique de l'information.",
                    ],
                },
                conduire: {
                    ac: [
                        'Pilotage de projets orientés données.',
                        'Prise de décisions techniques argumentées.',
                        'Gestion des risques et des contraintes.',
                        'Production de livrables professionnels.',
                    ],
                },
                collaborer: {
                    ac: [
                        'Intégration complète dans une équipe professionnelle.',
                        'Communication avec des interlocuteurs techniques et non techniques.',
                        "Posture d'expert junior en données.",
                        'Autonomie et responsabilité.',
                    ],
                },
            },
        },
    },

    yearTabsLabel: 'Progression par année',
    synthesisHeading: 'Synthèse globale',
    yearLabel: 'Année',
    logoAlt: 'Logo BUT Informatique',
    heading: (
        <>
            <abbr title="Bachelor Universitaire Technologique">BUT</abbr> Computer Science
        </>
    ),
    linkTextSyllabus: 'Programme officiel du BUT Informatique',
    skillsAbstract:
        "Le programme du BUT Informatique ne se limite pas à l'apprentissage de technologies. Il propose une progression implicite de posture, de la pratique individuelle vers la compréhension de systèmes techniques et humains plus larges.",
    skill: (i, name) => (
        <>
            Compétence {i}&nbsp;: {name}
        </>
    ),
    iutAlt: "Entrée de l'IUT de Lannion",
    iutCaption: "L'IUT de Lannion (Côtes d'Armor). C'est ici que je fais mon BUT Informatique.",
    presentation: (
        <>
            <p>
                Concevoir, réaliser et mettre en œuvre des solutions informatiques qui répondent aux besoins de
                transformation numérique des entreprises, voilà le quotidien du titulaire du BUT informatique, quel que
                soit le secteur dans lequel travaille son entreprise.
            </p>
            <p>
                En trois ans après le bac, le BUT offre une formation universitaire qui mêle théorie et pratique, avec
                un accent mis sur une professionnalisation progressive pour une insertion rapide, tout en garantissant
                un niveau scientifique suffisant pour permettre de continuer des études pour ceux qui le souhaitent.
            </p>
            <p>
                Le titulaire du BUT spécialité informatique est compétent sur les plans technique et méthodologique tout
                en étant sensibilisé aux problématiques actuelles (sécurité des données,
                <em>cloud computing</em>, intelligence artificielle), sur les questions sociétales, juridiques, éthiques
                et environnementales liées aux usages du numérique.
            </p>
            <p>
                À l'issue d'un tronc commun d'un an, l'étudiant pourra, en fonction de son projet professionnel, choisir
                l'un des quatre parcours proposés par la spécialité informatique.
            </p>
        </>
    ),
} satisfies PageCopy;
