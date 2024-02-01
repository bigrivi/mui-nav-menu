import React, { FC, PropsWithChildren, memo, useMemo } from "react";
import classNames from "classnames";
import { MenuItemGroupType } from "./types";
import { useConnectedPath } from "./contexts/PathContext";
import { useMenuContext } from "./contexts/MenuContext";
import { makeStyles } from "tss-react/mui";
import { ListSubheader } from "@mui/material";

export type MenuItemGroupProps = Omit<
    MenuItemGroupType,
    "type" | "children"
> & {
    className?: string;
    children?: React.ReactNode;
};

const useStyle = makeStyles()((theme) => ({
    headerMini: {
        textAlign: "center",
        padding: 0,
    },
}));

const MenuItemGroup: FC<PropsWithChildren<MenuItemGroupProps>> = ({
    label,
    className,
    children,
}) => {
    const { classes } = useStyle();
    const connectedIdPath: string[] = useConnectedPath();
    const { collapsed } = useMenuContext();

    const nestedLevel = useMemo(() => {
        return connectedIdPath.length;
    }, [connectedIdPath]);

    return (
        <>
            <ListSubheader
                className={classNames(className, {
                    [classes.headerMini]: collapsed && nestedLevel <= 1,
                })}
            >
                {label}
            </ListSubheader>
            {children}
        </>
    );
};

export default memo(MenuItemGroup);
