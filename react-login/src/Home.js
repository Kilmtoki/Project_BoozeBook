import React from "react";
import { Carousel } from "react-bootstrap";
import music from './images/music.png';
import Promotion from './images/Promotion.png';
import Vip from './images/Vip.png'


const Home = () =>{
    return(
        <>
            <Carousel>
            <Carousel.Item interval={1000}>
                <img
                className="d-block w-100"
                src= {music}
                alt="First slide"
                />
            </Carousel.Item>
            <Carousel.Item interval={500}>
                <img
                className="d-block w-100"
                src={Promotion}
                alt="Second slide"
                />
            </Carousel.Item>
            <Carousel.Item>
                <img
                className="d-block w-100"
                src= {Vip}
                alt="Third slide"
                />
            </Carousel.Item>
            </Carousel>
        </>
    );
}


export default Home;