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

export { useDocumentTitle, useKeydown };