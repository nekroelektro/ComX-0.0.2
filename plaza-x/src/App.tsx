import * as React from 'react';
import './App.scss';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { Route } from 'react-router';

// COMPONENTS
import Article from './components/article/article';
import Footer from './components/footer/footer';
import Topnav from './components/topNavigation/topnav/topnav';
import Main from './components/main/main';

class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <Topnav />
          <Switch>
            <Route path="/article" component={Article}/>
            <Route path="/" component={Main}/>
          </Switch>
          <Footer />          
        </div>
      </Router>
    );
  }
}

export default App;
