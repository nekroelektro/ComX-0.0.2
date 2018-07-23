import * as React from 'react';
import './topnav.scss';
import { Link } from 'react-router-dom';
const logo = require('../../../content/images/logoC.png');
import styled from 'styled-components';

const Guzik = styled.button`
  background: red;
  border-radius: 8px;
  color: white;
`;

const Logos = styled.img`
    width: 10em;
`;

class Topnav extends React.Component {
    render() {
        return (
<div className="topNavContainer" id="topNavContainer">
    <Guzik>FUKK ME!</Guzik>
    <Link to="/">
        <Logos className="topNavLogoImage" id="topNavLogoImage" src={logo} />
    </Link>
    <div className="topNavFeaturesContainer" id="topNavFeaturesContainer">
        <div className="topNavCategoryContainer" id="topNavCategoryContainer">
            <div className="topNavCategoryItems" id="topNavCategoryItems">
                <span>KATEGORIE</span>
                <i className="material-icons categoryIcon">arrow_drop_down</i>
            </div>
        </div>
        <div className="topNavSearchContainer" id="topNavSearchContainer">
            <div className="topNavSearchBar" id="topNavSearchBar">
                <i className="material-icons">search</i>
                <input type="text" className="topNavSearchInput" id="topNavSearchInput" placeholder="POSERCZUJ DOBROCI" />
                <i className="material-icons">cancel</i>
            </div>
        </div>
        <Link to="/article">
            <div className="topNavUserContainer" id="topNavUserContainer">
                <span>USER</span>
            </div>
        </Link>
    </div>
</div>
        );
    }
}

export default Topnav;