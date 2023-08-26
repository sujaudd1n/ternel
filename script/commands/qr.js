import { Image } from "../components/image.js";

class QR_class {
    constructor() {
        this.name = "qr";
        this.descriptions = "Generate QR code from texts.";
        this.component = Image;
    }

    async execute() {}

    /**
     * Fetches qr of text.
     * @param text the text to convert into qr
     * @returns binary png image data of the text
     */
    async request_data(text) {}

    /**
     *
     * @param {string} input_text command text given by user.
     * @returns {string} the text that will be converted into qr
     */
    filter_input_data(input_text) {}

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
