import inquirer from "inquirer";

const choice = await inquirer.prompt([
  {
    type: "list",
    name: "action",
    message: "Which test would you like to run?",
    choices: [
      "1. Google Search with Selenium and JavaScript",
      "2. Yahoo Sign In Link with Username and Checkbox",
    ],
  },
]);

switch (parseInt(choice.action, 10)) {
  case 1: {
    console.info("🏃🏾‍♂️ Google Search with Selenium and JavaScript");

    const googleTest = await import("./test-google-search.js");
    googleTest.default();
    break;
  }

  case 2: {
    console.info("🏃🏾‍♂️ Yahoo Sign In Link with Username and Checkbox");

    const yahooTest = await import("./test-yahoo-login.js");
    yahooTest.default();
    break;
  }

  default:
    console.error("Invalid choice");
}
