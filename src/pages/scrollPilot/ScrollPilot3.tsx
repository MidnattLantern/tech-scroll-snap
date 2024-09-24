import { useEffect, useState } from "react";
import "./ScrollPilot.module.css";

interface ScrollPilot2Props {
    globalValue3: number | null;
    setGlobalValue3: (value: number | null) => void; // Accepts a function that takes a number or null
};

const ScrollPilot1: React.FC<ScrollPilot2Props> = ({ globalValue3, setGlobalValue3 }) => {
    const [hasLoaded, setHasLoaded] = useState(false);
    const [localValue2, setLocalValue2] = useState<number | null>(null);
    const [localLibrary, setLocalLibrary] = useState<(number | null)[]>([]);

    useEffect(() => {
        setLocalLibrary([4]);
        setLocalValue2(globalValue3);
        setHasLoaded(true);
    }, [globalValue3]);

    const handleSetValue = (value: number | null) => {
        setLocalValue2(value);
        setGlobalValue3(value);
    }

    return(hasLoaded ? <>
        <h1>Pilot 3</h1>
        <p>Local Value: {localValue2}</p>

        <button onClick={() => handleSetValue(null)}>Clear</button>
        {localLibrary.map((id, index) => (
          <div key={`${id}-${index}`} id={(id ?? 'null').toString()}>
            <button id={index.toString()} onClick={() => {handleSetValue(id)}}>id: {id}</button>
          </div>
        ))}
    </> : <p>loading</p>)
};

export default ScrollPilot1;