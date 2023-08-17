import { create_element } from "./create_element.js";

const E404 = {
    name: "e404",
    description: "Tell the user that certain command is not available",

    create_filled_element(command, message = `Command ${command} not found.`) {
        const title_element = create_element("h2", ["Error 404"]);
        const message_element = create_element("p", [message]);
        const container = create_element("div", [
            title_element,
            message_element,
        ]);
        return container;
    },
};

const styles = new CSSStyleSheet();

document.adoptedStyleSheets = [styles];

export { E404 };
