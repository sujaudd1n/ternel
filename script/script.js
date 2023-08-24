import { Bot, User } from "./utility.js";

import { Wait } from "./commands/wait.js";
import { Settings } from "./commands/settings.js";
import { Message } from "./components/message.js";

const form = document.querySelector(".command__form");
const input = document.querySelector("#command__text");
const history = document.querySelector(".history");

Settings.initialize();

const su = new User("su");
const ternel = new Bot("Ternel");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    manage_command(e);
});

async function manage_command(e) {
    const input_text = input.value;
    input.value = "";

    su.append_node(input_text);

    if (input_text.startsWith(";")) {
        const first_word = input_text.split(" ")[0].slice(1);

        let command;

        try {
            command = ternel.get_command(first_word);
        } catch (e) {
            ternel.append_node(Message.get("Error", e));
            ternel.scroll();
            return;
        }

        const wait_element = Message.get(
            "Please Wait.",
            `Data for ${input_text} is being fetched.`
        );

        const parent_node = ternel.append_node(wait_element);
        ternel.scroll();

        let command_data;
        try {
            command_data = await command.execute(input_text);
        } catch (e) {
            ternel.append_node(Message.get("Error", e));
            ternel.scroll();
            return;
        } finally {
            if (command.component) {
                const element = command.component.get(...command_data);
                ternel.replace_node(parent_node, element);
            }
        }
    }

    ternel.scroll();
}
