#### Modify offset by changing style

```tsx
import { Switch, FormControlLabel,alpha } from "@mui/material";
import classNames from "classnames";
import { NavMenu } from "mui-nav-menu";
import { makeStyles } from "tss-react/mui";
import mockItems from "./mockItems";
import useStyles from "./styles";
const { classes } = useStyles();

const useCustomStyles = makeStyles()((theme) => {
    return {
        popup: {
            "& .PopperContent": {
                backgroundColor: theme.vars
                    ? theme.vars.palette.Tooltip.bg
                    : alpha(theme.palette.grey[700], 0.92),
            },
            "& .MuiListItemButton-root": {
                transition: "background 300ms linear",
                color: "rgba(255,255,255,0.8)",

                "& .MuiListItemIcon-root": {
                    color: "#798EAD",
                    padding: 0,
                    marginRight: 15,
                    justifyContent: "center",
                    minWidth: 24,
                    transition: "color 300ms linear",
                },
                "&:hover": {
                    background: "#165DFF !important",
                    borderRadius: "4px",
                    color: "#fff !important",
                    "& .MuiListItemIcon-root": {
                        color: "#fff !important",
                    },
                },
                "&.Mui-selected": {
                    background: "#165DFF",
                    borderRadius: "4px",
                    color: "#fff !important",
                    "& .MuiListItemIcon-root": {
                        color: "#fff",
                    },
                },
            },
            "& .PopperArrow": {
                "&::after": {
                    backgroundColor: theme.vars
                    ? theme.vars.palette.Tooltip.bg
                    : alpha(theme.palette.grey[700], 0.92),
                },
            },
            "& .MuiPaper-root": {
                marginLeft: 20,
            },
            "&.NestedLevel-1": {
                "& .MuiPaper-root": {
                    marginLeft: "30px !important",
                },
            },
        },
    };
});

const { classes: customClasses } = useCustomStyles();

<div className={classNames(classes.sidebar, classes.collapsed)}>
    <NavMenu
        items={mockItems}
        mode="vertical"
        collapsed
        rootClassName={classes.menu}
        placement="right"
        popperClassName={customClasses.popup}
        defaultOpenIds={["orders"]}
        inlineIndent={{
            base: 55,
            step: 20,
        }}
    />
</div>;
```
