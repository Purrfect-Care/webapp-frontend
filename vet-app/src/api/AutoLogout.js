import React, { useContext, useEffect, useState } from "react";
import ConfirmationPopup from "../components/ConifrmationPopup/ConfirmationPopup";
import GlobalContext from "../context/GlobalContext";

const AutoLogout = () => {
  const [showWarning, setShowWarning] = useState(false);
  const [warningSeen, setWarningSeen] = useState(false);
  const { setLoggingOut } = useContext(GlobalContext);
  useEffect(() => {
    const checkExpiration = () => {
      const expirationTime = localStorage.getItem("authTokenExpiration");
      if (expirationTime) {
        const currentTime = Math.floor(Date.now() / 1000);

        const timeUntilExpiration = expirationTime - currentTime;
        const warningThreshold = 10 * 60;

        if (timeUntilExpiration <= warningThreshold && !warningSeen) {
          setShowWarning(true);
        }
        if (currentTime > expirationTime) {
          localStorage.removeItem("authToken");
          localStorage.removeItem("authTokenExpiration");
          localStorage.removeItem("employeeData");
          setLoggingOut(true);
          window.location.href = "/login";
        }
      }
    };

    const intervalId = setInterval(checkExpiration, 60000);

    return () => clearInterval(intervalId);
  }, []);

  const cancelWarning = () => {
    setShowWarning(false);
    setWarningSeen(true);
  };

  const lenghtenLogin = () => {
    const currentTime = Math.floor(Date.now() / 1000);
    const newExpirationTime = currentTime + 60 * 60;
    localStorage.setItem("authTokenExpiration", newExpirationTime);
    setShowWarning(false);
  };
  return (
    <>
      {showWarning && (
        <ConfirmationPopup
          message="W obecnej sesji zostało mniej niż 10 minut."
          onConfirm={lenghtenLogin}
          onCancel={cancelWarning}
          onYes="Przedłuż sesję o godzinę"
          onNo="Ok"
        />
      )}
    </>
  );
};

export default AutoLogout;
