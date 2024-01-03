import { User } from "./utility.js";

import { Settings } from "../commands/setting/settings.js";
import { ternel_intro } from "../commands/intro/index.js";
import { Message } from "../components/message.js";

const form = document.querySelector(".command__form");
const input_widget = document.querySelector("#command__text");
const history = document.querySelector(".history");

Settings.initialize();

const su = new User("su");
const ternel = new User("Ternel");

/*
ternel.append_node(
    Message.get_element(
        "Hello.",
        "I'm ternel. Please type <code class='ternel-command-name'>help</code> to see available commands."
    )
);
*/
ternel.append_node(ternel_intro.execute())
Object.assign(globalThis, { ternel });

async function manage_command(e) {
    const input_text = input_widget.value.trim();
    input_widget.value = "";
    input_widget.blur();
    console.log(input_text);

    su.append_node(input_text);

    if (true) {
        const wait_element = Message.get_element(
            "Please Wait.",
            `Data for ${input_text} is being fetched.`
        );

        const parent_node = await ternel.append_node(wait_element);
        ternel.scroll();

        let command_info;
        try {
            command_info = await ternel.execute_command(input_text);
            await ternel.replace_node(parent_node, command_info);
        } catch (e) {
            e.name = "command_not_found_error";
            await ternel.replace_node(
                parent_node,
                Message.get_element("Error 404", e)
            );
        }
    }

    ternel.scroll();
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    manage_command(e);
});

document.addEventListener("keydown", (e) => {
    if (e.key === "/" && document.activeElement !== input_widget) {
        e.preventDefault();
        input_widget.focus();
    }
});
