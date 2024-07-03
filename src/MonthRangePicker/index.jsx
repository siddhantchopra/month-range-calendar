import { useEffect, useState, useRef } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import PropTypes from "prop-types";
import "./styles/index.css";
import { labels } from "./constants/labels";

function MonthYearPicker({ getstateFromMYP, labels, rangeYear, className }) {
  const months = [
    {
      label: "Jan",
      value: "01"
    },
    {
      label: "Feb",
      value: "02"
    },
    {
      label: "Mar",
      value: "03"
    },
    {
      label: "Apr",
      value: "04"
    },
    {
      label: "May",
      value: "05"
    },
    {
      label: "Jun",
      value: "06"
    },
    {
      label: "Jul",
      value: "07"
    },
    {
      label: "Aug",
      value: "08"
    },
    {
      label: "Sep",
      value: "09"
    },
    {
      label: "Oct",
      value: "10"
    },
    {
      label: "Nov",
      value: "11"
    },
    {
      label: "Dec",
      value: "12"
    },
  ];

  const today = new Date();
  const currentYear = today.getFullYear();
  const [startMonth, setStartMonth] = useState("");
  const [endMonth, setEndMonth] = useState("");
  const inputRef = useRef(null);
  const [startYear, setStartYear] = useState(currentYear);
  const [endYear, setEndYear] = useState('');
  const [focusedInputId, setFocusedInputId] = useState("start-month");
  const [monthlist, setMonths] = useState(months)
  const [dateObj, setDateObj] = useState(null)
  const [displayYear, setDisplayYear] = useState(currentYear);

  useEffect(() => {
    // Focus on the input field when the component mounts
    inputRef.current.focus();
  }, []);

  useEffect(() => {
    const isInRange = (monthValu) => {
      if (!startMonth || !endMonth || !startYear || !endYear) {
        return false; // If any of the dates are not set, return false
      }
      const startDate = new Date(`${startYear}-${startMonth}-01`);
      const endDate = new Date(`${endYear}-${endMonth}-01`);
      const currentDate = new Date(`${displayYear}-${monthValu}-01`);
  
      return currentDate >= startDate && currentDate <= endDate;
    };
  
    const generateMonthClassNames = (month) => {
      const monthValue = parseInt(month.value, 10);
      const isDisabled =
        (displayYear === currentYear && monthValue > today.getMonth() + 1) ||
        (displayYear === currentYear - rangeYear && monthValue < today.getMonth() + 1);
  
      let className = '';
  
      if (!isDisabled) {
        if (monthValue === parseInt(startMonth, 10) && displayYear === parseInt(startYear, 10)) {
          className = 'start';
        } else if (monthValue === parseInt(endMonth, 10) && displayYear === parseInt(endYear, 10)) {
          className = 'end';
        } else if (isInRange(monthValue)) {
          className = 'range';
        }
      }
      
      return {
        ...month,
        disabled: isDisabled,
        className: isDisabled ? '' : className
      };
    };
  
    const mon = monthlist.map(month => generateMonthClassNames(month));
    setMonths(mon);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [displayYear, endMonth]);

  const handleMonthTileClick = (month) => {
    if (focusedInputId === "start-month" && (endYear === '' || displayYear <= endYear)) {
      setStartMonth(month.value);
      setStartYear(displayYear)
      setMonths(prev => prev.map((m) => ({
        ...m,
        className: m.value === month.value ? "start" : "",
      })))
      if(document.getElementById("end-month") !== null) document.getElementById("end-month").focus();
      setDateObj((prev) => ({
        ...prev,
        startDate: `${displayYear}/${month.value}`,
        startMonth: month.value,
        startYear: displayYear,
        selectedMonth: month.label,
       }))
       setEndYear(displayYear)
    } else if(displayYear > startYear || (displayYear === startYear && startMonth < month.value)) {
      setMonths((prev) =>
      prev.map((m) => {
        if (m.value === startMonth) {
          return { ...m, className: "start" };
        }
        return {
          ...m,
          className:
            (m.value === month.value && "end") ||
            (Number(m.value) > Number(startMonth) && Number(m.value) < Number(month.value) && "range") ||
            "",
        };
      })
    );
      setDateObj((prev) => ({
        ...prev,
        endDate: `${displayYear}/${month.value}`,
        endMonth: month.value,
        endYear: displayYear,
        selectedMonth: month.label,
       }))
       setEndYear(displayYear)
      setEndMonth(month.value);
    }
  };

  // useEffect(() => {
  //   const allKeysNotNull = Object.keys(monhtlyValue).every(
  //     (key) => monhtlyValue[key] !== null
  //   );
  //   if (allKeysNotNull) {
  //     setStartMonth(monhtlyValue.startMonth);
  //     setStartYear(monhtlyValue.startYear);
  //     setEndMonth(monhtlyValue.endMonth);
  //     setEndYear(monhtlyValue.endYear);
  //     setMonths(monthlistParent)
  //     setDisplayYear(monhtlyValue.startYear)
  //   }
  // }, [monhtlyValue]);

  const onClickYear = (e) => {
      if (e.currentTarget.id === 'minus') {
    if (displayYear > currentYear - rangeYear) {
      setDisplayYear(displayYear - 1);
    }
  }
  if (e.currentTarget.id === 'plus') {
    if (displayYear < currentYear) {
      setDisplayYear(displayYear + 1);
    }
  }
  };
 
  const handleApply=()=>{
    getstateFromMYP({
      ...dateObj
    }, monthlist);
  }
  const handleCancel=()=>{
    inputRef.current.focus();
    setStartMonth("");
    setStartYear(currentYear);
    setEndMonth("");
    setEndYear(currentYear);
    getstateFromMYP({
      endDate: null,
      endMonth: null,
      startDate: null,
      startMonth: null
    }, false);
  }

  return (
    <div className={`month-year-picker ${className}`}>
      <div className="date-inputs">
        <input
          type="text"
          id="start-month"
          ref={inputRef}
          readOnly
          placeholder={startMonth === "" ? labels.startMonth : ""}
          value={startMonth === "" ? "" : `${startYear}-${startMonth}`}
          onChange={(e) => {
            const [month, year] = e.target.value.split(" ");
            setStartMonth(month);
            setStartYear(year);
          }}
          onFocus={(e)=> {setFocusedInputId(e.target.id)}}
        />
        <span className="fwd-arr">
        <FaArrowRightLong/>
          </span>
        <input
          type="text"
          id="end-month"
          readOnly
          placeholder={endMonth === "" ? labels.endMonth : ""}
          value={endMonth === "" ? "" : `${endYear}-${endMonth}`}
          onChange={(e) => {
            const [month, year] = e.target.value.split(" ");
            setEndMonth(month);
            setEndYear(year);
          }}
          onFocus={(e)=> {setFocusedInputId(e.target.id)}}
        />
      </div>
      <div className="year-display">
        <button type="button" id="minus" onClick={onClickYear}>
        <FaChevronLeft />
          </button>
        {displayYear}
        <button type="button" id="plus" onClick={onClickYear}>
        <FaChevronRight/>
          </button>
      </div>
      <div className="month-tiles">
        {monthlist.map((month, index) => (
          <button type="button" 
            key={index}
            className={`month-tile brd-none ${month.className} ${month.disabled ? 'disabled': ''}`}
            onClick={() => handleMonthTileClick(month)}
            disabled={month.disabled}
          >
            {month.label}
          </button>
        ))}
      </div>
      <div className="btn-grp-monthly">
        <button type="button" className="btn cancel"
        onClick={handleCancel}
        >
          {labels.cancel}
        </button>
        <button type="button" 
        className={`btn green ${endMonth === "" ? 'disabled': ''}`} 
        disabled={endMonth === ""}
        onClick={handleApply}
        >
          {labels.confirm}
        </button>
      </div>
    </div>
  );
}

MonthYearPicker.defaultProps = {
  labels: labels,
  rangeYear: 2,
  className: 'yourOwnClass'
};

MonthYearPicker.propTypes = {
  getstateFromMYP: PropTypes.func.isRequired,
  labels: PropTypes.instanceOf(Object),
  rangeYear: PropTypes.number,
  className: PropTypes.string
};

export default MonthYearPicker;
