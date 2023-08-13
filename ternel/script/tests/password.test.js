const arg = require("../arg/index.js");
const Password = require("../commands");

/**
 * Checks if quantity is 10
 */
test(";pass -q 10", async () => {
    const data = await Password.manage(";pass -q 10");
    expect(data.length).toBe(10);
});

/**
 * Checks if lenght is 10
 * and quantity is 1
 */
test(";pass -l 10", async () => {
    const data = await Password.manage(";pass -l 10");
    expect(data[0].length).toBe(10);
});
