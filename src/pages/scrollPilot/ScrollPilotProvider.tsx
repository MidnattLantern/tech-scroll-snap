import Styles from "./ScrollPilot.module.css";
import { useEffect, useState } from "react";
import ScrollPilot from "./ScrollPilot";
const ScrollPilotProvider: React.FC = () => {
    const [hasLoaded, setHasLoaded] = useState(false);
    const [globalValue1, setGlobalValue1] = useState<number | null>(null);
    const [globalValue2, setGlobalValue2] = useState<number | null>(null);
    const [globalValue3, setGlobalValue3] = useState<number | null>(null);
    const [focusPilot, setFocusPilot] = useState<number | null>(null);
    const library1: (number | null)[] = [null, 9, 1, null, -3, 7, 8, -9, 23];
    const library2: (number | null)[] = [89, null, null, -9, 23];
    const library3: (number | null)[] = [34, null];

    useEffect(() => {
        setHasLoaded(true);
    }, []);

    const handleUnselect = () => {
        setFocusPilot(null);
    };
    const handleSetFocusPilot = async (target: number | null) => {
        await handleUnselect();
        setFocusPilot(target);
    };

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
                return <ScrollPilot globalValue1={globalValue1} setGlobalValue1={handleSetGlobalValue1} library={library1}/>;
            case 2:
                return <ScrollPilot globalValue1={globalValue2} setGlobalValue1={handleSetGlobalValue2} library={library2}/>;
            case 3:
                return <ScrollPilot globalValue1={globalValue3} setGlobalValue1={handleSetGlobalValue3} library={library3}/>;
            default:
                return <h1> --- --- </h1>;
        };
    };

    return(hasLoaded ? <>
    <h1>hello</h1>
        <p>globalValue1: {globalValue1}</p>
        <p>globalValue2: {globalValue2}</p>
        <p>globalValue3: {globalValue3}</p>

        <button onClick={() => {handleSetFocusPilot(1)}}>Pilot 1</button>
        <button onClick={() => {handleSetFocusPilot(2)}}>Pilot 2</button>
        <button onClick={() => {handleSetFocusPilot(3)}}>Pilot 3</button>
        <button onClick={() => {handleUnselect()}}>Unselect</button>

        <div className={Styles.ProviderContainer}>
            {renderFocusedComponent()}
        </div>

        </> : <p>loading</p>)
};

export default ScrollPilotProvider;
