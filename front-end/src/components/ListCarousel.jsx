import React from 'react';
import { Carousel } from 'react-bootstrap';
import image1 from '../assets/image1.png';
import image2 from '../assets/image2.png';
import ts from '../assets/ts.png'
function ListCarousel() {
    
    return (
        <Carousel >
            <Carousel.Item>
                <img
                    className="d-block w-50 img-fluid mx-auto rounded-5"
                    style={{objectFit:"cover", objectPosition:"center"}}
                    src={image1}
                    alt="First slide"
                />
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-50 img-fluid mx-auto rounded-5"
                    src={image2}
                    alt="Second slide"
                />
            </Carousel.Item>
            {/* <Carousel.Item>
                <img
                    className="d-block w-50 img-fluid mx-auto rounded-5"
                    src={ts}
                    alt="Third slide"
                />
            </Carousel.Item> */}
            <Carousel.Item>
                <img
                    className="d-block w-50 img-fluid mx-auto rounded-5"
                    src={image1}
                    alt="Fourth slide"
                />
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-50 img-fluid mx-auto rounded-5"
                    src={image2}
                    alt="Fifth slide"
                />
            </Carousel.Item>
        </Carousel>
    );
}

export default ListCarousel;
