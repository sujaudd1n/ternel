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

form.onsubmit = async (e) => {
    e.preventDefault();

    const input_text = input.value;
    su.append_node(input_text);

    if (input_text.startsWith(";")) {
        const first_word = input_text.split(" ")[0].slice(1);

        const command = ternel.get_command(first_word);

        const wait_data = Wait.execute(input_text);
        const wait_element = Wait.component.get(...wait_data);

        const parent_node = ternel.append_node(wait_element);

        let command_data;
        try {
            command_data = await command.execute(input_text);
        } catch (e) {
            ternel.append_node(Message.get("Error", e));
        } finally {
            if (command.component) {
                const element = command.component.get(...command_data);
                ternel.replace_node(parent_node, element);
            }
        }
    }

    ternel.scroll();
    input.value = "";
};
