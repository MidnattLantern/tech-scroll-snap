import Styles from "./ScrollPilot.module.css";
import { useEffect, useState } from "react";
import ScrollPilot1 from "./ScrollPilot1";
import ScrollPilot2 from "./ScrollPilot2";
import ScrollPilot3 from "./ScrollPilot3";
const ScrollPilotProvider: React.FC = () => {
    const [hasLoaded, setHasLoaded] = useState(false);
    const [globalValue1, setGlobalValue1] = useState<number | null>(null);
    const [globalValue2, setGlobalValue2] = useState<number | null>(null);
    const [globalValue3, setGlobalValue3] = useState<number | null>(null);
    const [focusPilot, setFocusPilot] = useState<number | null>(null);

    useEffect(() => {
        setHasLoaded(true);
    }, []);

    const handleSetGlobalValue1 = (value: number | null) => {
        setGlobalValue1(value);
    };
    const handleSetGlobalValue2 = (value: number | null) => {
        setGlobalValue2(value);
    };
    const handleSetGlobalValue3 = (value: number | null) => {
        setGlobalValue3(value);
    };

    const renderFocusedComponent = () => {
        switch(focusPilot){
            case 1:
                return <ScrollPilot1 globalValue1={globalValue1} setGlobalValue1={handleSetGlobalValue1} />;
            case 2:
                return <ScrollPilot2 globalValue2={globalValue2} setGlobalValue2={handleSetGlobalValue2} />;
            case 3:
                return <ScrollPilot3 globalValue3={globalValue3} setGlobalValue3={handleSetGlobalValue3} />;
            default:
                return <h1> --- --- </h1>;
        };
    };

    return(hasLoaded ? <>
    <h1>hello</h1>
        <p>globalValue1: {globalValue1}</p>
        <p>globalValue2: {globalValue2}</p>
        <p>globalValue3: {globalValue3}</p>

        <button onClick={() => {setFocusPilot(1)}}>Pilot 1</button>
        <button onClick={() => {setFocusPilot(2)}}>Pilot 2</button>
        <button onClick={() => {setFocusPilot(3)}}>Pilot 3</button>

        <div className={Styles.ProviderContainer}>
            {renderFocusedComponent()}
        </div>

        </> : <p>loading</p>)
};

export default ScrollPilotProvider;
