describe('Basic user flow for SPA ', () => {
    beforeAll(async() => {
        await page.goto('http://127.0.0.1:5500');
        await page.waitForTimeout(500);
    });

    // test 1 is given
    it('Test1: Initial Home Page - Check for 10 Journal Entries', async() => {
        const numEntries = await page.$$eval('journal-entry', (entries) => {
            return entries.length;
        });
        expect(numEntries).toBe(10);
    });

    // test 2 is given
    it('Test2: Make sure <journal-entry> elements are populated', async() => {
        let allArePopulated = true;
        let data, plainValue;
        const entries = await page.$$('journal-entry');
        for (let i = 0; i < entries.length; i++) {
            data = await entries[i].getProperty('entry');
            plainValue = await data.jsonValue();
            if (plainValue.title.length == 0) { allArePopulated = false; }
            if (plainValue.date.length == 0) { allArePopulated = false; }
            if (plainValue.content.length == 0) { allArePopulated = false; }
        }
        expect(allArePopulated).toBe(true);
    }, 30000);

    it('Test3: Clicking first <journal-entry>, new URL should contain /#entry1', async() => {
        // implement test3: Clicking on the first journal entry should update the URL to contain “/#entry1”
        await page.click("journal-entry");
        expect(await page.url()).toMatch(/#entry1/);
    });

    it('Test4: On first Entry page - checking page header title', async() => {
        // implement test4: Clicking on the first journal entry should update the header text to “Entry 1”
        const h1 = await page.$("h1");
        const text = await page.evaluate(h1 => h1.textContent, h1);
        expect(text).toBe("Entry 1");
    });

    it('Test5: On first Entry page - checking <entry-page> contents', async() => {
        // implement test5: Clicking on the first journal entry should contain the following contents: 
        const entryPage = await page.$("entry-page");
        const entryPageEntry = await page.evaluate(entryPage => entryPage.entry, entryPage);
        const expectation = {
            title: 'You like jazz?',
            date: '4/25/2021',
            content: "According to all known laws of aviation, there is no way a bee should be able to fly. Its wings are too small to get its fat little body off the ground. The bee, of course, flies anyway because bees don't care what humans think is impossible.",
            image: {
                src: 'https://i1.wp.com/www.thepopcornmuncher.com/wp-content/uploads/2016/11/bee-movie.jpg?resize=800%2C455',
                alt: 'bee with sunglasses'
            }
        };
        expect(entryPageEntry).toEqual(expectation);
    }, 10000);


    it('Test6: On first Entry page - checking <body> element classes', async() => {
        // implement test6: Clicking on the first journal entry should update the class attribute of <body> to ‘single-entry’
        const body = await page.$("body");
        const bodyClassName = await page.evaluate(body => body.className, body);
        expect(bodyClassName).toBe("single-entry");
    });

    it('Test7: Clicking the settings icon, new URL should contain #settings', async() => {
        // implement test7: Clicking on the settings icon should update the URL to contain “/#settings”
        await page.click("header > img");
        expect(await page.url()).toMatch(/#settings/);
    });


    it('Test8: On Settings page - checking page header title', async() => {
        // implement test8: Clicking on the settings icon should update the header to be “Settings”
        const h1 = await page.$("h1");
        const text = await page.evaluate(h1 => h1.textContent, h1);
        expect(text).toBe("Settings");
    });

    it('Test9: On Settings page - checking <body> element classes', async() => {
        // implement test9: Clicking on the settings icon should update the class attribute of <body> to ‘settings’
        const body = await page.$("body")
        const bodyClassName = await page.evaluate(body => body.className, body);
        expect(bodyClassName).toBe("settings");
    });

    it('Test10: Clicking the back button, new URL should be /#entry1', async() => {
        // implement test10: Clicking on the back button should update the URL to contain ‘/#entry1’
        await page.goBack();
        expect(await page.url()).toMatch(/#entry1/);
    });

    it('Test11: Clicking the back button, new URL should be "http://127.0.0.1:5500/"', async() => {
        // define and implement test11: Clicking the back button once should bring the user back to the home page
        await page.goBack();
        expect(await page.url()).toBe("http://127.0.0.1:5500/");
    });

    it('test12: On Homepage page - checking page header title”', async() => {
        // define and implement test12: When the user if on the homepage, the header title should be “Journal Entries”
        const h1 = await page.$("h1");
        const text = await page.evaluate(h1 => h1.textContent, h1);
        expect(text).toBe("Journal Entries");
    });

    it('test13: On Home page - checking <body> element classes', async() => {
        // define and implement test13: On the home page the <body> element should not have any class attribute 
        const body = await page.$("body");
        const bodyClassName = await page.evaluate(body => body.className, body);
        expect(bodyClassName).toBe("");
    });

    it('test14: Clicking second <journal-entry>, new URL should contain /#entry2', async() => {
        // define and implement test14: Verify the url is correct when clicking on the second entry
        await page.click("journal-entry:nth-child(2)");
        expect(await page.url()).toMatch(/#entry2/);
    });

    it('test15: On second Entry page - checking page header title', async() => {
        // define and implement test15: Verify the title is current when clicking on the second entry
        const h1 = await page.$("h1");
        const text = await page.evaluate(h1 => h1.textContent, h1);
        expect(text).toBe("Entry 2");
    });

    it('test16: On second Entry page - checking <entry-page> contents', async() => {
        // define and implement test16: Verify the entry page contents is correct when clicking on the second entry
        const entryPage = await page.$("entry-page");
        const entryPageEntry = await page.evaluate(entryPage => entryPage.entry, entryPage);
        const expectation = {
            title: "Run, Forrest! Run!",
            date: "4/26/2021",
            content: "Mama always said life was like a box of chocolates. You never know what you're gonna get.",
            image: {
                src: "https://s.abcnews.com/images/Entertainment/HT_forrest_gump_ml_140219_4x3_992.jpg",
                alt: "forrest running"
            }
        };
        expect(entryPageEntry).toEqual(expectation);
    }, 10000);

    it('test17: Clicking third <journal-entry>, new URL should contain /#entry3', async() => {
        await page.goBack();
        await page.click("journal-entry:nth-child(3)");
        expect(await page.url()).toMatch(/#entry3/);
    });

    it('test18: On third Entry page - checking page header title', async() => {
        const h1 = await page.$("h1");
        const text = await page.evaluate(h1 => h1.textContent, h1);
        expect(text).toBe("Entry 3");
    });

    it('test19: Clicking third <journal-entry>, new URL should contain /#entry4', async() => {
        await page.goBack();
        await page.click("journal-entry:nth-child(4)");
        expect(await page.url()).toMatch(/#entry4/);
    });

    it('test20: Clicking third <journal-entry>, new URL should contain /#entry5', async() => {
        await page.goBack();
        await page.click("journal-entry:nth-child(5)");
        expect(await page.url()).toMatch(/#entry5/);
    });
});