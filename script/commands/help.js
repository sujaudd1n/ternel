import { Lists } from "../components/lists.js";
import { ALL_COMMANDS } from "./helper.js";

/**
 * Provides help for the user.
 * Examples:
 * - ;help
 * - ;help wiki
 * - ;help set ct
 */
const Help = {
    name: "help",
    description: "Help for the user.",
    component: Lists,

    async execute() {
        let help_text_list = [];
        for (const command of ALL_COMMANDS) {
            help_text_list.push(";" + command.name + ' - ' + command.help());
        }
        return ["Help", "Usage guide.", help_text_list];
    },

    help() {
        return this.description;
    },
};

export { Help };
