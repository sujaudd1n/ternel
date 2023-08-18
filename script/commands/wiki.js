import { Message } from "../components/message.js";
const Wiki = {
    name: "wiki",
    description: "Fetch wikipedia article of a given topic.",
    component: Message,

    async execute(topic) {
        console.log(topic)
        const data = await this.request_data(topic);
        return ["Wikipedia: " + topic, data];
    },

    async request_data(topic) {
        const res = await fetch(
            `https://en.wikipedia.org/api/rest_v1/page/summary/${topic}`
        );
        const data = await res.json();
        return data["extract"];
    },
};

export { Wiki };
