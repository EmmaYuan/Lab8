// jest-puppeteer.config.js
module.exports = {
  launch: {
    // refers to the Chromium browser installed with the puppeteer framework
    headless: false, // run the tests without a browser UI
    slowMo: 500
  }
}