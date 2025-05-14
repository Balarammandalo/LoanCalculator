import React, { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../context/ThemeContext";
import NavbarIcon from "./NavbarIcon";

function ExchangeLive() {
  const [exchangeRates, setExchangeRates] = useState({});
  const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);

    const { theme ,currency } = useContext(ThemeContext);
    
  const rowsPerPage = 10;
    useEffect(() => {
        fetch(`https://v6.exchangerate-api.com/v6/aac449ee9801dc935814d1c0/latest/${currency}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.result === "success") {
          setExchangeRates(data.conversion_rates);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching exchange rates:", error);
        setLoading(false);
      });
  }, []);

  const allRates = Object.entries(exchangeRates);
  const totalPages = Math.ceil(allRates.length / rowsPerPage);
  const paginatedRates = allRates.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };
    
    const bgColorChnge = theme ? 'bg-black text-white' : 'bg-white text-black'
    const tableColorChange = theme ? 'bg-gray-900 text-white' : 'bg-white text-black'

  return (
      <>
          <NavbarIcon />
      <div className={`p-8 font-sans  ${bgColorChnge} `}>
        <h1 className="text-2xl font-bold mb-6">
          Live Exchange Rates (Base: {currency})
        </h1>
        <table className="w-full border-collapse mt-4">
          <thead>
                <tr className={`${tableColorChange}`}>
              <th className="py-3 px-4 border-b">Currency</th>
              <th className="py-3 px-4 border-b">Rate</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="2" className="py-3 px-4">
                  Loading...
                </td>
              </tr>
            ) : (
              paginatedRates.map(([currency, rate]) => (
                <tr key={currency}>
                  <td className="py-3 px-4 border-b">{currency}</td>
                  <td className="py-3 px-4 border-b">{rate.toFixed(4)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {!loading && (
          <div className="flex items-center justify-end mt-6">
            <div className="text-sm">Rows per page:</div>
            <div className="text-sm">
              {(currentPage - 1) * rowsPerPage + 1}–
              {Math.min(currentPage * rowsPerPage, allRates.length)} of{" "}
              {allRates.length}
            </div>
            <div className="flex items-center space-x-2 ml-3">
              <button
                onClick={handlePrev}
                disabled={currentPage === 1}
                className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
              >
                &#x276E;
              </button>
              <button
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
              >
                &#x276F;
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default ExchangeLive;
