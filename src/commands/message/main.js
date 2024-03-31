import { message_ui } from "./ui.js";

/**
 * Class reprenting a message.
 */
class Message {
    constructor() {
        this.name = "message";
        this.description = "Show simple messages.";
        this.ui = message_ui;
        this.help_ui = message_ui;
    }

    execute(text, title = null, type = "normal") {
        return this.ui.get_element(text, type, title);
    }

    help(subcommand = "") { }
}

const message = new Message();

export { message }