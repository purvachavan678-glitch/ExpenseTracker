const Employee = require('../models/Employee'); 


// Signup Controller
const SignupEmployee = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingEmployee = await Employee.findOne({ email });
    if (existingEmployee) {
      return res.status(400).json({ message: 'User already exists' });
    }


    const employee = new Employee({ name, email, password });
    await employee.save();

    res.status(201).json({
      message: 'User registered successfully',
      employee: { name: employee.name, email: employee.email }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// Login Controller
const loginEmployee = async(req, res) => {
  const { email, password } = req.body;

  try {
    const employee = await Employee.findOne({ email });
    if (!employee) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await async(password, employee.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    res.status(200).json({
      message: 'Login successful',
      employee: {
        name: employee.name,
        email: employee.email,
        password:employee.password
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};


const addExpense = async (req, res) => {
    const { text, amount } = req.body;
    const employeeId = req.Employee?._id; 

    if (!employeeId) {
        return res.status(400).json({ message: "Employee not found", success: false });
    }

    if (!text || !amount) {
        return res.status(400).json({ message: "Text and amount are required", success: false });
    }

    try {
        const EmployeeData = await Employee.findByIdAndUpdate(
            employeeId,
            { $push: { expenses: { text, amount } } },
            { new: true }
        );
        return res.status(200).json({
            message: 'Expenses Added successfully',
            success: true,
            data: EmployeeData.expenses
        });
    } catch (err) {
        return res.status(500).json({
            message: "Something went wrong",
            error: err,
            success: false
        });
    }
};

module.exports = { SignupEmployee, loginEmployee,addExpense};
