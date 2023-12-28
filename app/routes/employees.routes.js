module.exports = app => {
    const employees = require('../controllers/employees.controller');

    var router = require('express').Router();

    router.post('/', employees.create);

    router.get('/', employees.findAll);

    router.get('/:id', employees.findOne);

    router.put('/:id', employees.update);

    router.delete('/:id', employees.delete);

    router.delete('/', employees.deleteAll);

    app.use('/api/v1/employees', router);
};

// http://localhost:8080/api/v1/employees