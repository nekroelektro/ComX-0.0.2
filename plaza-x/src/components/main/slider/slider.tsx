import * as React from 'react';
import './slider.scss';
import Slider from 'react-slick';
import { Button } from 'react-bootstrap';

class IndexSlider extends React.Component {
    render() {
      var settings = {
        dots: true,
        arrows: true
      };
      return (
        <div className="container col-lg-6">
        <Button/>
          <Slider {...settings}>
            <div>
              <img src="http://placekitten.com/g/400/200" />
            </div>
            <div>
              <img src="http://placekitten.com/g/400/200" />
            </div>
          </Slider>
        </div>
      );
    }
  }

export default IndexSlider;
