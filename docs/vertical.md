```tsx
import { Switch, FormControlLabel } from "@mui/material";
import classNames from "classnames";
import { NavMenu } from "mui-nav-menu";
import mockItems from "./mockItems";
import useStyles from "./styles";
const { classes } = useStyles();
<div className={classNames(classes.sidebar)}>
    <NavMenu
        items={mockItems}
        mode="vertical"
        rootClassName={classes.menu}
        inlineIndent={{
            base: 55,
            step: 20,
        }}
    />
</div>;
```
