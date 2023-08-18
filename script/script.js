import { Password } from "./commands/password.js";
import { Bot, User, Setting } from "./utility.js";

import { Wait } from "./commands/wait.js";
import { E404 } from "./commands/e404.js";

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

    if (input_text.startsWith(";")) {
        const first_word = input_text.split(" ")[1];
        console.log(first_word);
        const command = ternel.get_command(input_text);
        const wait_data = Wait.execute(input_text);
        const wait_element = Wait.component.get(wait_data[0], wait_data[1]);
        const appended_node = ternel.append_node(wait_element);
        const command_data = await command.execute(input_text);
        const element = command.component.get(
            command.name,
            command.description + ": " + input_text,
            command_data
        );
        console.log(element);
        ternel.replace_node(appended_node, element);
    }

    ternel.scroll();
    input.value = "";
};
