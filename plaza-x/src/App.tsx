import * as React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { Route } from "react-router";

// COMPONENTS
import Article from "./components/article/article";
import Footer from "./components/shared/footer/footer";
import TopNav from "./components/shared/topNavigation/container/topnavContainer";
import Main from "./components/main/main";

import { withStyles, createStyles, Theme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

const styles = (theme: Theme) =>
  createStyles({
    globalContainer: {
      flexGrow: 1
    },
    "@global body": {
      margin: "0",
      padding: "0",
      background: "#222",
      fontFamily: "Roboto !important"
    }
  });

class App extends React.Component<any> {
  constructor(props: any) {
    super(props);
  }
  public render() {
    const { classes, ...rest } = this.props;
    return (
      <Router>
        <React.Fragment>
          <CssBaseline />
          <TopNav {...rest} />
          <div className={classes.globalContainer}>
            <Switch>
              <Route path="/article" component={Article} />
              <Route path="/" component={Main} />
            </Switch>
          </div>
          <Footer />
        </React.Fragment>
      </Router>
    );
  }
}

export default withStyles(styles)(App);
