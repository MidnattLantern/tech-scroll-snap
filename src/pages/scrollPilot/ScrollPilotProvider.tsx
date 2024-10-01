import Styles from "./ScrollPilot.module.css";
import { useEffect, useState } from "react";
import ScrollPilot from "./ScrollPilot";
import { ReactComponent as ProviderDecoratorLeft} from "../../assets/provider-decorator-left.svg";
import { ReactComponent as ProviderDecoratorRight} from "../../assets/provider-decorator-right.svg";

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

        <div>

            <button className={Styles.SelectLibraryButton} onClick={() => {handleSetFocusPilot(1)}}>Library 1</button>
            <button className={Styles.SelectLibraryButton} onClick={() => {handleSetFocusPilot(2)}}>Library 2</button>
            <button className={Styles.SelectLibraryButton} onClick={() => {handleSetFocusPilot(3)}}>Library 3</button>

            <div className={Styles.ProviderContainer}>
                <div className={Styles.ProviderContainerDecoratorContainer}><ProviderDecoratorLeft className={Styles.ProviderContainerDecorator} /></div>
                {renderFocusedComponent()}
                <div className={Styles.ProviderContainerDecoratorContainer}><ProviderDecoratorRight className={Styles.ProviderContainerDecorator} /></div>
            </div>

            <button className={Styles.SubmitButton} onClick={() => {handleSubmit()}}>{"Submit data"}</button>

        </div>

        <div className={Styles.StatusBar}>
            <table className={Styles.GlobalValueDivision}>
                <tr>
                    <td className={Styles.StatusBarContent}>Selection from Library 1:</td>
                    <td className={Styles.StatusBarContent}>{globalValue1 !== null ? globalValue1 : <>-</>}</td>
                </tr>
                <tr>
                    <td className={Styles.StatusBarContent}>Selection from Library 2:</td>
                    <td className={Styles.StatusBarContent}>{globalValue2 !== null ? globalValue2 : <>-</>}</td>
                </tr>
                <tr>
                    <td className={Styles.StatusBarContent}>Selection from Library 3:</td>
                    <td className={Styles.StatusBarContent}>{globalValue3 !== null ? globalValue3 : <>-</>}</td>
                </tr>
            </table>

            <table className={Styles.AlignSubmittedDataText}>
                <tr>
                    <td className={Styles.StatusBarContent}>Submitted data:</td>
                </tr>
                <tr>
                    <td className={Styles.StatusBarContent}>{"(More in the console)"}</td>
                </tr>
            </table>

            <table className={Styles.SubmittedDataDivision}>
                    {tableData.length !== 0 && (<>
                        {tableData.map((id, item) => (<>
                            <tr key={item}>
                                <td className={Styles.StatusBarContent}>From library:</td>
                                <td className={Styles.StatusBarContent}>{item + 1}: {id.Value !== null ? id.Value : <>-</>}</td>
                            </tr>
                        </>))}
                    </>)}
            </table>

            <table className={Styles.EtcDivision}>
                <tr>
                    <td className={Styles.StatusBarContent}>Alma Isaksson, aka "Midnatt Lantern" - 2024</td>
                </tr>
                <tr>
                    <td className={Styles.StatusBarContent}>Website: <a href="https://midnattlantern.github.io/ali_resume/" target="_blank" rel="noopener noreferrer">midnattlantern.github.io/ali_resume</a></td>
                </tr>
                <tr>
                    <td className={Styles.StatusBarContent}>Repository: <a href="https://github.com/MidnattLantern/tech-scroll-snap/" target="_blank" rel="noopener noreferrer">github.com/MidnattLantern/tech-scroll-snap</a></td>
                </tr>
            </table>

        </div>

    </> : <p>loading</p>)
};

export default ScrollPilotProvider;
