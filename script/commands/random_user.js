random_user() {
    const content = this.create_environment();
    fetch("https://randomuser.me/api/")
      .then((r) => r.json())
      .then(async (r) => {
        const data = r["results"][0];
        console.log(data);
        for (let d in data) {
          console.log(d);
          const para = DOMF.get_element("p");
          content.append(para);
          await this.only_write(data[d], para);
        }
      });
  }