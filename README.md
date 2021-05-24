# Lab8_Starter
Emma Yuan

## Check your understanding q's
1. In your own words: Where would you fit your automated tests in your Bujo project development pipeline? (just write the letter)\
Use GitHub Actions to automatically run the automated tests when the code is uploaded to Github.

2. Would you use a unit test to test the “message” feature of a messaging application? Why or why not? For this question, assume the “message” feature allows a user to write and send a message to another user.\
No I wouldn't because the message feature is huge and unit tests can't test how small, individual components interact with each other. 

3. Would you use a unit test to test the “max message length” feature of a messaging application? Why or why not? For this question, assume the “max message length” feature prevents the user from typing more than 80 characters\
Yes I would because we know the max number of charaters we are expecting (80) and unit tests allows us to debug on one single small component in a huge project at a time easily.

4. What do you expect to happen if we run our puppeteer tests with the field “headless” set to true?\
Puppeteer will run the tests without a browser UI.

5. What would your beforeAll callback look like if you wanted to start from the settings page before every test case?
<section>beforeEach(async() = {await page.click("header > img");});</section>


[screenshot](https://github.com/EmmaYuan/Lab8/blob/main/screenshot.png)
