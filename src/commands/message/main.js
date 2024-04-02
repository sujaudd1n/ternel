import { message_ui } from "./ui.js";
import { help_ui } from "./help_ui.js";
import { arg } from "./arg.js";

/**
 * Class reprenting a message.
 */
class Message {
    constructor() {
        this.name = "message";
        this.description = "Show simple messages.";
        this.ui = message_ui;
        this.help_ui = help_ui;
    }

    execute(text, title=null, type="normal") {
        return this.ui.get_element(text, type, title);
        /*
        const args = arg(command_text, {
            "--text": String,
            "--title": String,
            "--type": String,
        })
        console.log(args)
        return this.get_element(args["--text"], args["--title"], args["--type"])
        */
    }
    get_element(text, title, type) {
        return this.ui.get_element(text, type, title);
    }

    help(subcommand = "") {
        const usage = "message --text 'Today is really hot' --title Weather --type info";
        const options = [
            "-text {String} specifies paragraph.",
            "-title {String} specifies title.",
            "-type {String} specifies type - success, error, info.",
        ];
        return this.help_ui.get_element(
            this.name,
            this.description,
            usage,
            options
        );
    }
}

const message = new Message();

export { message }