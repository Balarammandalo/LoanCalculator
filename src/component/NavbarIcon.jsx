import React,{useState}  from 'react'
import { Link } from 'react-router-dom'

const NavbarIcon = ({darkMode , setDarkMode}) => {
    const [open, setOpen] = useState(false)

    const bgColor = darkMode ? 'bg-gray-500' : 'bg-indigo-500'
    const textColor = darkMode ? 'text-white' : 'text-white'
    const borderColor = darkMode ? 'border-gray-600' : 'border-gray-300'
    const hoverBg = darkMode ? 'hover:bg-black' : 'hover:bg-indigo-700'


    return (
        <nav className={`w-full flex items-center justify-between border-b ${borderColor} ${bgColor} relative transition-all p-4  text-center`}>
            <h1 className={`text-[20px] font-bold uppercase ${textColor}`}>Loan Calculator</h1>          
            
            <div className="hidden sm:flex items-center gap-8 mb-4 mt-2">
                <Link className={`${textColor} hover:underline text-[16px] font-bold`} to="/">Home</Link>
                <Link className={`${textColor} hover:underline text-[16px] font-bold`} to="/exchange">Exchange Rate (Live)</Link>
                <Link className={`${textColor} hover:underline text-[16px] font-bold`} to="/error">Error</Link>
            
                <div className="flex flex-wrap items-center justify-center gap-12">
                    <label className="relative inline-flex items-center cursor-pointer text-gray-500 gap-3">
                        <input
                        type="checkbox"
                        className={`sr-only peer  ${hoverBg}`}
                        checked={darkMode}
                        onChange={() => setDarkMode(!darkMode)}
                        />
                        <div
                        className={`w-16 h-8 rounded-full transition-colors duration-200 ${
                            darkMode ? 'bg-slate-300' : 'bg-indigo-900'
                        }`}
                        ></div>
                        <span
                            className={`dot absolute left-1 top-1 w-6 h-6 bg-white rounded-full transition-transform duration-200 ease-in-out ${
                                darkMode ? 'translate-x-8' : ''
                            }`}
                            ></span>
                    </label>
                </div>

            </div>

            <button onClick={() => open ? setOpen(false) : setOpen(true)} aria-label="Menu" className="sm:hidden">
                <svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="21" height="1.5" rx=".75" fill="#426287" />
                    <rect x="8" y="6" width="13" height="1.5" rx=".75" fill="#426287" />
                    <rect x="6" y="13" width="15" height="1.5" rx=".75" fill="#426287" />
                </svg>
            </button>

            <div
                className={`${open ? 'flex' : 'hidden'} absolute top-[60px] left-0 w-full ${bgColor} shadow-md py-4 flex-col items-start gap-2 px-5 text-sm sm:hidden transition-all`}>
                <Link to="/" className={`block ${textColor}`}>Home</Link>
                <Link to="/exchange" className={`block ${textColor}`}>Exchange Rate (Live)</Link>
                <Link to="/error" className={`block ${textColor}`}>Error</Link>
                <button
                onClick={() => setDarkMode(!darkMode)}
                className="cursor-pointer px-6 py-2 mt-2 bg-indigo-500 hover:bg-indigo-600 transition text-white rounded-full text-sm">
                Toggle {darkMode ? 'Light' : 'Dark'} Mode
                </button>
            </div>
        </nav>
    )
}

export default NavbarIcon
