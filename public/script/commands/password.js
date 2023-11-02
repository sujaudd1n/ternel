import { arg } from "../arg/index.js";

import { Title_lists } from "../components/title_description_lists.js";
import { Password_help } from "../components/password_help.js";

/**
 * Class representing password command.
 */
class Password_class {

    constructor() {
        this.name = "pass";
        this.description = "Password generator";
        this.SYMBOL_FLAG = "-s";
        this.LENGTH_FLAG = "-l";
        this.QUANTITY_FLAG = "-q";
        this.component = Title_lists;
        this.help_component = Password_help;
    }

    /**
     * Parse a password description
     * @param {string} password_description - Specify the requiremets
     *                                        of passwords ouput.
     * -s:boolean for symbol
     * -l:number for length
     * -q:number for quantity
     *
     */
    async execute(command) {
        const args = arg(command, {
            "-s": Boolean,
            "-l": Number,
            "-q": Number,
        });

        const url = this.generate_url(args);
        const password_list = await this.request_password(url);

        return {
            data: ["Password", command, password_list],
            component: this.component,
        };
    }

    generate_url(options) {
        let url = "https://makemeapassword.ligos.net/api/v1/alphanumeric/json?";
        if (this.SYMBOL_FLAG in options) url += "sym=true&";
        if (this.LENGTH_FLAG in options) url += `l=${options["-l"]}&`;
        if (this.QUANTITY_FLAG in options) url += `c=${options["-q"]}&`;
        return url;
    }

    /**
     *
     * @method
     * @param {url} url - request to url
     * @returns array of password
     */
    async request_password(url) {
        const res = await fetch(url);
        const data = await res.json();
        console.log(url);
        console.log(data);
        return data["pws"];
    }

    help(subcommand = "") {
        const usage = ";pass [-lqs]";
        const options = [
            "-l {int} specifies length of password.",
            "-q {int} specifies quantity of password.",
            "-s {bool} specifies if symbols is included or not.",
        ];
        return {
            data: [this.name, this.description, usage, options],
            component: this.help_component,
        };
    }
}

const Password = new Password_class();

export { Password };
