import React, { FC, PropsWithChildren } from "react";
import { ItemType, ItemViewData } from "./types";
import MenuItem from "./MenuItem";
import SubMenu from "./SubMenu";
import MenuItemGroup from "./MenuItemGroup";
import Divider from "./Divider";

export const parseItemsToNodes = (childrens: Array<ItemType>) => {
    return childrens && childrens.length > 0
        ? childrens.map((item, index) => {
              const { children, type, ...rest } = item as any;
              if ((children && children.length) || type == "group") {
                  if (type == "group") {
                      return (
                          <MenuItemGroup
                              key={rest.id}
                              id={rest.id}
                              label={rest.label}
                          >
                              {parseItemsToNodes(children)}
                          </MenuItemGroup>
                      );
                  }
                  return (
                      <SubMenu {...rest} key={rest.id}>
                          {parseItemsToNodes(children)}
                      </SubMenu>
                  );
              }

              if (type == "divider") {
                  return <Divider key={index} />;
              }

              return <MenuItem {...rest} key={rest.id} />;
          })
        : undefined;
};

export const getNodeIdPaths = (
    node: ItemViewData,
    getNodeFn: (nodeId: string) => ItemViewData
) => {
    const paths = [];
    while (node) {
        paths.unshift(node.id);
        node = getNodeFn(node.parentId);
    }
    return paths;
};

export const ConditionalWrapper: FC<
    PropsWithChildren<{
        wrapper: (children: React.ReactNode) => React.ReactNode;
        condition: boolean;
    }>
> = ({ condition, wrapper, children }) =>
    condition ? wrapper(children) : children;
