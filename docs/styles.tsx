import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => {
    return {
        sidebar: {
            width: 300,
            padding: 10,
            background: "#234578",
            border: "1px solid #ddd",
            borderRadius: 10,
            transition: "width 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)",
        },
        collapsed: {
            width: 55,
        },
        menu: {
            "& .MuiListItemButton-root": {
                transition: "background 300ms linear",
                color: "rgba(255,255,255,0.8)",

                "& .MuiListItemIcon-root": {
                    color: "#798EAD",
                    padding: 0,
                    marginRight: 15,
                    justifyContent: "center",
                    minWidth: 0,
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
            "& .MuiDivider-root": {
                margin: "10px 0px",
                backgroundColor: "#798EAD",
            },
        },
    };
});

export default useStyles;
