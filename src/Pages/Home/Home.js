import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Card, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import 'bootstrap/dist/css/bootstrap.min.css';
import ThreeDImageGallery from '../../Components/dashboard/3DImageGallery/ThreeDImageGallery';
import '../Home/Home.css';
import { useSelector, useDispatch } from "react-redux";
import { logout, increaseUserScore } from '../../store/slices/user'

const Home = () => {
  const currentUser = useSelector(state => state.currentUser.currentUser)
  console.log(currentUser);
  const dispatch = useDispatch();

  const { t } = useTranslation();

  return (
    <div className="home-container">
      <ThreeDImageGallery />
      <Row className="categories-section text-center">
        <Col>
          <h2>{t('Select a Game Category')}</h2>
        </Col>
      </Row>
      <div className="categories-grid">
        <Card className="category-card text-center">
          <Card.Img variant="top" src="/assets/img/home/world2.jpeg" alt={t('Continents')} />
          <Card.Body>
            <Card.Title>{t('Continents of the World')}</Card.Title>
            <Card.Text>{t('Learn about the continents and their locations.')}</Card.Text>
            <Link to="/world-games">
              <Button variant="primary" className="category-button">{t('Play Now')}</Button>
            </Link>
          </Card.Body>
        </Card>
        <Card className="category-card text-center">
          <Card.Img variant="top" src="/assets/img/home/africa.jpeg" alt={t('Africa')} />
          <Card.Body>
            <Card.Title>{t('African Continent')}</Card.Title>
            <Card.Text>{t('Test your knowledge about African countries.')}</Card.Text>
            <Link to="/learn-africa">
              <Button variant="primary" className="category-button">{t('Play Now')}</Button>
            </Link>
          </Card.Body>
        </Card>
        <Card className="category-card text-center">
          <Card.Img variant="top" src="/assets/img/home/landmarks.jpeg" alt={t('Landmarks')} />
          <Card.Body>
            <Card.Title>{t('World Landmarks')}</Card.Title>
            <Card.Text>{t('Discover famous landmarks around the world.')}</Card.Text>
            <Link to="/map-component">
              <Button variant="primary" className="category-button">{t('Play Now')}</Button>
            </Link>
          </Card.Body>
        </Card>
        <Card className="category-card text-center">
          <Card.Img variant="top" src="/assets/img/home/landsea.jpg" alt={t('Geographical Features')} />
          <Card.Body>
            <Card.Title>{t('Global Mountains Map')}</Card.Title>
            <Card.Text>{t('Discover famous mountains around the world.')}</Card.Text>
            <Link to="/mountains-map">
              <Button variant="primary" className="category-button">{t('Play Now')}</Button>
            </Link>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default Home;
