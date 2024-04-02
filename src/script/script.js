import { su, ternel } from "./utility.js";

import { settings } from "../commands/setting/main.js";
import { ternel_intro } from "../commands/intro/index.js";
import { message } from "../commands/message/main.js";


const form = document.querySelector(".command__form");
const input_widget = document.querySelector("#command__text");
const history = document.querySelector(".history");


settings.initialize();


for (let i = 0; i < 5; ++i)
    ternel.append_node(ternel_intro.execute())

ternel.append_node(
    message.execute(
        "This is a message box.",
        "Title",
    )
)

Object.assign(globalThis, { ternel });


form.addEventListener("submit", (e) => {
    e.preventDefault();
    manage_command(e);
});

async function manage_command(e) {
    const input_text = input_widget.value.trim();
    input_widget.value = "";
    input_widget.blur(); // required to remove keyboard after form submit in phones.

    su.append_node(input_text);

    if (true) { // later it can be used to prefix a command.
        const wait_element = message.execute(
            `Data for ${input_text} is being fetched.`,
            "Please Wait.",
        );

        const parent_node = await ternel.append_node(wait_element);
        ternel.scroll();

        let command_output_element;
        try {
            command_output_element = await ternel.execute_command(input_text);
        } catch (e) {
            command_output_element = message.execute(e.toString(), "Error", "error")
        }
        finally {
            await ternel.replace_node(parent_node, command_output_element);
        }
    }

    ternel.scroll();
}


document.addEventListener("keydown", (e) => {
    if (document.activeElement !== input_widget) {
        if (e.key === "/") {
            e.preventDefault();
            input_widget.focus();
        }
    }
});
