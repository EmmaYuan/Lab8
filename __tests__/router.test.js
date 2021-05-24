/**
 * @jest-environment jsdom
 */

import { pushToHistory } from '../scripts/router.js';

describe("check length", () => {
    test("push settings page and get length of 2 ", () => {
        expect(pushToHistory("settings").length).toBe(2);
    })

    test("push entry page and get length of 3", () => {
        expect(pushToHistory("entry", 1).length).toBe(3);
    })

    test("push default page and get length of 4", () => {
        expect(pushToHistory("default").length).toBe(4);
    })
})

describe("check state", () => {
    test("is settings state", () => {
        expect(pushToHistory("settings").state.page).toBe('settings');
    })

    test("is entry 0 state", () => {
        expect(pushToHistory("entry", 0).state.page).toBe('entry0');
    })

    test("is defualt state", () => {
        expect(pushToHistory("default").state.page).toBe(undefined);
    })
})