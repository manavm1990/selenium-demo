import { Builder, By } from "selenium-webdriver";

const driver = await new Builder().forBrowser("chrome").build();

// Open the Yahoo homepage
await driver.get("https://www.yahoo.com/");

// Click the 'Sign In' link
await driver.findElement(By.linkText("Sign in")).click();

// Type in the username
await driver.findElement(By.id("login-username")).sendKeys("tester");

// If the 'Stay signed in' checkbox is checked, uncheck it
if (
  await driver.executeScript(
    "return (document.querySelector('#persistent').checked)"
  )
) {
  await driver.findElement(By.css("label:nth-child(2)")).click();
}

driver.quit();
