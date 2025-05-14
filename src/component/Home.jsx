import React , { useEffect , useContext} from 'react'
import LoanCalculator from './LoanCalculator'
import NavbarIcon from './NavbarIcon'
import ExchangeLive from './ExchangeLive';
import { ThemeContext } from '../context/ThemeContext';

const Home = () => {
  const { theme} = useContext(ThemeContext)
  
  useEffect(() => {
    if (theme) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${theme ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      <NavbarIcon />
      <LoanCalculator/>
    </div>
  )
}

export default Home

