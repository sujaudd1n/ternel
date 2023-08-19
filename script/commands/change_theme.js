const Change_theme = {
    name: "ct",
    description: "Change theme of ternel.",

    themes: ["dark", "light", "red", "blue", "green"],

    execute(theme) {
        if (!this.themes.includes(theme))
            throw new Error(`Theme ${theme} not found.`);
        localStorage.setItem("theme", theme);
        document.body.classList = localStorage.getItem("theme");
        return ["Theme changed.", "Current theme is " + theme];
    },
};

export { Change_theme };
