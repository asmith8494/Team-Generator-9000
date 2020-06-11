const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output")
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const manager = new Manager();
const employees = [];

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an 
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work!```

const managerQuestions = [
    {
        type: "input",
        message: "Manager. Enter your name:",
        name: "name"
    },
    {
        type: "input",
        message: "Manager. Enter your employee ID number:",
        name: "id"
    },
    {
        type: "input",
        message: "Enter your email:",
        name: "email"
    },
    {
        type: "input",
        message: "Enter the office number:",
        name: "officeNumber"
    }
];

const engineerQuestions = [
    {
        type: "input",
        message: "Enter Engineer's name:",
        name: "name"
    },
    {
        type: "input",
        message: "Enter Engineer's employee ID number:",
        name: "id"
    },
    {
        type: "input",
        message: "Enter Engineer's email:",
        name: "email"
    },
    {
        type: "input",
        message: "Enter Engineer's github username:",
        name: "github"
    }
];

const internQuestions = [
    {
        type: "input",
        message: "Enter Intern's name",
        name: "name"
    },
    {
        type: "input",
        message: "Enter Intern's employee ID number:",
        name: "id"
    },
    {
        type: "input",
        message: "Enter Intern's email:",
        name: "email"
    },
    {
        type: "input",
        message: "Enter Intern's school:",
        name: "school"
    }
];

function init() {
    inquirer
    .prompt(managerQuestions)
    .then(res => {
        manager.name = res.name;
        manager.id = res.id;
        manager.email = res.email;
        manager.officeNumber = res.officeNumber;
        promptManager();
    });
}

function promptManager() {

    inquirer
    .prompt({
        type: "list",
        message: "Choose an employee to add.",
        name: "choice",
        choices: ["Engineer", "Intern", "Finished Adding"]
    })
    .then(res => {
        if(res.choice === "Engineer") {
            promptEngineer();
        }
        else if(res.choice === "Intern") {
            promptIntern();
        }
        else {
            Render();
        }
    });
}

function Render() {
    console.log("Success!");
    console.log(manager);
    console.log(employees);
}


function promptEngineer() {
    inquirer
    .prompt(engineerQuestions)
    .then(res => {
        const engineer = new Engineer(res.name, res.id, res.email, res.github);
        employees.push(engineer);
        promptManager();
    });
}

function promptIntern() {
    inquirer
    .prompt(internQuestions)
    .then(res => {
        const intern = new Intern(res.name, res.id, res.email, res.school);
        employees.push(intern);
        promptManager();
    });
}

init();
