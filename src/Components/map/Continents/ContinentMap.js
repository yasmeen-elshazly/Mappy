import React, { useEffect, useState, useCallback } from "react";
import Map from "@arcgis/core/Map.js";
import MapView from "@arcgis/core/views/MapView.js";
import Extent from "@arcgis/core/geometry/Extent";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer.js";
import Confetti from "react-confetti";
import "./ContinentMap.css";
import SuccessModal from "../../map/AfricaContries/SuccessModal";


const continentData = {
  Africa: {
    name: "Africa",
    size: "30.37 million km²",
    numOfCountries: 54,
    description: "Home to the Sahara Desert",
    famousFor: "Rich cultural heritage and biodiversity"
  },
  Antarctica: {
    name: "Antarctica",
    size: "14 million km²",
    numOfCountries: 0,
    description: "The coldest continent",
    famousFor: "Vast ice sheets and extreme climate"
  },
  Asia: {
    name: "Asia",
    size: "44.58 million km²",
    numOfCountries: 49,
    description: "The largest continent by area and population",
    famousFor: "Diverse cultures, languages, and landscapes"
  },
  Europe: {
    name: "Europe",
    size: "10.18 million km²",
    numOfCountries: 44,
    description: "Known for the Eiffel Tower in Paris",
    famousFor: "Historical landmarks and modern architecture"
  },
  "North America": {
    name: "North America",
    size: "24.71 million km²",
    numOfCountries: 23,
    description: "Home to the Statue of Liberty",
    famousFor: "Technological innovation and cultural diversity"
  },
  Oceania: {
    name: "Oceania",
    size: "8.526 million km²",
    numOfCountries: 14,
    description: "Famous for the Great Barrier Reef",
    famousFor: "Unique wildlife and marine life"
  },
  "South America": {
    name: "South America",
    size: "17.84 million km²",
    numOfCountries: 12,
    description: "Home to the Amazon Rainforest",
    famousFor: "Rainforests and ancient civilizations"
  }
};

