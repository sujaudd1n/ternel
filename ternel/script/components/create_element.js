function create_element(element, children = [], attributes = {}) {
    element = document.createElement(element);

    for (let attribute in attributes)
        element.setAttribute(attribute, attributes[attribute]);

    for (let child of children) element.append(child);

    return element;
}

export { create_element };
