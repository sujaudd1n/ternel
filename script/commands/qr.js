import { Image } from "../components/image.js";

class QR_class {
    constructor() {
        this.name = "qr";
        this.descriptions = "Generate QR code from texts.";
        this.component = Image;
    }

    async execute(input_text) {
        const query = this.filter_input_data(input_text);
        const qr_image_url = await this.request_data(query);

        return [qr_image_url];
    }

    /**
     * Fetches qr of text.
     * @param text the text to convert into qr
     * @returns url of qr image.
     */
    async request_data(text) {
        const ENDPOINT = "https://api.qrserver.com/v1/create-qr-code/?";
        // key -> size, data
        const url = ENDPOINT + `data=${text}`;
        const res = await fetch(url);
        const data = await res.blob();
        const image_url = URL.createObjectURL(data);
        return image_url;
    }

    /**
     *
     * @param {string} input_text command text given by user.
     * @returns {string} the text that will be converted into qr
     */
    filter_input_data(input_text) {
        const splitted_text = input_text.split(" ");
        if (splitted_text.length < 2)
            throw new Error("Wrong number of arugments.");
        return splitted_text.slice(1).toString().replaceAll(",", " ");
    }

    /**
     *
     * @returns {string} a help text for user.
     */
    help() {
        return this.descriptions;
    }
}

const QR = new QR_class();

export { QR };
