const ProgressBar = ({ progress }) => {
    return (
      <div style={progressBarStyles.progressBarContainer}>
        <div style={{ ...progressBarStyles.progressBar, width: `${progress}%` }}></div>
      </div>
    );
  };
  
  const progressBarStyles = {
    progressBarContainer: {
      height: '13px',
      width: "100%",
      backgroundColor: "#e0e0df",
      borderRadius: "10px",
      overflow: "hidden",
    },
    progressBar: {
      height: "100%",
      backgroundColor: "#BFC6F4",
      borderRadius: "10px",
      transition: "width 0.5s ease-in-out",
      margin: 0,
    },
  };
  
  export default ProgressBar;  