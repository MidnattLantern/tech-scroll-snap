import { useState } from "react";
import Styles from "./LandingPage.module.css";
import ScrollPilotProvider from "../scrollPilot/ScrollPilotProvider";
import AboutPage from "./AboutPage";
import CreditsPage from "./CreditsPage";

const LandingPage: React.FC = () => {
    const [renderWindow, setRenderWindow] = useState(2);

    const renderFocusedComponent = () => {
        switch(renderWindow){
            case 1:
                return <>
                <AboutPage />
                </>;
            case 2:
                return <>
                <ScrollPilotProvider />
                </>;
            case 3:
                return <>
                <CreditsPage />
                </>;
            default:
                return <>
                    <h1> MagScroll Demonstration </h1>
                    <p> Developed by Alma Isaksson 2024 </p>
                </>;
        };
    };

    return(<>
        {/*
        <div className={Styles.Header}>
            <button onClick={() => {setRenderWindow(1)}} >About MagScroll</button>
            <button onClick={() => {setRenderWindow(2)}} className={Styles.VIPButton}>Show Demonstration</button>
            <button onClick={() => {setRenderWindow(3)}} >GitHub/ Developer</button>
        </div>
        */}

<h1> MagScroll Demonstration </h1>

        <div className={Styles.MainViewContainer}>
            {renderFocusedComponent()}
        </div>
    </>)
};

export default LandingPage;