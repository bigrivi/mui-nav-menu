import React, {
    FC,
    PropsWithChildren,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";
import {
    CheckSelectedFn,
    InlineIndent,
    ItemType,
    MenuLink,
    MenuMode,
    TriggerType,
} from "./types";
import { IMenuContext, MenuContext } from "./contexts/MenuContext";
import { parseItemsToNodes } from "./utils";
import { useMenuNodes } from "./hooks/useMenuNodes";
import MenuRoot from "./MenuRoot";
import {
    Grow,
    PopperPlacementType,
    useControlled,
    useEventCallback,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { useDidMountEffect } from "./hooks/useDidMountEffect";

interface INavMenuProps {
    /** Shadow of empty value pop-up card，It accepts values between 0 and 24 inclusive.*/
    elevation?: number;
    /**Popper placement */
    placement?: PopperPlacementType;
    prefixCls?: string;
    items?: Array<ItemType>;
    disableCloseOnSelect?: boolean;
    inlineIndent?: InlineIndent;
    checkSelectedFn?: CheckSelectedFn;
    defaultCollapseIcon?: React.ReactNode;
    defaultExpandIcon?: React.ReactNode;
    defaultPopupRootIcon?: React.ReactNode;
    defaultPopupSubIcon?: React.ReactNode;
    mode?: MenuMode;
    collapsed?: boolean;
    arrow?: boolean;
    accordion?: boolean;
    trigger?: TriggerType;
    disableSelection?: boolean;
    openIds?: string[];
    defaultOpenIds?: string[];
    defaultSelectedIds?: string[];
    onOpenChange?: (openIds: string[]) => void;
    /**additional css class of root dom node*/
    rootClassName?: string;
    /**additional css class of popper dom node*/
    popperClassName?: string;
    selectedIds?: string[];
    onSelectedChange?: (selectedIds: string[]) => void;
    TransitionComponent?: React.JSXElementConstructor<
        TransitionProps & { children: React.ReactElement<any, any> }
    >;
    onItemClick?: (
        id: string,
        paths: string[],
        domEvent:
            | React.MouseEvent<HTMLElement>
            | React.KeyboardEvent<HTMLDivElement>,
        link?: MenuLink
    ) => void;
}
const NavMenu: FC<PropsWithChildren<INavMenuProps>> = ({
    items: itemsProp,
    mode = "inline",
    inlineIndent = {
        base: 12,
        step: 12,
    },
    openIds: openIdsProp,
    onOpenChange: onOpenChangeProp,
    onItemClick,
    defaultOpenIds,
    accordion,
    defaultSelectedIds,
    children,
    rootClassName,
    collapsed,
    popperClassName,
    disableSelection,
    checkSelectedFn,
    selectedIds: selectedIdsProp,
    onSelectedChange: onSelectedChangeProp,
    placement,
    defaultCollapseIcon,
    defaultExpandIcon,
    defaultPopupRootIcon,
    defaultPopupSubIcon,
    TransitionComponent = Grow,
    disableCloseOnSelect,
    trigger = "hover",
    arrow = true,
    elevation = 2,
    prefixCls = "NavMenu",
}) => {
    const restoredOpenIds = useRef<string[]>();
    const isClosedRef = useRef(true);
    const [openIds = [], setOpenIds] = useControlled({
        name: "openIds",
        controlled: openIdsProp,
        default: defaultOpenIds,
    }) as [string[], React.Dispatch<React.SetStateAction<string[]>>];
    const openIdsRef = useRef<string[]>([]);
    const {
        processItem,
        getChildrenIds,
        getNode,
        clearNodes,
        getDescendantIds,
    } = useMenuNodes();

    const mergedMode = useMemo((): MenuMode => {
        return collapsed && mode == "inline" ? "vertical" : (mode as MenuMode);
    }, [mode, collapsed]);
    const handleOpenIds = (newOpenIds: string[]) => {
        openIdsRef.current = [];
        onOpenChangeProp && onOpenChangeProp(newOpenIds);
        setOpenIds(newOpenIds);
    };

    const closeAll = () => {
        isClosedRef.current = true;
        handleOpenIds([]);
    };

    const onInternalOpenChange = useEventCallback(
        (id: string, open: boolean, idPaths: string[]) => {
            if (mergedMode == "inline" && accordion) {
                if (open) {
                    handleOpenIds(idPaths);
                } else {
                    handleOpenIds(
                        openIdsRef.current.filter((openId) => openId != id)
                    );
                }
            } else {
                let newOpenIds: string[] = openIdsRef.current.filter(
                    (openId) => openId != id
                );
                if (open) {
                    if (idPaths.length > 1 && isClosedRef.current) {
                        //Prevents direct ejection from second level if everything is closed
                        return;
                    }
                    if (mergedMode == "inline") {
                        newOpenIds.push(id);
                    } else {
                        newOpenIds = [...idPaths];
                    }
                    isClosedRef.current = false;
                } else {
                    //When closing, all child nodes need to be closed
                    if (mergedMode != "inline") {
                        const descendantIds = getDescendantIds(id);
                        newOpenIds = newOpenIds.filter(
                            (id) => !descendantIds.includes(id)
                        );
                    }
                }
                handleOpenIds(newOpenIds);
            }
        }
    );
    const [focusedNodeId, setFocusedNodeId] = useState<string>();
    const [selectedIds = [], setSelectedIds] = useControlled({
        name: "selectedIds",
        controlled: selectedIdsProp,
        default: defaultSelectedIds,
    });
    const onSelectedChange = (
        newSelectedIds: string[],
        closePopup: boolean
    ) => {
        if (!disableSelection) {
            onSelectedChangeProp && onSelectedChangeProp(newSelectedIds);
            setSelectedIds(newSelectedIds);
            closePopup && setFocusedNodeId(null);
        }
        if (mergedMode != "inline" && closePopup && !disableCloseOnSelect) {
            closeAll();
        }
    };

    const contextValue = useMemo((): IMenuContext => {
        return {
            mode: mergedMode,
            inlineIndent,
            openIds,
            onInternalOpenChange,
            defaultOpenIds,
            popperClassName,
            collapsed,
            selectedIds,
            onSelectedChange,
            checkSelectedFn,
            TransitionComponent,
            onItemClick,
            getChildrenIds,
            getNode,
            focusedNodeId,
            setFocusedNodeId,
            elevation,
            arrow,
            placement,
            defaultCollapseIcon,
            defaultExpandIcon,
            defaultPopupRootIcon,
            defaultPopupSubIcon,
            prefixCls,
            trigger,
        };
    }, [
        mergedMode,
        inlineIndent,
        openIds,
        defaultOpenIds,
        popperClassName,
        collapsed,
        selectedIds,
        onSelectedChange,
        checkSelectedFn,
        TransitionComponent,
        onItemClick,
        focusedNodeId,
        elevation,
        arrow,
        placement,
        defaultCollapseIcon,
        defaultExpandIcon,
        defaultPopupRootIcon,
        defaultPopupSubIcon,
        prefixCls,
        trigger,
    ]);

    const itemNodes = useMemo(() => {
        return itemsProp ? parseItemsToNodes(itemsProp) : null;
    }, [itemsProp]);

    useDidMountEffect(() => {
        if (collapsed) {
            //store openids
            restoredOpenIds.current = [...openIdsRef.current];
            handleOpenIds([]);
        } else {
            if (restoredOpenIds.current) {
                handleOpenIds(restoredOpenIds.current);
                restoredOpenIds.current = null;
            }
        }
    }, [collapsed]);

    const items = useMemo(() => {
        return children || itemNodes;
    }, [children, itemNodes]);

    useEffect(() => {
        clearNodes();
        React.Children.forEach(items, (child: any, index) => {
            processItem(child, null, index);
        });
    }, [items]);

    useEffect(() => {
        openIdsRef.current = openIds;
        isClosedRef.current = openIds.length == 0;
    }, [openIds]);

    return (
        <MenuContext.Provider value={contextValue}>
            <MenuRoot className={rootClassName}>{items}</MenuRoot>
        </MenuContext.Provider>
    );
};

export default NavMenu;
