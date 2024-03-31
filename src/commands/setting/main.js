import { message_ui } from "./ui.js"

const Change_theme = {
    name: "ct",
    description: "Change theme of ternel.",
    ui: message_ui,
    help_ui: message_ui,

    themes: ["dark", "light", "red", "blue", "green"],

    execute(theme) {
        if (!this.themes.includes(theme))
            throw new Error(`Theme ${theme} not found.`);
        localStorage.setItem("theme", theme);
        document.body.classList = localStorage.getItem("theme");
        return this.ui.get_element("Success")
    },
    help(subcommand = "") {
        return {
            data: ["Change theme", this.description],
            ui: this.help_ui,
        };
    },
};

const SUBCOMMANDS = [Change_theme];

const Settings = {
    name: "set",
    description: "Settings for ternel.",
    available_settings: [Change_theme],
    ui: message_ui,

    initialize() {
        if (!localStorage.getItem("theme"))
            localStorage.setItem("theme", "dark");
        Change_theme.execute(localStorage.getItem("theme"));
        // document.querySelector(".dfdt").textContent = new Date().toLocaleTimeString();
    },

    execute(command) {
        const [key, value] = this.filter_input_text(command);
        console.log(key, value,'in settings')

        for (const c of this.available_settings) {
            if (c.name === key) {
            console.log('in settings')
                return this.available_settings[
                    this.available_settings.indexOf(c)
                ].execute(value);
            }
        }
        throw new Error("subcommand not found.")
    },

    filter_input_text(text) {
        console.log(text)
        const arguements_list = text.split(" ");
        if (arguements_list.length != 3)
            throw new Error("Wrong number of arguments.");
        return [arguements_list[1], arguements_list[2]];
    },

    help(subcommand = "") {
        if (subcommand) {
            const sub_name = subcommand.split(" ")[0];
            for (const sub of SUBCOMMANDS) {
                if (sub_name === sub.name) {
                    return sub.help();
                }
            }
            throw new Error("Subcommand is not found.");
        }
        return {
            data: ["Settings", this.description],
            ui: this.ui,
        };
    },
};

const settings = Settings;
export { settings };