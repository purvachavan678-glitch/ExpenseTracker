import Home from './Navbar/Home'
import './ExpenseList.css'
import { Link } from 'react-router-dom'
const ExpenseList = () => {


    return (

        <div>
            <Home />
            <h2>ExpenseList</h2>
            <div className='cards'><Link to="/expense"><button><h2 className='h2'>Transaction Card</h2></button></Link></div>
            <div className='cards'><Link to="/financialReports"><button><h2 className='h2'>Financial Reports</h2></button></Link></div>
        </div>
    )
}

export default ExpenseList