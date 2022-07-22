import webdriver from "selenium-webdriver";
import dotenv from "dotenv";

dotenv.config();

async function runTestWithCapabilities(capabilities) {
  const driver = new webdriver.Builder()
    .usingServer(process.env.BROWSERSTACK_SERVER_URL)
    .withCapabilities({
      ...capabilities,
      ...(capabilities.browser && { browserName: capabilities.browser }), // Because NodeJS language binding requires browserName to be defined
    })
    .build();

  await driver.get("http://www.duckduckgo.com");

  const inputField = await driver.findElement(webdriver.By.name("q"));

  await inputField.sendKeys("BrowserStack", webdriver.Key.ENTER); // this submits on desktop browsers
  try {
    await driver.wait(webdriver.until.titleMatches(/BrowserStack/i), 5000);
  } catch (e) {
    await inputField.submit(); // this helps in mobile browsers
  }

  try {
    await driver.wait(webdriver.until.titleMatches(/BrowserStack/i), 5000);

    console.info(await driver.getTitle());

    await driver.executeScript(
      'browserstack_executor: {"action": "setSessionStatus", "arguments": {"status":"passed","reason": "Title contains BrowserStack!"}}'
    );
  } catch (e) {
    await driver.executeScript(
      'browserstack_executor: {"action": "setSessionStatus", "arguments": {"status":"failed","reason": "Page could not load in time"}}'
    );
  }

  await driver.quit();
}

const capabilities1 = {
  "bstack:options": {
    os: "Windows",
    osVersion: "11",
    buildName: "browserstack-build-1",
    sessionName: "Parallel test 1",
  },
  browserName: "chrome",
  browserVersion: "103.0",
};

const capabilities2 = {
  "bstack:options": {
    os: "Windows",
    osVersion: "10",
    buildName: "browserstack-build-1",
    sessionName: "Parallel test 2",
  },
  browserName: "firefox",
  browserVersion: "102.0",
};

const capabilities3 = {
  "bstack:options": {
    deviceName: "iPhone 12 Pro Max",
    osVersion: "16 Beta",
    buildName: "browserstack-build-1",
    sessionName: "Parallel test 3",
  },
  browserName: "ios",
};

runTestWithCapabilities(capabilities1);
runTestWithCapabilities(capabilities2);
runTestWithCapabilities(capabilities3);
