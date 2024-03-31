import { create_element } from "../../cdk/create_element.js"


const Message_UI = {
    name: "message",
    description: "A message with a title.",

    get_element(text, type = "normal", title = null) {
        const container = create_element("div", [
        ], {
            class: `ternel-app-message-container ternel-app-message-container--${type}`
        });

        if (title)
            container.appendChild(create_element("h2", [title]));

        container.appendChild(create_element("p", [text]))

        return container;
    },
};

const style_rules = `
.ternel-app-message-container 
{
    padding: 5px;
    display: flex;
    flex-flow: column wrap;
    gap: 10px;

    border-radius: 5px;
}

.ternel-app-message-container--info
{
    background: #ffff0011;
    border: 1px solid #ffff00;
    color: white;
}

.ternel-app-message-container--success
{
    background: #00ff0011;
    border: 1px solid #00ff00;
    color: white;
}

.ternel-app-message-container--error
{
    background: #ff000011;
    border: 1px solid #ff0000;
    color: white;
}

`

const style = create_element("style", [style_rules])
document.head.appendChild(style)

const message_ui = Message_UI

export { message_ui };