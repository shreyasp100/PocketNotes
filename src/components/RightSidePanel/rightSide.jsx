import StyleRightSide from "./rightSide.module.css";

const RightSidePanel = () => {
  return (
    <>
      <div className={StyleRightSide.rightSidePanel}>
        <div className={StyleRightSide.image}>
          <img
            src="assets/homepage.svg"
            alt="homepage"
            style={{ width: "50vw" }}
          />
          <div>
            <div className={StyleRightSide.imageText1}>Pocket Notes</div>
            <div className={StyleRightSide.imageText2}>
              Send and receive messages without keeping your phone online.
              <br />
              Use Pocket Notes on up to 4 linked devices and 1 mobile phone
            </div>
          </div>
          <div className={StyleRightSide.endToEnd}><img src="assets/EncryptedImage.svg" alt="endToEndEncryptedImage"/> end-to-end encrypted</div>
        </div>
          </div>
    </>
  );
};

export default RightSidePanel;
