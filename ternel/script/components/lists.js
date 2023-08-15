import { create_element } from "./create_element.js";

const Lists = {
    description: "An element with a title, descripion and lists.",

    create_filled_element(title, descripion, list_items) {
        const list_elements = [];
        for (let list of list_items) {
            list_elements.push(create_element("li", list));
        }
        const ti = create_element("h2", [title]);
        const desc = create_element("p", [descripion]);
        const ul = create_element("ul", list_elements);

        const con = create_element("div", [ti, desc, ul]);
        return con;
    },
};

export { Lists };
