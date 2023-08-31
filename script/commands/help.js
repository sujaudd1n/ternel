import { Lists } from "../components/lists.js";
import { ALL_COMMANDS } from "./helper.js";

/**
 * Provides help for the user.
 * Examples:
 * - ;help
 * - ;help wiki
 * - ;help set ct
 */
class Help_class {
    constructor() {
        this.name = "help";
        this.description = "Help for the user.";
        this.component = Lists;
    }

    async execute(input_text) {
        const words_list = input_text.split(" ");
        if (words_list.length === 1) return this.get_all_general_help_text();
        else {
            const command_name = words_list[1];
            for (const command of ALL_COMMANDS) {
                if (command.name === command_name)
                    return command.help();
            }
        }
    }
    get_all_general_help_text() {
        let help_text_list = [];
        for (const command of ALL_COMMANDS) {
            help_text_list.push(";" + command.name + " - " + command.help());
        }
        return ["Help", "Usage guide.", help_text_list];
    }

    help(sub_command = "") {
        const description = "Help is the command for user guide on how to use \
        a paricular command."
        return ["Help", description, [this.description]];
    }
}

const Help = new Help_class();
export { Help };
