import { create_element } from "../../cdk/create_element.js";

class Image_class {
    constructor() {
        this.name = "Image";
        this.description = "Render an image.";
    }

    get_element(image_url) {
        const image_element = create_element("img", [], { src: image_url });
        return image_element;
    }
}

const Image = new Image_class();

export { Image };
