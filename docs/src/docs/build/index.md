# Getting Started

Writing apps for ternel is very easy and straight forward.

## Concept

Every app contains a ```main.js``` file. This file exports an object.
The object must have **4** things.
- An ```execute()``` method which is responsible for 
returning an HTML element that will appeneded  in the DOM upon
executing this app.
- An ```help()``` method which is responsible for returning 
help string (user guide).
- A ```name``` propery
- A ```description``` property

## Sample 
```js:line-numbers
/**
 * Class reprenting a command HelloWorld.
 */
class HelloWorld {
    constructor() {
        this.name = "command";
        this.description = "Description for the command.";
    }

    help(subcommand = "") {
        const message =  document.createElement("p");
        message.textContent = "It just prints 'Hello World!'";
        return message;
    }

    execute(command) {
        const greet =  document.createElement("p");
        greet.textContent = "Hello World!";
        return greet;
    }
}

const helloworld = new HelloWorld();
export { helloworld };
```
