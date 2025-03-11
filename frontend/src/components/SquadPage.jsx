import React, { useState } from 'react';

const SquadPage = () => {
  // Sample player data
  const players = [
    { 
      id: 1, 
      name: 'Ansu Fati', 
      position: 'LW', 
      marketValue: '€35m', 
      rating: 82.5, 
      age: 22, 
      stats: { 
        passesPerGame: 24.12, 
        passCompletionRate: 78.32, 
        keyPassesPerGame: 0.85 
      } 
    },
    { 
      id: 2, 
      name: 'Evan Ferg.', 
      position: 'ST', 
      marketValue: '€42m', 
      rating: 84.7, 
      age: 26, 
      stats: { 
        passesPerGame: 18.45, 
        passCompletionRate: 72.18, 
        keyPassesPerGame: 0.62 
      } 
    },
    { 
      id: 3, 
      name: 'Yeremy P.', 
      position: 'RW', 
      marketValue: '€38m', 
      rating: 83.2, 
      age: 23, 
      stats: { 
        passesPerGame: 27.34, 
        passCompletionRate: 75.91, 
        keyPassesPerGame: 0.93 
      } 
    },
    { 
      id: 4, 
      name: 'Kobbie M.', 
      position: 'CM', 
      marketValue: '€45m', 
      rating: 85.4, 
      age: 21, 
      stats: { 
        passesPerGame: 58.76, 
        passCompletionRate: 89.22, 
        keyPassesPerGame: 1.28 
      } 
    },
    { 
      id: 5, 
      name: 'Romeo L.', 
      position: 'CDM', 
      marketValue: '€32m', 
      rating: 84.9, 
      age: 24, 
      stats: { 
        passesPerGame: 62.35, 
        passCompletionRate: 91.48, 
        keyPassesPerGame: 0.74 
      } 
    },
    { 
      id: 6, 
      name: 'Gavi', 
      position: 'CM', 
      marketValue: '€25m', 
      rating: 89.1, 
      age: 20, 
      stats: { 
        passesPerGame: 52.36, 
        passCompletionRate: 84.86, 
        keyPassesPerGame: 1.42 
      }, 
      isCaptain: true 
    },
    { 
      id: 7, 
      name: 'Patrick', 
      position: 'RB', 
      marketValue: '€28m', 
      rating: 83.8, 
      age: 25, 
      stats: { 
        passesPerGame: 42.18, 
        passCompletionRate: 82.75, 
        keyPassesPerGame: 0.67 
      } 
    },
    { 
      id: 8, 
      name: 'Antonio S.', 
      position: 'CB', 
      marketValue: '€35m', 
      rating: 86.2, 
      age: 27, 
      stats: { 
        passesPerGame: 48.32, 
        passCompletionRate: 87.63, 
        keyPassesPerGame: 0.23 
      } 
    },
    { 
      id: 9, 
      name: 'Castello L.', 
      position: 'CB', 
      marketValue: '€32m', 
      rating: 85.7, 
      age: 26, 
      stats: { 
        passesPerGame: 46.89, 
        passCompletionRate: 86.92, 
        keyPassesPerGame: 0.18 
      } 
    },
    { 
      id: 10, 
      name: 'Malo G.', 
      position: 'LB', 
      marketValue: '€27m', 
      rating: 82.9, 
      age: 24, 
      stats: { 
        passesPerGame: 44.56, 
        passCompletionRate: 81.28, 
        keyPassesPerGame: 0.58 
      } 
    },
    { 
      id: 11, 
      name: 'Giorgi M.', 
      position: 'GK', 
      marketValue: '€38m', 
      rating: 87.3, 
      age: 28, 
      stats: { 
        passesPerGame: 22.43, 
        passCompletionRate: 79.64, 
        keyPassesPerGame: 0.05 
      } 
    },
  ];

  // Calculate total market value
  const formations = [
    { value: '4-3-3', label: '4-3-3' },
    { value: '4-4-2', label: '4-4-2' },
    { value: '3-4-3', label: '3-4-3' },
    { value: '4-5-1', label: '4-5-1' },
    { value: '4-3-2-1', label: '4-3-2-1' }
  ];

  // State management
  const [selectedFormation, setSelectedFormation] = useState(formations[0].value);
  const [minOverall, setMinOverall] = useState(70);
  const [minPotential, setMinPotential] = useState(70);
  const totalMarketValue = players.reduce((total, player) => {
    const value = parseInt(player.marketValue.replace('€', '').replace('m', ''));
    return total + value;
  }, 0);
  const averageRating = (players.reduce((total, player) => total + player.rating, 0) / players.length).toFixed(1);
  const [selectedPlayer, setSelectedPlayer] = useState(players.find(p => p.isCaptain) || players[5]);
  
  // Event handlers
  const handlePlayerClick = (player) => {
    setSelectedPlayer(player);
  };

  const handleFormationChange = (e) => {
    setSelectedFormation(e.target.value);
  };

  const getPlayerByPosition = (pos) => {
    return players.find(player => player.position === pos);
  };

  // Get players by position
  const goalkeeper = getPlayerByPosition('GK');
  const leftBack = getPlayerByPosition('LB');
  const rightBack = getPlayerByPosition('RB');
  const centerBacks = players.filter(player => player.position === 'CB');
  const defensiveMid = getPlayerByPosition('CDM');
  const centerMids = players.filter(player => player.position === 'CM');
  const leftWing = getPlayerByPosition('LW');
  const rightWing = getPlayerByPosition('RW');
  const striker = getPlayerByPosition('ST');

  // Player card component
  const PlayerCard = ({ player, onClick }) => {
    if (!player) return null;
    
    const isSelected = selectedPlayer && selectedPlayer.id === player.id;
    
    return (
      <div 
        className="flex flex-col items-center cursor-pointer" 
        onClick={() => onClick(player)}
      >
        <div className={`bg-blue-800 text-white px-3 py-0.5 rounded-md mb-1 text-sm ${isSelected ? 'ring-2 ring-yellow-400' : ''}`}>
          {player.name} {player.isCaptain && '(c)'}
        </div>
        <div className={`w-12 h-16 bg-blue-900 flex items-center justify-center mb-1 ${isSelected ? 'ring-2 ring-yellow-400' : ''}`}>
          <img src="/jersey.png" alt="Jersey" className="w-10 h-12" />
        </div>
        <div className={`bg-blue-700 text-white px-2 py-0.5 rounded-md text-xs ${isSelected ? 'ring-2 ring-yellow-400' : ''}`}>
          {player.position}
        </div>
      </div>
    );
  };

  // Render formation based on selection
  const renderFormation = () => {
    switch(selectedFormation) {
      case '4-3-3':
        return (
          <div className="w-full h-full flex flex-col justify-between py-2">
            <div className="flex justify-between">
              <div className="flex-1 flex justify-center">
                <PlayerCard player={leftWing} onClick={handlePlayerClick} />
              </div>
              <div className="flex-1 flex justify-center">
                <PlayerCard player={striker} onClick={handlePlayerClick} />
              </div>
              <div className="flex-1 flex justify-center">
                <PlayerCard player={rightWing} onClick={handlePlayerClick} />
              </div>
            </div>
            
            <div className="flex justify-between">
              <div className="flex-1 flex justify-center">
                <PlayerCard player={centerMids[0]} onClick={handlePlayerClick} />
              </div>
              <div className="flex-1 flex justify-center">
                <PlayerCard player={defensiveMid} onClick={handlePlayerClick} />
              </div>
              <div className="flex-1 flex justify-center">
                <PlayerCard player={centerMids[1]} onClick={handlePlayerClick} />
              </div>
            </div>
            
            <div className="flex justify-between">
              <div className="flex-1 flex justify-center">
                <PlayerCard player={leftBack} onClick={handlePlayerClick} />
              </div>
              <div className="flex-1 flex justify-center">
                <PlayerCard player={centerBacks[0]} onClick={handlePlayerClick} />
              </div>
              <div className="flex-1 flex justify-center">
                <PlayerCard player={centerBacks[1]} onClick={handlePlayerClick} />
              </div>
              <div className="flex-1 flex justify-center">
                <PlayerCard player={rightBack} onClick={handlePlayerClick} />
              </div>
            </div>
            
            <div className="flex justify-center">
              <PlayerCard player={goalkeeper} onClick={handlePlayerClick} />
            </div>
          </div>
        );
      
        case '4-4-2':
            return (
              <div className="w-full h-full flex flex-col justify-between py-2">
                <div className="flex justify-center gap-20">
                  <PlayerCard player={striker} onClick={handlePlayerClick} />
                  <PlayerCard player={getPlayerByPosition('ST') || rightWing} onClick={handlePlayerClick} />
                </div>
                
                <div className="flex justify-between">
                  <div className="flex-1 flex justify-center">
                    <PlayerCard player={leftWing} onClick={handlePlayerClick} />
                  </div>
                  <div className="flex-1 flex justify-center">
                    <PlayerCard player={centerMids[0]} onClick={handlePlayerClick} />
                  </div>
                  <div className="flex-1 flex justify-center">
                    <PlayerCard player={centerMids[1]} onClick={handlePlayerClick} />
                  </div>
                  <div className="flex-1 flex justify-center">
                    <PlayerCard player={rightWing} onClick={handlePlayerClick} />
                  </div>
                </div>
                
                <div className="flex justify-between">
                  <div className="flex-1 flex justify-center">
                    <PlayerCard player={leftBack} onClick={handlePlayerClick} />
                  </div>
                  <div className="flex-1 flex justify-center">
                    <PlayerCard player={centerBacks[0]} onClick={handlePlayerClick} />
                  </div>
                  <div className="flex-1 flex justify-center">
                    <PlayerCard player={centerBacks[1]} onClick={handlePlayerClick} />
                  </div>
                  <div className="flex-1 flex justify-center">
                    <PlayerCard player={rightBack} onClick={handlePlayerClick} />
                  </div>
                </div>
                
                <div className="flex justify-center">
                  <PlayerCard player={goalkeeper} onClick={handlePlayerClick} />
                </div>
              </div>
            );
          
          case '3-4-3':
            return (
              <div className="w-full h-full flex flex-col justify-between py-2">
                <div className="flex justify-between">
                  <div className="flex-1 flex justify-center">
                    <PlayerCard player={leftWing} onClick={handlePlayerClick} />
                  </div>
                  <div className="flex-1 flex justify-center">
                    <PlayerCard player={striker} onClick={handlePlayerClick} />
                  </div>
                  <div className="flex-1 flex justify-center">
                    <PlayerCard player={rightWing} onClick={handlePlayerClick} />
                  </div>
                </div>
                
                <div className="flex justify-between">
                  <div className="flex-1 flex justify-center">
                    <PlayerCard player={leftBack} onClick={handlePlayerClick} />
                  </div>
                  <div className="flex-1 flex justify-center">
                    <PlayerCard player={centerMids[0]} onClick={handlePlayerClick} />
                  </div>
                  <div className="flex-1 flex justify-center">
                    <PlayerCard player={centerMids[1]} onClick={handlePlayerClick} />
                  </div>
                  <div className="flex-1 flex justify-center">
                    <PlayerCard player={rightBack} onClick={handlePlayerClick} />
                  </div>
                </div>
                
                <div className="flex justify-center gap-16">
                  <PlayerCard player={centerBacks[0]} onClick={handlePlayerClick} />
                  <PlayerCard player={defensiveMid} onClick={handlePlayerClick} />
                  <PlayerCard player={centerBacks[1]} onClick={handlePlayerClick} />
                </div>
                
                <div className="flex justify-center">
                  <PlayerCard player={goalkeeper} onClick={handlePlayerClick} />
                </div>
              </div>
            );
          
          case '4-5-1':
            return (
              <div className="w-full h-full flex flex-col justify-between py-2">
                <div className="flex justify-center">
                  <PlayerCard player={striker} onClick={handlePlayerClick} />
                </div>
                
                <div className="flex justify-between">
                  <div className="flex-1 flex justify-center">
                    <PlayerCard player={leftWing} onClick={handlePlayerClick} />
                  </div>
                  <div className="flex-1 flex justify-center">
                    <PlayerCard player={centerMids[0]} onClick={handlePlayerClick} />
                  </div>
                  <div className="flex-1 flex justify-center">
                    <PlayerCard player={defensiveMid} onClick={handlePlayerClick} />
                  </div>
                  <div className="flex-1 flex justify-center">
                    <PlayerCard player={centerMids[1]} onClick={handlePlayerClick} />
                  </div>
                  <div className="flex-1 flex justify-center">
                    <PlayerCard player={rightWing} onClick={handlePlayerClick} />
                  </div>
                </div>
                
                <div className="flex justify-between">
                  <div className="flex-1 flex justify-center">
                    <PlayerCard player={leftBack} onClick={handlePlayerClick} />
                  </div>
                  <div className="flex-1 flex justify-center">
                    <PlayerCard player={centerBacks[0]} onClick={handlePlayerClick} />
                  </div>
                  <div className="flex-1 flex justify-center">
                    <PlayerCard player={centerBacks[1]} onClick={handlePlayerClick} />
                  </div>
                  <div className="flex-1 flex justify-center">
                    <PlayerCard player={rightBack} onClick={handlePlayerClick} />
                  </div>
                </div>
                
                <div className="flex justify-center">
                  <PlayerCard player={goalkeeper} onClick={handlePlayerClick} />
                </div>
              </div>
            );
          
          case '4-3-2-1':
            return (
              <div className="w-full h-full flex flex-col justify-between py-2">
                <div className="flex justify-center">
                  <PlayerCard player={striker} onClick={handlePlayerClick} />
                </div>
                
                <div className="flex justify-center gap-20">
                  <PlayerCard player={leftWing} onClick={handlePlayerClick} />
                  <PlayerCard player={rightWing} onClick={handlePlayerClick} />
                </div>
                
                <div className="flex justify-between">
                  <div className="flex-1 flex justify-center">
                    <PlayerCard player={centerMids[0]} onClick={handlePlayerClick} />
                  </div>
                  <div className="flex-1 flex justify-center">
                    <PlayerCard player={defensiveMid} onClick={handlePlayerClick} />
                  </div>
                  <div className="flex-1 flex justify-center">
                    <PlayerCard player={centerMids[1]} onClick={handlePlayerClick} />
                  </div>
                </div>
                
                <div className="flex justify-between">
                  <div className="flex-1 flex justify-center">
                    <PlayerCard player={leftBack} onClick={handlePlayerClick} />
                  </div>
                  <div className="flex-1 flex justify-center">
                    <PlayerCard player={centerBacks[0]} onClick={handlePlayerClick} />
                  </div>
                  <div className="flex-1 flex justify-center">
                    <PlayerCard player={centerBacks[1]} onClick={handlePlayerClick} />
                  </div>
                  <div className="flex-1 flex justify-center">
                    <PlayerCard player={rightBack} onClick={handlePlayerClick} />
                  </div>
                </div>
                
                <div className="flex justify-center">
                  <PlayerCard player={goalkeeper} onClick={handlePlayerClick} />
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
      <div className="max-w-4xl mx-auto bg-blue-950 rounded-lg p-2 mb-6">
        <div className="flex justify-center items-center gap-8">
            <div className="w-1/3">
            <div className="font-semibold mb-1">Formation</div>
            <select
                className="w-full bg-blue-900 text-white px-4 py-2 rounded-md cursor-pointer border border-blue-800"
                value={selectedFormation}
                onChange={handleFormationChange}
            >
                {formations.map((formation) => (
                <option key={formation.value} value={formation.value}>
                    {formation.label}
                </option>
                ))}
            </select>
            </div> 
            
            <div className="w-1/3">
            <label className="block text-blue-100 mb-2">Min Team Overall: {minOverall}</label>
            <input
                type="range"
                min="50"
                max="99"
                value={minOverall}
                onChange={(e) => {
                setMinOverall(parseInt(e.target.value));
                setCurrentPage(1);
                }}
                className="w-full"
            />
            </div>

            <div className="w-1/3">
            <label className="block text-blue-100 mb-2">Min Team Potential: {minPotential}</label>
            <input
                type="range"
                min="50"
                max="99"
                value={minPotential}
                onChange={(e) => {
                setMinPotential(parseInt(e.target.value));
                setCurrentPage(1);
                }}
                className="w-full"
            />
            </div>
        </div>
      </div>


      <div className="max-w-7xl  max-h-50px mx-auto grid grid-cols-12 gap-12">
        {/* Formation display */}
        <div className="col-span-8 bg-blue-950 rounded-lg p-4 relative h-[550px]">
          {renderFormation()}
        </div>
        
        {/* Team and player info */}
        <div className="col-span-4 flex flex-col gap-8 mt-2">
          {/* Team info */}
          <div className="bg-blue-950 rounded-lg p-3">
            <div className="text-base font-semibold">Formation: {selectedFormation}</div>
            <div className="text-base font-semibold">Overall Team Rating: {averageRating}</div>
            
            <div className="grid grid-cols-2 gap-3 mt-3">
              <div className="bg-blue-900 p-2 rounded-md">
                <h3 className="font-semibold text-sm mb-1">Combined Market Value:</h3>
                <p className="text-lg">€{totalMarketValue}m</p>
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
                {selectedPlayer.name} {selectedPlayer.isCaptain ? '(c)' : ''}
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