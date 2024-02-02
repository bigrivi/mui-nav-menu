import { createContext, useContext } from "react";
import {
    MenuMode,
    CheckSelectedFn,
    InlineIndent,
    ItemViewData,
    MenuLink,
    TriggerType,
} from "../types";
import { PopperPlacementType } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";

export interface IMenuContext {
    inlineIndent?: InlineIndent;
    collapsed?: boolean;
    placement?: PopperPlacementType;
    elevation?: number;
    arrow?: boolean;
    trigger: TriggerType;
    mode?: MenuMode;
    prefixCls?: string;
    defaultCollapseIcon?: React.ReactNode;
    defaultExpandIcon?: React.ReactNode;
    defaultPopupRootIcon?: React.ReactNode;
    defaultPopupSubIcon?: React.ReactNode;
    openIds?: string[];
    focusedNodeId: string;
    onInternalOpenChange: (
        id: string,
        open: boolean,
        idPaths: string[]
    ) => void;
    defaultOpenIds?: string[];
    popperClassName?: string;
    selectedIds?: string[];
    onSelectedChange: (selectedIds: string[], closePopup: boolean) => void;
    onItemClick?: (
        id: string,
        paths: string[],
        domEvent:
            | React.MouseEvent<HTMLElement>
            | React.KeyboardEvent<HTMLDivElement>,
        link?: MenuLink
    ) => void;
    checkSelectedFn?: CheckSelectedFn;
    TransitionComponent?: React.JSXElementConstructor<
        TransitionProps & { children: React.ReactElement<any, any> }
    >;
    getChildrenIds: (parentId: string, excludeDisabled?: boolean) => string[];
    getNode: (nodeId: string) => ItemViewData;
    setFocusedNodeId: React.Dispatch<React.SetStateAction<string>>;
}

export const MenuContext = createContext<IMenuContext>(null);
export const useMenuContext = () => {
    return useContext(MenuContext);
};
