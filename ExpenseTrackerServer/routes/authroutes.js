const express = require('express');
const router = express.Router();
const { SignupEmployee, loginEmployee } = require('../controller/authcountrollers');

router.post('/Signup', SignupEmployee);
router.post('/login', loginEmployee);

module.exports = router;
