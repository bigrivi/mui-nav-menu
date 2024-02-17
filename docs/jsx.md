
```tsx
import { Switch, FormControlLabel,alpha } from "@mui/material";
import classNames from "classnames";
import { NavMenu,MenuItem,MenuItemGroup,SubMenu,Divider} from "mui-nav-menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import LayersIcon from "@mui/icons-material/Layers";
import AssignmentIcon from "@mui/icons-material/Assignment";
import mockItems from "./mockItems";
import useStyles from "./styles";
const { classes } = useStyles();
<div className={classNames(classes.sidebar, classes.collapsed)}>
    <NavMenu
        mode="vertical"
        collapsed
        rootClassName={classes.menu}
        placement="right"
        inlineIndent={{
            base: 55,
            step: 20,
        }}
    >
        <MenuItem id="dashboard" icon={<DashboardIcon />} label="Dashboard"/>
        <SubMenu id="orders" icon={<ShoppingCartIcon />} label="Orders">
            <MenuItem id="orders_sub1" label="Orders_sub1"/>
            <Divider/>
            <SubMenu id="orders_sub2" label="Orders_sub2">
                <MenuItem id="orders_sub2_1" label="Orders_sub2_1"/>
                <Divider/>
                <MenuItem id="orders_sub2_2" label="Orders_sub2_2"/>
            </SubMenu>
            <Divider/>
            <SubMenu id="orders_sub3" label="Orders_sub3">
                <MenuItem id="orders_sub3_1" label="Orders_sub3_1"/>
                <Divider/>
                <MenuItem id="orders_sub3_2" label="Orders_sub3_2"/>
            </SubMenu>
        </SubMenu>
        <Divider/>
        <MenuItem id="customers" icon={<PeopleIcon />} label="Customers"/>
        <MenuItem id="reports" icon={<BarChartIcon />} label="Reports"/>
        <Divider/>
        <MenuItem id="integrations" icon={<LayersIcon />} label="Integrations"/>
    </NavMenu>
</div>;
```
