import React from "react";

import { ItemType, NavMenu } from "mui-nav-menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import LayersIcon from "@mui/icons-material/Layers";
import AssignmentIcon from "@mui/icons-material/Assignment";

const mockItems = [
    {
        label: "Dashboard",
        id: "dashboard",
        icon: <DashboardIcon />,
    },
    {
        label: "Orders",
        id: "orders",
        icon: <ShoppingCartIcon />,
        children: [
            {
                id: "orders_sub1",
                label: "Orders_sub1",
            },
            {
                id: "orders_sub2",
                label: "Orders_sub2",
                children: [
                    {
                        id: "orders_sub2_1",
                        label: "Orders_sub2_1",
                    },
                    {
                        id: "orders_sub2_2",
                        label: "Orders_sub2_2",
                    },
                ],
            },
            {
                id: "orders_sub3",
                label: "Orders_sub3",
                children: [
                    {
                        id: "orders_sub3_1",
                        label: "Orders_sub3_1",
                    },
                    { type: "divider" },
                    {
                        id: "orders_sub3_2",
                        label: "Orders_sub3_2",
                    },
                ],
            },
        ],
    },
    { type: "divider" },
    {
        label: "Customers",
        id: "customers",
        icon: <PeopleIcon />,
    },
    {
        label: "Reports",
        id: "reports",
        icon: <BarChartIcon />,
    },
    { type: "divider" },
    {
        label: "Integrations",
        id: "integrations",
        icon: <LayersIcon />,
    },
];

export default mockItems;
