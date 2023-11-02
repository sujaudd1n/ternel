//Specification of common methods off all commands.

/**
 * Class reprenting a command.
 */
class Command {
    constructor() {
        this.name = "command";
        this.description = "Description for the command.";
        // component that will be used to render it's data.
        this.component = Title_lists;
        // component that will be used to render it's help data (user guide).
        this.help_component = Password_help;
    }
    /**
     * Manages help text (user guide) for a command. if subcommand exists,
     * control is passed to the help function of subcommand.
     *
     * @param {string} subcommand name of sub commmand.
     * @throws Throws an error if subcommand is not found.
     * @returns Object with two properties data, and component. Component is
     * used to create element for data.
     */
    help(subcommand = "") {}

    /**
     * It does all the things that need to done and returns the data.
     *
     * @param {string} command given by the user including ;<command_name>
     * example - ;help pass
     * @returns Object with two properties, data and component. Component is
     * used to create element for data.
     *
     */
    execute(command) {}
}