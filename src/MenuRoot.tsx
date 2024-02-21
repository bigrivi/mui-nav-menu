import React, { FocusEvent, ReactNode } from "react";
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
    const { classes } = useStyle();

    const handleFocus = (event: FocusEvent) => {
        if (!focusedNodeId) {
            console.log(event);
            if (event.target === event.currentTarget) {
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

    return (
        <div
            className={classNames(className, classes.root)}
            onKeyDown={handleKeyDown}
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
