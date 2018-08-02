import * as React from "react";
import { withStyles, createStyles, Theme } from "@material-ui/core/styles";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";

const styles = (theme: Theme) =>
  createStyles({
    topNavContainer: {
      backgroundColor: "black",
      color: "whitesmoke",
      zIndex: 999
    },
    logoImage: {
      height: "100%",
      position: "absolute",
      marginLeft: "3em"
    }
  });

class Topnav extends React.Component<any> {
  constructor(props: any) {
    super(props);
  }
  public render() {
    const { classes } = this.props;
    return (
      <AppBar position="sticky" className={classes.topNavContainer}>
        <img
          className={classes.logoImage}
          src={require("./../../../../content/images/logoC.png")}
        />
        <Toolbar>
          <IconButton
            className={classes.menuButton}
            color="inherit"
            aria-label="Menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="title" color="inherit" className={classes.flex}>
            Photos
          </Typography>
          <div>
            <IconButton aria-haspopup="true" color="inherit">
              <AccountCircle />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      // <div className={classes.topNavContainer} id="topNavContainer">
      //   <Link to="/">
      //     {/* <Logos className="topNavLogoImage" id="topNavLogoImage" src={} /> */}
      //   </Link>
      //   <div className="topNavFeaturesContainer" id="topNavFeaturesContainer">
      //     <div className="topNavCategoryContainer" id="topNavCategoryContainer">
      //       <div className="topNavCategoryItems" id="topNavCategoryItems">
      //         <span>KATEGORIE</span>
      //         <i className="material-icons categoryIcon">arrow_drop_down</i>
      //       </div>
      //     </div>
      //     <div className="topNavSearchContainer" id="topNavSearchContainer">
      //       <div className="topNavSearchBar" id="topNavSearchBar">
      //         <i className="material-icons">search</i>
      //         <input
      //           type="text"
      //           className="topNavSearchInput"
      //           id="topNavSearchInput"
      //           placeholder="POSERCZUJ DOBROCI"
      //         />
      //         <i className="material-icons">cancel</i>
      //       </div>
      //     </div>
      //     <Link to="/article">
      //       <div className="topNavUserContainer" id="topNavUserContainer">
      //         <span>USER</span>
      //       </div>
      //     </Link>
      //   </div>
      // </div>
    );
  }
}

export default withStyles(styles)(Topnav);
