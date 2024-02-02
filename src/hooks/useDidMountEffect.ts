import { useEffect, useRef, useState } from "react";

export const useDidMountEffect = (func: Function, deps: any[]) => {
    const didMount = useRef(false);
    useEffect(() => {
        if (didMount.current) {
            func();
        } else {
            didMount.current = true;
        }
    }, [...deps]);
};
