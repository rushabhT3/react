// App.js
import React, { useState, useCallback, useMemo } from "react";

import DemoList from "./components/Demo/DemoList";
import Button from "./components/UI/Button/Button";

function App() {
  const [listTitle, setListTitle] = useState("My List");
  const [isAscending, setIsAscending] = useState(true);

  const changeTitleHandler = useCallback(() => {
    setListTitle("New Title");
  }, []);

  const toggleSortOrderHandler = useCallback(() => {
    setIsAscending((prevIsAscending) => !prevIsAscending);
  }, []);

  const listItems = useMemo(() => [5, 3, 1, 10, 9], []);

  return (
    <div className="app">
      <DemoList title={listTitle} items={listItems} isAscending={isAscending} />
      <Button onClick={changeTitleHandler}>Change List Title</Button>
      <Button onClick={toggleSortOrderHandler}>
        Change to {isAscending ? "Descending" : "Ascending"} Order
      </Button>
    </div>
  );
}

export default App;
