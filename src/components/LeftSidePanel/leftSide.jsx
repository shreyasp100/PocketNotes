import NotesGroup from "../NotesGroup/notesGroup";
import StylesLeftSide from "./leftSide.module.css";
import React, { useState, useEffect } from "react";

const LeftSidePanel = ({ handleClick, handleUserIdClicked, groupName, color, create }) => {
  const [storedData, setStoredData] = useState([]);
  const [clickedButton, setClickedButton] = useState(null);

  // Get the stored data from localStorage on mount
  useEffect(() => {
    const storedDataString = localStorage.getItem("groupNamesData");
    const parsedData = JSON.parse(storedDataString) || [];
    setStoredData(parsedData);
  }, []);

  // Create a new data object only when groupName or color changes
  useEffect(() => {
    if (groupName !== "" && create === true) {
      const newId = storedData.length > 0 ? storedData[storedData.length - 1].id + 1 : 1;

      const newData = {
        id: newId,
        groupName: groupName,
        color: color,
        create: create,
      };

      const updatedData = [...storedData, newData];
      setStoredData(updatedData);
      localStorage.setItem("groupNamesData", JSON.stringify(updatedData));
    }
  }, [groupName, color, create, storedData]);

  const handleButtonClick = (buttonId) => {
    setClickedButton(buttonId);
  };

  const buttonStyle = (buttonId) => {
    return {
      backgroundColor: clickedButton === buttonId ? "#F7ECDC" : "transparent",
      color: "white",
      minWidth: "100%",
      minHeight: "61px",
      display: "flex",
      justifyContent: "flex-start",
      borderRadius: "2rem 0rem 0rem 2rem",
    };
  };

  return (
    <div className={StylesLeftSide.leftSidePanel}>
      <h1>Pocket Notes</h1>
      <div className={StylesLeftSide.center}>
        <button
          className={StylesLeftSide.createNotesGroup}
          onClick={() => handleClick(true)}
        >
          <img src="assets/+.svg" alt="+" style={{ minWidth: "21px" }} /> Create Notes group
        </button>
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
                    <NotesGroup
                      groupName={group.groupName}
                      color={group.color}
                      buttonColorId={group.id}
                    />
                  </span>
                </div>
              ) : null
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftSidePanel;