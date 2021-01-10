import React from "react";

const useDocumentTitle = (title, fallbackTitle) => {
    React.useEffect(() => {
        document.title = `${Object.values(title)} cookies - Cookie Clicker Workshop`

        return () => {
            document.title = `${fallbackTitle}`;
        }
    }, [title]);
}

const useKeydown = (code, callback) => {
    React.useEffect(() => {
        const handleKeydown = (ev) => {
            if (ev.code === code) {
                callback();
            }
        };
    
        window.addEventListener("keydown", handleKeydown);
    
        return () => {
            window.removeEventListener("keydown", handleKeydown);
        };
    });
}

//Use LocalStorage
function getSavedValue(key, initialValue){
    const savedValue = JSON.parse(localStorage.getItem(key));
    if(savedValue) return savedValue

    if (initialValue instanceof Function) return initialValue()
    return initialValue
}

const usePersistedState = (key, initialValue) => {
    const [value, setValue] = React.useState(() => {
        return getSavedValue(key, initialValue);
    });

    React.useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [value])

    return [value, setValue];
}

export { useDocumentTitle, useKeydown, usePersistedState };