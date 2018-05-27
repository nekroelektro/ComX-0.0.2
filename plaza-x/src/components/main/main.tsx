import * as React from 'react';
import './main.scss';

import IndexSlider from './../main/slider/slider';

class Main extends React.Component {
    render() {
        return (
        <div className="App">
            <IndexSlider />
        </div>
        );
    }
}

export default Main;