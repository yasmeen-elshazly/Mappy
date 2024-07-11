import React, { useEffect, useRef } from 'react';
import SceneView from '@arcgis/core/views/SceneView';
import Map from '@arcgis/core/Map';
import Point from '@arcgis/core/geometry/Point';
import Graphic from '@arcgis/core/Graphic';
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer';
import PopupTemplate from '@arcgis/core/PopupTemplate';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import '../Landmarks/MapComponent.css';
import pinIcon from '../../../assets/img/pin2.png';

const landmarks = [
    { id: 1, longitude: 2.2945, latitude: 48.8588, title: 'Tour Eiffel', country: 'France', content: 'The Eiffel Tower, was completed in 1889 and stands as a symbol of French engineering and cultural heritage.' },
    { id: 2, longitude: 31.1342, latitude: 29.9792, title: 'Pyramids of Giza', country: 'Egypt', content: 'The Pyramids of Giza, are ancient pyramids that have fascinated the world with their history and architectural grandeur.' },
    { id: 3, longitude: 12.4922, latitude: 41.8902, title: 'Colosseum', country: 'Italy', content: 'The Colosseum, is a testament to Roman engineering and has stood the test of time as a historic landmark.' },
    { id: 4, longitude: 78.0421, latitude: 27.1751, title: 'Taj Mahal', country: 'India', content: 'The Taj Mahal is an iconic symbol of love and one of the most beautiful examples of Mughal architecture.' },
    { id: 5, longitude: 116.5704, latitude: 40.4319, title: 'The Great Wall of China', country: 'China', content: 'The Great Wall is a UNESCO World Heritage Site and a marvel of ancient engineering, stretching over 13,000 miles.' },
    { id: 6, longitude: -74.0445, latitude: 40.6892, title: 'Statue of Liberty', country: 'USA', content: 'The Statue of Liberty is a symbol of freedom and democracy, welcoming visitors to the United States.' },
    { id: 7, longitude: 2.3377, latitude: 48.8606, title: 'Louvre Museum', country: 'France', content: 'The Louvre Museum is the world\'s largest art museum and a historic monument housing thousands of works of art.' },
    { id: 8, longitude: 10.7498, latitude: 47.5576, title: 'Neuschwanstein Castle', country: 'Germany', content: 'Neuschwanstein Castle is a fairy-tale castle nestled in the Bavarian Alps, inspiring Disney\'s Sleeping Beauty Castle.' },
    { id: 9, longitude: 2.1744, latitude: 41.4036, title: 'La Sagrada Familia', country: 'Spain', content: 'La Sagrada Familia is an iconic basilica designed by Antoni Gaudí, known for its unique architectural style.' },
    { id: 10, longitude: 100.5167, latitude: 13.7244, title: 'Grand Palace', country: 'Thailand', content: 'The Grand Palace is a complex of royal buildings showcasing Thai architecture and art, including the Temple of the Emerald Buddha.' },
    { id: 11, longitude: 55.2744, latitude: 25.1972, title: 'Burj Khalifa', country: 'UAE', content: 'Burj Khalifa is the tallest building in the world, offering panoramic views of the city and luxurious amenities.' },
    { id: 12, longitude: 28.9760, latitude: 41.0082, title: 'Blue Mosque', country: 'Turkey', content: 'The Blue Mosque is a historic mosque known for its stunning blue tiles and impressive architecture.' },
    { id: 13, longitude: 10.3966, latitude: 43.7230, title: 'Leaning Tower of Pisa', country: 'Italy', content: 'The Leaning Tower of Pisa is a famous bell tower known for its unintended tilt and architectural beauty.' },
    { id: 14, longitude: -117.9190, latitude: 33.8121, title: 'Disneyland Resort', country: 'USA', content: 'Disneyland Resort is a world-famous theme park and entertainment complex, featuring iconic rides and attractions.' },
    { id: 15, longitude: -43.2096, latitude: -22.9519, title: 'Christ the Redeemer', country: 'Brazil', content: 'Christ the Redeemer is a monumental statue overlooking the city, symbolizing Christianity and Brazilian culture.' },
];

function MapComponent() {
    const mapRef = useRef(null);
    const viewRef = useRef(null);

    useEffect(() => {
        let abortController = new AbortController();

        const initializeMap = async () => {
            if (!mapRef.current || viewRef.current) return;

            const myMap = new Map({
                basemap: 'topo-3d',
            });

            const view = new SceneView({
                container: mapRef.current,
                map: myMap,
                center: [2.3522, 48.8566],
                zoom: 1,
                ui: {
                    components: [],
                },
                signal: abortController.signal,
            });

            viewRef.current = view;

            const graphicsLayer = new GraphicsLayer();

            landmarks.forEach((landmark) => {
                const pointGeometry = new Point({
                    longitude: landmark.longitude,
                    latitude: landmark.latitude,
                });

                const pinSymbol = {
                    type: 'picture-marker',
                    url: pinIcon,
                    width: '20px',
                    height: '20px',
                };

                const popupTemplate = new PopupTemplate({
                    title: `{title}`,
                    content: `<b>Country:</b> {country}<br><b>Content:</b> {content}`,
                });

                const pointGraphic = new Graphic({
                    geometry: pointGeometry,
                    symbol: pinSymbol,
                    attributes: {
                        title: landmark.title,
                        country: landmark.country,
                        content: landmark.content,
                    },
                    popupTemplate: popupTemplate,
                });

                graphicsLayer.add(pointGraphic);
            });

            myMap.add(graphicsLayer);

            view.on('click', async (event) => {
                const hitTestResult = await view.hitTest(event);

                if (hitTestResult.results.length > 0) {
                    const clickedGraphic = hitTestResult.results[0].graphic;

                    view.popup.open({
                        features: [clickedGraphic],
                        updateLocationEnabled: true,
                    });
                }
            });
        };

        initializeMap();

        return () => {
            abortController.abort();
            if (viewRef.current) {
                viewRef.current.destroy();
                viewRef.current = null;
            }
        };
    }, []);

    const zoomAndRotateAround = async (graphic) => {
        if (viewRef.current) {
            const { longitude, latitude } = graphic.geometry;

            await viewRef.current.goTo({
                target: [longitude, latitude],
                zoom: 17,
                tilt: 45,
            });

            for (let angle = 0; angle < 360; angle += 10) {
                await viewRef.current.goTo({ heading: angle }, { animate: true });
            }
        }
    };

    const handleLandmarkClick = async (landmark) => {
        if (viewRef.current) {
            await zoomAndRotateAround({
                geometry: new Point({
                    longitude: landmark.longitude,
                    latitude: landmark.latitude,
                }),
            });
        }
    };

    const resetView = async () => {
        if (viewRef.current) {
            await viewRef.current.goTo({
                center: [2.3522, 48.8566],
                zoom: 1,
                tilt: 0,
            });
        }
    };

    return (
        <div className="map-wrapper">
            <div className="map-container" ref={mapRef}></div>
            <div className="popup-container" ref={viewRef && viewRef.current && viewRef.current.popup.container}></div>
            <div className="sidebar">
                <Button onClick={resetView} className="back-button">Back</Button>
                    {landmarks.map((landmark) => (
                        <ListGroup.Item key={landmark.id} onClick={() => handleLandmarkClick(landmark)} action>
                            {`${landmark.title}, ${landmark.country}`}
                        </ListGroup.Item>
                    ))}
            </div>
        </div>
    );
}

export default MapComponent;
