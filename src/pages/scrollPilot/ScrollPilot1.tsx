import { useCallback, useEffect, useRef, useState } from "react";
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
//    const [scrollLocation, setScrollLocation] = useState(0);
    const scrollContainerRef = useRef<HTMLDivElement | null>(null);
    const localLibraryItemsRef = useRef<(HTMLDivElement | null)[]>([]);

    const handleSetValue = useCallback((value: number | null, index: number ) => {
        const scrollableDiv = document.getElementById((index - 2).toString());
        if (scrollableDiv) {
            scrollableDiv.scrollIntoView({behavior: "smooth"})
        };
        setLocalValue1(value);
        setGlobalValue1(value);
    }, [setGlobalValue1]);

    const handleScroll = useCallback(() => {
        if (scrollContainerRef.current) {
            const container = scrollContainerRef.current;
            const { scrollTop } = container;
//            setScrollLocation(scrollTop);
        
            localLibrary.forEach((value: number | null, index: number) => {
                const item = localLibraryItemsRef.current[index]; // Access the specific item ref
                if (item) {
                    const { offsetTop } = item; // Retrieve specific information
                    const closestValue = offsetTop - scrollTop - 100;
//                    if (closestValue < 2 && closestValue > -2) {
//                        console.log(value, "is in focus")
//                    };
                    if (closestValue < 25 && closestValue > -26) {
//                        console.log("closest item", item.id, "with index", index);
                        handleSetValue(value, index);
                    };
                };
            });
        };
    }, [handleSetValue, localLibrary]);

    useEffect(() => {
        if (hasLoaded) {
            const container = scrollContainerRef.current;
            let timeoutId: ReturnType<typeof setTimeout>;
    
            const scrollListener = () => {
                if (timeoutId) {
                    clearTimeout(timeoutId);
                };
                timeoutId = setTimeout(() => {
                    handleScroll();
                }, 500);
            };
            if (container) {
                container.addEventListener("scroll", scrollListener);
            }
            return () => {
                if (container) {
                    container.removeEventListener("scroll", scrollListener);
                }
            };
        };

        setLocalLibrary([null, 0, 1, -3, 7, 8, -9, 23]);
        setLocalValue1(globalValue1);
        setHasLoaded(true);


    }, [globalValue1, handleScroll, hasLoaded]);

    return(hasLoaded ? <>

        <p>Local Value: {localValue1}</p>

        <div ref={scrollContainerRef} className={Styles.AlignScrollContainer}>

            <div className={Styles.HighlighterFrame}>
                <HighLighterAsset className={Styles.Highlighter}/>
            </div>

            <div className={Styles.ScrollContainer}>

                <button id="-2" className={Styles.LibraryItem}/>
                <button id="-1" className={Styles.LibraryItem}/>
                {localLibrary.map((id, index) => (
                    <div
                    key={`${id}-${index}`}
                    id={(id ?? 'null').toString()}
                    ref={(el) => (localLibraryItemsRef.current[index] = el)}
                    >
                        <button
                            className={Styles.LibraryItem}
                            id={index.toString()}
                            onClick={() => {handleSetValue(id, index)}}
                        >{id === null ?  <ClearIcon className={Styles.ClearIcon}/> : id}</button>
                    </div>
                ))}

                <button className={Styles.LibraryItem}/>
                <button className={Styles.LibraryItem}/>
            </div>
        </div>

    </> : <p>loading</p>)
};

export default ScrollPilot1;