import { useEffect, useState } from "react";
import Styles from "./ScrollPilot.module.css";

interface ScrollPilot1Props {
    globalValue1: number | null;
    setGlobalValue1: (value: number | null) => void; // Accepts a function that takes a number or null
};

const ScrollPilot1: React.FC<ScrollPilot1Props> = ({ globalValue1, setGlobalValue1 }) => {
    const [hasLoaded, setHasLoaded] = useState(false);
    const [localValue1, setLocalValue1] = useState<number | null>(null);
    const [localLibrary, setLocalLibrary] = useState<(number | null)[]>([]);

    useEffect(() => {
        setLocalLibrary([1, 3, 6, 2, -5, -2, 8, 8]);
        setLocalValue1(globalValue1);
        setHasLoaded(true);
    }, [globalValue1]);

    const scrollToElement = () => {
        const element = document.getElementById("2");
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    }

    const handleSetValue = (value: number | null) => {
        setLocalValue1(value);
        setGlobalValue1(value);
    }

    return(hasLoaded ? <>
    
    <button onClick={() => {scrollToElement()}}>test</button>

        <h1>Pilot 1</h1>
        <p>Local Value: {localValue1}</p>

        <div className={Styles.ScrollContainer}>
            <button onClick={() => handleSetValue(null)}>Clear</button>
            {localLibrary.map((id, index) => (
                <div key={`${id}-${index}`} id={(id ?? 'null').toString()}>
                    <button id={index.toString()} onClick={() => {handleSetValue(id)}}>id: {id} {index}</button>
                </div>
            ))}
        </div>

    </> : <p>loading</p>)
};

export default ScrollPilot1;