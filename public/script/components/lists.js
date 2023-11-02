import { create_element } from "./create_element.js";

const description_css_identifier = "lists-element__description";
const title_css_identifier = "lists-element__title";
const list_css_identifier = "lists-element__li";
const list_container_css_identifier = "lists-element__ul";

const Lists = {
    name: "lists",
    description: "Unordered lists.",

    /**
     * @method
     * @param {Array} list_items
     * @returns HTMLElement
     */
    get_element(list_items) {
        const list_elements = [];

        for (let item of list_items) {
            list_elements.push(
                create_element("li", item, { class: `${list_css_identifier}` })
            );
        }
        const ul = create_element("ul", list_elements, {
            class: `${list_container_css_identifier}`,
        });

        const container = create_element("div", [ul], {
            class: "lists-container",
        });
        return container;
    },
};

const styles2 = new CSSStyleSheet();

/*
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
*/
styles2.insertRule(
    `

.${list_css_identifier}
{
    margin-bottom: 10px;
}
`
);

document.adoptedstyleSheets = [...document.adoptedStyleSheets, styles2];

export { Lists };
