import React, { FocusEvent, ReactNode, useRef } from "react";
import classNames from "classnames";
import { useMenuContext } from "./contexts/MenuContext";
import useKeyboardNavigation from "./hooks/useKeyboardNavigation";
import { makeStyles } from "tss-react/mui";
import { List } from "@mui/material";

const useStyle = makeStyles()((theme) => ({
    horizontalMode: {
        display: "flex",
    },
    root: {
        outline: "none", //Remove the outline effect of the root element
    },
}));

const MenuRoot = ({
    className,
    children,
    ...rest
}: {
    className: string;
    children: ReactNode;
}) => {
    const {
        collapsed,
        mode,
        setFocusedNodeId,
        focusedNodeId,
        getChildrenIds,
        prefixCls,
    } = useMenuContext();
    const { handleKeyDown } = useKeyboardNavigation();
    const pressedRef = useRef(false);
    const { classes } = useStyle();

    const handleFocus = (event: FocusEvent) => {
        if (!focusedNodeId) {
            if (event.target === event.currentTarget && !pressedRef.current) {
                const rooNodeIds = getChildrenIds(null);
                if (rooNodeIds && rooNodeIds.length > 0) {
                    setFocusedNodeId(rooNodeIds[0]);
                }
            }
        }
    };

    const handleBlur = () => {
        setFocusedNodeId(null);
    };

    const handleMouseDown = () => {
        pressedRef.current = true;
    };

    const handleMouseUp = () => {
        pressedRef.current = false;
    };

    return (
        <div
            className={classNames(className, classes.root)}
            onKeyDown={handleKeyDown}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onFocus={handleFocus}
            onBlur={handleBlur}
            tabIndex={0}
        >
            <List
                className={classNames(prefixCls + "List-root", {
                    [classes.horizontalMode]: mode == "horizontal",
                })}
                disablePadding
            >
                {children}
            </List>
        </div>
    );
};

export default MenuRoot;
