import React from 'react';
import { Carousel } from 'react-bootstrap';
import huahua from '../assets/carousel/huahua.png'
import menglan from '../assets/carousel/menglan.png'
import qizi from '../assets/carousel/qizi.png'
import yaya from '../assets/carousel/yaya.png'
function ListCarousel() {
    
    return (
        <Carousel >
            <Carousel.Item>
                <img
                    className="d-block w-50 img-fluid mx-auto rounded-5"
                    style={{objectFit:"cover", objectPosition:"center"}}
                    src={huahua}
                    alt="huahua"
                />
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-50 img-fluid mx-auto rounded-5"
                    src={menglan}
                    alt="menglan"
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
                    src={qizi}
                    alt="qizi"
                />
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-50 img-fluid mx-auto rounded-5"
                    src={yaya}
                    alt="yaya"
                />
            </Carousel.Item>
        </Carousel>
    );
}

export default ListCarousel;
