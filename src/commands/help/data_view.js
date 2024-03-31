import { create_element } from "../../cdk/create_element.js";

const pass_description = "pass__description";
const pass_title = "pass__title";
const pass_list = "pass__li";
const pass_list_container = "pass__ul";

const Title_lists = {
    name: "lists",
    description: "An element with a title, descripion and lists.",

    get_element(command, list_items, title = "Password Generator") {
        const list_elements = [];

        for (let list of list_items) {
            list_elements.push(
                create_element("li", [list], {
                    class: `${pass_list}`,
                })
            );
        }

        const title_element = create_element("h2", [title], {
            class: `${pass_title}`,
        });

        const description__element = create_element(
            "p",
            ["Command: ", create_element("span", [command], { class: "info" })],
            {
                class: `${pass_description}`,
            }
        );

        const ul = create_element("ul", list_elements, {
            class: `${pass_list_container}`,
        });

        const container = create_element(
            "div",
            [title_element, description__element, ul],
            {
                class: "pass",
            }
        );
        return container;
    },
};

const password_data_view_style = new CSSStyleSheet();
password_data_view_style.insertRule(`.info { color : yellow}`);
password_data_view_style.insertRule(`.${pass_title} { margin-bottom : 8px}`);
password_data_view_style.insertRule(`.${pass_description} { margin-bottom : 15px}`);

document.adoptedStyleSheets = [
    ...document.adoptedStyleSheets,
    password_data_view_style,
];
export { Title_lists };
