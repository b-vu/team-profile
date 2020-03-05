const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const writeFileAsync = util.promisify(fs.writeFile);
const Employee = require("./lib/Employee");
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");

const team = [];

const ask = async () =>{
    try{
        const response = await inquirer.prompt([
            {
                type: "input",
                message: "Enter your full name:",
                name: "name"
            },
            {
                type: "input",
                message: "Enter your ID:",
                name: "id"
            },
            {
                type: "input",
                message: "Enter your email address:",
                name: "email"
            },
            {
                type: "list",
                message: "What is your title in the company?",
                name: "title",
                choices: ["Manager", "Engineer", "Intern"]
            },
            {
                type: "input",
                message: "How many other members are in your team?",
                name: "members"
            }
        ])

        switch(response.title){
            case "Manager":
                const responseManager = await inquirer.prompt(
                    {
                        type: "input",
                        message: "What is your office number?",
                        name: "office"
                    }
                )
                const manager = new Manager(response.name, response.id, response.email, response.title, responseManager.office);
                team.push(manager);
                break;
            
            case "Engineer":
                const responseEngineer = await inquirer.prompt(
                    {
                        type: "input",
                        message: "What is your GitHub username?",
                        name: "github"
                    }
                )
                const engineer = new Engineer(response.name, response.id, response.email, response.title, responseEngineer.github);
                team.push(engineer);
                break;
            
            case "Intern":
                const responseIntern = await inquirer.prompt(
                    {
                        type: "input",
                        message: "What school do you attend?",
                        name: "school"
                    }
                )
                const intern = new Intern(response.name, response.id, response.email, response.title, responseIntern.school);
                team.push(intern);
        }

        for(i = 0; i < response.members; i++){
            await buildTeam();
        }

        await buildHTML(team);
    }
    catch(error){
        console.log(error);
    }
}

const buildTeam = async () =>{
    try{
        const response = await inquirer.prompt([
            {
                type: "input",
                message: "Enter team member's name:",
                name: "name"
            },
            {
                type: "input",
                message: "Enter team member's ID:",
                name: "id"
            },
            {
                type: "input",
                message: "Enter team member's email address:",
                name: "email"
            },
            {
                type: "list",
                message: "What is your team member's title in the company?",
                name: "title",
                choices: ["Manager", "Engineer", "Intern"]
            }
        ])

        switch(response.title){
            case "Manager":
                const responseManager = await inquirer.prompt(
                    {
                        type: "input",
                        message: "What is the manager's office number?",
                        name: "office"
                    }
                )
                const manager = new Manager(response.name, response.id, response.email, response.title, responseManager.office);
                team.push(manager);
                break;
            
            case "Engineer":
                const responseEngineer = await inquirer.prompt(
                    {
                        type: "input",
                        message: "What is the engineer's GitHub username?",
                        name: "github"
                    }
                )
                const engineer = new Engineer(response.name, response.id, response.email, response.title, responseEngineer.github);
                team.push(engineer);
                break;
            
            case "Intern":
                const responseIntern = await inquirer.prompt(
                    {
                        type: "input",
                        message: "What school does the intern attend?",
                        name: "school"
                    }
                )
                const intern = new Intern(response.name, response.id, response.email, response.title, responseIntern.school);
                team.push(intern);
        }
    }
    catch(error){
        console.log(error);
    }
}

const buildHTML = async array =>{
    try{
        array.sort((a,b) => (a.name > b.name) ? 1 : -1);
        let insert = ``;

        for(const member of array){
            switch(member.title){
                case "Manager":
                    insert += `
                    
            <div class="col-12 col-md-6 col-lg-4">
                <div class="card text-white bg-danger mb-3" style="width:100%">
                    <h4 class="card-header">${member.getName()}</h4>
                    <div class="card-body bg-light">
                        <h5>Manager☕</h5>
                        <h5>ID: ${member.getId()}</h5>
                        <h5>Office Number: ${member.getOfficeNumber()}</h5>
                        <h5>Email: <a href="mailto:${member.getEmail()}" class="card-link">${member.getEmail()}</a></h5>
                    </div>
                </div>
            </div>`
                    break;
                
                case "Engineer":
                    insert += `
                    
            <div class="col-12 col-md-6 col-lg-4">
                <div class="card text-white bg-danger mb-3" style="width:100%">
                    <h4 class="card-header">${member.getName()}</h4>
                    <div class="card-body bg-light">
                        <h5>Engineer🛠️</h5>
                        <h5>ID: ${member.getId()}</h5>
                        <h5>GitHub Username: <a href="https://github.com/${member.getGithub()}">${member.getGithub()}</a></h5>
                        <h5>Email: <a href="mailto:${member.getEmail()}" class="card-link">${member.getEmail()}</a></h5>
                    </div>
                </div>
            </div>`
                    break;

                case "Intern":
                    insert += `
                    
            <div class="col-12 col-md-6 col-lg-4">
                <div class="card text-white bg-danger mb-3" style="width:100%">
                    <h4 class="card-header">${member.getName()}</h4>
                    <div class="card-body bg-light">
                        <h5>Intern🎓</h5>
                        <h5>ID: ${member.getId()}</h5>
                        <h5>School: ${member.getSchool()}</h5>
                        <h5>Email: <a href="mailto:${member.getEmail()}" class="card-link">${member.getEmail()}</a></h5>
                    </div>
                </div>
            </div>`
            }
        }

        let html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
        
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
    <link rel="stylesheet" href="style.css">
    <title>Team Profile</title>
</head>
<body>
    <header class="header">
        Team Profile
    </header>
        
    <div class="container">
        
        <div class="row">${insert}

        </div>
    </div>
        
    <footer class="footer">
        Copyright &copy;
    </footer>
        
    <script src="https://code.jquery.com/jquery-3.4.1.slim.min.js" integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script>
</body>
</html>`

        await writeFileAsync("./output/team.html", html);

        console.log("Your team profile has been generated.");
    }
    catch(error){
        console.log(error);
    }
}

ask();