// DemoList.js
import React, { useMemo } from "react";

import classes from "./DemoList.module.css";

const DemoList = (props) => {
  const { items, isAscending } = props;

  const sortedList = useMemo(() => {
    console.log("Items sorted");
    const sorter = isAscending ? (a, b) => a - b : (a, b) => b - a;
    return [...items].sort(sorter);
  }, [items, isAscending]);

  console.log("DemoList RUNNING");

  return (
    <div className={classes.list}>
      <h2>{props.title}</h2>
      <ul>
        {sortedList.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default React.memo(DemoList);
