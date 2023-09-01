//Specification of common methods off all commands.

/**
 * Manages help text (user guide) for a command. if subcommand exists,
 * control is passed to the help function of subcommand.
 *
 * @param {string} subcommand name of sub commmand.
 * @throws Throws an error if subcommand is not found.
 * @returns Object with two properties data and component. Component is
 * used to create element for data.
 */
function help(subcommand = "") {}
