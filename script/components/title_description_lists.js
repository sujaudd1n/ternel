import { create_element } from "./create_element.js";

const description_css_identifier = "lists-element__description";
const title_css_identifier = "lists-element__title";
const list_css_identifier = "lists-element__li";
const list_container_css_identifier = "lists-element__ul";

const Title_lists = {
    name: "lists",
    description: "An element with a title, descripion and lists.",

    get(title, descripion, list_items) {
        const list_elements = [];
        for (let list of list_items) {
            list_elements.push(
                create_element("li", list, { class: `${list_css_identifier}` })
            );
        }
        const title_element = create_element("h2", [title], {
            class: `${title_css_identifier}`,
        });
        const description__element = create_element("p", [descripion], {
            class: `${description_css_identifier}`,
        });
        const ul = create_element("ul", list_elements, {
            class: `${list_container_css_identifier}`,
        });

        const container = create_element(
            "div",
            [title_element, description__element, ul],
            {
                class: "lists-container",
            }
        );
        return container;
    },
};

const styles = new CSSStyleSheet();

styles.insertRule(
    `
.${description_css_identifier}
{
    margin-bottom: 20px;
}
`
);
styles.insertRule(
    `
.${title_css_identifier}
{
    margin-bottom: 20px;
}
`
);
styles.insertRule(
    `

.${list_css_identifier}
{
    margin-bottom: 10px;
}
`
);

document.adoptedStyleSheets = [styles];

export { Title_lists };
