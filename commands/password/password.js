import { arg } from "./arg.js";
import { data_view } from "./data_view.js";
import { help_view } from "./help_view.js";

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
        this.component = data_view;
        this.help_component = help_view;
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

        // return {
        // data: ["Password", command, password_list],
        // component: this.component,
        // };
        return this.component.get_element(
            command,
            password_list,
            "Password Generator"
        );
    }

    generate_url(options) {
        let url = "https://makemeapassword.ligos.net/api/v1/alphanumeric/json?";
        if (this.SYMBOL_FLAG in options) url += "sym=true&";
        if (this.LENGTH_FLAG in options) url += `l=${options["-l"]}&`;
        else url += `l=12&`;

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
        return this.help_component.get_element(
            this.name,
            this.description,
            usage,
            options
        );
    }
}

const Password = new Password_class();

export { Password };
