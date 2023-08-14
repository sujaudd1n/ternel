const Password = require("../commands/password");

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

/**
 * Checks if lenght is 20
 * and quantity is 5
 */

test(";pass -l 20 -q 5", async () => {
    const data = await Password.manage(";pass -l 20 -q 5");
    expect(data.length).toBe(5);
    data.forEach((e) => {
        expect(e.length).toBe(20);
    });
});
