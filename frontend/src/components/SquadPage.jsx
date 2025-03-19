import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jerseyImage from "../assets/jersey.png";

const SquadPage = () => {

  const [players, setPlayers] = useState([]);
  const [totalMarketValue, setTotalMarketValue] = useState(0);
  const [average_overall, setAverageOverall] = useState(0);
  const [average_potential, setAveragePotential] = useState(0);
  const [squadGenerated, setSquadGenerated] = useState(false);

  const generateSquad = async () => {
      setLoading(true);
      try {
          // Call FastAPI endpoint with the parameters
          const response = await axios.post('http://localhost:5001/select_squad', {
              min_budget: budgetRange[0],
              max_budget: budgetRange[1],
              formation: formation,
              scoring_strategy: experienceLevel,
              clubboost: clubBoost,
              nationboost: nationBoost,
              currently: currentTopFive
          });

          // Extract player IDs from the response
          const playerIds = response.data.selected_player_ids;
          const fetchedPlayers = await fetchPlayersByIds(playerIds);
          
          // Set state
          setPlayers(fetchedPlayers);
          setTotalMarketValue(response.data.total_market_value);
          setAverageOverall(response.data.average_overall);
          setAveragePotential(response.data.average_potential);
          setSquadGenerated(true); 
      } catch (error) {
          console.error('Error generating squad:', error);
      } finally {
          setLoading(false);
      }
  };

  // Fetch a single player
  async function fetchPlayer(playerId) {
      try {
          const response = await fetch(`http://localhost:5000/players/player_id/${playerId}`);
          if (!response.ok) {
              throw new Error(`Player not found (Status: ${response.status})`);
          }
          return await response.json();
      } catch (error) {
          console.error(`Error fetching player with ID ${playerId}:`, error.message);
          return null;
      }
  }

  // Fetch multiple players and maintain order
  async function fetchPlayersByIds(playerIds) {
      try {
          const playerPromises = playerIds.map(id => fetchPlayer(id));
          const players = await Promise.all(playerPromises);
          return players.filter(player => player !== null); // Remove null values
      } catch (error) {
          console.error("Error fetching players:", error.message);
          return [];
      }
  }

  const formations = [
    { value: '4-3-3', label: '4-3-3' },
    { value: '4-4-2', label: '4-4-2' },
    { value: '3-5-2', label: '3-5-2' }, 
    { value: '5-3-2', label: '5-3-2' }, 
    { value: '4-3-2-1', label: '4-3-2-1' }
  ];

  const experienceLevels = [
    { value: 'onlypotential', label: 'Rising stars' },
    { value: 'futurestars', label: 'Future XI' },
    { value: 'peakplayers', label: 'Balanced Squad' }, 
    { value: 'veterans', label: 'Peak Performers' }, 
    { value: 'onlyoverall', label: 'Experienced Core' }
  ];

  const [loading, setLoading] = useState(false);
  const [formation, setformation] = useState(formations[0].value);
  const [budgetRange, setBudgetRange] = useState([20000000,1500000000 ]);
  const [nationBoost, setNationBoost] = useState(false);
  const [clubBoost, setClubBoost] = useState(false);
  const [currentTopFive, setCurrentTopFive] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState(players[5]);
  const [experienceLevel, setExperienceLevel] = useState('peakplayers');

  // Event handlers
  const handlePlayerClick = (player) => {
    setSelectedPlayer(player);
  };

  const handleFormationChange = (e) => {
    setformation(e.target.value);
  };

  const handleExperienceLevelChange = (e) => {
    setExperienceLevel(e.target.value);
    console.log(e.target.value);
  };

  // Player card component
  const PlayerCard = ({ player, onClick }) => {
    if (!player) return null;
    
    const isSelected = selectedPlayer && selectedPlayer.id === player.id;
    
    return (
      <div 
        className="flex flex-col items-center cursor-pointer relative"
        onClick={() => onClick(player)}
        style={{ width: "80px", height: "90px" }}
      >
        <div className={`w-14 h-18 flex items-center justify-center}`}>
          <img src={jerseyImage} alt="Jersey" className="w-16 h-14" />
        </div>
        
        <div className={`absolute top-[-14px] left-10 -translate-x-1/2 bg-purple-200 text-black px-3 py-0.5 rounded-md text-sm min-w-[90px] text-center ${isSelected ? 'ring-[2.5px] ring-black' : ''}`}>
          {player.name}
        </div>
        
        <div className={`absolute bottom-3 left-10 -translate-x-1/2 bg-violet-800 text-white px-2 py-0.5 rounded-md text-xs ${isSelected ? 'ring-[2.5px] ring-black' : ''}`}>
          {player.position}
        </div>
      </div>
    );
  };

  // Render formation based on selection
  const renderFormation = () => {
    switch(formation) {
      case '4-3-3':
        return (
          <div className="w-full h-full flex flex-col justify-between py-2">
            <div className="flex justify-between">
              <div className="flex-1 flex justify-center">
                <PlayerCard player={players[9]} onClick={handlePlayerClick} />
              </div>
              <div className="flex-1 flex justify-center">
                <PlayerCard player={players[10]} onClick={handlePlayerClick} />
              </div>
              <div className="flex-1 flex justify-center">
                <PlayerCard player={players[8]} onClick={handlePlayerClick} />
              </div>
            </div>
            
            <div className="flex justify-between">
              <div className="flex-1 flex justify-center">
                <PlayerCard player={players[5]} onClick={handlePlayerClick} />
              </div>
              <div className="flex-1 flex justify-center">
                <PlayerCard player={players[6]} onClick={handlePlayerClick} />
              </div>
              <div className="flex-1 flex justify-center">
                <PlayerCard player={players[7]} onClick={handlePlayerClick} />
              </div>
            </div>
            
            <div className="flex justify-between">
              <div className="flex-1 flex justify-center">
                <PlayerCard player={players[1]} onClick={handlePlayerClick} />
              </div>
              <div className="flex-1 flex justify-center">
                <PlayerCard player={players[2]} onClick={handlePlayerClick} />
              </div>
              <div className="flex-1 flex justify-center">
                <PlayerCard player={players[3]} onClick={handlePlayerClick} />
              </div>
              <div className="flex-1 flex justify-center">
                <PlayerCard player={players[4]} onClick={handlePlayerClick} />
              </div>
            </div>
            
            <div className="flex justify-center">
              <PlayerCard player={players[0]} onClick={handlePlayerClick} />
            </div>
          </div>
        );
      
      case '4-4-2':
        return (
          <div className="w-full h-full flex flex-col justify-between py-2">
            <div className="flex justify-center gap-20">
              <PlayerCard player={players[10]} onClick={handlePlayerClick} />
              <PlayerCard player={players[11]} onClick={handlePlayerClick} />
            </div>
            
            <div className="flex justify-between">
              <div className="flex-1 flex justify-center">
                <PlayerCard player={players[6]} onClick={handlePlayerClick} />
              </div>
              <div className="flex-1 flex justify-center">
                <PlayerCard player={players[7]} onClick={handlePlayerClick} />
              </div>
              <div className="flex-1 flex justify-center">
                <PlayerCard player={players[8]} onClick={handlePlayerClick} />
              </div>
              <div className="flex-1 flex justify-center">
                <PlayerCard player={players[9]} onClick={handlePlayerClick} />
              </div>
            </div>
            
            <div className="flex justify-between">
              <div className="flex-1 flex justify-center">
                <PlayerCard player={players[1]} onClick={handlePlayerClick} />
              </div>
              <div className="flex-1 flex justify-center">
                <PlayerCard player={players[2]} onClick={handlePlayerClick} />
              </div>
              <div className="flex-1 flex justify-center">
                <PlayerCard player={players[3]} onClick={handlePlayerClick} />
              </div>
              <div className="flex-1 flex justify-center">
                <PlayerCard player={players[4]} onClick={handlePlayerClick} />
              </div>
            </div>
            
            <div className="flex justify-center">
              <PlayerCard player={players[0]} onClick={handlePlayerClick} />
            </div>
          </div>
        );
      
      case '3-5-2':
        return (
          <div className="w-full h-full flex flex-col justify-between py-2">
            <div className="flex justify-center gap-20">
              <PlayerCard player={players[10]} onClick={handlePlayerClick} />
              <PlayerCard player={players[11]} onClick={handlePlayerClick} />
            </div>
            
            <div className="flex justify-between">
              <div className="flex-1 flex justify-center">
                <PlayerCard player={players[4]} onClick={handlePlayerClick} />
              </div>
              <div className="flex-1 flex justify-center">
                <PlayerCard player={players[5]} onClick={handlePlayerClick} />
              </div>
              <div className="flex-1 flex justify-center">
                <PlayerCard player={players[6]} onClick={handlePlayerClick} />
              </div>
              <div className="flex-1 flex justify-center">
                <PlayerCard player={players[7]} onClick={handlePlayerClick} />
              </div>
              <div className="flex-1 flex justify-center">
                <PlayerCard player={players[8]} onClick={handlePlayerClick} />
              </div>
            </div>
            
            <div className="flex justify-center gap-16">
              <PlayerCard player={players[1]} onClick={handlePlayerClick} />
              <PlayerCard player={players[2]} onClick={handlePlayerClick} />
              <PlayerCard player={players[3]} onClick={handlePlayerClick} />
            </div>
            
            <div className="flex justify-center">
              <PlayerCard player={players[0]} onClick={handlePlayerClick} />
            </div>
          </div>
        );
        
      case '5-3-2':
        return (
          <div className="w-full h-full flex flex-col justify-between py-2">
            <div className="flex justify-center gap-20">
              <PlayerCard player={players[10]} onClick={handlePlayerClick} />
              <PlayerCard player={players[11]} onClick={handlePlayerClick} />
            </div>
            
            <div className="flex justify-between">
              <div className="flex-1 flex justify-center">
                <PlayerCard player={players[6]} onClick={handlePlayerClick} />
              </div>
              <div className="flex-1 flex justify-center">
                <PlayerCard player={players[7]} onClick={handlePlayerClick} />
              </div>
              <div className="flex-1 flex justify-center">
                <PlayerCard player={players[8]} onClick={handlePlayerClick} />
              </div>
            </div>
            
            <div className="flex justify-between">
              <div className="flex-1 flex justify-center">
                <PlayerCard player={players[1]} onClick={handlePlayerClick} />
              </div>
              <div className="flex-1 flex justify-center">
                <PlayerCard player={players[2]} onClick={handlePlayerClick} />
              </div>
              <div className="flex-1 flex justify-center">
                <PlayerCard player={players[3]} onClick={handlePlayerClick} />
              </div>
              <div className="flex-1 flex justify-center">
                <PlayerCard player={players[4]} onClick={handlePlayerClick} />
              </div>
              <div className="flex-1 flex justify-center">
                <PlayerCard player={players[5]} onClick={handlePlayerClick} />
              </div>
            </div>
            
            <div className="flex justify-center">
              <PlayerCard player={players[0]} onClick={handlePlayerClick} />
            </div>
          </div>
        );
      
      case '4-3-2-1':
        return (
          <div className="w-full h-full flex flex-col justify-between py-2">
            <div className="flex justify-center">
              <PlayerCard player={players[10]} onClick={handlePlayerClick} />
            </div>
            
            <div className="flex justify-center gap-20">
              <PlayerCard player={players[8]} onClick={handlePlayerClick} />
              <PlayerCard player={players[9]} onClick={handlePlayerClick} />
            </div>
            
            <div className="flex justify-between">
              <div className="flex-1 flex justify-center">
                <PlayerCard player={players[5]} onClick={handlePlayerClick} />
              </div>
              <div className="flex-1 flex justify-center">
                <PlayerCard player={players[6]} onClick={handlePlayerClick} />
              </div>
              <div className="flex-1 flex justify-center">
                <PlayerCard player={players[7]} onClick={handlePlayerClick} />
              </div>
            </div>
            
            <div className="flex justify-between">
              <div className="flex-1 flex justify-center">
                <PlayerCard player={players[1]} onClick={handlePlayerClick} />
              </div>
              <div className="flex-1 flex justify-center">
                <PlayerCard player={players[2]} onClick={handlePlayerClick} />
              </div>
              <div className="flex-1 flex justify-center">
                <PlayerCard player={players[3]} onClick={handlePlayerClick} />
              </div>
              <div className="flex-1 flex justify-center">
                <PlayerCard player={players[4]} onClick={handlePlayerClick} />
              </div>
            </div>
            
            <div className="flex justify-center">
              <PlayerCard player={players[0]} onClick={handlePlayerClick} />
            </div>
          </div>
        );
    
      default:
        return null;
    }
  };

    return (
      <div className="min-h-screen bg-black text-white p-4 pt-24 w-full overflow-hidden">
        {/* Filter section */}
        <div className="max-w-7xl mx-auto bg-blue-950 rounded-lg p-2 mb-10">
          <div className="flex justify-center items-center gap-8">
            <div className="w-1/3">
              <div className="font-semibold mb-1">Formation</div>
              <select
                className="w-44 bg-blue-900 text-white px-4 py-2 rounded-md cursor-pointer border border-blue-800"
                value={formation}
                onChange={handleFormationChange}
              >
                {formations.map((formation) => (
                  <option key={formation.value} value={formation.value}>
                    {formation.label}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-blue-100 mb-2">
                Budget Range: ${budgetRange[0].toLocaleString()} - ${budgetRange[1].toLocaleString()}
              </label>

              <div className="relative w-full flex items-center gap-4">
                {/* Minimum Budget Slider */}
                <input
                  type="range"
                  min="20000000"
                  max="1500000000"
                  step="1000000"  // Move only in multiples of 1M
                  value={budgetRange[0]}
                  onChange={(e) => {
                    const newMin = parseInt(e.target.value);
                    if (newMin <= budgetRange[1]) {
                      setBudgetRange([newMin, budgetRange[1]]);
                    }
                  }}
                  className="w-full"
                />

                {/* Maximum Budget Slider */}
                <input
                  type="range"
                  min="20000000"
                  max="1500000000"
                  step="1000000"  // Move only in multiples of 1M
                  value={budgetRange[1]}
                  onChange={(e) => {
                    const newMax = parseInt(e.target.value);
                    if (newMax >= budgetRange[0]) {
                      setBudgetRange([budgetRange[0], newMax]);
                    }
                  }}
                  className="w-full"
                />
              </div>
            </div>

            <div className="w-1/3">
              <div className="font-semibold mb-1">Experience Level</div>
              <select
                className="w-44 bg-blue-900 text-white px-4 py-2 rounded-md cursor-pointer border border-blue-800"
                value={experienceLevel}
                onChange={handleExperienceLevelChange}
              >
                {experienceLevels.map((experienceLevel) => (
                  <option key={experienceLevel.value} value={experienceLevel.value}>
                    {experienceLevel.label}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-blue-100 mb-2">
                Nation Boost
              </label>
              <div
                onClick={() => setNationBoost((prev) => !prev)}
                className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition duration-300 ml-5 ${
                  nationBoost ? "bg-green-500" : "bg-gray-500"
                }`}
              >
                <div
                  className={`w-4 h-4 bg-white rounded-full shadow-md transform transition ${
                    nationBoost ? "translate-x-6" : "translate-x-0"
                  }`}
                ></div>
              </div>
            </div>

            <div>
              <label className="block text-blue-100 mb-2">
                Club Boost
              </label>
              <div
                onClick={() => setClubBoost((prev) => !prev)}
                className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition duration-300 ml-4 ${
                  clubBoost ? "bg-green-500" : "bg-gray-500"
                }`}
              >
                <div
                  className={`w-4 h-4 bg-white rounded-full shadow-md transform transition ${
                    clubBoost ? "translate-x-6" : "translate-x-0"
                  }`}
                ></div>
              </div>
            </div>

            <div>
              <label className="block text-blue-100 mb-2">
                Currently in top-5 leagues
              </label>
              <div
                onClick={() => setCurrentTopFive((prev) => !prev)}
                className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition duration-300 ml-12 ${
                  currentTopFive ? "bg-green-500" : "bg-gray-500"
                }`}
              >
                <div
                  className={`w-4 h-4 bg-white rounded-full shadow-md transform transition ${
                    currentTopFive ? "translate-x-6" : "translate-x-0"
                  }`}
                ></div>
              </div>
            </div>

          </div>
        </div>

        <div className="max-w-6xl  max-h-50px mx-auto grid grid-cols-12 gap-8">
          {/* Formation display */}
          <div className="col-span-8 bg-emerald-900 rounded-lg p-2 pt-8 relative h-[550px] max-w-3xl">
            {renderFormation()}
          </div>
          
          {/* Team and player info */}
          <div className="col-span-4 flex flex-col gap-6 mt-2">
            {/* Team info */}
            <div className="bg-blue-950 rounded-lg p-3">
              <div className="text-base font-semibold">Formation: {formation}</div>
              <div className="text-base font-semibold">Overall Team Rating: </div>
              
              <div className="grid grid-cols-2 gap-3 mt-3">
                <div className="bg-blue-900 p-2 rounded-md">
                  <h3 className="font-semibold text-sm mb-1">Combined Market Value:</h3>
                  <p className="text-lg">€M</p>
                </div>
                
                <div className="bg-blue-900 p-2 rounded-md">
                  <h3 className="font-semibold text-sm mb-1">Detailed Player Stats:</h3>
                  <p className="text-xs">Select a player to view details</p>
                </div>
              </div>
            </div>
            
            {/* Selected player details */}
            {selectedPlayer && (
              <div className="bg-blue-950 rounded-lg p-3">
                <h2 className="text-base font-semibold mb-2">Detailed Player Stats:</h2>
                <h3 className="text-lg font-bold mb-2">
                  {selectedPlayer.name}
                </h3>
                
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div className="bg-blue-900 p-2 rounded-md">
                    <h4 className="text-xs text-gray-300">Overall Rating:</h4>
                    <p className="text-xl font-bold">{selectedPlayer.rating.toFixed(1)}</p>
                  </div>
                  
                  <div className="bg-blue-900 p-2 rounded-md">
                    <h4 className="text-xs text-gray-300">Market Value:</h4>
                    <p className="text-xl font-bold">{selectedPlayer.marketValue}</p>
                  </div>
                  
                  <div className="bg-blue-900 p-2 rounded-md">
                    <h4 className="text-xs text-gray-300">Age:</h4>
                    <p className="text-xl font-bold">{selectedPlayer.age}yrs</p>
                  </div>
                  
                  <div className="bg-blue-900 p-2 rounded-md">
                    <h4 className="text-xs text-gray-300">Preferred Pos:</h4>
                    <p className="text-xl font-bold">{selectedPlayer.position}</p>
                  </div>
                </div>
                
                <div className="bg-blue-900 p-2 rounded-md">
                  <h4 className="font-semibold text-sm mb-1">Key Stats:</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Passes per Game: {selectedPlayer.stats.passesPerGame.toFixed(2)}</li>
                    <li>• Pass Completion Rate: {selectedPlayer.stats.passCompletionRate.toFixed(2)}%</li>
                    <li>• Key Passes per Game: {selectedPlayer.stats.keyPassesPerGame.toFixed(2)}</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
};

export default SquadPage;