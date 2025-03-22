import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Plus, Minus } from 'lucide-react';
import PropTypes from 'prop-types';
import PlayerDashboard from './PlayerDashboard';

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

const PlayersPage = () => {
  const [players, setPlayers] = useState([]);
  const [allNations,setAllNations] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedNation, setSelectedNation] = useState("all");
  const [selectedPosition, setSelectedPosition] = useState("all");
  const [ageRange, setAgeRange] = useState([18, 45]);
  const [minOverall, setMinOverall] = useState(70);
  const [minPotential, setMinPotential] = useState(70);
  const [isLoading, setIsLoading] = useState(false);
  const [expandedRows, setExpandedRows] = useState(new Set());

  const getRatingColor = (rating) => {
    if (rating >= 90) return 'bg-blue-900';
    if (rating >= 80) return 'bg-blue-800';
    if (rating >= 70) return 'bg-blue-700';
    if (rating >= 60) return 'bg-blue-600';
    if (rating >= 50) return 'bg-blue-500';
    if (rating >= 40) return 'bg-blue-400';
    if (rating >= 30) return 'bg-blue-300';
    if (rating >= 20) return 'bg-blue-200';
    return 'bg-blue-100';
  };

  const limit = 50;

  useEffect(() => {
    const fetchAllNations = async () => {
      try {
        const response = await fetch('https://squadify-backend.onrender.com/players/nations');
        if (!response.ok) throw new Error('Failed to fetch nations');
        const data = await response.json();
        setAllNations(data.sort());
      } catch (error) {
        console.error("Error fetching nations:", error);
      }
    };

    const fetchPlayers = async () => {
      setIsLoading(true);
      try {
          const queryParams = new URLSearchParams({
              page: currentPage,
              limit: limit,
              search: searchTerm,
              nation: selectedNation !== "all" ? selectedNation : "",
              position: selectedPosition !== "all" ? selectedPosition : "",
              minAge: ageRange[0],
              maxAge: ageRange[1],
              minOverall: minOverall,
              minPotential: minPotential,
          }).toString();

          const response = await fetch(`https://squadify-backend.onrender.com/players/pagination?${queryParams}`);
          if (!response.ok) throw new Error('Network response was not ok');

          const data = await response.json();
          setPlayers(data.players);
          setTotalPages(data.totalPages);
      } catch (error) {
          console.error("Error fetching players:", error);
      } finally {
          setIsLoading(false);
      }
    };
    fetchAllNations();
    fetchPlayers();
  }, [currentPage, searchTerm, selectedNation, selectedPosition, ageRange, minOverall, minPotential]);

  const allPositions = ["GK", "DF", "MF", "FW"];

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const PaginationButton = ({ onClick, disabled, children }) => (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-3 py-2 rounded-md ${
        disabled
          ? 'bg-blue-800/50 text-blue-300 cursor-not-allowed'
          : 'bg-blue-800 text-blue-100 hover:bg-blue-700'
      } transition-colors`}
    >
      {children}
    </button>
  );

  PaginationButton.propTypes = {
    onClick: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
    children: PropTypes.node.isRequired,
  };
  
  PaginationButton.defaultProps = {
    disabled: false,
  };

  const toggleRow = (playerId) => {
    const newExpandedRows = new Set(expandedRows);
    if (newExpandedRows.has(playerId)) {
      newExpandedRows.delete(playerId);
    } else {
      newExpandedRows.add(playerId);
    }
    setExpandedRows(newExpandedRows);
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-black to-blue-950 pt-8">
      <div className="max-w-[90vw] mx-auto p-4">
        {/* Filters Section */}
        <div className="mb-6 mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 bg-black border border-gray-600 p-4 rounded-lg">
          {/* Search Input */}
          <div>
            <label className="block text-blue-100 mb-2">Search Player</label>
            <input
              type="text"
              placeholder="Search by name..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full p-2 rounded bg-blue-950 text-blue-100 border border-blue-700 placeholder-blue-400"
            />
          </div>

          <div>
            <label className="block text-blue-100 mb-2">Nation</label>
            <select 
              className="w-full p-2 rounded bg-blue-950 text-blue-100 border border-blue-700"
              value={selectedNation}
              onChange={(e) => {
                setSelectedNation(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="all">All Nations</option>
              {allNations.map(nation => (
                <option key={nation} value={nation}>
                  {nation}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-blue-100 mb-2">Position</label>
            <select 
              className="w-full p-2 rounded bg-blue-950 text-blue-100 border border-blue-700"
              value={selectedPosition}
              onChange={(e) => {
                setSelectedPosition(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="all">All Positions</option>
              {allPositions.map(pos => (
                <option key={pos} value={pos}>
                  {pos}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-blue-100 mb-2">
              Age Range: {ageRange[0]} - {ageRange[1]}
            </label>

            <div className="flex gap-4">
              {/* Minimum Age Slider */}
              <input
                type="range"
                min="18"
                max="45"
                step="1"
                value={ageRange[0]}
                onChange={(e) => {
                  const newMin = parseInt(e.target.value);
                  if (newMin <= ageRange[1]) {
                    setAgeRange([newMin, ageRange[1]]);
                    setCurrentPage(1);
                  }
                }}
                className="w-full accent-blue-900"
              />

              {/* Maximum Age Slider */}
              <input
                type="range"
                min="18"
                max="45"
                step="1"
                value={ageRange[1]}
                onChange={(e) => {
                  const newMax = parseInt(e.target.value);
                  if (newMax >= ageRange[0]) {
                    setAgeRange([ageRange[0], newMax]);
                    setCurrentPage(1);
                  }
                }}
                className="w-full accent-blue-900"
              />
            </div>
          </div>


          <div>
            <label className="block text-blue-100 mb-2">Min Overall: {minOverall}</label>
            <input
              type="range"
              min="50"
              max="99"
              value={minOverall}
              onChange={(e) => {
                setMinOverall(parseInt(e.target.value));
                setCurrentPage(1);
              }}
              className="w-full accent-blue-900"
            />
          </div>

          <div>
            <label className="block text-blue-100 mb-2">Min Potential: {minPotential}</label>
            <input
              type="range"
              min="50"
              max="99"
              value={minPotential}
              onChange={(e) => {
                setMinPotential(parseInt(e.target.value));
                setCurrentPage(1);
              }}
              className="w-full accent-blue-900"
            />
          </div>
        </div>

        {/* Table Section */}
        <div className="overflow-hidden rounded-lg shadow-lg border border-blue-900 relative">
          {isLoading && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-50">
              <div className="text-white text-lg font-bold">Loading...</div>
            </div>
          )}
          <div className="table-container max-h-[600px] overflow-auto">
            <table className="min-w-full table-auto">
              <thead className="sticky top-0 z-10">
                <tr className="bg-blue-950 shadow-md">
                  <th className="p-2 text-center text-blue-100 font-semibold"></th>
                  <th className="p-2 text-center text-blue-100 font-semibold">Name</th>
                  <th className="p-2 text-center text-blue-100 font-semibold">Nation</th>
                  <th className="p-2 text-center text-blue-100 font-semibold">Club</th>
                  <th className="p-2 text-center text-blue-100 font-semibold">Pos</th>
                  <th className="p-2 text-center text-blue-100 font-semibold">Age</th>
                  <th className="p-2 text-center text-blue-100 font-semibold">Defense</th>
                  <th className="p-2 text-center text-blue-100 font-semibold">Passing</th>
                  <th className="p-2 text-center text-blue-100 font-semibold">Shooting</th>
                  <th className="p-2 text-center text-blue-100 font-semibold">Potential</th>
                  <th className="p-2 text-center text-blue-100 font-semibold">Overall</th>
                  <th className="p-2 text-center text-blue-100 font-semibold">Market Value</th>
                  <th className="p-2 text-center text-blue-100 font-semibold w-8"></th>
                </tr>
              </thead>
              <tbody>
                {players.map((player) => (
                  <React.Fragment key={player.id}>
                    <tr className="hover:bg-blue-700/25 transition-colors">
                      <td className="px-1 py-2 text-center border-b border-blue-900">
                        <img 
                          src={player.Image_URL} 
                          alt="img" 
                          className="w-8 h-8 rounded-full object-cover border border-white mx-auto"
                        />
                      </td>
                      <td className="px-1 py-2 text-center text-blue-200 border-b border-blue-900 font-medium">{player.name}</td>
                      <td className="px-1 py-2 text-center border-b border-blue-900">
                        <img
                          src={`https://flagcdn.com/w40/${nationFlags[player.nation]}.png`}
                          alt={player.nation}
                          className="h-6 mx-auto"
                        />
                      </td>
                      <td className="px-1 py-2 text-center border-b border-blue-900">
                        <img 
                          src={`/badges/${player.club}.png`}
                          alt="img" 
                          className="w-10 h-10 rounded-full object-cover border-none mx-auto"
                        />
                      </td>
                      <td className="px-1 py-2 text-center text-blue-200 border-b border-blue-900">
                        {player.pos}
                      </td>
                      <td className="px-1 py-2 text-center text-blue-200 border-b border-blue-900">
                        {player.age}
                      </td>
                      <td className="px-1 py-2 border-b border-blue-900">
                        <div className={`w-16 mx-auto px-2 py-1.5 text-center text-white rounded ${getRatingColor(player.defense_ratings)} bg-opacity-80`}>
                          {player.defense_ratings.toFixed(1)}
                        </div>
                      </td>
                      <td className="px-1 py-2 border-b border-blue-900">
                        <div className={`w-16 mx-auto px-2 py-1.5 text-center text-white rounded ${getRatingColor(player.passing_ratings)} bg-opacity-80`}>
                          {player.passing_ratings.toFixed(1)}
                        </div>
                      </td>
                      <td className="px-1 py-2 border-b border-blue-900">
                        <div className={`w-16 mx-auto px-2 py-1.5 text-center text-white rounded ${getRatingColor(player.shooting_ratings)} bg-opacity-80`}>
                          {player.shooting_ratings.toFixed(1)}
                        </div>
                      </td>
                      <td className="px-1 py-2 border-b border-blue-900">
                        <div className="bg-blue-950 border-2 text-blue-100 px-2.5 py-1.5 rounded w-16 text-center font-bold mx-auto">
                          {player.potential_ratings.toFixed(1)}
                        </div>
                      </td>
                      <td className="px-1 py-2 border-b border-blue-900">
                        <div className="bg-blue-950 border-2 text-blue-100 px-2.5 py-1.5 rounded w-16 text-center font-bold mx-auto">
                          {player.overall_ratings.toFixed(1)}
                        </div>
                      </td>
                      <td className="px-1 py-2 text-center text-blue-200 border-b border-blue-900">
                        {player.Market_Value === -1
                          ? "Retired"
                          : player.Market_Value === 0
                          ? "<€25K"
                          : player.Market_Value >= 1_000_000
                          ? `€${(player.Market_Value / 1_000_000).toFixed(1)}M`
                          : player.Market_Value >= 1_000
                          ? `€${(player.Market_Value / 1_000).toFixed(1)}K`
                          : `€${player.Market_Value}`}
                      </td>


                      <td className="px-1 py-2 text-center border-b border-blue-900">
                        <button
                          onClick={() => toggleRow(player._id)}
                          className="p-1 hover:bg-blue-800 rounded-full transition-colors"
                        >
                          {expandedRows.has(player._id) ? (
                            <Minus className="w-4 h-4 text-blue-200" />
                          ) : (
                            <Plus className="w-4 h-4 text-blue-200" />
                          )}
                        </button>
                      </td>
                    </tr>
                    {expandedRows.has(player._id) && (
                      <tr>
                        <td colSpan="13" className="bg-blue-900/30 px-4 py-3 border-b border-blue-700">
                          <div className="text-blue-200">
                            <PlayerDashboard player={player} />
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          <div className="bg-blue-950 p-1.5 border-t border-blue-900">
            <div className="flex items-center justify-between">
              <div className="text-blue-100">
                Page {currentPage} of {totalPages}
              </div>
              <div className="flex gap-2">
                <PaginationButton
                  onClick={() => handlePageChange(1)}
                  disabled={currentPage === 1}
                >
                  <ChevronsLeft className="w-3 h-3" />
                </PaginationButton>
                <PaginationButton
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="w-3 h-3" />
                </PaginationButton>
                <PaginationButton
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  <ChevronRight className="w-3 h-3" />
                </PaginationButton>
                <PaginationButton
                  onClick={() => handlePageChange(totalPages)}
                  disabled={currentPage === totalPages}
                >
                  <ChevronsRight className="w-3 h-3" />
                </PaginationButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayersPage;