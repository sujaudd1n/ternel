import { Bot, User } from "./utility.js";

import { Settings } from "./commands/settings.js";
import { Message } from "./components/message.js";

const form = document.querySelector(".command__form");
const input = document.querySelector("#command__text");
const history = document.querySelector(".history");

Settings.initialize();

const su = new User("su");
const ternel = new Bot("Ternel");
ternel.append_node(
    Message.get_element("Hello", "I'm ternel. How can I help you?")
);
Object.assign(globalThis, { ternel });

form.addEventListener("submit", (e) => {
    e.preventDefault();
    manage_command(e);
});

document.addEventListener("keydown", (e) => {
    if (e.key === "/" && document.activeElement !== input) {
        e.preventDefault();
        input.focus();
    }
});

async function manage_command(e) {
    const input_text = input.value.trim();
    input.value = "";
    input.blur();
    console.log(input_text);

    su.append_node(input_text);

    if (input_text.startsWith(";")) {
        const wait_element = Message.get_element(
            "Please Wait.",
            `Data for ${input_text} is being fetched.`
        );
        const parent_node = await ternel.append_node(wait_element);
        ternel.scroll();

        let command_info;
        try {
            command_info = await ternel.execute_command(input_text);
        } catch (e) {
            await ternel.append_node(Message.get_element("Error", e));
            return;
        }
        console.log(command_info);
        if (command_info["component"]) {
            console.log(command_info);
            const element = command_info["component"].get_element(
                ...command_info["data"]
            );
            await ternel.replace_node(parent_node, element);
        }
    }

    ternel.scroll();
}
