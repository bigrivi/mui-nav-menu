import { createChainedFunction } from "@mui/material";
import { useCallback, useState } from "react";

export const useTransitionState = () => {
    const [transitioning, setTransitioning] = useState(false);
    const onTransitionStart = useCallback((originalFunc) => {
        return createChainedFunction(originalFunc, () => {
            setTransitioning(true);
        });
    }, []);
    const onTransitionEnd = useCallback((originalFunc) => {
        return createChainedFunction(originalFunc, () => {
            setTransitioning(false);
        });
    }, []);

    const transitionHandlers = useCallback((original) => {
        return {
            ...original,
            onEnter: onTransitionStart(original?.onEnter),
            onEntered: onTransitionEnd(original?.onEntered),
            onExit: onTransitionStart(original?.onExit),
            onExited: onTransitionEnd(original?.onExited),
        };
    }, []);

    return {
        transitioning,
        transitionHandlers,
    };
};
