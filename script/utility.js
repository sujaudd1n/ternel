import { animateNode } from "./animateNode.js";
import { ALL_COMMANDS } from "./helper.js";
import { create_element } from "./create_element.js";

class User {
    constructor(name) {
        this.name = name;
    }

    /**
     * 
     * @returns content div
     */
    create_environment() {
        const block = DOMF.append_history_block();
        const title = block[1].children[0];
        title.textContent = this.name;
        return block[2];
    }

    async append_node(node) {
        const content_div = this.create_environment();
        if (typeof node === "string") node = document.createTextNode(node);
        await animateNode.text(content_div, node);
        //content.append(node);
        return content_div;
    }

    async replace_node(container, node) {
        container.textContent = "";
        if (typeof node === "string") node = document.createTextNode(node);
        await animateNode.text(container, node);
        //container.append(node);
        return container;
    }

    write_name(target) {
        target.textContent = this.name;
    }

    async write(texts) {
        /*
     texts: an array of texts.
    */
        const content = this.create_environment();
        for (let text of texts) {
            const para = DOMF.get_element("p", [], {
                class: "history__text",
            });
            content.append(para);
            for (let char of text) {
                para.append(char);
                await new Promise((res) => setTimeout(res, 10));
                //mv
            }
        }
    }
    /**
     *
     * @param {string} input_text - entire commmand given by the user.
     * @returns HTMLElement
     */
    async execute_command(input_text) {
        const first_word = input_text.split(" ")[0];
        const command = this.get_command(first_word);
        return await command.execute(input_text);
    }

    /**
     *
     * @param {string} command_name - the name of the command
     * @returns command if available
     * @throws Error if command not found.
     */
    get_command(command_name) {
        for (let command of ALL_COMMANDS) {
            if (command.name === command_name) return command;
        }
        throw new Error(`${command_name}: command not found.`);
    }

    scroll() {
        const history_element = document.querySelector(".history");
        const scroll_amount =
            history_element.scrollHeight - history_element.clientHeight;
        history_element.scroll({
            top: scroll_amount,
            left: 0,
            behavior: "smooth",
        });
    }
}

export { User };

const DOMF = {
    get_element(name = "div", contents = [], attributes = {}) {
        const elm = document.createElement(name);
        for (let attr in attributes) {
            elm.setAttribute(attr, attributes[attr]);
        }
        for (let content of contents) elm.append(content);
        return elm;
    },

    append_history_block() {
        const history_block = this.get_history_block();
        document.querySelector(".history").append(history_block[0]);
        return history_block;
    },

    get_history_block() {

        const user = create_element("p", [], {
            class: "history__user",
        });

        const time = create_element("time", [new Date().toLocaleTimeString()], {
            datetime: new Date().toLocaleTimeString(),
        });

        const history_title = create_element("div", [user, time], {
            class: "history__title",
        });

        const history_content = create_element("div", [], {
            class: "history__content",
        });

        const history_block = create_element("div", [], {
            class: "history__block",
        });

        history_block.append(history_title);
        history_block.append(history_content);

        return [history_block, history_title, history_content];
    },

    history_scroll() {
        const history = document.querySelector(".history");
        const sh = history.scrollHeight;
        history.scroll(0, sh);
    },
};
