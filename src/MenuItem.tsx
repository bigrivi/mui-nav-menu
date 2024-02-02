import React, { forwardRef, memo, useEffect, useMemo } from "react";
import ListMenuItem from "./ListMenuItem";
import { useConnectedPath } from "./contexts/PathContext";
import { useMenuContext } from "./contexts/MenuContext";
import { MenuItemType } from "./types";
import classNames from "classnames";
import { useEventCallback } from "@mui/material";

type MenuItemProps = {
    onClick?: (event: React.MouseEvent<HTMLElement>) => void;
    className?: string;
    children?: React.ReactNode;
} & Omit<MenuItemType, "children">;

const MenuItem = forwardRef<HTMLDivElement, MenuItemProps>((props, ref) => {
    const {
        id,
        children,
        type = "item",
        onClick,
        className: classNameProp,
        ...rest
    } = props;
    const {
        openIds = [],
        selectedIds,
        checkSelectedFn,
        mode,
        collapsed,
        inlineIndent,
        onSelectedChange,
        onItemClick,
        focusedNodeId,
        defaultCollapseIcon,
        defaultExpandIcon,
        defaultPopupRootIcon,
        defaultPopupSubIcon,
        prefixCls,
        onInternalOpenChange,
    } = useMenuContext();
    const connectedIdPath: string[] = useConnectedPath(id);
    const isInlineMode = mode == "inline";
    const subIsOpen = useMemo(() => {
        return openIds.includes(id);
    }, [openIds]);

    const isSelected = useMemo(() => {
        if (checkSelectedFn) {
            return checkSelectedFn(props as MenuItemType);
        }
        return selectedIds ? selectedIds.includes(id) : false;
    }, [selectedIds, checkSelectedFn]);

    const handleItemClick = useEventCallback(
        (event: React.MouseEvent<HTMLElement>) => {
            if (event.type !== "click") {
                return;
            }
            onSelectedChange(connectedIdPath, true);
            onClick && onClick(event);
            onItemClick && onItemClick(id, connectedIdPath, event);
        }
    );

    const handleMouseEnter = (evt: React.MouseEvent<HTMLElement>) => {
        onInternalOpenChange && onInternalOpenChange(id, true, connectedIdPath);
    };

    return (
        <ListMenuItem
            {...(!isInlineMode && {
                onMouseEnter: handleMouseEnter,
            })}
            id={id}
            mode={mode}
            isFocused={focusedNodeId == id}
            hasChildren={false}
            inlineIndent={inlineIndent}
            collapsed={collapsed}
            subIsOpen={subIsOpen}
            onClick={handleItemClick}
            isSelected={isSelected}
            className={classNames(prefixCls + "ListItem-root", classNameProp)}
            connectedIdPath={connectedIdPath}
            expandIcon={defaultExpandIcon}
            collapseIcon={defaultCollapseIcon}
            popupRootIcon={defaultPopupRootIcon}
            popupSubIcon={defaultPopupSubIcon}
            {...rest}
        />
    );
});

export default memo(MenuItem);
