const form = document.querySelector(".command__form");
const input = document.querySelector("#command__text");
const history = document.querySelector(".history");

Setting.initialize();

const su = new User("su");
const ternel = new Bot("Ternel");

form.onsubmit = async (e) => {
  e.preventDefault();

  const input_text = input.value;
  su.append_node(input_text);

  if ((c = ternel.is_command(input_text))) {
    if (c == Command.commands.C_HELP) ternel.help();
    else if (c === Command.commands.C_COPYRIGHT) ternel.copyright();
    else if (c === Command.commands.C_THEME) ternel.change_theme(input_text);
    else if (c === Command.commands.C_WIKI) ternel.wiki(input_text);
    else if (c === Command.commands.C_YTEMBED) ternel.ytembed(input_text);
    else if (c === Command.commands.C_GOOGLE) Command.google(input_text);
    else if (c === Command.commands.C_RANDOM_USER) ternel.random_user();
    else if (c === Command.commands.C_IP) ternel.ip(input_text);
    else if (c === Command.commands.C_CP) ternel.cp(input_text);
    else if (c === Command.commands.C_ZIP) ternel.zip(input_text);
    else if (c === Command.commands.C_PASSWORD) ternel.password(input_text);
    else if (c === Command.commands.C_PIC) ternel.pic(input_text);
    else if (c === Command.commands.C_MEME) ternel.meme();
  }

  input.value = "";
};
