const Employee = require("./Employee");

class Intern extends Employee{
    constructor(name, id, email, title, school){
        super(name, id, email, title)
        this.school = school;
    }

    getSchool(){
        return this.school;
    }

    getRole(){
        return "Intern";
    }
}

module.exports = Intern;