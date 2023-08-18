wiki(text) {
    const content = this.create_environment();
    const splitted_text = text.split(" ");
    let query = "";
    splitted_text.shift();
    query = splitted_text.join("_");
    fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${query}`)
      .then((res) => res.json())
      .then(async (data) => {
        const para = DOMF.get_element("p");
        content.append(para);
        await this.only_write(data["extract"], para);
      });
  }