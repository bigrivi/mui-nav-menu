```tsx
import { Switch, FormControlLabel } from "@mui/material";
import classNames from "classnames";
import { NavMenu } from "mui-nav-menu";
import mockItems from "./mockItems";
import useStyles from "./styles";

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
