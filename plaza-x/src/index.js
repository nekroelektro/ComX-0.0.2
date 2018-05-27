import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Router, Route, hashHistory } from 'react-router'

//COMPONENTS
import Article from './components/article/article';
import Main from './components/main/main';

ReactDOM.render(
<Router history={hashHistory}>
    <Route path="/" component={App}/>
    <Route path="/article" component={Article}/>
    <Route path="/main" component={Main}/>
  </Router>, 
    document.getElementById('root'));
registerServiceWorker();
