import "chromedriver";
import { Builder, By, Key } from "selenium-webdriver";

const searchString = "Automation testing with Selenium and JavaScript";

// Wait for the browser to get built and launched 🚀
const driver = new Builder().forBrowser("chrome").build();

await driver.get("https://www.google.com");

// 'Type' the search string into the search box ⌨️ (and press 'Enter')
await driver.findElement(By.name("q")).sendKeys(searchString, Key.RETURN);

driver.quit();
