import * as React from 'react';
import './main.scss';

// COMPONENTS
import IndexSlider from './../main/slider/slider';
import Reviews from './../main/reviews/reviews';

class Main extends React.Component {
    render() {
        return (
        <div className="App">
            <IndexSlider />
            <Reviews />
        </div>
        );
    }
}

export default Main;