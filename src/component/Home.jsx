import React , {useState , useEffect} from 'react'
import LoanCalculator from './LoanCalculator'
import NavbarIcon from './NavbarIcon'

const Home = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);
  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      <NavbarIcon darkMode={darkMode} setDarkMode={setDarkMode} />
      <LoanCalculator darkMode={darkMode} />
    </div>
  )
}

export default Home

