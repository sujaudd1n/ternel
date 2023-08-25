import { Image } from "../components/image.js";

class Meme_class {
    constructor() {
        this.name = "meme";
        this.description = "Fetch a meme.";
        this.component = Image;
    }

    async execute() {
        const image_url = await this.request_data();
        return [image_url];
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
        const help_text = this.description;
        return help_text;
    }
}

const Meme = new Meme_class();

export { Meme };
