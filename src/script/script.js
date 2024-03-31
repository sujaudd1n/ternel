import { su, ternel } from "./utility.js";

import { Settings } from "../commands/setting/settings.js";
import { ternel_intro } from "../commands/intro/index.js";
import { message } from "../commands/message/main.js";


const form = document.querySelector(".command__form");
const input_widget = document.querySelector("#command__text");
const history = document.querySelector(".history");


Settings.initialize();


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

    if (true) {
        const wait_element = message.execute(
            `Data for ${input_text} is being fetched.`,
            "Please Wait.",
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
                message.execute(e, "Error 404", "error")
            );
        }
    }

    ternel.scroll();
}


document.addEventListener("keydown", (e) => {
    if (e.key === "/" && document.activeElement !== input_widget) {
        e.preventDefault();
        input_widget.focus();
    }
});
