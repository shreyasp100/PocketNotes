import NotesGroup from "../NotesGroup/notesGroup";
import StylesLeftSide from "./leftSide.module.css";
import React, { useState, useEffect, useMemo, useCallback } from "react";

const LeftSidePanel = ({ handleClick, handleUserIdClicked, id, groupName, color, create }) => {
  const [clickedButton, setClickedButton] = useState(null);

  // Memoize stored data to avoid dependency changes in useEffect
  const storedData = useMemo(() => {
    const storedDataString = localStorage.getItem("groupNamesData");
    return JSON.parse(storedDataString) || [];
  }, []);

  // Create a new data object and memoize it
  const newData = useMemo(() => {
    const newId = storedData.length > 0 ? storedData[storedData.length - 1].id + 1 : 1;
    return {
      id: newId,
      groupName: groupName,
      color: color,
      create: create,
    };
  }, [storedData, groupName, color, create]);

  // Memoize submitCheck to avoid dependency changes in useEffect
  const submitCheck = useCallback(() => groupName !== "" && create === true, [groupName, create]);

  useEffect(() => {
    if (submitCheck()) {
      const updatedData = [...storedData, newData];
      localStorage.setItem("groupNamesData", JSON.stringify(updatedData));
    }
  }, [submitCheck, storedData, newData]);

  const handleButtonClick = (buttonId) => {
    setClickedButton(buttonId);
  };

  const buttonStyle = (buttonId) => ({
    backgroundColor: clickedButton === buttonId ? "#F7ECDC" : "transparent",
    color: "white",
    minWidth: "100%",
    minHeight: "61px",
    display: "flex",
    justifyContent: "flex-start",
    borderRadius: "2rem 0rem 0rem 2rem",
  });

  return (
    <div className={StylesLeftSide.leftSidePanel}>
      <h1>Pocket Notes</h1>
      <div className={StylesLeftSide.center}>
        <div>
          <br />
          <div style={{ display: "flex", flexDirection: "column-reverse" }}>
            {storedData.map((group) =>
              group.create ? (
                <div className={StylesLeftSide.notesGroupSlected} key={group.id}>
                  <span
                    className={StylesLeftSide.act}
                    style={buttonStyle(group.id)}
                    onClick={() => {
                      handleUserIdClicked(group.id);
                      handleButtonClick(group.id);
                    }}
                  >
                    <NotesGroup groupName={group.groupName} color={group.color} buttonColorId={group.id} />
                  </span>
                </div>
              ) : null
            )}
          </div>
        </div>
      </div>
      <button className={StylesLeftSide.floatingButton} onClick={() => handleClick(true)}>
        <img src="assets/+.svg" alt="+" style={{ width: "24px", height: "24px" }} />
      </button>
    </div>
  );
};

export default LeftSidePanel;
