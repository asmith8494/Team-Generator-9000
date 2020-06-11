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
        employees.push(manager);
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
    fs.writeFile("./output/team.html", render(employees), "utf8", function(error) {
        if(error)
            throw error;
        console.log("Success!");
        console.log(employees);
    });
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
