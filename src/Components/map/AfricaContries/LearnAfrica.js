import React, { useEffect, useRef, useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom for navigation
import axios from 'axios';
import LoginModal from './LoginModal';
import './LearnAfrica.css';

// Import ArcGIS modules
import MapView from '@arcgis/core/views/MapView';
import Map from '@arcgis/core/Map';
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import SimpleFillSymbol from '@arcgis/core/symbols/SimpleFillSymbol';
import Graphic from '@arcgis/core/Graphic';
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';

function LearnAfrica() {
    const currentUser = useSelector(state => state.currentUser.currentUser)
    const navigate = useNavigate();

    const mapDiv = useRef(null);
    let highlightLayer = null;
    let highlightEnlargedFeature = null;
    let currentHighlight = null;
    let countryName = null;
    let countryID = null;

    const [countryData, setCountryData] = useState(null);
    const [showLoginModal, setShowLoginModal] = useState(false);


    useEffect(() => {
        const map = new Map({
            basemap: 'topo'
        });

        const view = new MapView({
            container: mapDiv.current,
            map: map,
            extent: {
                xmin: -18.556,
                ymin: -34.874,
                xmax: 51.482,
                ymax: 37.909
            },
            ui: {
                components: [] // Remove all default UI elements
            },
            navigation: {
                mouseWheelZoomEnabled: false,
                panningEnabled: false
            },
            constraints: {
                minZoom: 3,
                maxZoom: 3
            }
        });

        view.on('drag', event => {
            event.stopPropagation();
        }); // Prevent panning
        view.on('key-down', event => {
            // Prevent keyboard navigation (arrow keys, +, -)
            const prohibitedKeys = ['+', '-', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];
            if (prohibitedKeys.includes(event.key)) {
                event.stopPropagation();
            }
        });

        const featureLayer = new FeatureLayer({
            url: 'https://services5.arcgis.com/VYi2Y47ednvBi2ES/ArcGIS/rest/services/AfricaCountries/FeatureServer/4',
            outFields: ['*'],
            renderer: {
                type: 'simple',
                symbol: new SimpleFillSymbol({
                    style: 'solid',
                    color: '#97BE5A',
                    outline: {
                        color: [0, 0, 0, 0.5],
                        width: 1
                    }
                })
            }
        });
        map.add(featureLayer);

        const enlargedLayer = new FeatureLayer({
            url: 'https://services5.arcgis.com/VYi2Y47ednvBi2ES/ArcGIS/rest/services/AfricaCountries/FeatureServer/3',
            outFields: ['*'],
            renderer: {
                type: 'simple',
                symbol: new SimpleFillSymbol({
                    style: 'solid',
                    color: [0, 0, 0, 0],
                    outline: {
                        color: [250, 250, 250],
                        width: 1
                    }
                })
            }
        });
        map.add(enlargedLayer);

        highlightLayer = new GraphicsLayer(); // Initialize highlightLayer
        view.map.add(highlightLayer);

        view.on('click', event => {
            view.hitTest(event).then(response => {
                const results = response.results;
                let graphic = null;
                if (results.length > 0) {
                    graphic = results[0].graphic;
                    if (graphic && graphic.attributes && graphic !== currentHighlight) {
                        highlightLayer.removeAll();
                        currentHighlight = graphic; // Get the hovered feature

                        countryName = graphic.attributes.CNTRY_NAME;
                        countryID = graphic.attributes.OBJECTID_1;
                        console.log(countryName);
                        console.log(countryID);

                        if (graphic.layer === featureLayer) {
                            highlightFeature(graphic);
                        } else if (graphic.layer === enlargedLayer) {
                            highlightEnlargedFeature(graphic);
                        }

                        axios
                            .get(`https://restcountries.com/v3.1/name/${countryName}`)
                            .then(apiResponse => {
                                if (apiResponse.status === 200) {
                                    const data = apiResponse.data[0];
                                    setCountryData(data);
                                } else {
                                    setCountryData(null);
                                }
                            })
                            .catch(error => {
                                // Handle the error here
                                console.error('Error fetching country data:', error);
                                setCountryData(null);
                            });
                    }
                }
            });
        });

        function highlightFeature(feature) {
            const polygon = feature.geometry;
            const highlightGraphic = new Graphic({
                geometry: polygon,
                symbol: {
                    type: 'simple-fill',
                    color: '#FFA62F',
                    outline: {
                        color: [0, 0, 0, 0.5],
                        width: 1
                    }
                }
            });
            highlightLayer.add(highlightGraphic);
        }

        function highlightEnlargedFeature(feature) {
            const polygon = feature.geometry;
            const highlightGraphic = new Graphic({
                geometry: polygon,
                symbol: {
                    type: 'simple-line',
                    color: '#FFA62F', // Orange outline color
                    width: 1 // Adjust border width as needed (start with 1 and experiment)
                }
            });
            highlightLayer.add(highlightGraphic);
        }

        return () => {
            if (view) {
                view.destroy();
            }
        };
    }, []);

    const handleButtonClick = () => {
        if (currentUser == null) {
            setShowLoginModal(true);
        } else {
            navigate('/play-africa');
        }
    };

    return (
        <div className={`map-container ${countryData ? 'has-data' : ''}`}>
            <div ref={mapDiv} className="map-wrapper"></div>
            {countryData && (
                <Card className="game-panell" border="success" style={{ width: '25rem', boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px' }} >
                    <Card.Header style={{ fontSize: '35px', fontWeight: '600' }}>{countryData.name.common}</Card.Header>
                    <Card.Img variant="top" src={countryData.flags.png} />
                    <Card.Body>
                        <Card.Text style={{ paddingTop: '15px' }}>
                            <ul>
                                <li>Capital: {countryData.capital}</li>
                                <li>Population: {countryData.population}</li>
                            </ul>
                        </Card.Text>
                    </Card.Body>
                </Card>
            )}
            <Link to="/play-africa">
                <Button className="start" variant="primary" onClick={handleButtonClick}>Start Game</Button>
            </Link>
            {showLoginModal && (
                <LoginModal
                    show={showLoginModal}
                    onClose={() => setShowLoginModal(false)}
                />
            )}
        </div>
    );
}

export default LearnAfrica;
