import React, { useEffect, useRef, useState } from "react";
import MapView from "@arcgis/core/views/MapView.js";
import Map from "@arcgis/core/Map.js";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer.js";
import Graphic from "@arcgis/core/Graphic.js";
import mountainIcon from "../../../assets/img/mountain.png"; // Ensure this path is correct
import "../mountains/mountains.css";
import correctSound from "../../../assets/sounds/Correct.mp3"; // Add correct sound effect
import incorrectSound from "../../../assets/sounds/Incorrect.mp3"; // Add incorrect sound effect

const mountainRegions = [
  {
    name: "Mount Everest",
    geometry: {
      type: "point",
      longitude: 86.925,
      latitude: 27.9881
    },
    symbol: {
      type: "picture-marker",
      url: mountainIcon,
      width: "32px",
      height: "32px"
    },
    info: "Mount Everest is Earth's highest mountain above sea level.",
  },
  {
    name: "K2",
    geometry: {
      type: "point",
      longitude: 76.5133,
      latitude: 35.8825
    },
    symbol: {
      type: "picture-marker",
      url: mountainIcon,
      width: "32px",
      height: "32px"
    },
    info: "K2, also known as Mount Godwin-Austen, is the second-highest mountain in the world.",
  },
  {
    name: "Mount Kilimanjaro",
    geometry: {
      type: "point",
      longitude: 37.3556,
      latitude: -3.0674
    },
    symbol: {
      type: "picture-marker",
      url: mountainIcon,
      width: "32px",
      height: "32px"
    },
    info: "Mount Kilimanjaro is a dormant volcano in Tanzania and the highest mountain in Africa.",
  },
  {
    name: "Mont Blanc",
    geometry: {
      type: "point",
      longitude: 6.8652,
      latitude: 45.8326
    },
    symbol: {
      type: "picture-marker",
      url: mountainIcon,
      width: "32px",
      height: "32px"
    },
    info: "Mont Blanc is the highest mountain in the Alps and Western Europe.",
  },
  {
    name: "Mount Elbrus",
    geometry: {
      type: "point",
      longitude: 42.4453,
      latitude: 43.3499
    },
    symbol: {
      type: "picture-marker",
      url: mountainIcon,
      width: "32px",
      height: "32px"
    },
    info: "Mount Elbrus is the highest mountain in Europe, located in the Caucasus Mountains.",
  }
  ,
  {
    name: "Denali",
    geometry: {
      type: "point",
      longitude: -151.0074,
      latitude: 63.0692
    },
    symbol: {
      type: "picture-marker",
      url: mountainIcon,
      width: "32px",
      height: "32px"
    },
    info: "Denali, also known as Mount McKinley, is the highest peak in North America.",
    hint: "This peak is located in Alaska and is the tallest mountain in North America."
  },
  {
    name: "Mount Aconcagua",
    geometry: {
      type: "point",
      longitude: -70.0113,
      latitude: -32.6532
    },
    symbol: {
      type: "picture-marker",
      url: mountainIcon,
      width: "32px",
      height: "32px"
    },
    info: "Mount Aconcagua is the highest mountain outside of Asia, located in Argentina.",
    hint: "This peak is the highest in South America and is part of the Andes mountain range."
  },
  {
    name: "Mount Vinson",
    geometry: {
      type: "point",
      longitude: -85.6158,
      latitude: -78.525
    },
    symbol: {
      type: "picture-marker",
      url: mountainIcon,
      width: "32px",
      height: "32px"
    },
    info: "Mount Vinson is the highest peak in Antarctica.",
    hint: "This mountain is located in the remote Ellsworth Mountains in Antarctica."
  },
  {
    name: "Puncak Jaya",
    geometry: {
      type: "point",
      longitude: 137.1956,
      latitude: -4.0833
    },
    symbol: {
      type: "picture-marker",
      url: mountainIcon,
      width: "32px",
      height: "32px"
    },
    info: "Puncak Jaya, also known as Carstensz Pyramid, is the highest mountain in Oceania.",
    hint: "This peak is located in Indonesia and is the tallest island peak in the world."
  },
  {
    name: "Mount Kosciuszko",
    geometry: {
      type: "point",
      longitude: 148.2633,
      latitude: -36.455
    },
    symbol: {
      type: "picture-marker",
      url: mountainIcon,
      width: "32px",
      height: "32px"
    },
    info: "Mount Kosciuszko is the highest mountain in Australia.",
    hint: "This mountain is located in the Snowy Mountains of New South Wales, Australia."
  },
  {
    name: "Mount Fuji",
    geometry: {
      type: "point",
      longitude: 138.7274,
      latitude: 35.3606
    },
    symbol: {
      type: "picture-marker",
      url: mountainIcon,
      width: "32px",
      height: "32px"
    },
    info: "Mount Fuji is the highest volcano and peak in Japan.",
    hint: "This iconic peak is known for its symmetrical cone and is a popular subject in Japanese art."
  },
  {
    name: "Mount Denali",
    geometry: {
      type: "point",
      longitude: -151.0058,
      latitude: 63.0692
    },
    symbol: {
      type: "picture-marker",
      url: mountainIcon,
      width: "32px",
      height: "32px"
    },
    info: "Denali is the highest mountain in North America, located in Alaska.",
    hint: "Formerly known as Mount McKinley, this peak is the tallest in North America."
  },
  {
    name: "Mount Elgon",
    geometry: {
      type: "point",
      longitude: 34.5388,
      latitude: 1.1466
    },
    symbol: {
      type: "picture-marker",
      url: mountainIcon,
      width: "32px",
      height: "32px"
    },
    info: "Mount Elgon is an extinct shield volcano on the border of Uganda and Kenya.",
    hint: "This mountain is known for its large caldera and is located on the Uganda-Kenya border."
  },
  {
    name: "Mount Kinabalu",
    geometry: {
      type: "point",
      longitude: 116.558,
      latitude: 6.075
    },
    symbol: {
      type: "picture-marker",
      url: mountainIcon,
      width: "32px",
      height: "32px"
    },
    info: "Mount Kinabalu is the highest peak in Borneo's Crocker Range.",
    hint: "This mountain is the tallest in Southeast Asia and is located in Malaysia."
  },
  {
    name: "Mount Roraima",
    geometry: {
      type: "point",
      longitude: -60.764,
      latitude: 5.1414
    },
    symbol: {
      type: "picture-marker",
      url: mountainIcon,
      width: "32px",
      height: "32px"
    },
    info: "Mount Roraima is a notable plateau in South America.",
    hint: "This unique flat-topped mountain is part of the Tepui chain in Venezuela."
  }
];

