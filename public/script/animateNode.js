/*
MIT License

Copyright (c) 2023 Md Sujauddin Sekh

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

/**
 * Represents class that implements various animation functions.
 */
class AnimateNode {
    /**
     *
     * @param {Integer} speed defines how slow animation should be.
     * Default is 10 (fast).
     */
    constructor(speed = 10) {
        this.TEXT_NODE = 3;
        this.ELEMENT_NODE = 1;
        this.speed = speed;
    }

    /**
     * Interface to char animation.
     * @param {HTMLElement} parent
     * @param {HTMLElement | TextNode} node
     */
    async char(parent, node) {
        node = node.cloneNode(true);
        await this.execute(parent, node, "char");
    }

    /**
     * Interface to text node animation.
     * @param {HTMLElement} parent
     * @param {HTMLElement | TextNode} node
     */
    async text(parent, node) {
        node = node.cloneNode(true);
        await this.execute(parent, node, "text");
    }
    /**
     * Implementation of char animation.
     * @param {HTMLElement} parent element of node.
     * @param {TextNode} node each char of node will appended while begin
     * animated.
     */
    async char_animation(parent, node) {
        for (const char of node.textContent) {
            parent.append(char);
            await new Promise((tmp) => setTimeout(tmp, this.speed));
            ternel.scroll();
        }
    }

    /**
     * Implementation of text node animation.
     * @param {HTMLElement} parent element of node.
     * @param {TextNode} node will appended while begin animated.
     */
    async text_animation(parent, node) {
        console.log(node)
        parent.append(node);
        await new Promise((tmp) => setTimeout(tmp, this.speed * 5));
        ternel.scroll();
    }

    /**
     * Recursively append node and its child into the parent.
     * @param {HTMLElement} parent element of node.
     * @param {HTMLELEMENT | TextNode} node node that will be appended.
     * @param {string} type specify type of animation char or text.
     */
    async execute(parent, node, type) {
        if (node.nodeType === this.TEXT_NODE) {
            if (type === "char") await this.char_animation(parent, node);
            else if (type === "text") await this.text_animation(parent, node);
        } else if (node.nodeType === this.ELEMENT_NODE) {
            const children = [];
            node.childNodes.forEach((element) => {
                children.push(element);
            });
            node.textContent = "";
            parent.append(node);
            for (const child of children) await this.execute(node, child, type);
        }
    }
}

const animateNode = new AnimateNode(1);
export { animateNode };
