import { create_element } from "./create_element.js";
import { Lists } from "./lists.js";

class Password_help_class {
    constructor() {
        this.name = "paragraph";
        this.description = "A paragraph of texts.";
    }

    get(title, description, usage, options) {
        const title_element = create_element("h2", [title]);
        const description_element = create_element("p", [description]);
        const usage_element = create_element("p", [usage]);
        const options_element = Lists.get(options);
        return create_element("div", [
            title_element,
            description_element,
            usage_element,
            options_element,
        ]);
    }
}

const styles = new CSSStyleSheet();

document.adoptedStyleSheets = [styles];

const Password_help = new Password_help_class();

export { Password_help };
