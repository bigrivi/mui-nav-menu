```tsx
import { Switch, FormControlLabel } from "@mui/material";
import classNames from "classnames";
import { NavMenu, ItemType } from "mui-nav-menu";
import useStyles from "./styles";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import LayersIcon from "@mui/icons-material/Layers";
import AssignmentIcon from "@mui/icons-material/Assignment";

const mockItems = [
    {
        type: "group",
        id: "group1",
        label: "Group1",
        children: [
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
        ],
    },
    {
        type: "group",
        id: "group2",
        label: "Group2",
        children:[
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
            {
                label: "Integrations",
                id: "integrations",
                icon: <LayersIcon />,
            }
        ]
    }
];

const { classes } = useStyles();
const [collapsed, setCollapsed] = React.useState(false);

const handleModeChange = (event, checked) => {
    setCollapsed(!collapsed);
};
<div>
    <FormControlLabel
        control={<Switch checked={collapsed} onChange={handleModeChange} />}
        label="Collapse"
    />

    <div
        className={classNames(classes.sidebar, {
            [classes.collapsed]: collapsed,
        })}
    >
        <NavMenu
            items={mockItems}
            mode="inline"
            rootClassName={classes.menu}
            collapsed={collapsed}
            inlineIndent={{
                base: 55,
                step: 20,
            }}
        />
    </div>
</div>;
```
