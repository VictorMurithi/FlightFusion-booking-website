import React from 'react';
import { Container, Row, Col, Figure } from 'react-bootstrap';
import img1 from '../img/g1.png';
import img2 from '../img/g2.png';
import img3 from '../img/g3.png';
import img4 from '../img/g4.png';
import img5 from '../img/g5.png';
import img6 from '../img/g6.png';
// import 'bootstrap/dist/css/bootstrap.min.css';

const PhotoGrid = () => {
  return (
    <Container className='grid-sec'>
        <Row className="my-4 col-md-6">
            <Col xs={12} className="text-left">
            <h2 className="mb-4">Top Destinations</h2>
            <p className="destination-txt">Discover the world with convenience. <br />
Book a flight with us today.Discover the <br />
world with convenience. Book a flight with
us today.</p>
            </Col>
        </Row>
        <div className='photo-grid'>
            <Row className="mb-2 pgrid" >
                <Col xs={12} md={4} className="mb-1">
                    <Figure>
                        <Figure.Image src={img1} alt="Photo 1" className="img-fluid" />
                        <Figure.Caption className="text-center">Japan</Figure.Caption>
                    </Figure>
                </Col>
                <Col xs={12} md={4} className="mb-1 g-img">
                    <Figure>
                        <Figure.Image src={img2} alt="Photo 1" className="img-fluid" />
                        <Figure.Caption className="text-center">Mexico</Figure.Caption>
                    </Figure>
                </Col>
                <Col xs={12} md={4} className="mb-1">
                    <Figure>
                        <Figure.Image src={img3} alt="Photo 1" className="img-fluid" />
                        <Figure.Caption className="text-center">France</Figure.Caption>
                    </Figure>
                </Col>
            </Row>

            <Row className="mb-4 pgrid">
                <Col xs={12} md={4} className="mb-3">
                    <Figure>
                        <Figure.Image src={img4} alt="Photo 1" className="img-fluid" />
                        <Figure.Caption className="text-center">England</Figure.Caption>
                    </Figure>
                </Col>
                <Col xs={12} md={4} className="mb-3 g-img">
                    <Figure>
                        <Figure.Image src={img5} alt="Photo 1" className="img-fluid" />
                        <Figure.Caption className="text-center">Bali</Figure.Caption>
                    </Figure>
                </Col>
                <Col xs={12} md={4} className="mb-3">
                    <Figure>
                        <Figure.Image src={img6} alt="Photo 1" className="img-fluid" />
                        <Figure.Caption className="text-center">Turkey</Figure.Caption>
                    </Figure>
                </Col>
            </Row>
        </div>
      
    </Container>
  );
};

export default PhotoGrid;