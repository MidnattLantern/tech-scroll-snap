import { useEffect, useState } from "react";
import Styles from "./ScrollPilot.module.css";
import { ReactComponent as HighLighterAsset } from "../../assets/highlighter.svg";
import { ReactComponent as ClearIcon} from "../../assets/clear-icon.svg";

interface ScrollPilot1Props {
    globalValue1: number | null;
    setGlobalValue1: (value: number | null) => void; // Accepts a function that takes a number or null
};

const ScrollPilot1: React.FC<ScrollPilot1Props> = ({ globalValue1, setGlobalValue1 }) => {
    const [hasLoaded, setHasLoaded] = useState(false);
    const [localValue1, setLocalValue1] = useState<number | null>(null);
    const [localLibrary, setLocalLibrary] = useState<(number | null)[]>([]);

    useEffect(() => {
        setLocalLibrary([0, 1, -3, 7, 8]);
        setLocalValue1(globalValue1);
        setHasLoaded(true);

//        const elementTest = document.getElementById("testy")
//        console.log("test:", elementTest?.scrollHeight);
    }, [globalValue1]);

    const handleSetValue = (value: number | null, index: number ) => {

        const scrollableDiv = document.getElementById((index - 2).toString());
        if (scrollableDiv) {
            scrollableDiv.scrollIntoView({behavior: "smooth"})
        }

        setLocalValue1(value);
        setGlobalValue1(value);
    }

    return(hasLoaded ? <>

        <p>Local Value: {localValue1}</p>

    <div className={Styles.AlignScrollContainer}>

        <div className={Styles.HighlighterFrame}>
             <HighLighterAsset className={Styles.Highlighter}/>
        </div>

            <div className={Styles.ScrollContainer}>

                <button id="-3" className={Styles.LibraryItem}/>
                <button id="-2" className={Styles.LibraryItem}/>

                <button id="-1" className={Styles.LibraryItem} onClick={() => handleSetValue(null, -1)}>
                    <ClearIcon className={Styles.ClearIcon}/>
                </button>
                {localLibrary.map((id, index) => (
                    <div key={`${id}-${index}`} id={(id ?? 'null').toString()}>
                        <button
                            className={Styles.LibraryItem}
                            id={index.toString()}
                            onClick={() => {handleSetValue(id, index)}}
                        >{id}</button>
                    </div>
                ))}

                <button className={Styles.LibraryItem}/>
                <button className={Styles.LibraryItem}/>
            </div>
    </div>

    </> : <p>loading</p>)
};

export default ScrollPilot1;