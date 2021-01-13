import React from 'react';
import { usePersistedState } from "../hooks/custom-hooks";
import items from "../data/data";

export const GameContext = React.createContext(null);

export const GameProvider = ({ children }) => {
    const [numCookies, setNumCookies] = usePersistedState("numCookies", 1000);
    const [purchasedItems, setPurchasedItems] = usePersistedState(
        "purchasedItems",
        {
            cursor: 0,
            grandma: 0,
            farm: 0,
        }
    );
    const [time, setTime] = usePersistedState('time', 0);
    const [timeElapsed, setTimeElapsed] = usePersistedState('timeElapsed', 0);

    //Calculating cookies
    const calculateCookiesPerSecond = (purchasedItems) => {
        return Object.keys(purchasedItems).reduce((acc, itemId) => {
            const numOwned = purchasedItems[itemId];
            const item = items.find((item) => item.id === itemId);
            const value = item.value;
        
            return acc + value * numOwned;
        }, 0);
    };

//Cookies counter after the window is closed
    React.useEffect(() => { //Can probably remove the useEffect?
        const handleUnload = (ev) => {
            ev.preventDefault();
            ev.returnValue='';
            // alert('TEST');
            setTime(Date.now());
        }
        window.onbeforeunload = handleUnload;
        // console.log(time, 'time');
        }, []);

        
    React.useEffect(() => {
        const timeWhenLoaded = Date.now();
        const timeDiff = timeWhenLoaded - time;
        setTimeElapsed(timeDiff);
        // setNumCookies(numCookies + (timeElapsed ));
        // console.log(timeDiff,"timeDiff")
    }, [])
    // console.log(timeElapsed,'GameContext');

    return (
    <GameContext.Provider
        value={{
            numCookies,
            setNumCookies,
            purchasedItems,
            setPurchasedItems,
            cookiesPerSecond: calculateCookiesPerSecond(purchasedItems),
            timeElapsed,
            setTimeElapsed,
        }}
    >
        {children}
    </GameContext.Provider>
    );
};