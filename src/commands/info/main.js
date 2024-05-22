import { createApp, ref } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

const { getName } = window.__TAURI__.app;

class Info {
    constructor() {
        this.name = "info"
        this.description = "Show app info."
    }
    async execute() {
        console.log(ref, 11);
        return await getName()
    }
}

const info = new Info()

export { info };
