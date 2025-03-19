import React, { useState,useEffect } from 'react';
import axios from 'axios';
import jerseyImage from "../assets/jersey.png";
import { PlayCircle, RefreshCw , Star, DollarSign, Medal, TrendingUp} from 'lucide-react';

const nationFlags = {
  "ENG": "gb", "CZE": "cz", "POL": "pl", "USA": "us", "FRA": "fr", "ISR": "il", "ESP": "es", "NGA": "ng", "WAL": "gb-wls",
  "IRL": "ie", "BEL": "be", "ISL": "is", "SCO": "gb-sct", "CAN": "ca", "DEN": "dk", "CUW": "cw", "GUA": "gt", "PHI": "ph",
  "CIV": "ci", "MLI": "ml", "ARG": "ar", "SEN": "sn", "GER": "de", "TOG": "tg", "GUI": "gn", "SRB": "rs", "NED": "nl",
  "NOR": "no", "COD": "cd", "KVX": "xk", "SVN": "si", "EGY": "eg", "POR": "pt", "ECU": "ec", "NIR": "gb-nir", "URU": "uy",
  "BRA": "br", "TAN": "tz", "AUS": "au", "ITA": "it", "ROU": "ro", "CMR": "cm", "GHA": "gh", "KOR": "kr", "SUI": "ch",
  "BIH": "ba", "CUB": "cu", "FIN": "fi", "JAM": "jm", "KEN": "ke", "GRE": "gr", "AUT": "at", "COL": "co", "MEX": "mx",
  "IRN": "ir", "RSA": "za", "SWE": "se", "TUR": "tr", "MTN": "mr", "MKD": "mk", "ANG": "ao", "CRO": "hr", "SKN": "kn",
  "UKR": "ua", "PAR": "py", "MAR": "ma", "ZAM": "zm", "VEN": "ve", "SVK": "sk", "DOM": "do", "ALG": "dz", "TUN": "tn",
  "BFA": "bf", "GRN": "gd", "ALB": "al", "JPN": "jp", "ZIM": "zw", "CRC": "cr", "HUN": "hu", "MSR": "ms", "GAM": "gm",
  "GNB": "gw", "IRQ": "iq", "UZB": "uz", "NZL": "nz", "CHI": "cl", "GAB": "ga", "IDN": "id", "PER": "pe", "PAN": "pa",
  "RUS": "ru", "CHN": "cn", "MTQ": "mq", "EQG": "gq", "ARM": "am", "GEO": "ge", "MNE": "me", "HON": "hn", "MOZ": "mz",
  "SYR": "sy", "CPV": "cv", "Unknown": "un", "SUR": "sr", "PUR": "pr", "SLE": "sl", "EST": "ee", "BEN": "bj", "SMN": "sm",
  "GLP": "gp", "CGO": "cg", "HAI": "ht", "COM": "km", "CTA": "cf", "NIG": "ne", "GUF": "gf", "MAD": "mg", "TRI": "tt",
  "CHA": "td", "NCL": "nc", "JOR": "jo", "BDI": "bi", "MLT": "mt", "LUX": "lu", "FRO": "fo", "BUL": "bg", "MDA": "md",
  "LTU": "lt", "BOL": "bo", "LBY": "ly", "UGA": "ug", "LVA": "lv", "CYP": "cy", "KSA": "sa"
};

