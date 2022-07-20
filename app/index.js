import inquirer from "inquirer";

const choice = await inquirer.prompt([
  {
    type: "list",
    name: "action",
    message: "Which test would you like to run?",
    choices: ["1. Google Search with Selenium and JavaScript"],
  },
]);

switch (parseInt(choice.action, 10)) {
  case 1: {
    console.log("Running Google Search with Selenium and JavaScript");

    const googleTest = await import("./test-google-search.js");
    googleTest.default();
    break;
  }

  default:
    console.error("Invalid choice");
}
