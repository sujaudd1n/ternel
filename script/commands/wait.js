import { Message } from "../components/message.js";

const Wait = {
    name: "Wait",
    component: Message,

    /**
     * 
     * @param {string} command - command from user.
     * @returns array indicating error and a message.
     */
    execute(command)
    {
        return ["Please wait.", `Data for ${command} is being fetched.`]
    }
};

export { Wait };
