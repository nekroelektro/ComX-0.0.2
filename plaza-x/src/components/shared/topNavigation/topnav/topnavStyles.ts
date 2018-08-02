import { createStyles, Theme } from "@material-ui/core/styles";

const styles = (theme: Theme) =>
  createStyles({
    topNavContainer: {
      top: 0,
      width: "100%",
      backgroundColor: "#222",
      color: "whitesmoke",
      height: "4em",
      zIndex: 999
    },
    table: {
      minWidth: 500
    },
    tableWrapper: {
      overflowX: "auto"
    }
  });

export default styles;
