import { useMenuContext } from "../contexts/MenuContext";
import { ItemViewData } from "../types";
import { getNodeIdPaths } from "../utils";

const useKeyboardNavigation = () => {
    const {
        openIds,
        focusedNodeId,
        selectedIds,
        getChildrenIds,
        setFocusedNodeId,
        getNode,
        onInternalOpenChange,
        onSelectedChange,
        mode,
        onItemClick,
    } = useMenuContext();

    const isExpanded = (nodeInfo: ItemViewData) => {
        return openIds.includes(nodeInfo.id);
    };

    const getCurrFocusedNodeId = () => {
        return focusedNodeId
            ? focusedNodeId
            : selectedIds[selectedIds.length - 1];
    };

    const getNextId = () => {
        const currFocusedNodeId = getCurrFocusedNodeId();
        let nodeInfo = getNode(currFocusedNodeId);
        if (nodeInfo.hasChildren && isExpanded(nodeInfo)) {
            const expandIds = getChildrenIds(nodeInfo.id, true);
            if (expandIds.length > 0) {
                return expandIds[0];
            }
        }

        while (nodeInfo) {
            const siblings = getChildrenIds(nodeInfo.parentId, true);
            const nextId = siblings[siblings.indexOf(nodeInfo.id) + 1];
            if (nextId) {
                return nextId;
            }
            nodeInfo = getNode(nodeInfo.parentId);
        }
        return null;
    };

    const getExpandLastId = (prevNode) => {
        if (prevNode.hasChildren && isExpanded(prevNode)) {
            const siblings = getChildrenIds(prevNode.id, true);
            if (siblings.length == 0) {
                return prevNode?.id;
            }
            const prevId = siblings[siblings.length - 1];
            return getExpandLastId(getNode(prevId));
        }
        return prevNode?.id;
    };

    const getPrevId = () => {
        const currFocusedNodeId = getCurrFocusedNodeId();
        let nodeInfo = getNode(currFocusedNodeId);
        let siblings = getChildrenIds(nodeInfo.parentId, true);
        let prevId = siblings[siblings.indexOf(nodeInfo.id) - 1];
        const prevNode = getNode(prevId);
        if (!prevNode) {
            return nodeInfo.parentId;
        }
        return getExpandLastId(prevNode);
    };

    const openSub = () => {
        const currFocusedNodeId = getCurrFocusedNodeId();
        let nodeInfo = getNode(currFocusedNodeId);
        if (nodeInfo.hasChildren) {
            const subIsOpen = openIds.includes(currFocusedNodeId);
            onInternalOpenChange(
                currFocusedNodeId,
                !subIsOpen,
                getNodeIdPaths(nodeInfo, getNode)
            );
            if (mode != "inline" && !subIsOpen) {
                //auto focus to first node
                let childIds = getChildrenIds(nodeInfo.id, true);
                setFocusedNodeId(childIds[0]);
            }
        }
    };

    const closeSub = () => {
        const currFocusedNodeId = getCurrFocusedNodeId();
        const nodeInfo = getNode(currFocusedNodeId);
        const parentNode = getNode(nodeInfo.parentId);
        if (parentNode && parentNode.hasChildren) {
            onInternalOpenChange(
                parentNode.id,
                false,
                getNodeIdPaths(parentNode, getNode)
            );
            setFocusedNodeId(nodeInfo.parentId);
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        const key = event.key;
        event.preventDefault();
        event.stopPropagation();
        const currFocusedNodeId = getCurrFocusedNodeId();
        const nodeInfo = getNode(currFocusedNodeId);
        switch (key) {
            case "ArrowUp": {
                setFocusedNodeId(getPrevId());
                return;
            }
            case "ArrowDown":
                setFocusedNodeId(getNextId());
                return;
            case "ArrowRight":
                mode != "inline" && openSub();
                return;
            case "ArrowLeft":
            case "Escape":
                mode != "inline" && closeSub();
                return;
            case "Enter":
                openSub();
                if (!nodeInfo.hasChildren) {
                    onSelectedChange(getNodeIdPaths(nodeInfo, getNode), false);
                    onItemClick &&
                        onItemClick(
                            nodeInfo.id,
                            getNodeIdPaths(nodeInfo, getNode),
                            event,
                            nodeInfo.link
                        );
                }
                return;
        }
    };

    return { handleKeyDown };
};

export default useKeyboardNavigation;
