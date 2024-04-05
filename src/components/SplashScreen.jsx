import React, { useEffect } from "react";
import "./SplashScreen.css"; // Import the CSS for the splash screen

const SplashScreen = () => {
  useEffect(() => {
    const splashImage = document.querySelector(".splash__image");

    const splashExit = (el) => {
      el.classList.add("splash__image--exit");
      el.parentNode.classList.add("splash--exit");
    };

    const timer = setTimeout(() => {
      splashExit(splashImage);
    }, 3000);

    // Clear the timer on component unmount
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="splash">
      <img src="logo.png" alt="Splash Image" className="splash__image" />
    </div>
  );
};

export default SplashScreen;
