import React, {
    MouseEventHandler,
    forwardRef,
    memo,
    useEffect,
    useMemo,
} from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";
import { InlineIndent, MenuItemType, MenuMode } from "./types";
import { makeStyles } from "tss-react/mui";
import {
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Tooltip,
} from "@mui/material";
import { ChevronRight, ExpandLess, ExpandMore } from "@mui/icons-material";

type ListMenuItemProps = {
    onClick?: (event: React.MouseEvent<HTMLElement>) => void;
    className?: string;
    hasChildren: boolean;
    subIsOpen: boolean;
    inlineIndent: InlineIndent;
    isSelected: boolean;
    isFocused: boolean;
    collapsed: boolean;
    connectedIdPath: string[];
    mode: MenuMode;
    collapseIcon?: React.ReactNode;
    expandIcon?: React.ReactNode;
    popupRootIcon?: React.ReactNode;
    popupSubIcon?: React.ReactNode;
    onMouseEnter?: MouseEventHandler<HTMLElement>;
    onMouseLeave?: MouseEventHandler<HTMLElement>;
} & Omit<MenuItemType, "children">;

const useStyle = makeStyles()((theme) => ({
    root: {
        whiteSpace: "normal",
        wordBreak: "break-all",
        "&.Mui-selected": {
            "&.isNested:not(.isMini)": {
                color: theme.palette.primary.main,
                fontWeight: "bold",
                "&:not(:hover)": {
                    background: "none",
                },
            },
        },
        "&.isMini": {
            "& .MuiListItemIcon-root": {
                marginRight: 0,
            },
        },
    },
    noWrap: {
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
    },
    label: {
        transition: "transform 300ms ease 0s, opacity 300ms ease 0s",
        opacity: 1,
        transform: "translate3d(0rem, 0, 0)",
    },
    icon: {
        transition: "transform 300ms ease 0s, opacity 300ms ease 0s",
        opacity: 1,
    },
    labelMini: {
        opacity: 0,
        overflow: "hidden",
        transform: "translate3d(-1.5625rem, 0, 0)",
    },
    iconMini: {
        opacity: 0,
    },
    tooltip: {
        "& .MuiTooltip-tooltip": {
            fontSize: 14,
            "&.MuiTooltip-tooltipPlacementRight": {
                margin: "0px 25px !important",
            },
        },
    },
    headerMini: {
        textAlign: "center",
        padding: 0,
    },
    focused: {
        outline: "3px solid " + theme.palette.primary.main,
        borderRadius: 4,
    },
}));

const ListMenuItem = forwardRef<HTMLDivElement, ListMenuItemProps>(
    (props, ref) => {
        const { classes } = useStyle();
        const {
            id,
            label,
            subIsOpen,
            onClick,
            inlineIndent,
            isSelected,
            collapsed,
            connectedIdPath,
            mode,
            disabled,
            hasChildren,
            link,
            Content,
            icon,
            className,
            isFocused,
            onMouseEnter,
            onMouseLeave,
            renderContent: renderContentProp,
            collapseIcon = <ExpandLess />,
            expandIcon = <ExpandMore />,
            popupRootIcon = (
                <ChevronRight style={{ transform: "rotate(90deg)" }} />
            ),
            popupSubIcon = <ChevronRight />,
        } = props;

        const nestedLevel = useMemo(() => {
            return connectedIdPath.length;
        }, [connectedIdPath]);

        const hasLink = link && !hasChildren;
        const showLabel = !collapsed || nestedLevel > 1;

        const linkProps = useMemo(() => {
            if (typeof link == "object") {
                return {
                    component: Link,
                    to: {
                        pathname: link.url,
                    },
                    target: link.target ?? "_parent",
                };
            }
            return {
                component: Link,
                to: link,
            };
        }, [link]);

        const inlineIndentPadding = useMemo(() => {
            if (mode !== "inline") {
                return undefined;
            }
            return nestedLevel > 1
                ? inlineIndent.step * (nestedLevel - 2) + inlineIndent.base
                : undefined;
        }, [nestedLevel, mode, inlineIndent]);

        const renderArrow = () => {
            if (!hasChildren) {
                return null;
            }
            if (collapsed && nestedLevel == 1) {
                return null;
            }
            if (mode == "inline") {
                return subIsOpen ? collapseIcon : expandIcon;
            }
            if (nestedLevel == 1 && mode == "horizontal") {
                return popupRootIcon;
            }
            return popupSubIcon;
        };

        const shouldUseTooltip = useMemo(() => {
            return collapsed && nestedLevel == 1 && !hasChildren;
        }, [collapsed, nestedLevel, hasChildren]);

        const textClasses = classNames(classes.label, {
            "Label-mini": !showLabel,
            [classes.labelMini]: !showLabel,
        });

        const renderContent = () => {
            if (Content) {
                return (
                    <Content
                        {...{
                            nodeId: id,
                            isSelected,
                            itemProps: { textClasses, label },
                        }}
                    />
                );
            }
            if (renderContentProp) {
                return renderContentProp({
                    nodeId: id,
                    isSelected,
                    itemProps: { textClasses, label },
                });
            }
            return (
                <>
                    {icon && <ListItemIcon>{icon}</ListItemIcon>}
                    <ListItemText className={textClasses} primary={label} />
                </>
            );
        };

        const listItemNode = (
            <ListItemButton
                disableRipple
                {...(hasLink && linkProps)}
                ref={ref}
                key={id}
                disableTouchRipple
                tabIndex={-1}
                disabled={disabled}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                className={classNames(className, classes.root, classes.noWrap, {
                    isRoot: nestedLevel == 1,
                    isNested: hasChildren,
                    [classes.focused]: isFocused,
                    isFocused: isFocused,
                    isMini: collapsed && nestedLevel == 1,
                })}
                selected={isSelected}
                style={{
                    paddingLeft: inlineIndentPadding,
                }}
                onClick={onClick}
            >
                {renderContent()}
                {hasChildren ? renderArrow() : null}
            </ListItemButton>
        );

        return (
            <Tooltip
                disableHoverListener={!shouldUseTooltip}
                classes={{ popper: classes.tooltip }}
                title={label}
                arrow
                placement="right"
            >
                {listItemNode}
            </Tooltip>
        );
    }
);

export default memo(ListMenuItem);
