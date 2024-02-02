import * as React from "react";
import { Divider as MuiDivider } from "@mui/material";
import { useMenuContext } from "./contexts/MenuContext";
import { useConnectedPath } from "./contexts/PathContext";

export type DividerProps = {
    className?: string;
    style?: React.CSSProperties;
};

export default function Divider({ className, style }: DividerProps) {
    const { mode } = useMenuContext();
    const connectedIdPath: string[] = useConnectedPath();
    const isRoot = connectedIdPath.length == 0;

    return (
        <MuiDivider
            style={style}
            role="separator"
            className={className}
            {...(isRoot &&
                mode == "horizontal" && {
                    orientation: "vertical",
                    flexItem: true,
                })}
        />
    );
}
