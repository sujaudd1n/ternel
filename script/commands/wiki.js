import { Message } from "../components/message.js";

class Wiki_class {
    constructor() {
        this.name = "wiki";
        this.description = "Fetch wikipedia article of a given topic.";
        this.component = Message;
    }

    async execute(topic) {
        topic = this.filter_input_text(topic);
        const data = await this.request_data(topic);
        return ["Wikipedia: " + topic, data];
    }

    filter_input_text(text) {
        const word_list = text.split(" ");
        if (word_list.length === 1)
            throw new Error("wrong number of arguments");
        return word_list.slice(1).toString();
    }

    async request_data(topic) {
        const res = await fetch(
            `https://en.wikipedia.org/api/rest_v1/page/summary/${topic}`
        );
        const data = await res.json();
        return data["extract"];
    }

    help() {
        const help_text = this.description;
        return help_text;
    }
}

const Wiki = new Wiki_class();

export { Wiki };
