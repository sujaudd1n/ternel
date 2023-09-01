import { Title_lists } from "../components/title_description_lists.js";

class IP_class {
    constructor() {
        this.name = "ip";
        this.description = "IP address information.";
        this.component = Title_lists;
    }

    async execute(input_text) {
        const address = this.filter_input_text(input_text);
        const data = await this.request_data(address);
        const filtered_data = this.filter_json_data(data);
        return [this.name, this.description, filtered_data];
    }

    filter_input_text(text) {
        const word_list = text.split(" ");
        if (word_list.length > 2) throw new Error("Wrong number of arguments.");
        return word_list[1];
    }

    async request_data(address) {
        let url;
        if (address) url = `https://ipapi.co/${address}/json`;
        else url = `https://ipapi.co/json`;
        const res = await fetch(url);
        const data = await res.json();
        return data;
    }

    /**
     * return array of text
     *
     */
    filter_json_data(json_data) {
        const data_array = [];
        for (const key in json_data)
            data_array.push(`${key} - ${json_data[key]}`);
        return data_array;
    }

    help() {
        const help_text = this.description;
        return help_text;
    }
}

const IP = new IP_class();

export { IP };
