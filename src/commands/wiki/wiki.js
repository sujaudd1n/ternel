import { Message } from "../uis/message.js";
import { Title_lists } from "../password/data_view.js";

class Wiki_class {
    constructor() {
        this.name = "wiki";
        this.description = "Fetch wikipedia article of a given topic.";
        this.ui = Message;
        this.help_ui = Title_lists;
    }

    async execute(topic) {
        topic = this.filter_input_text(topic);
        const data = await this.request_data(topic);
        return {
            data: ["Wikipedia: " + topic, data],
            ui: this.ui,
        };
    }

    filter_input_text(text) {
        const word_list = text.split(" ");
        if (word_list.length === 1)
            throw new Error("wrong number of arguments");
        return word_list.slice(1).toString().replaceAll(",", " ");
    }

    async request_data(topic) {
        const res = await fetch(
            `https://en.wikipedia.org/api/rest_v1/page/summary/${topic}`
        );
        const data = await res.json();
        return data["extract"];
    }

    help() {
        return {
            data: ["wiki", this.description, [";wiki topic"]],
            ui: this.help_ui,
        };
    }
}

const Wiki = new Wiki_class();

export { Wiki };
