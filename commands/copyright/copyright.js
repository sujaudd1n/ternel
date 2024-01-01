import { Message } from "../../cdk/components/message.js";
import { Paragraph } from "../../cdk/components/paragraph.js";
import { create_element } from "../../cdk/create_element.js";

class Copyright_class {
    constructor() {
        this.name = "copy";
        this.description = "Displays Copyright information.";
        this.component = Paragraph;
        this.help_component = Message;
    }

    async execute() {
        const license = [
            `Ternel - A terminal like interface to fetch many kinds of data.
        Copyright (C) 2023 Md Sujauddin Sekh`,

            `This program is free software: you can redistribute it and/or modify
        it under the terms of the GNU General Public License as published by
        the Free Software Foundation, either version 3 of the License, or
        (at your option) any later version.`,
            `This program is distributed in the hope that it will be useful,
        but WITHOUT ANY WARRANTY; without even the implied warranty of
        MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
        GNU General Public License for more details.`,

            `You should have received a copy of the GNU General Public License
        along with this program.  If not, see <https://www.gnu.org/licenses/>.`,
        ];
        return this.component.get_element(license);
    }

    help(subcommand = "") {
        return create_element("div", ["Copyright information."]);
    }
}

const Copyright = new Copyright_class();

export { Copyright };
