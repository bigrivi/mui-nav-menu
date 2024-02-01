import React, { useCallback, useRef } from "react";
import { ItemViewData, MenuViewNodeMap } from "../types";
import MenuItemGroup from "../MenuItemGroup";

export const useMenuNodes = () => {
    const nodeMapRef = useRef<MenuViewNodeMap>({});

    const clearNodes = useCallback(() => {
        nodeMapRef.current = {};
    }, []);

    const registerNode = useCallback((nodeData: ItemViewData) => {
        nodeMapRef.current[nodeData.id] = nodeData;
    }, []);

    const getNode = useCallback((menuId: string) => {
        return nodeMapRef.current[menuId];
    }, []);

    const getChildrenIds = useCallback(
        (parentId: string, excludeDisabled?: boolean) => {
            return Object.values(nodeMapRef.current)
                .filter((node) => node.parentId === parentId)
                .filter((node) => (excludeDisabled ? !node.disabled : true))
                .sort((a, b) => a.index - b.index)
                .map((child) => child.id);
        },
        []
    );

    const getDescendantIds = useCallback((parentId: string) => {
        return getChildrenIds(parentId).reduce((acc, id) => {
            return [...acc, id, getDescendantIds(id)].flat();
        }, []);
    }, []);

    const processItem = useCallback((item, parentId, index) => {
        const { id, label, disabled, children, link, type } = item.props;
        const isGroup = item.type == MenuItemGroup;
        const childrens = React.Children.toArray(children);

        if (!isGroup && id && label) {
            //exclude group node
            registerNode({
                id,
                parentId,
                label: label,
                disabled: disabled,
                link,
                hasChildren: !!(childrens && childrens.length),
            });
        }
        if (childrens && childrens.length) {
            React.Children.forEach(childrens, (child: any, index) => {
                processItem(child, isGroup ? parentId : id, index);
            });
        }
    }, []);

    return {
        processItem,
        getChildrenIds,
        getNode,
        clearNodes,
        getDescendantIds,
    };
};
