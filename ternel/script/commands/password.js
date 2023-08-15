import { arg } from "../arg/index.js";
import { Lists } from "../components/lists.js";

const Password = {
    name: "pass",
    description: "Password generator",
    SYMBOL_FLAG: "-s",
    LENGTH_FLAG: "-l",
    QUANTITY_FLAG: "-q",
    render_element: Lists,

    /**
     * Parse a password description
     * @param {string} password_description - Specify the requiremets
     *                                        of passwords ouput.
     * -s:boolean for symbol
     * -l:number for length
     * -q:number for quantity
     *
     */
    async manage(password_description) {
        const args = arg(password_description, {
            "-s": Boolean,
            "-l": Number,
            "-q": Number,
        });

        const url = this.generate_url(args);
        const password_list = await this.request_password(url);

        console.log(password_list);

        return password_list;
    },

    generate_url(options) {
        let url = "https://makemeapassword.ligos.net/api/v1/alphanumeric/json?";
        if (this.SYMBOL_FLAG in options) url += "sym=true&";
        if (this.LENGTH_FLAG in options) url += `l=${options["-l"]}&`;
        if (this.QUANTITY_FLAG in options) url += `c=${options["-q"]}&`;
        return url;
    },

    /**
     *
     * @param {url} url - request to url
     * @returns array of password
     */
    async request_password(url) {
        const res = await fetch(url);
        const data = await res.json();
        console.log(url);
        console.log(data);
        return data["pws"];
    },
};

export { Password };
