import React, { useState } from "react";
import LeftSidePanel from "../LeftSidePanel/leftSide";
import RightSidePanel from "../RightSidePanel/rightSide";
import StyleHomePage from "./homePage.module.css";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import Notes from "../Notes/notes";

const HomePage = () => {
    const [open, setOpen] = React.useState(false);
    const [colorChoice, setColorChoice] = React.useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [colorgroupChoice, setColorgroupChoice] = useState(false);

    const [userIdClicked, setUserIdClicked] = useState(0);

    const handleUserIdClicked = (IDnum) => {
        setUserIdClicked(IDnum);
    };

    // Setting stored data as default
    const [createGroup, setCreateGroup] = useState({
        id: 0,
        groupName: "",
        color: "",
        create: false,
    });

    const { id, groupName, color, create } = createGroup;

    const submitCheck = () => {
        return colorChoice === true && groupName !== "";
    };

    const handleClick = (open) => {
        setOpen(open);
    };

    const handleNotesChange = (e) => {
        setCreateGroup({ ...createGroup, groupName: e.target.value });
        setColorgroupChoice(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent the default form submission behavior
        if (submitCheck() === true) {
            setCreateGroup({ ...createGroup, create: true });
            setOpen(false);
        }
    };

    // Color functions
    const funColor1 = () => setCreateGroup({ ...createGroup, color: "#B38BFA" }) || setColorChoice(true);
    const funColor2 = () => setCreateGroup({ ...createGroup, color: "#FF79F2" }) || setColorChoice(true);
    const funColor3 = () => setCreateGroup({ ...createGroup, color: "#43E6FC" }) || setColorChoice(true);
    const funColor4 = () => setCreateGroup({ ...createGroup, color: "#F19576" }) || setColorChoice(true);
    const funColor5 = () => setCreateGroup({ ...createGroup, color: "#0047FF" }) || setColorChoice(true);
    const funColor6 = () => setCreateGroup({ ...createGroup, color: "#6691FF" }) || setColorChoice(true);

    return (
        <>
            <div className={StyleHomePage.homeMainPage}>
                {/* Desktop version */}
                {submitCheck() ? (
                    <div className={StyleHomePage.hideWhenMobile}>
                        <LeftSidePanel
                            handleClick={handleClick}
                            handleUserIdClicked={handleUserIdClicked}
                            id={id}
                            groupName={groupName}
                            color={color}
                            create={create}
                        />
                    </div>
                ) : (
                    <div className={StyleHomePage.hideWhenMobile}>
                        <LeftSidePanel handleClick={handleClick} handleUserIdClicked={handleUserIdClicked} />
                    </div>
                )}
                {userIdClicked > 0 ? (
                    <div className={StyleHomePage.hideWhenMobile}>
                        <Notes userIdClicked={userIdClicked} />
                    </div>
                ) : (
                    <div className={StyleHomePage.hideWhenMobile}>
                        <RightSidePanel />
                    </div>
                )}

                {/* Mobile version */}
                {submitCheck() && isVisible ? (
                    <div className={StyleHomePage.hideWhenPc}>
                        <LeftSidePanel
                            handleClick={handleClick}
                            handleUserIdClicked={handleUserIdClicked}
                            id={id}
                            groupName={groupName}
                            color={color}
                            create={create}
                        />
                    </div>
                ) : (
                    isVisible && (
                        <div className={StyleHomePage.hideWhenPc} onClick={() => setIsVisible(false)}>
                            <LeftSidePanel handleClick={handleClick} handleUserIdClicked={handleUserIdClicked} />
                            {console.log(isVisible)}
                        </div>
                    )
                )}
                {userIdClicked > 0 ? (
                    <div className={StyleHomePage.hideWhenPc}>
                        <Notes userIdClicked={userIdClicked} />
                    </div>
                ) : (
                    open > 0 && (
                        <div className={StyleHomePage.hideWhenPc}>
                            <LeftSidePanel
                                handleClick={handleClick}
                                handleUserIdClicked={handleUserIdClicked}
                                id={id}
                                groupName={groupName}
                                color={color}
                                create={create}
                            />
                        </div>
                    )
                )}
            </div>

            {/* Modal */}
            <Modal
                open={open}
                onClose={() => {
                    setOpen(false);
                    window.location.reload();
                }}
                closeOnOverlayClick={true}
                center={true}
                showCloseIcon={false}
            >
                <h2 className={StyleHomePage.Text1}>Create New Notes group</h2>
                <form>
                    <p>
                        <label htmlFor="GroupName">
                            <span className={StyleHomePage.Text2}> Group Name</span>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <input
                                type="text"
                                placeholder="   Enter your group name...."
                                className={StyleHomePage.placeHold}
                                onChange={handleNotesChange}
                            />
                            {colorgroupChoice === false && groupName === "" && (
                                <p style={{ color: "red" }}>Please Enter Group Name!</p>
                            )}
                        </label>
                    </p>
                    <p className={StyleHomePage.Choosecolour}>
                        <label htmlFor="Choosecolour">
                            <span className={StyleHomePage.Text2}>Choose colour</span>
                            <span className={StyleHomePage.ChoosecolourBreak}>
                                &nbsp;&nbsp;
                                <button type="button" className={StyleHomePage.colorButton1} onClick={funColor1}></button>
                                &nbsp;&nbsp;
                                <button type="button" className={StyleHomePage.colorButton2} onClick={funColor2}></button>
                                &nbsp;&nbsp;
                                <button type="button" className={StyleHomePage.colorButton3} onClick={funColor3}></button>
                                &nbsp;&nbsp;
                                <button type="button" className={StyleHomePage.colorButton4} onClick={funColor4}></button>
                                &nbsp;&nbsp;
                                <button type="button" className={StyleHomePage.colorButton5} onClick={funColor5}></button>
                                &nbsp;&nbsp;
                                <button type="button" className={StyleHomePage.colorButton6} onClick={funColor6}></button>
                                &nbsp;&nbsp;
                            </span>
                        </label>
                    </p>
                    {colorChoice === false && <p style={{ color: "red" }}>Please Choose The Color!</p>}
                    <input
                        type="submit"
                        value="Create"
                        className={StyleHomePage.create}
                        onClick={handleSubmit}
                    />
                </form>
            </Modal>
        </>
    );
};

export default HomePage;