function MountainsMap() {
  const mapDiv = useRef(null);
  const mapViewRef = useRef(null);
  const graphicsLayerRef = useRef(null);
  const [error, setError] = useState(null);
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [hint, setHint] = useState("");
  const correctAudio = new Audio(correctSound);
  const incorrectAudio = new Audio(incorrectSound);

  useEffect(() => {
    let view;

    if (mapDiv.current) {
      const map = new Map({
        basemap: "osm"
      });

      view = new MapView({
        container: mapDiv.current,
        map: map,
        center: [0, 30],
        zoom: 2,
        constraints: {
          snapToZoom: true,
          minScale: 74000000,
          maxScale: 74000000
        },
        navigation: {
          zoom: false,
          mouseWheelZoomEnabled: false
        }
      });

      mapViewRef.current = view;

      const graphicsLayer = new GraphicsLayer();
      mountainRegions.forEach(region => {
        const graphic = new Graphic({
          geometry: region.geometry,
          symbol: region.symbol,
          attributes: {
            name: region.name,
            info: region.info,
            hint: region.hint
          }
        });
        graphicsLayer.add(graphic);
      });

      map.add(graphicsLayer);
      graphicsLayerRef.current = graphicsLayer;

      view.when(() => {
        console.log("Map and View are ready");

        view.on("click", (event) => {
          view.hitTest(event).then((response) => {
            if (quizStarted && response.results.length) {
              const graphic = response.results.filter(result => result.graphic.layer === graphicsLayer)[0].graphic;
              handleAnswer(graphic.attributes.name);
            }
          });
        });
      }).catch(error => {
        console.error("Error in creating view:", error);
        setError(error);
      });
    }

    return () => {
      if (view) {
        view.destroy();
      }
    };
  }, [quizStarted, currentQuestionIndex]);

  const handleStartGame = () => {
    setQuizStarted(true);
    setCurrentQuestionIndex(0);
    setFeedback("");
    setHint("");
  };

  const handleAnswer = (answer) => {
    const currentRegion = mountainRegions[currentQuestionIndex];
    if (answer === currentRegion.name) {
      setFeedback("Correct Answer!");
      setHint("");
      correctAudio.play();
    } else {
      setFeedback("Incorrect, Try Again!");
      setHint(currentRegion.hint || "");
      incorrectAudio.play();
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < mountainRegions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setFeedback("");
      setHint("");
    } else {
      setQuizStarted(false);
    }
  };

  const handleBackToInfo = () => {
    setQuizStarted(false);
    setFeedback("");
    setHint("");
  };

  return (
    <div className="map-wrapper">
      <div className="map-container" ref={mapDiv}>
        {error && <div className="error-message">Error: {error.message}</div>}
      </div>
      <div className="sidebar">
        {!quizStarted ? (
          <>
            <h2>About Mountains</h2>
            <p>
              Mountains are prominent landforms that rise prominently above their surroundings. They are formed through tectonic forces or volcanism. Mountains provide several benefits to the Earth and its ecosystems.
            </p>
            <h3>Benefits of Mountains:</h3>
            <ul>
              <li>Mountains are home to a rich diversity of flora and fauna.</li>
              <li>Mountains influence local and global weather and climate.</li>
              <li>They provide recreational opportunities and scenic beauty.</li>
              <li>Mountains are sources of mineral resources.</li>
            </ul>
            <h3>Global Coverage:</h3>
            <p>
              Mountains cover about 27% of the Earth's land surface and are home to 12% of the world's population. They play a crucial role in supporting the livelihoods of people living in and around them.
            </p>
            <button onClick={handleStartGame} className="start-game-button">Start Game</button>
          </>
        ) : (
          <>
            <h2>Quiz Time!</h2>
            <p>Question {currentQuestionIndex + 1}: Click on the map to select the location of {mountainRegions[currentQuestionIndex].name}</p>
            {feedback && <div className="feedback-message">{feedback}</div>}
            {hint && <div className="hint-message">Hint: {hint}</div>}
            <button onClick={handleNextQuestion} className="next-question-button">Next Question</button>
            <button onClick={handleBackToInfo} className="back-to-info-button">Back to Info</button>
          </>
        )}
      </div>
    </div>
  );
}

export default MountainsMap;