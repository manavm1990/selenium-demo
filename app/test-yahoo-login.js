import { Builder, By } from "selenium-webdriver";

export default async () => {
  const driver = await new Builder().forBrowser("chrome").build();

  // Open the Yahoo homepage
  await driver.get("https://www.yahoo.com/");

  // Click the 'Sign In' link
  await driver.findElement(By.linkText("Sign in")).click();

  // Type in the username
  await driver.findElement(By.name("username")).sendKeys("tester");

  // If the 'Stay signed in' checkbox is checked, uncheck it
  if (await driver.findElement(By.name("persistent")).isSelected()) {
    await driver.findElement(By.css("label[for='persistent']")).click();
  }

  driver.quit();
};
