import React, { forwardRef, memo } from "react";
import classNames from "classnames";
import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles<{ elevation: number }>()(
    (theme, { elevation }) => {
        return {
            root: {
                position: "absolute",
                zIndex: -1,
                "&::after": {
                    content: '""',
                    display: "block",
                    height: 10,
                    width: 10,
                    transformOrigin: "center",
                    transform: "rotate(45deg)",
                    boxShadow: theme.shadows[elevation],
                    pointerEvents: "none",
                    backgroundColor: theme.palette.background.paper,
                },
            },
        };
    }
);

const Arrow = forwardRef<HTMLDivElement, { elevation: number }>(
    ({ elevation }, ref) => {
        const { classes } = useStyles({ elevation });

        return (
            <div
                className={classNames("PopperArrow", classes.root)}
                ref={ref}
            />
        );
    }
);

export default memo(Arrow);