const ContinentMap = () => {
  const [selectedContinent, setSelectedContinent] = useState(null);
  const [message, setMessage] = useState("");
  const [gameStarted, setGameStarted] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);
  const [usedContinents, setUsedContinents] = useState([]);
  const [score, setScore] = useState(0);
  const [learnMode, setLearnMode] = useState(false);
  const [continentInfo, setContinentInfo] = useState(null);
  const [confettiActive, setConfettiActive] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  

  const startNewQuestion = useCallback(() => {
    try {
      const remainingContinents = Object.keys(continentData).filter(
        (continent) => !usedContinents.includes(continent)
      );
      if (remainingContinents.length === 0) {
        setMessage("Congratulations! You've answered all questions.");
        setShowSuccessModal(true);
        setGameFinished(true);
        return;
      }

      const newContinent =
        remainingContinents[
          Math.floor(Math.random() * remainingContinents.length)
        ];

      setSelectedContinent(newContinent);
      setMessage("");
    } catch (error) {
      console.error("Error starting new question:", error);
    }
  }, [usedContinents]);

  const startGame = () => {
    try {
      setGameStarted(true);
      setGameFinished(false);
      setUsedContinents([]);
      startNewQuestion();
    } catch (error) {
      console.error("Error starting game:", error);
    }
  };

  const toggleLearnMode = () => {
    setLearnMode(!learnMode);
    setContinentInfo(null);
  };

  useEffect(() => {
    const initializeMap = async () => {
      try {
        const map = new Map({
          basemap: "gray-vector"
        });

        const view = new MapView({
          container: "viewDiv",
          map: map,
          extent: new Extent({
            xmin: -160,
            ymin: -90,
            xmax: 160,
            ymax: 90,
            spatialReference: 4326
          }),
          center: [0, 0],
          zoom: 1,
          constraints: {
            minZoom: 1,
            maxZoom: 1,
            rotationEnabled: false,
            snapToZoom: false
          }
        });

        const featureLayerUrl = "https://services.arcgis.com/P3ePLMYs2RVChkJx/arcgis/rest/services/World_Continents/FeatureServer";

        const featureLayer = new FeatureLayer({
          url: featureLayerUrl,
          outFields: ["*"],
          popupTemplate: {
            title: "{CONTINENT}",
            content: "{*}"
          },
          renderer: {
            type: "simple",
            symbol: {
              type: "simple-fill",
              color: "rgba(0, 128, 0, 0.5)",
              outline: {
                color: "white",
                width: 1
              }
            }
          }
        });

        map.add(featureLayer);

        view.on("click", (event) => {
          if (learnMode) {
            view.hitTest(event).then((response) => {
              if (response.results.length) {
                const graphic = response.results.filter(
                  (result) => result.graphic.layer === featureLayer
                )[0].graphic;
                const clickedContinent = graphic.attributes.CONTINENT;
                setContinentInfo(continentData[clickedContinent]);
              }
            });
          } else if (gameStarted && !gameFinished) {
            view.hitTest(event).then((response) => {
              if (response.results.length) {
                const graphic = response.results.filter(
                  (result) => result.graphic.layer === featureLayer
                )[0].graphic;
                const clickedContinent = graphic.attributes.CONTINENT;
                if (clickedContinent === selectedContinent) {
                  setConfettiActive(true); // Activate confetti
                  setMessage(
                    <span className="success-message">Well done! Moving to the next question...</span>
                  );
                  setScore(prev => prev+1)
                  setUsedContinents([...usedContinents, selectedContinent]);
                  setTimeout(() => {
                    setConfettiActive(false); // Deactivate confetti after a short period
                    startNewQuestion();
                  }, 2000);
                } else {
                  setMessage(
                    <span className="try-again-message">
                      Try again! <span className="hint-message">{continentData[selectedContinent].description}</span>
                    </span>
                  );
                }
              }
            });
          }
        });

        view.when(() => {
          const userStorageDiv = document.querySelector(".esri-view-user-storage");
          if (userStorageDiv) {
            userStorageDiv.parentNode.removeChild(userStorageDiv);
          }
        });

        return () => {
          view.container = null;
        };
      } catch (error) {
        console.error("Error initializing map:", error);
      }
    };

    initializeMap();
  }, [gameStarted, gameFinished, selectedContinent, usedContinents, startNewQuestion, learnMode]);

  return (
    <div className="map-wrapper">
      {confettiActive && <Confetti />}
      <div id="viewDiv" className="map-container"></div>
      {learnMode && continentInfo && (
        <div className="game-panel">
          <h3>{continentInfo.name}</h3>
          <p>Name: {continentInfo.name}</p>
          <p>Size: {continentInfo.size}</p>
          <p>Number of Countries: {continentInfo.numOfCountries}</p>
          <p>Description: {continentInfo.description}</p>
          <p>Famous for: {continentInfo.famousFor}</p>
        </div>
      )}
      <Sidebar startGame={startGame} toggleLearnMode={toggleLearnMode} learnMode={learnMode} />
      {gameStarted && selectedContinent && !learnMode && (
        <div className="game-panel">
          <h3>Where is {selectedContinent}?</h3>
          <p>Choose the correct Continent on the map.</p>
          <p>{message}</p>
          <div>Score={score}/7</div>
        </div>
      )}
      {setShowSuccessModal && (
        <SuccessModal
                    show={showSuccessModal}
                    onClose={() => setShowSuccessModal(false)}
                    score={score}
                    game="World Continent"
                />
      
      )}
    </div>
  );
};

const Sidebar = ({ startGame, toggleLearnMode, learnMode }) => {
  return (
    <div className="sidebar">
      <div className="logo-container">
        <img src="/logo.png" alt="Logo" />
      </div>
      <div className="content">
        <button onClick={startGame} className="start-button">
          Start Game
        </button>
        <button onClick={toggleLearnMode} className="learn-button">
          {learnMode ? "Exit Learn Mode" : "Learn Mode"}
        </button>
      </div>
    </div>
  );
};

export default ContinentMap;