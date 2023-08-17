import { create_element } from "./create_element.js";

const description_css_identifier = "lists-element__description";
const title_css_identifier = "lists-element__title";
const list_css_identifier = "lists-element__li";
const list_container_css_identifier = "lists-element__ul";

const Wait = {
    name: "wait",
    description: "Tell the user to wait until the data is being fetched.",

    create_filled_element(
        command,
        title = "Please wait.",
        message = "The data is being fetched."
    ) {
        const title_element = create_element("h2", [title]);
        const message_element = create_element("p", [message]);
        const command_element = create_element("p", ["Command: " + command]);
        const container = create_element("div", [
            title_element,
            message_element,
            "Command: " + command,
        ]);
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

export { Wait };
