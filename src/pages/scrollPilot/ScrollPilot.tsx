import { useCallback, useEffect, useRef, useState } from "react";
import Styles from "./ScrollPilot.module.css";
import { ReactComponent as HighLighterAsset } from "../../assets/highlighter.svg";
import { ReactComponent as ClearIcon} from "../../assets/clear-icon.svg";

interface ScrollPilotProps {
    globalValue: number | null;
    setGlobalValue: (value: number | null) => void;
    memoryIndex: number;
    setMemoryIndex: (value: number) => void;
    library: (number | null)[];
};

const ScrollPilot: React.FC<ScrollPilotProps> = ({ globalValue, setGlobalValue, memoryIndex, setMemoryIndex, library }) => {
    const [hasLoaded, setHasLoaded] = useState(false);
    const [localValue, setLocalValue] = useState<number | null>(null);
    const [localLibrary, setLocalLibrary] = useState<(number | null)[]>([]);
//    const [scrollLocation, setScrollLocation] = useState(0);
    const scrollContainerRef = useRef<HTMLDivElement | null>(null);
    const localLibraryItemsRef = useRef<(HTMLDivElement | null)[]>([]);
    const [scrollToValue, setScrollToValue] = useState<boolean>(true);

    const handleSetValue = useCallback((value: number | null, index: number ) => {
        const scrollableDiv = document.getElementById((index - 2).toString());
        if (scrollableDiv) {
            scrollableDiv.scrollIntoView({behavior: "smooth"})
        };
        setLocalValue(value);
        console.log("local value:", localValue);
        setGlobalValue(value);
        setMemoryIndex(index);
    }, [setGlobalValue, localValue, setMemoryIndex]);

    const handleScroll = useCallback(() => {
        if (scrollContainerRef.current) {
            const container = scrollContainerRef.current;
            const { scrollTop } = container;

            localLibrary.forEach((value: number | null, index: number) => {
                const item = localLibraryItemsRef.current[index];
                if (item) {
                    const { offsetTop } = item;
                    const closestValue = offsetTop - scrollTop - 100;
                    if (closestValue < 25 && closestValue > -26) {
                        handleSetValue(value, index);
                    };
                };
            });
        };
    }, [handleSetValue, localLibrary]);

    useEffect(() => {
        if (hasLoaded) {
            if(scrollToValue) {
                handleSetValue(globalValue, memoryIndex);
                setScrollToValue(false);
            };

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

        setLocalLibrary(library);
        setLocalValue(globalValue);
        console.log("local value:", localValue )
        setHasLoaded(true);

    }, [globalValue, handleScroll, hasLoaded, library, localValue, scrollToValue, handleSetValue, memoryIndex]);

    return(hasLoaded ? <>

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

export default ScrollPilot;