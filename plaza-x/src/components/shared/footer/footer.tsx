import * as React from "react";
import { withStyles, createStyles, Theme } from "@material-ui/core/styles";

const styles = (theme: Theme) =>
  createStyles({
    footerContainer: {
      position: "fixed",
      bottom: "0",
      width: "100%",
      backgroundColor: "black",
      color: "whitesmoke",
      textAlign: "center",
      margin: "0 auto",
      height: "2em",
      zIndex: 999,
      fontFamily: "Eater",
      "&:hover": {
        color: "red",
        cursor: "not-allowed"
      },
      "& p": {
        margin: "0 auto"
      }
    },
    footerIcon: {
      fontSize: "1em"
    }
  });

function getYear(): number {
  return new Date().getFullYear();
}

class Footer extends React.Component<any> {
  constructor(props: any) {
    super(props);
  }

  public render() {
    const { classes } = this.props;
    const iconClasses = classes.footerIcon + " material-icons";
    return (
      <footer className={classes.footerContainer} id="bottomFooter">
        <p>
          <i className={iconClasses}>copyright</i> {getYear()} - Zero Fucks
          Given by NEKRO
        </p>
      </footer>
    );
  }
}

export default withStyles(styles)(Footer);
