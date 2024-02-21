const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const render = require("./src/page-template.js");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

// Array to store team members
const team = [];

// Function to prompt for manager details
const promptManager = async () => {
  const managerQuestions = [
    // Add questions for manager details
    // Example: { type: 'input', name: 'managerName', message: 'Enter manager name:' },
  ];

  const managerAnswers = await inquirer.prompt(managerQuestions);

  // Create a Manager instance and add it to the team array
  const manager = new Manager(managerAnswers.managerName, /* add other manager details */);
  team.push(manager);

  // Call function to prompt for additional team members
  promptTeamMembers();
};

// Function to prompt for additional team members
const promptTeamMembers = async () => {
  const teamMemberQuestions = [
    // Add questions to determine the type of team member (Engineer, Intern, or finish building the team)
    // Example: { type: 'list', name: 'teamMemberType', message: 'Choose team member type:', choices: ['Engineer', 'Intern', 'Finish building the team'] },
  ];

  const teamMemberAnswers = await inquirer.prompt(teamMemberQuestions);

  switch (teamMemberAnswers.teamMemberType) {
    case 'Engineer':
      // Call function to prompt for engineer details
      break;
    case 'Intern':
      // Call function to prompt for intern details
      break;
    case 'Finish building the team':
      // Call function to generate HTML and write to file
      const html = render(team);
      fs.writeFileSync(outputPath, html);
      console.log(`Team HTML generated and saved to ${outputPath}`);
      break;
    default:
      break;
  }
};

// Call the function to start prompting for manager details
promptManager();
