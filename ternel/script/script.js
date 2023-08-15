import { Password } from "./commands/password.js";
import { Bot, User, Setting } from "./utility.js";

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
    const command_data = await command.manage(input_text);
    const element = command.render_element.create_filled_element(
        command.name,
        command.description,
        command_data
    );
    console.log(element);
    ternel.append_node(element);

    input.value = "";
};
