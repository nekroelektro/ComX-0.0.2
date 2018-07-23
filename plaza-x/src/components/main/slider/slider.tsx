import * as React from 'react';
import './slider.scss';

class IndexSlider extends React.Component {
    render() {
      var settings = {
        dots: true,
        arrows: true
      };
      return (
        <div className="container col-lg-6">
          SLIDER {settings.arrows}
        </div>
      );
    }
  }

export default IndexSlider;
