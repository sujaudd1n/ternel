import { animateNode } from "./animateNode.js";
import { ALL_COMMANDS } from "./helper.js";
import { create_element } from "./create_element.js";

class User {
    constructor(name, icon_url = null) {
        this.name = name;
        this.icon_url = icon_url;
    }

    /**
     * creates a block and returns it.
     * @returns content div
     */
    create_environment() {
        const block = DOMF.get_history_block();
        document.querySelector(".whitespace").insertAdjacentElement("beforebegin", block[0]);
        const title = block[1].children[0];
        title.textContent = this.name;
        title.style.backgroundImage = `url(${this.icon_url})`;
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
        console.log(node)
        await animateNode.text(container, node);
        //container.append(node);
        return container;
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
            if (command.name === command_name)
                return command;
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


const DOMF = {
    get_history_block() {

        const user = create_element("p", [], {
            class: "history__user",
        });

        const time = create_element("time", [new Date().toLocaleTimeString([], {
            hour: '2-digit', minute: '2-digit'
        })], {
            datetime: new Date().toLocaleTimeString(),
        });

        const history_title = create_element("div", [user, time], {
            class: "history__title",
        });

        const history_content = create_element("div", [], {
            class: "history__content",
        });

        const history_block = create_element(
            "div",
            [history_title, history_content],
            {
                class: "history__block",
            }
        );

        const styles = `
        .history {
            overflow: auto;
        }
        .whitespace
        {
            height: 70px;
        }
        
        .history__block {
            margin: 20px 0;
            padding: 0 10px;
        }
        
        .history__title {
            display: flex;
            justify-content: space-between;
            padding: 10px 0;
            // position: sticky;
            // top: 0;
            // left: 0;
            // right: 0;
            // background-color: var(--bg);
            // height: 40px;
        }
        
        .history__user {
            color: var(--user);
            background-repeat: no-repeat;
            padding-left: 27px;
            background-size: 20px;
            background-position: 0 4px;
        }
        
        .history__content {
            padding: 10px 0;
            max-height: 80dvh;
            overflow: auto;
        }
        `;
        document.head.appendChild(create_element('style', [styles]))

        return [history_block, history_title, history_content];
    },
};

const su = new User("su", "../assets/icons/user.svg");
const ternel = new User("ternel", "../assets/icons/robot.svg");

export { su, ternel };
