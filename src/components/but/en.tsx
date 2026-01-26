import type { PageCopy } from "./types";

export default {
    skills: {
        realiser: {
            name: 'Create',
            desc: 'Develop — that is, design, code, test and integrate an IT solution for a client.',
        },
        optimiser: {
            name: 'Optimize',
            desc: 'Offer computer applications optimized according to specific criteria: execution time, precision, resource consumption.',
        },
        administrer: {
            name: 'Administer',
            desc: "Install, configure, make available, maintain operational infrastructures, services and networks and optimize an organization's IT system.",
        },
        gerer: {
            name: 'Manage',
            desc: 'Design, manage, administer and exploit company data and make available all the information for good management of the company.',
        },
        conduire: {
            name: 'Lead',
            desc: 'Satisfy user needs with regard to the customer value chain, organize and manage an IT project using traditional or agile methods.',
        },
        collaborer: {
            name: 'Collaborate',
            desc: 'Acquire, develop and exploit the skills necessary to work effectively in an IT team.',
        },
    },
    years: {
        'but-1': {
            label: 'BUT 1',
            title: 'Discovery and practice',
            description: 'Main goal: understand how things work by building them, fast.',
            bilan: 'A hands-on year, focused on doing, where complexity stays visible and manageable.',
            skills: {
                realiser: {
                    ac: [
                        'Implement simple features from an expressed need.',
                        'Translate a problem into elementary algorithms.',
                        'Produce readable, tested, documented code.',
                        'First individual or pair projects.',
                    ],
                },
                optimiser: {
                    ac: [
                        'Analyze straightforward algorithmic solutions.',
                        'Compare performance and complexity.',
                        'Choose reasonable algorithms for a given context.',
                        'First optimization reflexes.',
                    ],
                },
                administrer: {
                    ac: [
                        'Install and configure a workstation.',
                        'Discover operating systems and basic network services.',
                        'Understand client/server roles and network exchanges.',
                        'Apply elementary security practices.',
                    ],
                },
                gerer: {
                    ac: [
                        'Design and create a relational database.',
                        'Write simple SQL queries.',
                        'Use data to answer a functional need.',
                        'Stay aware of data quality and coherence.',
                    ],
                },
                conduire: {
                    ac: [
                        'Collect and formalize user needs.',
                        'Organize teamwork.',
                        'Plan and track simple projects.',
                        'Communicate in writing and orally.',
                    ],
                },

                collaborer: {
                    ac: [
                        'Collaborate inside project groups.',
                        'Use collaborative tools.',
                        'Account for human and organizational constraints.',
                        'Develop a professional posture.',
                    ],
                },
            },
        },
        'but-2': {
            label: 'BUT 2',
            title: 'Structure and professional framing',
            description:
                'Specialization year: I chose track C (data administration and exploitation). The goal shifts to making practice legible in a company context.',
            bilan: 'This year adds vocabulary, methods, and framing to what used to be intuitive.',
            skills: {
                realiser: {
                    ac: [
                        'Develop applications backed by a database.',
                        'Interact with a DBMS from application code.',
                        'Respect a simple software architecture.',
                        'Perform functional tests and validate results.',
                    ],
                },
                optimiser: {
                    ac: [
                        'Optimize SQL queries.',
                        'Improve data-related application performance.',
                        'Choose data structures that fit the need.',
                        'Start measuring performance.',
                    ],
                },
                administrer: {
                    ac: [
                        'Implement advanced network services.',
                        'Secure exchanges and access.',
                        'Understand more complex network architectures.',
                        'Integrate systems into existing environments.',
                    ],
                },

                gerer: {
                    ac: [
                        'Develop data-oriented applications.',
                        'Analyze and visualize datasets.',
                        'Use advanced analysis tools.',
                        'Factor in volume and data quality.',
                    ],
                },
                conduire: {
                    ac: [
                        'Manage more complex technical projects.',
                        'Coordinate tasks and deliverables.',
                        'Work with stakeholders.',
                        'Consider time and quality constraints.',
                    ],
                },
                collaborer: {
                    ac: [
                        'Work in multidisciplinary teams.',
                        'Structure technical communication.',
                        'Integrate into a professional context.',
                        'Grow autonomy.',
                    ],
                },
            },
        },
        'but-3': {
            label: 'BUT 3',
            title: 'Scale and coordination',
            description: 'Main goal: think in systems rather than isolated elements.',
            bilan: 'The focus moves from “make it work” to “make it durable, coordinated, and maintainable.”',
            skills: {
                // 'realiser': {
                //     ac: [
                //         'Develop decision-support applications.',
                //         'Integrate internal and external data.',
                //         'Use data-oriented web technologies.',
                //         'Keep solutions maintainable and evolutive.',
                //     ],
                // },
                // 'optimiser': {
                //     ac: [
                //         'Work with large datasets.',
                //         'Apply advanced optimization techniques.',
                //         'Support decisions through data analysis.',
                //         'Evaluate the relevance of proposed solutions.',
                //     ],
                // },
                // 'administrer': {
                //     ac: [
                //         'Organize, secure, and protect data.',
                //         'Perform advanced database administration.',
                //         'Manage access, permissions, and compliance.',
                //         'Integrate into complex environments.',
                //     ],
                // },
                gerer: {
                    ac: [
                        'Design decision systems.',
                        'Use AI and statistics techniques.',
                        'Handle data governance topics.',
                        'Create strategic value from information.',
                    ],
                },
                conduire: {
                    ac: [
                        'Lead data-oriented projects.',
                        'Make argued technical decisions.',
                        'Manage risks and constraints.',
                        'Produce professional deliverables.',
                    ],
                },
                collaborer: {
                    ac: [
                        'Fully integrate into a professional team.',
                        'Communicate with technical and non-technical peers.',
                        'Adopt a junior expert posture on data topics.',
                        'Act with autonomy and responsibility.',
                    ],
                },
            },
        },
    },
    yearTabsLabel: 'Year progression',
    synthesisHeading: 'Global summary',
    yearLabel: 'Year',
    logoAlt: 'BUT Computer Science logo',
    heading: (
        <>
            <abbr title="Bachelor Universitaire Technologique">BUT</abbr> Computer Science
        </>
    ),
    linkTextSyllabus: 'Officiel BUT Computer Science syllabus',
    skillsAbstract:
        'The BUT Computer Science program is not limited to learning technologies. It proposes an implicit progression of posture, from individual practice to understanding broader technical and human systems.',
    skill: (i, name) => (
        <>
            Skill {i}: {name}
        </>
    ),
    iutAlt: "Entrée de l'IUT de Lannion",
    iutCaption: (
        <>
            The IUT of Lannion (<em>Côtes d'Armor</em>, France). This is where I am doing my BUT in Computer Science.
        </>
    ),
    presentation: (
        <>
            <p>
                Designing, creating and implementing IT solutions that meet the digital transformation needs of
                companies is the daily life of the holder of the BUT in IT, regardless of the sector in which their
                company works.
            </p>
            <p>
                In three years after the baccalaureate, the BUT offers university training that combines theory and
                practice, with an emphasis on progressive professionalization for rapid integration, while guaranteeing
                a sufficient scientific level to allow those who wish to continue their studies.
            </p>
            <p>
                The holder of the BUT specializing in IT is competent on technical and methodological levels while being
                aware of current issues (data security, <em>cloud computing</em>, artificial intelligence), on societal,
                legal, ethical and environmental issues related to the uses of digital technology.
            </p>
            <p>
                At the end of a one-year common core, the student will be able, depending on their professional project,
                to choose one of the four paths offered by the IT specialization.
            </p>
        </>
    ),
} satisfies PageCopy;
