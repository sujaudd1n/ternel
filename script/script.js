import { Bot, User } from "./utility.js";

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

document.addEventListener("keydown", (e) => {
    if (e.key === "/") {
        e.preventDefault();
        input.focus();
    }
});

async function manage_command(e) {
    const input_text = input.value;
    input.value = "";

    su.append_node(input_text);

    if (input_text.startsWith(";")) {
        const wait_element = Message.get(
            "Please Wait.",
            `Data for ${input_text} is being fetched.`
        );
        const parent_node = await ternel.append_node(wait_element);
        ternel.scroll();

        let command_info;
        try {
            command_info = await ternel.manage_command(input_text);
        } catch (e) {
            await ternel.append_node(Message.get("Error", e));
            return;
        } finally {
            console.log(command_info)
            if (command_info["component"]) {
                const element = command_info["component"].get(
                    ...command_info["data"]
                );
                await ternel.replace_node(parent_node, element);
            }
        }
    }

    ternel.scroll();
}
