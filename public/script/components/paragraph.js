import { create_element } from "./create_element.js";

const p_element_class = "pecl";

class Paragraph_class {
    constructor() {
        this.name = "paragraph";
        this.description = "Elements containing a set of paragraphs";
    }

    get_element(text_array) {
        const p_elements = [];
        for (const text of text_array) {
            const p_element = create_element("p", [], {
                class: p_element_class,
            });
            p_element.textContent = text;
            p_elements.push(p_element);
        }
        const container = create_element("div", p_elements);
        return container;
    }
}

const para_style = new CSSStyleSheet();
para_style.insertRule("p.pecl{color:red !important}");
document.adoptedstyleSheets = [...document.adoptedStyleSheets, para_style];

const Paragraph = new Paragraph_class();

export { Paragraph };
