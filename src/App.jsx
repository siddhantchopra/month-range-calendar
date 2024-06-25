import { useState } from "react";
import MonthYearPicker from "./MonthRangePicker";
import { labels } from "./MonthRangePicker/constants/labels";

function App() {
  return (
    <>
      <MonthYearPicker
        monhtlyValue={{}}
        monthlistParent={[]}
        getstateOfMonthy={{}}
        labels={labels}
        rangeYear={3}
      />
    </>
  );
}

export default App;
