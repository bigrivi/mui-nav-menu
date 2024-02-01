import { ComponentType, HTMLAttributeAnchorTarget } from "react";

export type MenuMode = "inline" | "vertical" | "horizontal";
type RouteLink = string;
type ExternalLink = {
    url: string;
    target?: HTMLAttributeAnchorTarget;
};

export type MenuLink = RouteLink | ExternalLink;
export type MenuItemContentProps = {
    nodeId: string;
    isSelected: boolean;
    itemProps: {
        textClasses: string;
        label: string;
    };
};
export type MenuItemType = {
    type?: "item";
    id: string;
    label: string;
    icon?: React.ReactNode;
    link?: MenuLink;
    disabled?: boolean;
    Content?: ComponentType<MenuItemContentProps>;
    renderContent?: (itemData: MenuItemContentProps) => React.ReactNode;
};

export type SubMenuType = Omit<MenuItemType, "type"> & {
    children?: ItemType[];
};

export interface MenuItemGroupType {
    type: "group";
    id?: string;
    label: string;
    children?: ItemType[];
}

export type MenuDividerType = {
    type: "divider";
};

export type ItemType = MenuItemType | MenuItemGroupType | MenuDividerType;

export type CheckSelectedFn = (item: MenuItemType) => boolean;

export type InlineIndent = {
    base: number;
    step: number;
};

export type ItemViewData = {
    id: string;
    label: string;
    parentId: string;
    disabled?: boolean;
    hasChildren?: boolean;
    index?: number;
    link?: MenuLink;
};

export type MenuViewNodeMap = { [menuId: string]: ItemViewData };
