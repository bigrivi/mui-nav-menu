import React, {
    FC,
    useMemo,
    useState,
    useCallback,
    useRef,
    PropsWithChildren,
} from "react";
import { unstable_batchedUpdates } from "react-dom";
import classNames from "classnames";
import { useTransitionState } from "./hooks/useTransitionState";
import PathContext, { useConnectedPath } from "./contexts/PathContext";
import { useMenuContext } from "./contexts/MenuContext";
import { MenuItemType, SubMenuType } from "./types";
import ListMenuItem from "./ListMenuItem";
import Arrow from "./Arrow";
import { makeStyles } from "tss-react/mui";
import {
    Collapse,
    List,
    Paper,
    Popper,
    PopperPlacementType,
    useEventCallback,
} from "@mui/material";
const MOUSE_ENTER_DEALY = 200;
const MOUSE_LEAVE_DEALY = 0;

export type SubMenuProps = Omit<SubMenuType, "children"> & {
    className?: string;
    disabled?: boolean;
};

const useStyle = makeStyles()((theme) => ({
    popper: {
        "& .MuiListItemButton-root": {
            minWidth: 200,
        },

        "&.NestedLevel-isRoot": {
            "& .MuiPaper-root": {
                marginLeft: 0,
            },
            '&[data-popper-placement*="right"]': {
                "& .PopperArrow": {
                    left: -5,
                },
                "& .MuiPaper-root": {
                    marginLeft: 10,
                },
            },
            '&[data-popper-placement*="left"]': {
                "& .PopperArrow": {
                    right: -5,
                },
                "& .MuiPaper-root": {
                    marginRight: 10,
                },
            },
            '&[data-popper-placement*="top"]': {
                "& .PopperArrow": {
                    bottom: -5,
                },
                "& .MuiPaper-root": {
                    marginBottom: 10,
                },
            },

            '&[data-popper-placement*="bottom"]': {
                "& .PopperArrow": {
                    top: -5,
                },
                "& .MuiPaper-root": {
                    marginTop: 10,
                },
            },
        },
    },

    paper: {
        transformOrigin: "top left",
        position: "relative",
        zIndex: 1,
        marginLeft: 10,
        "& .PopperContent": {
            background: theme.palette.background.paper,
            overflowY: "auto",
            maxHeight: 500,
            padding: 5,
            borderRadius: 10,
        },
    },
}));

