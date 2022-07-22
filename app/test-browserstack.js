import dotenv from "dotenv";
import { Builder, By, Key, until } from "selenium-webdriver";

dotenv.config();

async function runTestWithCapabilities(capabilities) {
  const driver = new Builder()
    .usingServer(process.env.BROWSERSTACK_SERVER_URL)
    .withCapabilities({
      ...capabilities,
      ...(capabilities.browser && { browserName: capabilities.browser }), // Because NodeJS language binding requires browserName to be defined
    })
    .build();

  // If we can't get to the title to match and we need to try again...
  let tryAgain = false;

  await driver.get("http://www.duckduckgo.com");

  const inputField = await driver.findElement(By.name("q"));

  // Using `Key.ENTER` instead of `\n` to avoid potential issues
  await inputField.sendKeys("BrowserStack", Key.ENTER); // this submits on desktop browsers

  try {
    await driver.wait(until.titleMatches(/BrowserStack/i), 5000);
  } catch {
    // If we didn't make it, then let's try to submit another way
    await inputField.submit(); // this helps in mobile browsers
    tryAgain = true;
  }

  try {
    if (tryAgain) {
      console.info(`Failed to get title to match.
      This might be some old mobile browser. Trying again...`);

      await driver.wait(until.titleMatches(/BrowserStack/i), 5000);
    }

    console.info(`Got the expected title. ${await driver.getTitle()}`);

    await driver.executeScript(
      'browserstack_executor: {"action": "setSessionStatus", "arguments": {"status":"passed","reason": "Title contains BrowserStack!"}}'
    );
  } catch (e) {
    await driver.executeScript(
      'browserstack_executor: {"action": "setSessionStatus", "arguments": {"status":"failed","reason": "Page could not load in time"}}'
    );

    console.error(e);
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
