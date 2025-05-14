import React, { useContext, useState } from "react";
import { ThemeContext } from "../context/ThemeContext";

function LoanCalculator() {

  const {theme,currency , setCurrency} = useContext(ThemeContext)

  const [loanAmount, setLoanAmount] = useState("");
  const [annualInterestRate, setAnnualInterestRate] = useState("");
  const [loanTermMonths, setLoanTermMonths] = useState("");

  const [monthlyEMI, setMonthlyEMI] = useState(0);
  const [schedule, setSchedule] = useState([]);
  const [showResult, setShowResult] = useState(false);

  const handleCalculate = (e) => {
    e.preventDefault();
    if (!loanAmount || loanAmount < 1000) {
      alert("Loan amount must be at least 1000.");
      return;
    }
    if (loanAmount <= 0 || annualInterestRate <= 0 || loanTermMonths <= 0) {
      setMonthlyEMI(0);
      setSchedule([]);
      setShowResult(false);
      return;
    }

    const monthlyInterestRate = annualInterestRate / 12 / 100;
    const P = loanAmount;
    const n = loanTermMonths;
    const r = monthlyInterestRate;

    // EMI formula
    const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    setMonthlyEMI(emi);

    let balance = P;
    const newSchedule = [];
    for (let month = 1; month <= n; month++) {
      const interest = balance * r;
      const principal = emi - interest;
      balance = balance - principal;
      newSchedule.push({
        month,
        principal: principal < 0 ? 0 : principal,
        interest: interest < 0 ? 0 : interest,
        remainingBalance: balance < 0 ? 0 : balance,
      });
    }
    setSchedule(newSchedule);
    setShowResult(true);
  };

  function resetTable() {
    setLoanAmount("");
    setAnnualInterestRate("");
    setLoanTermMonths("");
    setMonthlyEMI(0);
    setSchedule([]);
    setShowResult(false);
  }

  const labelColorChange = theme
    ? "bg-black text-white"
    : "bg-white text-black";
  const inputColorChange = theme
    ? "bg-black text-white"
    : "bg-white text-black focus:ring-2 focus:ring-blue";
  const buttonColorChange = theme
    ? "bg-gray-600 text-white hover:bg-gray-900"
    : "bg-indigo-600 text-white hover:bg-indigo-700";
  const resetButtonChange = theme
    ? "border border-gray-600"
    : "border border-indigo-700 ";
  const hoverBg = theme ? 'hover:bg-gray-500' : 'hover:bg-indigo-900'
  const textColor = theme ? 'hover:text-white' : 'hover:text-white'


  return (
    <div
      className={`p-4 transition-colors ${
        theme ? "bg-black" : "bg-white"
      } min-h-screen`}
    >
      <h1 className="text-[25px] font-bold uppercase mb-5">
        Loan Calculator Dashboard
      </h1>

      <form className="mb-7 space-y-4 ">
        <div className="flex space-x-1">
          <div className="relative w-72 ">
            <label
              htmlFor="loanAmount"
              className={`block text-sm font-medium text-gray-700 mb-1 ${labelColorChange}`}
            >
              Loan Amount ({currency})
            </label>
            <input
              required
              type="number"
              id="loanAmount"
              value={loanAmount}
              onChange={(e) => setLoanAmount(Number(e.target.value))}
              className={`{w-full border border-gray-300 rounded px-3 py-4 text-lg outline-none ${inputColorChange}"}`}
            />
          </div>
          <div className="relative w-72 mr-3">
            <label
              htmlFor="interestRate"
              className={`block text-sm font-medium text-gray-700 mb-1 ${labelColorChange}`}
            >
              Annual Interest Rate (%)
            </label>
            <input
              required
              type="number"
              step="0.01"
              id="interestRate"
              value={annualInterestRate}
              onChange={(e) => setAnnualInterestRate(Number(e.target.value))}
              className={`{w-full border border-gray-300 rounded px-3 py-4 text-lg outline-none  ${inputColorChange}"}`}
            />
          </div>
          <div className="relative w-72 mr-4">
            <label
              htmlFor="loanTerm"
              className={`block text-sm font-medium text-gray-700 mb-1 ${labelColorChange}`}
            >
              Loan Term (Months)
            </label>
            <input
              required
              type="number"
              id="loanTerm"
              value={loanTermMonths}
              onChange={(e) => setLoanTermMonths(Number(e.target.value))}
              className={`{w-full border border-gray-300 rounded px-3 py-4 text-lg outline-none ${inputColorChange}"}`}
            />
          </div>
        </div>
      </form>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-4 sm:gap-0">
        <div className="flex gap-2">
          <button
            onClick={handleCalculate}
            type="button"
            className={`{ px-4 py-2 text-sm rounded transition-colors ${hoverBg} ${buttonColorChange}}`}
          >
            CALCULATE
          </button>
          <button
            onClick={resetTable}
            className={`{text-white border-3 rounded px-4 py-2 text-sm font-normal transition-colors whitespace-nowrap ${hoverBg} ${textColor} ${resetButtonChange}}`}
            type="button"
          >
            RESET TABLE
          </button>
        </div>
      </div>
      {showResult && (
        <>
          <div
            className={`mb-2 text-[18px] font-bold ${
              theme ? "text-white" : "text-gray-700"
            }`}
          >
            Monthly EMI: {currency} ${monthlyEMI.toFixed(2)}
          </div>
          <div
            className={`text-xs mb-5 ${
              theme ? "text-gray-300" : "text-gray-600"
            }`}
          >
            <label
              htmlFor="currency"
              className={`mb-1 select-none text-[18px] font-bold mr-2 ${
                theme ? "text-white" : ""
              }`}
            >
              Currency
            </label>
            <select
              id="currency"
              name="currency"
              className={`border rounded px-3 py-2 text-sm w-28 cursor-pointer focus:outline-none focus:ring-1 focus:border-gray-600 ${
                theme
                  ? "bg-black text-white border-gray-600 focus:ring-white"
                  : "bg-white text-black border-gray-300 focus:ring-gray-600"
              }`}
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
            >
              <option>USD</option>
              <option>EUR</option>
              <option>GBP</option>
              <option>INR</option>
              <option>JPY</option>
              <option>CAD</option>
              <option>AUD</option>
            </select>
          </div>

          <div
            className={`text-center border rounded-md shadow-sm overflow-auto max-h-[300px] ${
              theme
                ? "bg-black text-white border-gray-700"
                : "bg-white text-black border-gray-100"
            }`}
          >
            <table
              className={`min-w-full divide-y text-sm ${
                theme ? "divide-gray-700" : "divide-gray-100"
              }`}
            >
              <caption
                className={`text-center p-4 font-normal text-[22px] font-bold ${
                  theme ? "text-white" : "text-gray-900"
                }`}
              >
                Amortization Schedule ({currency})
              </caption>
              <thead
                className={`${theme ? "bg-black" : "bg-white"} sticky top-0`}
              >
                <tr>
                  <th
                    scope="col"
                    className={`px-6 py-3 text-center font-normal text-[18px] font-bold ${
                      theme ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    Month
                  </th>
                  <th
                    scope="col"
                    className={`px-6 py-3 text-center font-normal text-[18px] font-bold ${
                      theme ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    Principal
                  </th>
                  <th
                    scope="col"
                    className={`px-6 py-3 text-center font-normal text-[18px] font-bold ${
                      theme ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    Interest
                  </th>
                  <th
                    scope="col"
                    className={`px-6 py-3 text-center font-normal text-[18px] font-bold ${
                      theme ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    Remaining Balance
                  </th>
                </tr>
              </thead>

              <tbody
                className={`divide-y ${
                  theme
                    ? "divide-gray-700 bg-black text-white"
                    : "divide-gray-100 bg-white text-black"
                }`}
              >
                {schedule.map(
                  ({ month, principal, interest, remainingBalance }) => (
                    <tr key={month}>
                      <td className="px-6 py-3 text-[16px]">{month}</td>
                      <td className="px-6 py-3 text-[16px]">
                        {principal.toFixed(2)} {currency}
                      </td>
                      <td className="px-6 py-3 text-[16px]">
                        {interest.toFixed(2)} {currency}
                      </td>
                      <td className="px-6 py-3 text-[16px]">
                        {remainingBalance.toFixed(2)} {currency}
                      </td>
                    </tr>
                  )
                )}
                {schedule.length === 0 && (
                  <tr>
                    <td
                      colSpan="4"
                      className={`px-6 py-3 text-center ${
                        theme ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      Enter valid loan details to see schedule
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}

export default LoanCalculator;
