import { useCallback, useEffect, useRef, useState } from "react";
import Styles from "./ScrollPilot.module.css";
import { ReactComponent as HighLighterAsset } from "../../assets/highlighter.svg";
import { ReactComponent as ClearIcon} from "../../assets/clear-icon.svg";

interface ScrollPilotProps {
    globalValue: number | null | string;
    setGlobalValue: (value: number | null | string) => void;
    memoryIndex: number;
    setMemoryIndex: (value: number) => void;
    library: (number | null | string)[];
};

const ScrollPilot: React.FC<ScrollPilotProps> = ({ globalValue, setGlobalValue, memoryIndex, setMemoryIndex, library }) => {
    const [hasLoaded, setHasLoaded] = useState(false);
    const [showHighlighter, setShowHighlighter] = useState(false);
    const [localValue, setLocalValue] = useState<number | null | string>(null);
    const [localLibrary, setLocalLibrary] = useState<(number | null | string)[]>([]);
//    const [scrollLocation, setScrollLocation] = useState(0);
    const scrollContainerRef = useRef<HTMLDivElement | null>(null);
    const localLibraryItemsRef = useRef<(HTMLDivElement | null)[]>([]);
    const [scrollToValue, setScrollToValue] = useState<boolean>(true);

    const handleSetValue = useCallback((value: number | null | string, index: number ) => {
        const scrollableDiv = document.getElementById((index - 2).toString());
        if (scrollableDiv) {
//            console.log("scrollableDiv",scrollableDiv);
            scrollableDiv.scrollIntoView({behavior: "smooth"})
        };
        setLocalValue(value);
//        console.log("local value:", localValue);
        setGlobalValue(value);
        setMemoryIndex(index);
    }, [setGlobalValue, localValue, setMemoryIndex]);

    const handleScroll = useCallback(() => {
        if (scrollContainerRef.current) {
            const container = scrollContainerRef.current;
            const { scrollTop } = container;

            localLibrary.forEach((value: number | null | string, index: number) => {
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
            setTimeout(() => {
                setShowHighlighter(true);
            }, 400);

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

        if (library.length !== 0) {
            setLocalLibrary(library);
        } else {
            setLocalLibrary([null]); // better to have a null item than nothing at all
        };

        setLocalValue(globalValue);
//        console.log("local value:", localValue);
        setHasLoaded(true);

    }, [globalValue, handleScroll, hasLoaded, library, localValue, scrollToValue, handleSetValue, memoryIndex]);

    return(<>
        <div ref={scrollContainerRef} className={`${hasLoaded ? Styles.AlignScrollContainer : Styles.LoadingContainer}`}>

            <div className={Styles.HighlighterFrame}>
                <HighLighterAsset className={`${showHighlighter ? Styles.Highlighter : Styles.HideHighlighter}`}/>
            </div>

            {hasLoaded ? <>

            <div className={Styles.ScrollContainer}>

                <button id="-2" className={Styles.LibraryItem}/>
                <button id="-1" className={Styles.LibraryItem}/>
                {localLibrary.map((id, index) => (
                    <div
                    key={`${id}-${index}`}
                    id={(index ?? 'null').toString()}
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
        </> : null}
        </div>
    </>)
};

export default ScrollPilot;