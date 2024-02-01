import { createContext, useContext, useMemo } from "react";

const PathContext = createContext<string[]>([]);

export function useConnectedPath(id?: string) {
    const parentIdPath = useContext(PathContext);
    return useMemo(
        () => (id !== undefined ? [...parentIdPath, id] : parentIdPath),
        [parentIdPath, id]
    );
}

export default PathContext;
