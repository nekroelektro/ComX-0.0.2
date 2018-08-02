import * as React from "react";

// COMPONENTS
import IndexSlider from "./../main/slider/slider";
import Reviews from "./../main/reviews/reviews";
import { withStyles, createStyles, Theme } from "@material-ui/core/styles";

const styles = (theme: Theme) =>
  createStyles({
    mainContainer: {
      width: "70%",
      backgroundColor: "grey",
      margin: "0 auto",
      marginBottom: "30px"
    }
  });

class Main extends React.Component<any> {
  constructor(props: any) {
    super(props);
  }

  public render() {
    const { classes } = this.props;
    return (
      <div className={classes.mainContainer}>
        <IndexSlider />
        <Reviews />
      </div>
    );
  }
}

export default withStyles(styles)(Main);
