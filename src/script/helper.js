import { Password } from "../commands/password/password.js";
import { Copyright } from "../commands/copyright/copyright.js";
import { settings } from "../commands/setting/main.js";
// import { Wiki } from "../commands/wiki/wiki.js";
// import { Help } from "../commands/help/help.js";
// import { Meme } from "../commands/meme/meme.js";
// import { IP } from "../commands/ip/ip.js";
import { QR } from "../commands/qr/qr.js";
import { Help } from "../commands/help/help.js";
import { ternel_intro } from "../commands/intro/index.js";
import { message } from "../commands/message/main.js";
/**
 * weather
 * https://cataas.com/
 */

const ALL_COMMANDS = [ternel_intro, Password, Help, Copyright, QR, settings, message]; //, Copyright, Settings, Wiki, Help, Meme, IP, QR];

export { ALL_COMMANDS };
