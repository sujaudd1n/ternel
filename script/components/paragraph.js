import { create_element } from "./create_element.js";

class Paragraph_class {
    constructor() {
        this.name = "paragraph";
        this.description = "A paragraph of texts.";
    }

    get_element(texts) {
        const text_node = document.createTextNode(texts);
        const paragraph = create_element("p", [text_node]);
        return paragraph;
    }
}

const styles = new CSSStyleSheet();

document.adoptedStyleSheets = [styles];

const Paragraph = new Paragraph_class();

export { Paragraph };
