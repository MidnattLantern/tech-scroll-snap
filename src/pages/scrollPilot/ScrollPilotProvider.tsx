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
    const library1: (number | null | string)[] = [null, 10, 3, 2, 1, 0, -1, null];
    const library2: (number | null | string)[] = [null, "d", "h", "c", "s", null];
    const library3: (number | null | string)[] = ["♦️", "♥️", null, "♠️", "♣️"];

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

    const [tableData, setTableData] = useState<{ Key: string; Value: number | null | string }[]>([]);

    const handleSubmit = () => {

        const jsonData = [
            { Key: 'globalValue1', Value: globalValue1 },
            { Key: 'globalValue2', Value: globalValue2 },
            { Key: 'globalValue3', Value: globalValue3 },
        ];

        setTableData(jsonData);
        console.log("Submitted data:", tableData);
    };

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
        <p>Selection from Library 1: {globalValue1}</p>
        <p>Selection from Library 2: {globalValue2}</p>
        <p>Selection from Library 3: {globalValue3}</p>

        <button onClick={() => {handleSetFocusPilot(1)}}>Library 1</button>
        <button onClick={() => {handleSetFocusPilot(2)}}>Library 2</button>
        <button onClick={() => {handleSetFocusPilot(3)}}>Library 3</button>
        <button onClick={() => {handleUnselect()}}>Unselect</button>
        <br/>
        <button className={Styles.SubmitButton} onClick={() => {handleSubmit()}}>{"Submit data"}</button>

        <div className={Styles.ProviderContainer}>
            {renderFocusedComponent()}
        </div>


            {tableData.length !== 0 && (<>
                <h1>Submitted data:</h1>
                {tableData.map((id, item) => (
                    <p key={item}>
                        From library: {item + 1}: {id.Value}
                    </p>
                ))}
                <p>Check the console for more details</p>
            </>)}


        </> : <p>loading</p>)
};

export default ScrollPilotProvider;
