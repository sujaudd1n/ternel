import { create_element } from "../../cdk/create_element.js";
import { Lists } from "../../cdk/uis/lists.js"

class Help_view {
    constructor() {
        this.name = "paragraph";
        this.description = "A paragraph of texts.";
    }

    get_element(title, description, usage, options) {
        const title_element = create_element("h2", [title]);
        const description_element = create_element("p", [description]);
        const usage_element = create_element("p", [usage]);
        const options_element = Lists.get_element(options);
        return create_element("div", [
            title_element,
            description_element,
            usage_element,
            options_element,
        ]);
    }
}

const help_ui = new Help_view();

export { help_ui };
