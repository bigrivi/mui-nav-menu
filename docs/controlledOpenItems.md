```tsx
import { Switch, FormControlLabel } from "@mui/material";
import classNames from "classnames";
import { NavMenu } from "mui-nav-menu";
import mockItems from "./mockItems";
import useStyles from "./styles";
const { classes } = useStyles();
<div className={classNames(classes.sidebar,classes.collapsed)}>
    <NavMenu
        items={mockItems}
        mode="vertical"
        collapsed
        rootClassName={classes.menu}
        openIds={["orders","orders_sub2"]}
        defaultSelectedIds={["orders","orders_sub2","orders_sub2_1"]}
        inlineIndent={{
            base: 55,
            step: 20,
        }}
    />
</div>;
```
