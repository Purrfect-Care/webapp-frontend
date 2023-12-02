import React, { useEffect, useState } from 'react';
import ConfirmationPopup from '../components/ConifrmationPopup/ConfirmationPopup';

const AutoLogout = () => {
    const [showWarning, setShowWarning] = useState(false);
    const [warningSeen, setWarningSeen] = useState(false);
    useEffect(() => {
        const checkExpiration = () => {
            const expirationTime = localStorage.getItem('authTokenExpiration');
            if (expirationTime) {
                const currentTime = Math.floor(Date.now() / 1000);
                console.log('expiration time: ', expirationTime);
                console.log('curent time: ', currentTime);
                const timeUntilExpiration = expirationTime - currentTime;
                const warningThreshold = 10 * 60; // 10 minutes in seconds

                if (timeUntilExpiration <= warningThreshold && !warningSeen) {
                    // Show the warning popup
                    setShowWarning(true);
                }
                if (currentTime > expirationTime) {
                    console.log('curent time: ', currentTime);
                    // Token has expired, perform logout
                    localStorage.removeItem('authToken');
                    localStorage.removeItem('authTokenExpiration');
                    localStorage.removeItem('employeeData');
                    // window.location.href = '/login'; // Redirect to the login page
                }
            }
        };

        // Check expiration every minute (adjust the interval as needed)
        const intervalId = setInterval(checkExpiration, 60000);

        // Clear the interval on component unmount
        return () => clearInterval(intervalId);
    }, []);

    const cancelWarning = () => {
        setShowWarning(false);
        setWarningSeen(true);
    }

    const lenghtenLogin = () => {
        const currentTime = Math.floor(Date.now() / 1000);
        const newExpirationTime = currentTime + 60*60;
        localStorage.setItem('authTokenExpiration', newExpirationTime);
        setShowWarning(false);
    }
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