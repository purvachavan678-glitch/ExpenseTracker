import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'

import Login from './Component/Login'
import Signup from './Component/Signup'
import Expense from './Component/Expenses'
import ExpenseList from './Component/ExpenseList'
import FinancialReports from './Component/FinancialReports'
import CategoryCard from './Component/CategoryCard'
import { UserProvider } from "./Component/UserContext";

function App() {
  return (
    <div>
      <UserProvider>
      <Router>
        <Routes>

          <Route path="/" element={<Root />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/expense" element={<Expense />} />
          <Route path="/expenselist" element={<ExpenseList />} />
          <Route path="/expense" element={<CategoryCard />} />
          <Route path="/financialReports" element={<FinancialReports />} />


        </Routes>
      </Router>
      </UserProvider>
    </div>
  )
}

export default App

const Root = () => {
  const isAuthentication = !localStorage.getItem("token")
  return isAuthentication ? (
    <Navigate to="/home" />
  ) : (
    <Navigate to="/login" />
  )
}