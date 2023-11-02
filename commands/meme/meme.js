import { Image } from "../components/image.js";
import { Title_lists } from "../password/data_view.js";

class Meme_class {
    constructor() {
        this.name = "meme";
        this.description = "Fetch a meme.";
        this.component = Image;
        this.help_component = Title_lists
    }

    async execute() {
        const image_url = await this.request_data();
        return { data: [image_url], component: this.component };
    }

    /**
     *
     * @returns url of an image
     */
    async request_data(topic) {
        const res = await fetch("https://meme-api.com/gimme");
        const data = await res.json();
        return data["url"];
    }

    help() {
        return {
            data: ["meme", this.description, [";meme"]],
            component: this.help_component,
        };
    }
}

const Meme = new Meme_class();

export { Meme };
