import { Password } from "./commands/password.js";
import { Wiki } from "./commands/wiki.js";
import { E404 } from "./commands/e404.js";

const COMMANDS = [Password, Wiki];

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

    append_node(node) {
        const content = this.create_environment();
        content.append(node);
        return content;
    }

    replace_node(container, node) {
        container.textContent = "";
        container.append(node);
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
     * @param {string} text
     * @returns
     */
    get_command(command_name) {
        for (let command of COMMANDS) {
          console.log(command.name, command_name)
            if (command.name === command_name) return command;
        }
        return E404;
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

const Setting = {
    themes: ["dark", "light", "red", "blue", "green"],

    initialize() {
        if (!localStorage.getItem("theme"))
            localStorage.setItem("theme", "dark");
        this.set_theme(localStorage.getItem("theme"));
    },

    set_theme(theme = "dark") {
        if (this.themes.includes(theme)) {
            localStorage.setItem("theme", theme);
            document.body.setAttribute("class", theme);
        } else {
            throw new Error("error");
        }
    },
};

export { Bot, User, Setting };

/*

    ytembed(text) {
        const content = this.create_environment();
        const splitted_text = text.split("=");
        const iframe = DOMF.get_element(
            "iframe",
            ["Lol! Looks like your broswer doesn't support iframe."],
            {
                src:
                    "https://youtube.com/embed/" +
                    splitted_text[splitted_text.length - 1],
                frameborder: 0,
            }
        );
        content.append(iframe);
    }
  help() {
    this.write([
      ";ct:  Change  theme.",
      "I will help you.",
      ";cr: See copyright.",
    ]);
  }

  copyright() {
    this.write([
      "&copy; 2023 Md Sujauddin Sekh",
      "LICENSE GNU GPLV3",
      "NO WARRENTY",
    ]);
  }

  change_theme(text) {
    const splitted_text = text.split(" ");
    if (splitted_text.length < 2) return;
    const theme = splitted_text[1];
    Setting.set_theme(theme);
  }


  google(text) {
    const splitted_text = text.split(" ");
    if (splitted_text.length < 2) return;
    splitted_text.shift();
    const query_string = splitted_text.join(" ");
    window.open(`https://google.com/search?q=${query_string}`);
  }

  async only_write(text, target) {
    if (typeof text === "string")
      for (let char of text) {
        target.append(char);
          await new Promise(res => setTimeout(res, 10));
          //mv
      }
  }

  random_user() {
    const content = this.create_environment();
    fetch("https://randomuser.me/api/")
      .then((r) => r.json())
      .then(async (r) => {
        const data = r["results"][0];
        console.log(data);
        for (let d in data) {
          console.log(d);
          const para = DOMF.get_element("p");
          content.append(para);
          await this.only_write(data[d], para);
        }
      });
  }

  ip(text) {
    /*
    https://ipapi.co/api
    const splitted_text = text.split(" ");
    let url = null;
    if (splitted_text.length === 1) url = "https://ipapi.co/json";
    else url = `https://ipapi.co/${splitted_text[1]}/json`;
    console.log(url);
    fetch(url)
      .then((r) => r.json())
      .then(async (r) => {
        const content = this.create_environment();
        for (let key in r) {
          const para = DOMF.get_element("p");
          content.append(para);
          await this.only_write(key + ": " + r[key], para);
          DOMF.history_scroll();
        }
      });
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
  meme() {
    const content = this.create_environment();
    fetch("https://meme-api.com/gimme")
      .then((res) => res.json())
      .then((data) => {
        const img = DOMF.get_element("img", [], {
          src: data["url"],
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

/*
const C_PREFIX = ";";
const Command = {
    commands: {
        C_HELP: C_PREFIX + "help",
        C_COPYRIGHT: C_PREFIX + "cr",
        C_THEME: C_PREFIX + "ct",
        C_GOOGLE: C_PREFIX + "google",
        C_WIKI: C_PREFIX + "wp",
        C_YTEMBED: C_PREFIX + "yte",
        C_RANDOM_USER: C_PREFIX + "ru",
        C_IP: C_PREFIX + "ip",
        C_CP: C_PREFIX + "cp",
        C_ZIP: C_PREFIX + "zip",
        C_PASSWORD: C_PREFIX + "pass",
        C_PIC: C_PREFIX + "pic",
        C_MEME: C_PREFIX + "meme",
    },
};
*/
