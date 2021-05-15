import React from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';

export default function HomeSlider(props) {
    const { product } = props

    return (
        <div>
            
            <div className="slide-container">
                <Slide>
                    {/* <div className="each-slide">
                        <div style={{ 'backgroundImage': `url(${product.image})` }}>
                            <span>Slide 1</span>
                        </div>
                    </div> */}
                    {/* <div className="each-slide">
                        <div style={{ 'backgroundImage': `url(${slideImages[1]})` }}>
                            <span>Slide 2</span>
                        </div>
                    </div>
                    <div className="each-slide">
                        <div style={{ 'backgroundImage': `url(${slideImages[2]})` }}>
                            <span>Slide 3</span>
                        </div>
                    </div> */}
                </Slide>
            </div>
        </div>
    )
}
