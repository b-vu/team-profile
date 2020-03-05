const Employee = require("./Employee");

class Engineer extends Employee{
    constructor(name, id, email, title, github){
        super(name, id, email, title)
        this.github = github;
    }

    getGithub(){
        return this.github;
    }

    getRole(){
        return "Engineer";
    }
}

module.exports = Engineer;