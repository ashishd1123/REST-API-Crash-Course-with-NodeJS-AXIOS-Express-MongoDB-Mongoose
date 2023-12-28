const db = require('../models');
const Employees = db.employees;

exports.create = (req, res) => {
    if(!req.body.email) {
        res.status(400).send({message: 'Object is not valid'});
        return;
    }

    const email = req.body.email;

    Employees.findOne({email: email}).then(data => {
        if (data) {
            res.status(404).send({
                message: "Employee details already exists."
            })
        } else {
            createNewUserData(req, res);
        }
    })
}

function createNewUserData(req, res) {
    const employees = new Employees({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        description: req.body.description,
        valid: req.body.valid ? req.body.valid : false,
        email: req.body.email
    });

    employees
        .save(employees)
        .then(data => {
            res.send({data: data, message: 'Successfully created'})
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred"
            });
        });
}

exports.findAll = (req, res) => {
    Employees.find().then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || 'Some error occurred'
        })
    })
}

exports.findOne = (req, res) => {
    const id = req.params.id;

    Employees.findById(id).then(data => {
        if (!data) {
            res.status(404).send({
                message: `Not found Employees with id ${id}`
            })
        } else {
            res.send(data);
        }
    }).catch(err => {
        res.status(500).send({
            message: "Error" 
        })
    });
}

exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update cannot be empty!"
        })
    }

    const id = req.params.id;

    Employees.findByIdAndUpdate(id, req.body, {useFindAndModify: false})
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update Employees with id ${id}, Maybe emplyee details was not found!`
                })
            } else {
                res.send({
                    message: "Employee was updated successfully"
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error Updating Employees"
            })
        })
}

exports.delete = (req, res) => {
    const id = req.params.id.toString().trim();

    Employees.findByIdAndDelete(id).then(data => {
        if (!data) {
            res.status(404).send({
                message: `Cannot delete Employee with id=${id}`
            })
        } else {
            res.send({
                messate: "Employee was deleted successfully!"
            })
        }
    }).catch(err => {
        res.status(500).send({
            message: `Could not delete Employees with id=${id}`
        })
    })
}


exports.deleteAll = (req, res) => {
    Employees.deleteMany({})
        .then(data => {
            res.send({
                message: "All Employees data were deleted successfully!"
            })
        })
        .catch(err => {
            res.status(500).send({
                message: err.message
            })
        })
}