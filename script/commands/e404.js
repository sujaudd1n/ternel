import { Message } from "../components/message.js";

const E404 = {
    name: "E404",
    component: Message,

    /**
     * 
     * @param {string} command - command from user.
     * @returns array indicating error and a message.
     */
    execute(command)
    {
        return ["Error 404.", `Command: ${command} not found.`]
    }
};

export { E404 };
