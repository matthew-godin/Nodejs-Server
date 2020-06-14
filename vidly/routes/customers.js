const auth = require('../middleware/auth');
const {Customer, validate} =
    require('../models/customer');
const mongoose = require('mongoose');
//const Joi = require('joi');
const express = require('express');
const router = express.Router();
/*const Customer = mongoose.model('Customer',
                             new mongoose.Schema({
    isGold: { type: Boolean, required: true },
    name: { type: String, required: true,
            minlength: 5, maxlength: 50 },
    phone: { type: String, required: true,
        minlength: 5, maxlength: 50 }
}));*/
router.get('/', async (req, res) => {
    const customers = await Customer
        .find()
        .sort('name');
    res.send(customers);
});
router.get('/:id', async (req, res) => {
    const customer = await Customer
        .findById(req.params.id)
    if (!customer)
        return res.status(404).send(
        'The customer with the '
        + 'given ID was not found');
    res.send(customer);
});
router.post('/', auth, async (req, res) => {
    const { error } = validate(req.body);
    //validateCustomer(req.body);
    if (error) return res.status(400).send(
            error.details[0].message);
    const length = await Customer
        .find()
        .count();
    const customer = new Customer({
        isGold: req.body.isGold == "true",
        name: req.body.name,
        phone: req.body.phone
    });
    try {
        const result = await customer.save();
    } catch (ex) {
        for (field in ex.errors) {
            console.log(ex.errors[field].message);
        }
    }
    res.send(customer);
});
router.put('/:id', auth, async (req, res) => {
    var customer = await Customer
        .findById(req.params.id);
    if (!customer || customer.length === 0)
            return res.status(404).send(
            'The customer with the '
            + 'given ID was not found');
    const { error } = validate(req.body);
    //validateCustomer(req.body);
    if (error) return res.status(400).send(
            error.details[0].message);
    customer = await Customer.findByIdAndUpdate(
        req.params.id,
        { $set: { isGold: req.body.isGold == "true",
                    name: req.body.name,
                    phone: req.body.phone}},
        {new: true});
    res.send(customer);
});
router.delete('/:id', auth, async (req, res) => {
    const customer = await Customer
        .findById(req.params.id);
    if (!customer || customer.length === 0)
            return res.status(404).send(
            'The customer with the '
            + 'given ID was not found');
    const result = await Customer
        .findByIdAndRemove(req.params.id);
    res.send(customer);
});
/*function validateCustomer(customer) {
    const schema = {
        isGold: Joi.boolean().required(),
        name: Joi.string().min(5).required(),
        phone: Joi.string().min(5).required()
    };
    return Joi.validate(customer, schema);
}*/
module.exports = router;