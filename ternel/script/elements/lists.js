const get_element = require("./create_element");

const Lists = {
    description: "An element with a title, descripion and lists.",

    f(title, descripion, list_items) {
        const list_elements = [];
        for (let list of list_items) {
            list_elements.push(get_element(li, {}, list));
        }

        const container = get_element("div", {}, list_elements);
        return container;
    },
};