const SubMenu: FC<PropsWithChildren<SubMenuProps>> = (props) => {
    const {
        openIds = [],
        selectedIds,
        checkSelectedFn,
        mode,
        collapsed,
        inlineIndent,
        onInternalOpenChange,
        onSelectedChange,
        popperClassName,
        TransitionComponent,
        onItemClick,
        focusedNodeId,
        elevation,
        arrow,
        defaultCollapseIcon,
        defaultExpandIcon,
        defaultPopupRootIcon,
        defaultPopupSubIcon,
        placement: placementProp,
        prefixCls,
    } = useMenuContext();
    const { classes } = useStyle();
    const { id, children, ...rest } = props;
    const connectedIdPath: string[] = useConnectedPath(id);
    const { transitioning, transitionHandlers } = useTransitionState();
    const isInlineMode = mode == "inline";
    const [arrowRef, setArrowRef] = useState(null);
    const subIsOpen = useMemo(() => {
        return openIds.includes(id);
    }, [openIds]);
    const delayTimerRef = useRef<NodeJS.Timeout>();
    const isSelected = useMemo(() => {
        if (checkSelectedFn) {
            return checkSelectedFn(props as MenuItemType);
        }
        return selectedIds ? selectedIds.includes(id) : false;
    }, [selectedIds, checkSelectedFn]);

    const [menuItemElement, setMenuItemElement] =
        useState<HTMLDivElement>(null);

    const nestedLevel = useMemo(() => {
        return connectedIdPath.length;
    }, [connectedIdPath]);
    const isRoot = nestedLevel == 1;

    const setPopupVisible = useCallback(
        (visible: boolean) => {
            clearDelayTimer();
            onInternalOpenChange &&
                onInternalOpenChange(id, visible, connectedIdPath);
        },
        [connectedIdPath, onInternalOpenChange, openIds]
    );

    const delaySetPopupVisible = useCallback(
        (value: boolean, delayTime) => {
            clearDelayTimer();
            if (delayTime) {
                delayTimerRef.current = setTimeout(() => {
                    setPopupVisible(value);
                    clearDelayTimer();
                }, delayTime);
            } else {
                setPopupVisible(value);
            }
        },
        [openIds]
    );

    const toggleInlineSubVisible = useCallback(() => {
        onInternalOpenChange &&
            onInternalOpenChange(id, !subIsOpen, connectedIdPath);
    }, [openIds, id]);

    const handleMouseEnter = (evt: React.MouseEvent<HTMLElement>) => {
        if (children && !transitioning) {
            //Disable opening in transition
            delaySetPopupVisible(true, MOUSE_ENTER_DEALY);
        }
    };

    const handleMouseLeave = (evt: React.MouseEvent<HTMLElement>) => {
        if (children) {
            delaySetPopupVisible(false, MOUSE_LEAVE_DEALY);
        }
    };

    const clearDelayTimer = () => {
        if (delayTimerRef.current) {
            clearTimeout(delayTimerRef.current);
            delayTimerRef.current = null;
        }
    };

    const handleItemClick = useEventCallback(
        (event: React.MouseEvent<HTMLElement>) => {
            if (event.type !== "click") {
                return;
            }
            if (!children) {
                unstable_batchedUpdates(() => {
                    onSelectedChange(connectedIdPath, true);
                });
            } else {
                if (mode == "inline") {
                    toggleInlineSubVisible();
                }
            }
            onItemClick && onItemClick(id, connectedIdPath, event);
        }
    ) as unknown as () => void;

    const placement: PopperPlacementType = useMemo(() => {
        if (placementProp && isRoot) {
            return placementProp;
        }
        if (mode == "horizontal" && isRoot) {
            return "bottom-start";
        }
        return "right-start";
    }, [mode, isRoot, placementProp]);

    const modifiers = useMemo(() => {
        return [
            {
                name: "flip",
                enabled: true,
            },
            {
                name: "preventOverflow",
                enabled: true,
                options: {
                    boundariesElement: "viewport",
                },
            },
            {
                name: "arrow",
                enabled: isRoot && arrow,
                options: {
                    element: arrowRef,
                },
            },
        ];
    }, [arrowRef, isRoot, arrow]);

    return (
        <div
            className={classNames(
                prefixCls + "SubListItem-root",
                prefixCls + "ListItem-root"
            )}
            {...(!isInlineMode && {
                style: {
                    pointerEvents: rest.disabled ? "none" : undefined,
                    border: "1px soloid #ff0000",
                },
                onMouseEnter: handleMouseEnter,
                onMouseLeave: handleMouseLeave,
            })}
        >
            <ListMenuItem
                id={id}
                hasChildren={!!children}
                ref={setMenuItemElement}
                onClick={handleItemClick}
                inlineIndent={inlineIndent}
                subIsOpen={subIsOpen}
                isSelected={isSelected}
                collapsed={collapsed}
                mode={mode}
                isFocused={focusedNodeId == id}
                connectedIdPath={connectedIdPath}
                expandIcon={defaultExpandIcon}
                collapseIcon={defaultCollapseIcon}
                popupRootIcon={defaultPopupRootIcon}
                popupSubIcon={defaultPopupSubIcon}
                {...rest}
            />

            {children && isInlineMode && (
                <Collapse in={subIsOpen} timeout="auto" unmountOnExit>
                    <List
                        className={prefixCls + "SubList-root"}
                        component="div"
                        disablePadding
                    >
                        <PathContext.Provider value={connectedIdPath}>
                            {children}
                        </PathContext.Provider>
                    </List>
                </Collapse>
            )}

            {children && !isInlineMode && (
                <Popper
                    className={classNames(
                        classes.popper,
                        popperClassName,
                        "NestedLevel-" + nestedLevel,
                        {
                            "NestedLevel-isRoot": nestedLevel == 1,
                        }
                    )}
                    transition
                    anchorEl={menuItemElement}
                    placement={placement}
                    open={subIsOpen && !!menuItemElement}
                    modifiers={modifiers}
                >
                    {({ TransitionProps }) => (
                        <TransitionComponent
                            {...transitionHandlers(TransitionProps)}
                        >
                            <Paper
                                elevation={elevation}
                                className={classes.paper}
                                style={{
                                    pointerEvents: transitioning
                                        ? "none"
                                        : "auto",
                                }}
                            >
                                <div className="PopperContent">
                                    <List component="div" disablePadding>
                                        <PathContext.Provider
                                            value={connectedIdPath}
                                        >
                                            {children}
                                        </PathContext.Provider>
                                    </List>
                                </div>
                                {isRoot && arrow && (
                                    <Arrow
                                        elevation={elevation}
                                        ref={setArrowRef}
                                    />
                                )}
                            </Paper>
                        </TransitionComponent>
                    )}
                </Popper>
            )}
        </div>
    );
};

export default SubMenu;
