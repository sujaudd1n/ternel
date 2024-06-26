import { Title_lists } from "./data_view.js";
import { Message } from "./message.js";
import { ALL_COMMANDS } from "../../script/helper.js";

/**
 * Representing help command.
 */
class Help_class {
    constructor() {
        this.name = "help";
        this.description = "Help for the user.";
        this.ui = Title_lists;
        this.help_ui = Message;
    }

    async execute(input_text) {
        const words_list = input_text.split(" ");
        if (words_list.length === 1) return this.get_all_general_help_text();
        else {
            const command_name = words_list[1];
            const subcommand_name = words_list.slice(2).join(" ");
            console.log(subcommand_name);
            for (const command of ALL_COMMANDS) {
                if (command.name === command_name)
                    return command.help(subcommand_name);
            }
            throw new Error("Command not found.");
        }
    }

    get_all_general_help_text() {
        let help_text_list = [];
        for (const command of ALL_COMMANDS) {
            help_text_list.push(
                document.createTextNode(
                    command.name + " - " + command.description
                )
            );
        }
        return this.ui.get_element(
            "Help",
            help_text_list,
            "Usage guide."
        );
    }

    help(sub_command = "") {
        const description =
            "Help is the command for user guide on how to use \
        a paricular command.";
        return {
            data: ["Help", description],
            ui: this.help_ui,
        };
    }
}

const Help = new Help_class();
export { Help };
