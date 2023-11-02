import { create_element } from "../../cdk/create_element.js"


const Message = {
    name: "message",
    description: "A message with a title.",

    get_element(title, message) {
        const title_element = create_element("h2", [title]);
        const message_element = create_element("p", [message]);
        const container = create_element("div", [
            title_element,
            message_element,
        ]);
        return container;
    },
};

export { Message };
