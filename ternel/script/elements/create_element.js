function get_element(element, attributes={}, children=[])
{
    element = document.createElement(element);

    for (let attribute in attributes)
        element.setAttribute(attribute, attributes[attribute]);

    for (let child of children)
        element.append(child);

    return element;
}

module.exports = get_element;