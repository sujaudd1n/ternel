import { create_element } from "./create_element.js";

/**
 * Class reprenting introduction of Ternel
 */
class Intro {
    constructor() {
        this.name = "intro";
        this.description = "Introduction of Ternel.";
    }
    /**
     * Manages help text (user guide) for a command. if subcommand exists,
     * control is passed to the help function of subcommand.
     *
     * @param {string} subcommand name of sub commmand.
     * @throws Throws an error if subcommand is not found.
     * @returns HTMLElement
     *
     */
    help(subcommand = "") {
        return create_element("p", [this.description]);
    }

    /**
     * It does all the things that need to done and returns HTMLElement
     *
     * @param {string} command given by the user including <command_name>
     * example - help pass
     * @returns HTMLElement
     *
     */
    execute(command) {
        const container = create_element(
            "div",
            [
                create_element(
                    "p",
                    [
                        "A terminal like interface to fetch many kinds of information such as IP information, password generation, qr etc.",
                    ],
                    { class: "intro__desc1" }
                ),
                create_element("p", [
                    "Please type ",
                    create_element("span", ["help"], { class: "ternel-info" }),
                    " to see available commands.",
                ]),
                create_element("p", [
                    "For more information visit ",
                    create_element("a", ["Ternel docs"], {
                        href: "https://ternel-docs.netlify.app",
                        target: "_blank",
                    }),
                ]),
            ],
            { class: "ternel-intro-card" }
        );
        return container;
    }
}

const ternel_intro_style = new CSSStyleSheet();
ternel_intro_style.insertRule(`
.ternel-intro-card {
    display: flex;
    flex-flow: column;
    gap: 10px;
}
`);
console.log(ternel_intro_style);
document.adoptedStyleSheets = [
    ...document.adoptedStyleSheets,
    ternel_intro_style,
];

const ternel_intro = new Intro();
export { ternel_intro };