const SquadPage = () => {

  const [players, setPlayers] = useState([]);
  const [totalMarketValue, setTotalMarketValue] = useState(0);
  const [average_overall, setAverageOverall] = useState(0);
  const [average_potential, setAveragePotential] = useState(0);
  const [squadGenerated, setSquadGenerated] = useState(false);

  // Format market value function
  const formatMarketValue = (value) => {
    if (value >= 1000000000) {
      return `€${(value / 1000000000).toFixed(2)}B`;
    } else if (value >= 1000000) {
      return `€${(value / 1000000).toFixed(1)}M`;
    } else if (value >= 1000) {
      return `€${(value / 1000).toFixed(0)}K`;  
    } else {
      return `€${value}`;
    }
  };

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
    { value: '4-2-3-1', label: '4-2-3-1' }
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

  // Reset selected player when squad is reset
  useEffect(() => {
    if (!squadGenerated) {
      setSelectedPlayer(null);
    } else if (players.length > 0 && !selectedPlayer) {
      // Auto-select a player (e.g., midfielder) when squad is generated
      setSelectedPlayer(players[5] || players[0]);
    }
  }, [squadGenerated, players, selectedPlayer]);

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
          <img src={jerseyImage} alt="Jersey" className="w-20 h-16" />
        </div>
        
        <div className={`absolute top-[-20px] left-10 -translate-x-1/2 bg-purple-200 text-black px-2 py-0.5 rounded-md text-sm w-[120px] text-center ${isSelected ? 'ring-[2.5px] ring-black' : ''}`}>
        {player.name}
      </div>
        
        <div className={`absolute bottom-3 left-10 -translate-x-1/2 bg-violet-800 text-white px-2 py-0.5 rounded-md text-xs ${isSelected ? 'ring-[2.5px] ring-black' : ''}`}>
          {player.pos}
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
              <PlayerCard player={players[9]} onClick={handlePlayerClick} />
              <PlayerCard player={players[10]} onClick={handlePlayerClick} />
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
              <PlayerCard player={players[9]} onClick={handlePlayerClick} />
              <PlayerCard player={players[10]} onClick={handlePlayerClick} />
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
              <PlayerCard player={players[9]} onClick={handlePlayerClick} />
              <PlayerCard player={players[10]} onClick={handlePlayerClick} />
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
      
      case '4-2-3-1':
        return (
          <div className="w-full h-full flex flex-col justify-between py-2">
            <div className="flex justify-center">
              <PlayerCard player={players[10]} onClick={handlePlayerClick} />
            </div>

            <div className="flex justify-between">
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
            
            <div className="flex justify-center gap-20">
              <PlayerCard player={players[5]} onClick={handlePlayerClick} />
              <PlayerCard player={players[6]} onClick={handlePlayerClick} />
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
      <h2 className="text-3xl font-semibold text-center mb-2 max-w-[60%] mx-auto text-blue-100 uppercase font-mono">Build your ultimate dream squad! ⚽</h2>
      <h4 className="text-xl font-medium text-center mb-8 max-w-[60%] mx-auto text-blue-100 font-[cursive]">Select your filters, hit 'Generate,' and watch your perfect team come to life! </h4>
      {/* Filter section */}
      <div className="max-w-7xl mx-auto bg-blue-950 rounded-lg py-2 mb-10">
        <div className="flex justify-center items-center gap-8">
          <div className="w-[20%]">
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

          <div className="w-[20%]">
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
              className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition duration-300 ml-16 ${
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

      <div className="max-w-[100%] mx-auto flex flex-row mb-16">
        {/* Team info */}
        {squadGenerated && (
          <div className="w-1/4 flex-shrink-0 flex flex-col gap-12 mt-36 pr-4">
            <div className="bg-blue-950 rounded-lg p-4 shadow-lg">
              <h2 className="text-xl font-bold mb-3 border-b border-blue-800 pb-2 flex items-center">
                <Medal className="mr-2" size={20} />
                Squad Overview
              </h2>
              
              <div className="flex flex-wrap gap-4 mb-4">
                <div className="bg-blue-900 p-3 rounded-md flex flex-col flex-1">
                  <div className="flex items-center mb-1 text-gray-300 text-sm">
                    <Star size={16} className="mr-1" />
                    <span>Average Rating</span>
                  </div>
                  <span className="text-2xl font-bold">{average_overall.toFixed(1)}</span>
                </div>
                
                <div className="bg-blue-900 p-3 rounded-md flex flex-col flex-1">
                  <div className="flex items-center mb-1 text-gray-300 text-sm">
                    <TrendingUp size={16} className="mr-1" />
                    <span>Future Potential</span>
                  </div>
                  <span className="text-2xl font-bold">{average_potential.toFixed(1)}</span>
                </div>
              </div>
              
              <div className="bg-blue-900 p-3 rounded-md mb-4">
                <div className="flex items-center mb-1 text-gray-300 text-sm">
                  <DollarSign size={16} className="mr-1" />
                  <span>Total Market Value</span>
                </div>
                <span className="text-2xl font-bold">{formatMarketValue(totalMarketValue)}</span>
              </div>
              
              <div className="text-center text-sm text-gray-300 italic mt-2">
                Select any player on the field to view their detailed stats
              </div>
            </div>
          </div>
        )}
        
        {/* Formation display - centered */}
        <div className={`${squadGenerated ? 'w-2/4' : 'w-3/4'} flex-shrink-0 bg-emerald-900 rounded-lg p-2 pt-8 relative h-[550px] mt-8 mx-auto`}>
          {/* Generate button when squad is not generated */}
          {!squadGenerated ? (
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm rounded-lg"></div>
              <button 
                onClick={generateSquad}
                disabled={loading}
                className={`flex items-center gap-2 text-lg font-semibold py-3 px-6 rounded-lg shadow-lg transition-all z-20 ${
                  loading ? "bg-black text-teal-800" : "bg-teal-100 text-black hover:bg-black hover:text-teal-800"
                }`}
              >
                {loading ? (
                  <>
                    <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                    <span>Generating...</span>
                  </>
                ) : (
                  <>
                    <PlayCircle size={24} />
                    <span className="font-medium">Generate Squad</span>
                  </>
                )}
              </button>
            </div>
          ) : (
            <div className="absolute bottom-2 right-2 z-10">
              <button 
                onClick={() => {
                  setSquadGenerated(false);
                  setPlayers([]);
                }}
                className="flex items-center gap-2 bg-teal-100 text-black hover:bg-black hover:text-teal-800 py-2 px-4 rounded-lg shadow-lg transition-all"
              >
                <RefreshCw size={24} />
                <span className="font-medium">Reset</span>
              </button>
            </div>
          )}
          
          {renderFormation()}
        </div>
        
        {/* Player info */}
        {squadGenerated && selectedPlayer && (
          <div className="w-1/4 flex-shrink-0 flex flex-col gap-6 mt-10 pl-4">
            <div className="bg-gradient-to-br from-blue-950 to-blue-900 rounded-lg p-4 shadow-lg">
              <div className="flex items-center mb-4">
                {/* Player name and flag */}
                <div className="flex-1">
                  <div className="flex items-center mb-1">
                    <h3 className="text-xl font-bold mr-2">{selectedPlayer.name}</h3>
                    {nationFlags[selectedPlayer.nation] && (
                      <span className="text-lg">
                        <i className={`fi fi-${nationFlags[selectedPlayer.nation]}`}></i>
                      </span>
                    )}
                  </div>
                  <div className="text-sm text-gray-300">
                    {selectedPlayer.club && `${selectedPlayer.club} • `}{selectedPlayer.league}
                  </div>
                </div>
                
                {/* Player image */}
                {selectedPlayer.Image_URL && (
                  <div className="w-20 h-20 rounded-full overflow-hidden bg-blue-800 flex items-center justify-center">
                    <img 
                      src={selectedPlayer.Image_URL} 
                      alt={selectedPlayer.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/player-placeholder.png';
                      }}
                    />
                  </div>
                )}
              </div>
              
              {/* Rest of player details - primary stats, ratings, etc. */}
              {/* Primary stats */}
              <div className="flex flex-wrap gap-3 mb-4">
                <div className="bg-blue-800 p-3 rounded-md text-center flex-1">
                  <h4 className="text-xs text-gray-300 mb-1">Age</h4>
                  <p className="text-lg font-bold">{selectedPlayer.age}</p>
                  <p className="text-xs text-gray-300">Born {selectedPlayer.born}</p>
                </div>
                
                <div className="bg-blue-800 p-3 rounded-md text-center flex-1">
                  <h4 className="text-xs text-gray-300 mb-1">Position</h4>
                  <p className="text-lg font-bold">{selectedPlayer.pos}</p>
                </div>
                
                <div className="bg-blue-800 p-3 rounded-md text-center flex-1">
                  <h4 className="text-xs text-gray-300 mb-1">Value</h4>
                  <p className="text-lg font-bold">
                    {selectedPlayer.Market_Value >= 1000000
                      ? `$${(selectedPlayer.Market_Value / 1000000).toFixed(1)}M`
                      : `$${(selectedPlayer.Market_Value / 1000).toFixed(0)}K`}
                  </p>
                </div>
              </div>
              
              {/* Ratings visualization */}
              <div className="bg-blue-800 p-3 rounded-md mb-4">
                <h4 className="text-sm font-semibold mb-3">Player Ratings</h4>
                
                <div className="flex items-center mb-4">
                  <div className="w-16 text-sm">Overall</div>
                  <div className="flex-1 h-6 bg-blue-950 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"
                      style={{ width: `${selectedPlayer.overall_ratings}%` }}
                    ></div>
                  </div>
                  <div className="w-10 text-right font-bold">{selectedPlayer.overall_ratings.toFixed(1)}</div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-16 text-sm">Potential</div>
                  <div className="flex-1 h-6 bg-blue-950 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-indigo-500 to-purple-400 rounded-full"
                      style={{ width: `${selectedPlayer.potential_ratings}%` }}
                    ></div>
                  </div>
                  <div className="w-10 text-right font-bold">{selectedPlayer.potential_ratings.toFixed(1)}</div>
                </div>
              </div>
              
              {/* Position-specific stats */}
              {selectedPlayer.pos !== 'GK' && (
                <div className="bg-blue-800 p-3 rounded-md">
                  <h4 className="text-sm font-semibold mb-3">Skill Breakdown</h4>
                  <div className="flex justify-between">
                    <div className="text-center">
                      <div className="relative w-16 h-16 mx-auto mb-1">
                        <svg viewBox="0 0 100 100" className="w-full h-full">
                          <circle cx="50" cy="50" r="45" fill="none" stroke="#1e3a8a" strokeWidth="10" />
                          <circle 
                            cx="50" 
                            cy="50" 
                            r="45" 
                            fill="none" 
                            stroke="#3b82f6" 
                            strokeWidth="10"
                            strokeDasharray={`${selectedPlayer.defense_ratings * 2.83} 283`}
                            transform="rotate(-90 50 50)"
                          />
                          <text x="50" y="55" textAnchor="middle" className="text-xl font-bold fill-current">
                            {selectedPlayer.defense_ratings?.toFixed(0) || '0'}
                          </text>
                        </svg>
                      </div>
                      <p className="text-xs">Defense</p>
                    </div>
                    
                    <div className="text-center">
                      <div className="relative w-16 h-16 mx-auto mb-1">
                        <svg viewBox="0 0 100 100" className="w-full h-full">
                          <circle cx="50" cy="50" r="45" fill="none" stroke="#1e3a8a" strokeWidth="10" />
                          <circle 
                            cx="50" 
                            cy="50" 
                            r="45" 
                            fill="none" 
                            stroke="#10b981" 
                            strokeWidth="10"
                            strokeDasharray={`${selectedPlayer.passing_ratings * 2.83} 283`}
                            transform="rotate(-90 50 50)"
                          />
                          <text x="50" y="55" textAnchor="middle" className="text-xl font-bold fill-current">
                            {selectedPlayer.passing_ratings?.toFixed(0) || '0'}
                          </text>
                        </svg>
                      </div>
                      <p className="text-xs">Passing</p>
                    </div>
                    
                    <div className="text-center">
                      <div className="relative w-16 h-16 mx-auto mb-1">
                        <svg viewBox="0 0 100 100" className="w-full h-full">
                          <circle cx="50" cy="50" r="45" fill="none" stroke="#1e3a8a" strokeWidth="10" />
                          <circle 
                            cx="50" 
                            cy="50" 
                            r="45" 
                            fill="none" 
                            stroke="#f59e0b" 
                            strokeWidth="10"
                            strokeDasharray={`${selectedPlayer.shooting_ratings * 2.83} 283`}
                            transform="rotate(-90 50 50)"
                          />
                          <text x="50" y="55" textAnchor="middle" className="text-xl font-bold fill-current">
                            {selectedPlayer.shooting_ratings?.toFixed(0) || '0'}
                          </text>
                        </svg>
                      </div>
                      <p className="text-xs">Shooting</p>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Goalkeeper specific stats */}
              {selectedPlayer.pos === 'GK' && (
                <div className="bg-blue-800 p-3 rounded-md">
                  <h4 className="text-sm font-semibold mb-3">Goalkeeper Rating</h4>
                  <div className="text-center">
                    <div className="relative w-24 h-24 mx-auto mb-1">
                      <svg viewBox="0 0 100 100" className="w-full h-full">
                        <circle cx="50" cy="50" r="45" fill="none" stroke="#1e3a8a" strokeWidth="10" />
                        <circle 
                          cx="50" 
                          cy="50" 
                          r="45" 
                          fill="none" 
                          stroke="#ec4899" 
                          strokeWidth="10"
                          strokeDasharray={`${selectedPlayer.keeping_ratings * 2.83} 283`}
                          transform="rotate(-90 50 50)"
                        />
                        <text x="50" y="55" textAnchor="middle" className="text-2xl font-bold fill-current">
                          {selectedPlayer.keeping_ratings?.toFixed(1) || '0'}
                        </text>
                      </svg>
                    </div>
                    <p className="text-sm">Goalkeeping</p>
                  </div>
                </div>
              )}
              
              {/* Last played info */}
              {selectedPlayer.Last_played && (
                <div className="mt-3 text-xs text-gray-400 text-right">
                  Last Match: {selectedPlayer.Last_played}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SquadPage;