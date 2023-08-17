import { Password } from "./commands/password.js";
import { Bot, User, Setting } from "./utility.js";

import { Wait } from "./components/wait.js";
import { E404 } from "./components/E404.js";

const form = document.querySelector(".command__form");
const input = document.querySelector("#command__text");
const history = document.querySelector(".history");

Setting.initialize();
console.log(Password);

const su = new User("su");
const ternel = new Bot("Ternel");

form.onsubmit = async (e) => {
    e.preventDefault();

    const input_text = input.value;
    su.append_node(input_text);

    const command = ternel.get_command(input_text);
    if (command) {
        const wait_element = Wait.create_filled_element(input_text);
        const appended_node = ternel.append_node(wait_element);
        const command_data = await command.manage(input_text);
        const element = command.render_element.create_filled_element(
            command.name,
            command.description + ": " + input_text,
            command_data
        );
        console.log(element);
        ternel.replace_node(appended_node, element);
        ternel.scroll();
    } else if (input_text.startsWith(";"))
        ternel.append_node(E404.create_filled_element(input_text));
    input.value = "";
};
