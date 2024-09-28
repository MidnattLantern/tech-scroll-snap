import Styles from "./ScrollPilot.module.css";
import { useEffect, useState } from "react";
import ScrollPilot from "./ScrollPilot";
const ScrollPilotProvider: React.FC = () => {
    const [hasLoaded, setHasLoaded] = useState(false);
    const [globalValue1, setGlobalValue1] = useState<number | null | string>(null);
    const [globalValue2, setGlobalValue2] = useState<number | null | string>(null);
    const [globalValue3, setGlobalValue3] = useState<number | null | string>(null);
    const [memoryIndex1, setMemoryIndex1] = useState<number>(0);
    const [memoryIndex2, setMemoryIndex2] = useState<number>(0);
    const [memoryIndex3, setMemoryIndex3] = useState<number>(0);
    const [focusPilot, setFocusPilot] = useState<number | null>(null);
    const library1: (number | null | string)[] = [null, 10, 3, 2, 1, -1];
    const library2: (number | null | string)[] = [null, "h", "s", "c", "d"];
    const library3: (number | null | string)[] = [2, 1, -1];

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

    const handleSetGlobalValue1 = (value: number | null | string) => {
        setGlobalValue1(value);
    };
    const handleSetGlobalValue2 = (value: number | null | string) => {
        setGlobalValue2(value);
    };
    const handleSetGlobalValue3 = (value: number | null | string) => {
        setGlobalValue3(value);
    };

    const handleSubmit = () => {
        const submitData = {
            globalValue1: globalValue1,
            globalValue2: globalValue2,
            globalValue3: globalValue3
        };

        // Log the JSON data to the console (or use it as needed)
        console.log(submitData);
    }

    const renderFocusedComponent = () => {
        switch(focusPilot){
            case 1:
                return <ScrollPilot globalValue={globalValue1} setGlobalValue={handleSetGlobalValue1} memoryIndex={memoryIndex1} setMemoryIndex={setMemoryIndex1} library={library1}/>;
            case 2:
                return <ScrollPilot globalValue={globalValue2} setGlobalValue={handleSetGlobalValue2} memoryIndex={memoryIndex2} setMemoryIndex={setMemoryIndex2} library={library2}/>;
            case 3:
                return <ScrollPilot globalValue={globalValue3} setGlobalValue={handleSetGlobalValue3} memoryIndex={memoryIndex3} setMemoryIndex={setMemoryIndex3} library={library3}/>;
            default:
                return <div className={Styles.UnselectedContainer}></div>;
        };
    };

    return(hasLoaded ? <>
        <p>globalValue1: {globalValue1}</p>
        <p>globalValue2: {globalValue2}</p>
        <p>globalValue3: {globalValue3}</p>

        <button onClick={() => {handleSetFocusPilot(1)}}>Pilot 1</button>
        <button onClick={() => {handleSetFocusPilot(2)}}>Pilot 2</button>
        <button onClick={() => {handleSetFocusPilot(3)}}>Pilot 3</button>
        <button onClick={() => {handleUnselect()}}>Unselect</button>
        <br/>
        <button className={Styles.SubmitButton} onClick={() => {handleSubmit()}}>{"Submit data (to the console)"}</button>

        <div className={Styles.ProviderContainer}>
            {renderFocusedComponent()}
        </div>

        <p>memory 1 {memoryIndex1}</p>
        <p>memory 2 {memoryIndex2}</p>
        <p>memory 3 {memoryIndex3}</p>

        </> : <p>loading</p>)
};

export default ScrollPilotProvider;
