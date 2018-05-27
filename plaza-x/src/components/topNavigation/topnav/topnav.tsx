import * as React from 'react';
import './topnav.scss';
import { Link } from 'react-router-dom';
const logo = require('../../../content/images/logoC.png');

class Topnav extends React.Component {
    render() {
        return (
<div className="topNavContainer" id="topNavContainer">
    <Link to="/">
        <img className="topNavLogoImage" id="topNavLogoImage" src={logo} />
    </Link>
    <div className="topNavFeaturesContainer" id="topNavFeaturesContainer">
        <div className="topNavCategoryContainer" id="topNavCategoryContainer">
            <a className="topNavCategoryAnchor" id="topNavCategoryAnchor">
                <Link to="/article">
                    <span>KATEGORIE</span>
                </Link>
            </a>
        </div>
        <div className="topNavSearchContainer" id="topNavSearchContainer">
            <div className="topNavSearchBar" id="topNavSearchBar">
                <i className="material-icons">search</i>
                <input type="text" className="topNavSearchInput" id="topNavSearchInput" placeholder="POSERCZUJ DOBROCI" />
                <i className="material-icons">cancel</i>
            </div>
        </div>
        <div className="topNavUserContainer" id="topNavUserContainer">
            <span>USER</span>
        </div>
    </div>
</div>
        );
    }
}

export default Topnav;