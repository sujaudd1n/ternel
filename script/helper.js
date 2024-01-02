import { Password } from "../commands/password/password.js";
import { Copyright } from "../commands/copyright/copyright.js";
// import { Settings } from "../commands/setting/settings.js";
// import { Wiki } from "../commands/wiki/wiki.js";
// import { Help } from "../commands/help/help.js";
// import { Meme } from "../commands/meme/meme.js";
// import { IP } from "../commands/ip/ip.js";
import { QR } from "../commands/qr/qr.js";
import { Help } from "../commands/help/help.js";

const ALL_COMMANDS = [Password, Help, Copyright, QR]; //, Copyright, Settings, Wiki, Help, Meme, IP, QR];

export { ALL_COMMANDS };
