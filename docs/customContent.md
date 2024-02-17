```tsx
import {
    Switch,
    FormControlLabel,
    IconButton,
    ListItemIcon,
    ListItemSecondaryAction,
    ListItemText,
    Badge,
} from "@mui/material";
import classNames from "classnames";
import { NavMenu } from "mui-nav-menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import MoreHoriz from "@mui/icons-material/MoreHoriz";
import mockItems from "./mockItems";
import useStyles from "./styles";
const { classes } = useStyles();
const [dashboard, ...others] = mockItems;

const DashboardMenu = ({ nodeId, itemProps }) => {
    return (
        <>
            <ListItemIcon>
                <Badge
                    overlap="rectangular"
                    max={1e6}
                    badgeContent={999}
                    color="error"
                >
                    <DashboardIcon />
                </Badge>
            </ListItemIcon>
            <ListItemText className={itemProps.textClasses} primary={"Home"} />
            <ListItemSecondaryAction>
                <IconButton className={itemProps.textClasses} color="primary">
                    <MoreHoriz />
                </IconButton>
            </ListItemSecondaryAction>
        </>
    );
};

<div className={classNames(classes.sidebar)}>
    <NavMenu
        items={[
            {
                id: "dashboard",
                label: "Dashboard",
                Content: DashboardMenu,
            },
            ...others,
        ]}
        mode="vertical"
        rootClassName={classes.menu}
        inlineIndent={{
            base: 55,
            step: 20,
        }}
    />
</div>;
```
