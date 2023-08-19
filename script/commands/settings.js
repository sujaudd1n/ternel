import { Change_theme } from "./change_theme.js";
import { Message } from "../components/message.js";

const Settings = {
    name: "set",
    available_settings: [Change_theme],
    component: Message,

    initialize() {
        if (!localStorage.getItem("theme"))
            localStorage.setItem("theme", "dark");
        Change_theme.execute(localStorage.getItem("theme"));
    },
    execute(command) {
        const [key, value] = this.filter_input_text(command);

        for (const c of this.available_settings) {
            if (c.name === key) {
                return this.available_settings[
                    this.available_settings.indexOf(c)
                ].execute(value);
            }
        }
    },

    filter_input_text(text) {
        const arguements_list = text.split(" ");
        if (arguements_list.length != 3)
            throw new Error("Wrong number of arguments.");
        return [arguements_list[1], arguements_list[2]];
    },
};

export { Settings };
