
import MapView from "@arcgis/core/views/MapView.js";
import Map from "@arcgis/core/Map.js";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer.js";
import Graphic from "@arcgis/core/Graphic";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
import SimpleFillSymbol from "@arcgis/core/symbols/SimpleFillSymbol";
import SimpleLineSymbol from "@arcgis/core/symbols/SimpleLineSymbol.js";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { countries } from '../../../assets/data/africaData';
import SuccessModal from "./SuccessModal";
import correctSound from '../../../assets/sounds/Correct.mp3'
import incorrectSound from '../../../assets/sounds/Incorrect.mp3'
import './PlayAfrica.css'

function PlayAfrica() {
    let highlightLayer = null;
    const mapDiv = useRef(null);
    const correctAnswerRef = useRef(null);
    const timeoutSet = useRef(false);
    const featureLayerRef = useRef(null);
    const correctFeature = useRef(null);
    const isFlashing = useRef(false);
    let flashingInterval = null;
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [countryData, setCountryData] = useState(null);
    const answeredQuestionsRef = useRef([]);
    const [attempts, setAttempts] = useState(3);
    const [score, setScore] = useState(0);
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    useEffect(() => {
        const map = new Map({
            basemap: "satellite"
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
            },
        });

        view.on("drag", (event) => { event.stopPropagation(); }); // Prevent panning
        view.on("key-down", (event) => {
            // Prevent keyboard navigation (arrow keys, +, -)
            const prohibitedKeys = ["+", "-", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];
            if (prohibitedKeys.includes(event.key)) {
                event.stopPropagation();
            }
        });

        const featureLayer = new FeatureLayer({
            url: "https://services5.arcgis.com/VYi2Y47ednvBi2ES/ArcGIS/rest/services/Africa_Countries/FeatureServer/4",
            outFields: ["*"],
            renderer: {
                type: "unique-value",
                field: "GMI_CNTRY",
                defaultSymbol: new SimpleFillSymbol({
                    style: "solid",
                    color: '#1E8346',
                    outline: { color: [250, 250, 250, 0.5] }
                }),
                uniqueValueInfos: []  // Initialize with empty uniqueValueInfos
            }
        });
        map.add(featureLayer);

        const enlargedLayer = new FeatureLayer({
            url: "https://services5.arcgis.com/VYi2Y47ednvBi2ES/ArcGIS/rest/services/Africa_Countries/FeatureServer/3",
            outFields: ["*"],
            renderer: {
                type: "simple",
                symbol: new SimpleFillSymbol({
                    style: "solid",
                    color: [0, 0, 0, 0],
                    outline: {
                        color: [250, 250, 250],
                        width: 1
                    }
                })
            }
        });
        map.add(enlargedLayer);

        featureLayerRef.current = featureLayer;

        highlightLayer = new GraphicsLayer(); // Initialize highlightLayer
        view.map.add(highlightLayer);

        view.when(() => {
            generateQuestion();
        });

        view.on("click", (event) => {
            view.hitTest(event).then((response) => {
                if (response.results.length > 0) {
                    const clickedFeature = response.results[0].graphic;
                    const clickedCountryCode = clickedFeature.attributes.GMI_CNTRY;

                    if (clickedCountryCode === correctAnswerRef.current) {
                        if (isFlashing.current) {
                            handleFlashingCorrectAnswer(clickedFeature);
                        } else
                            handleCorrectAnswer(clickedFeature);
                    } else
                        handleIncorrectAnswer(clickedFeature);
                }
            }).catch((error) => {
                console.error("Error in hitTest:", error);
            });

        });

        return () => {
            if (view) {
                view.destroy();
            }
        };

    }, []);

    useEffect(() => {
        const query = featureLayerRef.current.createQuery();
        query.where = `GMI_CNTRY = '${correctAnswerRef.current}'`;
        featureLayerRef.current.queryFeatures(query).then((result) => {
            if (result.features.length > 0) {
                correctFeature.current = result.features[0];
            }
        });
    }, [correctAnswerRef.current, featureLayerRef.current]);

    function handleCorrectAnswer(clickedFeature) {
        // audioRef.current = new Audio(correctSound);
        // audioRef.current.play();

        highlightFeature(clickedFeature, true, true);
        highlightTextFeature(clickedFeature);

        setScore(prev => prev + 1);
        setTimeout(() => {
            setAttempts(3);
            generateQuestion();
        }, 1500);
    }

    function handleIncorrectAnswer(clickedFeature) {
        highlightFeature(clickedFeature);
        highlightTextFeature(clickedFeature);
        // audioRef.current = new Audio(incorrectSound);
        // audioRef.current.play()

        setAttempts(prev => {
            let newAttempts = prev - 1;
            if (newAttempts < 0) {
                newAttempts = 0;
            }
            if (newAttempts == 0 && correctFeature.current) {
                flashFeature();
            }
            return newAttempts;
        });
    }

    function handleFlashingCorrectAnswer(clickedFeature) {
        isFlashing.current = false;  // Stop flashing
        clearInterval(flashingInterval); // Clear interval
        highlightFeature(clickedFeature, false, true);
        timeoutSet.current = false;
        setTimeout(() => {
            setAttempts(3);
            generateQuestion();
        }, 1500);
    }

    function updateFeatureColor(featureLayer, countryCode, newColor) {
        const renderer = featureLayer.renderer.clone();

        let uniqueValueInfo = renderer.uniqueValueInfos.find(info => info.value === countryCode);

        if (!uniqueValueInfo) {
            uniqueValueInfo = {
                value: countryCode,
                symbol: new SimpleFillSymbol({
                    style: "solid",
                    color: newColor,
                    outline: { color: [250, 250, 250, 0.5] }
                })
            };
            renderer.uniqueValueInfos.push(uniqueValueInfo);
        } else {
            uniqueValueInfo.symbol.color = newColor;
        }

        featureLayer.renderer = renderer;
    }

    function flashFeature() {
        isFlashing.current = true;
        clearInterval(flashingInterval);
        flashingInterval = setInterval(() => {
            if (correctFeature.current) {
                updateFeatureColor(featureLayerRef.current, correctAnswerRef.current, '#FDFFD2'); // Change to red
                setTimeout(() => {
                    updateFeatureColor(featureLayerRef.current, correctAnswerRef.current, '#1E8346'); // Reset color
                }, 600);
            } else {
                console.error("Correct feature is undefined during flashing");
            }
        }, 1200);
    }

    function highlightFeature(feature, isCorrect = false, permanant = false) {
        const polygon = feature.geometry;
        const highlightColor = isCorrect ? '#FDFFD2' : '#BF4140';
        const outlineColor = isCorrect ? [0, 0, 0, 0.5] : [250, 250, 250, 0.5];
        const outlineWidth = isCorrect ? 1 : 2; 
        const highlightGraphic = new Graphic({
            geometry: polygon,
            interactive: true,
            symbol: {
                type: "simple-fill",
                color: highlightColor,
                outline: {
                    color: outlineColor,
                    width: outlineWidth
                }
            }
        });
        highlightLayer.add(highlightGraphic);
        if (!permanant) {
            setTimeout(() => {
                highlightLayer.remove(highlightGraphic);
            }, 1500);
        }
    }

    function highlightTextFeature(feature) {
        const polygon = feature.geometry;
        const center = polygon.centroid; // Get the centroid of the polygon

        const textSymbol = {
            type: "text",
            color: "black",
            haloColor: "white",
            haloSize: "2px",
            text: feature.attributes.CNTRY_NAME,
            xoffset: 0,
            yoffset: 0,
            font: {
                size: 9,
                family: "sans-serif",
                weight: "bold"
            }
        };

        const textGraphic = new Graphic({
            geometry: center, // Position the text at the centroid
            symbol: textSymbol
        });

        highlightLayer.add(textGraphic);
        setTimeout(() => {
            highlightLayer.remove(textGraphic);
        }, 1500);
    }

    const generateQuestion = () => {
        const unansweredCountries = countries.filter(country => !answeredQuestionsRef.current.includes(country.code));
        if (unansweredCountries.length === 0) {
            setCurrentQuestion("All countries have been asked!");
            setCountryData(null);
            setShowSuccessModal(true);
            return;
        }

        const randomCountry = unansweredCountries[Math.floor(Math.random() * unansweredCountries.length)];
        setCurrentQuestion(`Where is ${randomCountry.name}`);
        correctAnswerRef.current = randomCountry.code;
        answeredQuestionsRef.current = [...answeredQuestionsRef.current, correctAnswerRef.current];

        axios
            .get(`https://restcountries.com/v3.1/name/${randomCountry.name}`)
            .then((apiResponse) => {
                if (apiResponse.status === 200) {
                    const data = apiResponse.data[0];
                    setCountryData(data);
                } else {
                    setCountryData(null);
                }
            })
            .catch((error) => { // Handle the error here
                console.error("Error fetching country data:", error);
                setCountryData(null);
            });
    };

    return (
        <div className="containerDiv">
            <div className="questionAndFlagContainer">
                {currentQuestion && (
                    <div id="question-container">
                        <h3>{currentQuestion}</h3>
                    </div>
                )}
                <div className="flagContainer">
                    {currentQuestion && countryData && <img src={countryData.flags.png} alt="Country Flag" />}
                </div>
                <div className="attemps">
                    <h3> | {attempts}/3 |</h3>
                </div>
                <div className="score">
                    <h3> score {score}/55</h3>
                </div>
            </div>
            <div ref={mapDiv} className="map-view"></div>
            {showSuccessModal && (
                <SuccessModal
                    show={showSuccessModal}
                    onClose={() => setShowSuccessModal(false)}
                    score={score}
                />
            )}
        </div>
    )
}

export default PlayAfrica;

