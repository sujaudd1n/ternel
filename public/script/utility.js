import { animateNode } from "./animateNode.js";
import { ALL_COMMANDS } from "./helper.js";

const invoke = window.__TAURI__.invoke;

class User {
    constructor(name) {
        this.name = name;
    }

    create_environment() {
        const block = DOMF.append_history_block();
        const title = block[1].children[0];
        this.write_name(title);
        return block[2];
    }

    async append_node(node) {
        const content = this.create_environment();
        if (typeof node === "string") node = document.createTextNode(node);
        await animateNode.text(content, node);
        //content.append(node);
        return content;
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
}

class Bot extends User {
    /**
     *
     * @param {string} input_text - commmand given by the user.
     * @returns {data: data, component: component}
     */
    async execute_command(input_text) {
        const first_word = input_text.split(" ")[0];

        const command_array = input_text.slice(1).split(" ");
        const d = await invoke("sh_execute", { c: input_text });
        const pre = document.createElement("pre");
        pre.textContent = d;
        console.log(pre);
        return pre;

        const command = this.get_command(first_word);
        const command_info = await command.execute(input_text);
        return command_info;
    }
    /**
     *
     * @param {string} text
     * @returns command
     * @throws Error if command not found.
     */
    get_command(command_name) {
        for (let command of ALL_COMMANDS) {
            if (command.name === command_name) return command;
        }
        throw new Error("Command not found.");
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

export { Bot, User };

/*







  async only_write(text, target) {
    if (typeof text === "string")
      for (let char of text) {
        target.append(char);
          await new Promise(res => setTimeout(res, 10));
          //mv
      }
  }

  cp(text) {
    const splitted_text = text.split(" ");
    const url = "https://kontests.net/api/v1/" + splitted_text[1];
    fetch(url)
      .then((r) => r.json())
      .then(async (r) => {
        const content = this.create_environment();
        for (let key of r) {
          for (let k in key) {
            const para = DOMF.get_element("p");
            content.append(para);
            await this.only_write(k + ": " + key[k], para);
          }
        }
      });
  }

  zip(text) {
    const splitted_text = text.split(" ");
    fetch("https://api.zippopotam.us/" + splitted_text[1])
      .then((r) => r.json())
      .then(async (r) => {
        const content = this.create_environment();
        for (let item of r["places"]) {
          for (let key in item) {
            const para = DOMF.get_element("p");
            content.append(para);
            await this.only_write(key + ": " + item[key], para);
          }
        }
      });
  }
  pic(text) {
    const splitted_text = text.split(" ");
    const width = splitted_text[1];
    const height = splitted_text[2];
    fetch(`https://picsum.photos/${width}/${height}`)
      .then((res) => res["url"])
      .then((data) => {
        const content = this.create_environment();
        const img = DOMF.get_element("img", [], {
          src: data,
        });
        content.append(img);
      });
  }

}
*/

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
        const user = this.get_element("p", [], {
            class: "history__user",
        });

        const time = this.get_element(
            "time",
            [new Date().toLocaleTimeString()],
            {
                datetime: new Date().toLocaleTimeString(),
            }
        );

        const history_title = this.get_element("div", [user, time], {
            class: "history__title",
        });

        const history_content = this.get_element("div", [], {
            class: "history__content",
        });

        const history_block = this.get_element("div", [], {
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
