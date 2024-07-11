import React, { useState, useEffect } from 'react';
import './leaderboard.css';
import { FaTrophy } from 'react-icons/fa';

const Leaderboard = () => {
  const [leaders, setLeaders] = useState([]);

  useEffect(() => {
    // Dummy data, replace with your data fetching logic
    const dummyData = [
      { id: 1, name: 'Ibrahim', totalPoints: 9, photo: `https://picsum.photos/seed/p1/50/50` },
      { id: 2, name: 'Menna', totalPoints: 10, photo: `https://picsum.photos/seed/p2/50/50` },
      { id: 3, name: 'Yasmeen', totalPoints: 50, photo: `https://picsum.photos/seed/p3/50/50` },
      { id: 4, name: 'Osama', totalPoints: 3, photo: `https://picsum.photos/seed/p4/50/50` },
      { id: 5, name: 'Iman', totalPoints: 20, photo: `https://picsum.photos/seed/p5/50/50` },
    ];

    // Sort the dummy data by totalPoints in descending order
    dummyData.sort((a, b) => b.totalPoints - a.totalPoints);

    setLeaders(dummyData);
  }, []);

  return (
    <div className="leaderboard-container">
      <h1>Leaderboard</h1>
      <div className="leaderboard-header">
        <div className="header-item">Ranking</div>
        <div className="header-item">Photo</div>
        <div className="header-item">Name</div>
        <div className="header-item">Total Points</div>
      </div>
      {leaders.map((leader, index) => (
        <div className="leaderboard-row" key={leader.id}>
          <div className="row-item">
            <FaTrophy className={`ranking-icon ranking-${index + 1}`} />
            {index + 1}
          </div>
          <div className="row-item">
            <img src={leader.photo} alt={`Player ${index + 1}`} className="player-photo" />
          </div>
          <div className="row-item">{leader.name}</div>
          <div className="row-item">{leader.totalPoints}</div>
        </div>
      ))}
    </div>
  );
};

export default Leaderboard;
