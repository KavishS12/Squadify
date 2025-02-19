import React, { useState } from 'react';

const nationFlags = {
  "Argentina": "ar",
  "Australia": "au",
  "Belgium": "be",
  "Brazil": "br",
  "Canada": "ca",
  "Croatia": "hr",
  "Denmark": "dk",
  "Ecuador": "ec",
  "England": "gb",
  "France": "fr",
  "Germany": "de",
  "Georgia": "ge",
  "Italy": "it",
  "Japan": "jp",
  "Mexico": "mx",
  "Morocco": "ma",
  "Netherlands": "nl",
  "Nigeria": "ng",
  "Norway": "no",
  "Portugal": "pt",
  "Senegal": "sn",
  "South Korea": "kr",
  "Spain": "es",
  "Switzerland": "ch",
  "United States": "us",
  "Uruguay": "uy"
};

const PlayersPage = () => {
  const data = [
    { id: 1, name: "Kylian Mbappé", nation: "France", pos: "ST", age: 24, defense_ratings: 38, passing_ratings: 82, shooting_ratings: 91, potential_ratings: 95, overall_ratings: 91, market_value: 18000000 },
    { id: 2, name: "Erling Haaland", nation: "Norway", pos: "ST", age: 22, defense_ratings: 45, passing_ratings: 75, shooting_ratings: 93, potential_ratings: 94, overall_ratings: 89, market_value: 17000000 },
    { id: 3, name: "Jude Bellingham", nation: "England", pos: "CM", age: 20, defense_ratings: 78, passing_ratings: 85, shooting_ratings: 75, potential_ratings: 92, overall_ratings: 86, market_value: 12000000 },
    { id: 4, name: "Vinícius Jr.", nation: "Brazil", pos: "LW", age: 23, defense_ratings: 42, passing_ratings: 79, shooting_ratings: 83, potential_ratings: 92, overall_ratings: 89, market_value: 15000000 },
    { id: 5, name: "Phil Foden", nation: "England", pos: "CAM", age: 23, defense_ratings: 52, passing_ratings: 85, shooting_ratings: 81, potential_ratings: 90, overall_ratings: 85, market_value: 11000000 },
    { id: 6, name: "Federico Valverde", nation: "Uruguay", pos: "CM", age: 24, defense_ratings: 81, passing_ratings: 86, shooting_ratings: 82, potential_ratings: 90, overall_ratings: 88, market_value: 13000000 },
    { id: 7, name: "Gavi", nation: "Spain", pos: "CM", age: 19, defense_ratings: 72, passing_ratings: 83, shooting_ratings: 70, potential_ratings: 91, overall_ratings: 83, market_value: 9000000 },
    { id: 8, name: "Rafael Leão", nation: "Portugal", pos: "LW", age: 23, defense_ratings: 35, passing_ratings: 78, shooting_ratings: 84, potential_ratings: 89, overall_ratings: 85, market_value: 9500000 },
    { id: 9, name: "Bukayo Saka", nation: "England", pos: "RW", age: 22, defense_ratings: 62, passing_ratings: 82, shooting_ratings: 81, potential_ratings: 90, overall_ratings: 86, market_value: 12000000 },
    { id: 10, name: "Pedri", nation: "Spain", pos: "CM", age: 21, defense_ratings: 68, passing_ratings: 87, shooting_ratings: 75, potential_ratings: 93, overall_ratings: 86, market_value: 13000000 },
    { id: 11, name: "Jamal Musiala", nation: "Germany", pos: "CAM", age: 20, defense_ratings: 55, passing_ratings: 87, shooting_ratings: 79, potential_ratings: 92, overall_ratings: 86, market_value: 11500000 },
    { id: 12, name: "João Félix", nation: "Portugal", pos: "CF", age: 24, defense_ratings: 50, passing_ratings: 84, shooting_ratings: 80, potential_ratings: 89, overall_ratings: 84, market_value: 8500000 },
    { id: 13, name: "Rodrygo", nation: "Brazil", pos: "RW", age: 23, defense_ratings: 47, passing_ratings: 80, shooting_ratings: 82, potential_ratings: 90, overall_ratings: 85, market_value: 10000000 },
    { id: 14, name: "Ansu Fati", nation: "Spain", pos: "LW", age: 21, defense_ratings: 45, passing_ratings: 78, shooting_ratings: 79, potential_ratings: 89, overall_ratings: 83, market_value: 8000000 },
    { id: 15, name: "Eduardo Camavinga", nation: "France", pos: "CDM", age: 21, defense_ratings: 80, passing_ratings: 85, shooting_ratings: 74, potential_ratings: 90, overall_ratings: 86, market_value: 11000000 },
    { id: 16, name: "Jules Koundé", nation: "France", pos: "CB", age: 25, defense_ratings: 85, passing_ratings: 78, shooting_ratings: 60, potential_ratings: 88, overall_ratings: 87, market_value: 9500000 },
    { id: 17, name: "Alphonso Davies", nation: "Canada", pos: "LB", age: 23, defense_ratings: 82, passing_ratings: 80, shooting_ratings: 70, potential_ratings: 90, overall_ratings: 85, market_value: 10500000 },
    { id: 18, name: "Declan Rice", nation: "England", pos: "CDM", age: 25, defense_ratings: 86, passing_ratings: 83, shooting_ratings: 72, potential_ratings: 89, overall_ratings: 87, market_value: 12000000 },
    { id: 19, name: "Florian Wirtz", nation: "Germany", pos: "CAM", age: 21, defense_ratings: 58, passing_ratings: 86, shooting_ratings: 78, potential_ratings: 91, overall_ratings: 86, market_value: 10000000 },
    { id: 20, name: "Gabriel Martinelli", nation: "Brazil", pos: "LW", age: 22, defense_ratings: 46, passing_ratings: 79, shooting_ratings: 81, potential_ratings: 88, overall_ratings: 85, market_value: 9000000 },
    { id: 21, name: "Khvicha Kvaratskhelia", nation: "Georgia", pos: "LW", age: 23, defense_ratings: 50, passing_ratings: 82, shooting_ratings: 85, potential_ratings: 89, overall_ratings: 86, market_value: 9500000 },
    { id: 22, name: "Victor Osimhen", nation: "Nigeria", pos: "ST", age: 25, defense_ratings: 42, passing_ratings: 75, shooting_ratings: 88, potential_ratings: 89, overall_ratings: 87, market_value: 12000000 },
    { id: 23, name: "Rasmus Højlund", nation: "Denmark", pos: "ST", age: 21, defense_ratings: 40, passing_ratings: 73, shooting_ratings: 86, potential_ratings: 90, overall_ratings: 85, market_value: 8000000 },
    { id: 24, name: "Moises Caicedo", nation: "Ecuador", pos: "CDM", age: 22, defense_ratings: 84, passing_ratings: 80, shooting_ratings: 70, potential_ratings: 88, overall_ratings: 85, market_value: 9500000 },
    { id: 25, name: "Enzo Fernández", nation: "Argentina", pos: "CM", age: 23, defense_ratings: 80, passing_ratings: 86, shooting_ratings: 78, potential_ratings: 90, overall_ratings: 86, market_value: 10500000 },
    { id: 26, name: "Josko Gvardiol", nation: "Croatia", pos: "CB", age: 22, defense_ratings: 88, passing_ratings: 78, shooting_ratings: 60, potential_ratings: 89, overall_ratings: 87, market_value: 11000000 },
    { id: 27, name: "William Saliba", nation: "France", pos: "CB", age: 23, defense_ratings: 87, passing_ratings: 76, shooting_ratings: 62, potential_ratings: 89, overall_ratings: 86, market_value: 10000000 },
  ];

  const [selectedNation, setSelectedNation] = useState("all");
  const [selectedPosition, setSelectedPosition] = useState("all");
  const [ageRange, setAgeRange] = useState([18, 35]);
  const [minOverall, setMinOverall] = useState(80);
  const [minPotential, setMinPotential] = useState(80);

  const positions = [...new Set(data.map(player => player.pos))].sort();
  const nations = [...new Set(data.map(player => player.nation))].sort();

  const filteredData = data.filter(player => {
    const nationMatch = selectedNation === "all" || player.nation === selectedNation;
    const posMatch = selectedPosition === "all" || player.pos === selectedPosition;
    const ageMatch = player.age >= ageRange[0] && player.age <= ageRange[1];
    const overallMatch = player.overall_ratings >= minOverall;
    const potentialMatch = player.potential_ratings >= minPotential;
    
    return nationMatch && posMatch && ageMatch && overallMatch && potentialMatch;
  });

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

  return (
    <div className="w-full min-h-screen bg-black pt-8">
      <div className="max-w-[90vw] mx-auto p-4">
        {/* Filters Section */}
        <div className="mb-8 mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 bg-blue-950 p-4 rounded-lg">
          <div>
            <label className="block text-blue-100 mb-2">Nation</label>
            <select 
              className="w-full p-2 rounded bg-blue-900 text-blue-100 border border-blue-700"
              value={selectedNation}
              onChange={(e) => setSelectedNation(e.target.value)}
            >
              <option value="all">All Nations</option>
              {nations.map(nation => (
                <option key={nation} value={nation}>
                  {nation}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-blue-100 mb-2">Position</label>
            <select 
              className="w-full p-2 rounded bg-blue-900 text-blue-100 border border-blue-700"
              value={selectedPosition}
              onChange={(e) => setSelectedPosition(e.target.value)}
            >
              <option value="all">All Positions</option>
              {positions.map(pos => (
                <option key={pos} value={pos}>
                  {pos}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-blue-100 mb-2">Age Range: {ageRange[0]} - {ageRange[1]}</label>
            <div className="flex gap-4">
              <input
                type="range"
                min="18"
                max="35"
                value={ageRange[0]}
                onChange={(e) => setAgeRange([parseInt(e.target.value), ageRange[1]])}
                className="w-full"
              />
              <input
                type="range"
                min="18"
                max="35"
                value={ageRange[1]}
                onChange={(e) => setAgeRange([ageRange[0], parseInt(e.target.value)])}
                className="w-full"
              />
            </div>
          </div>

          <div>
            <label className="block text-blue-100 mb-2">Min Overall: {minOverall}</label>
            <input
              type="range"
              min="70"
              max="99"
              value={minOverall}
              onChange={(e) => setMinOverall(parseInt(e.target.value))}
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-blue-100 mb-2">Min Potential: {minPotential}</label>
            <input
              type="range"
              min="70"
              max="99"
              value={minPotential}
              onChange={(e) => setMinPotential(parseInt(e.target.value))}
              className="w-full"
            />
          </div>
        </div>

        {/* Table Section */}
        <div className="overflow-hidden rounded-lg shadow-lg border border-blue-300">
          <div className="table-container max-h-[590px] overflow-auto relative">
            <table className="min-w-full table-auto">
              <thead className="sticky top-0 z-10">
                <tr className="bg-blue-950 shadow-md">
                  <th className="p-2 text-center text-blue-100 font-semibold">#</th>
                  <th className="p-2 text-center text-blue-100 font-semibold">Name</th>
                  <th className="p-2 text-center text-blue-100 font-semibold">Nation</th>
                  <th className="p-2 text-center text-blue-100 font-semibold">Pos</th>
                  <th className="p-2 text-center text-blue-100 font-semibold">Age</th>
                  <th className="p-2 text-center text-blue-100 font-semibold">Defense</th>
                  <th className="p-2 text-center text-blue-100 font-semibold">Passing</th>
                  <th className="p-2 text-center text-blue-100 font-semibold">Shooting</th>
                  <th className="p-2 text-center text-blue-100 font-semibold">Overall</th>
                  <th className="p-2 text-center text-blue-100 font-semibold">Potential</th>
                  <th className="p-2 text-center text-blue-100 font-semibold">Market Value</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((row) => (
                  <tr
                    key={row.id}
                    className="hover:bg-blue-700/25 transition-colors"
                  >
                    <td className="px-1 py-2 text-center text-blue-200 border-b border-blue-300 first:border-l-0">{row.id}</td>
                    <td className="px-1 py-2 text-center text-blue-200 border-b border-blue-300 font-medium">{row.name}</td>
                    <td className="px-1 py-2 text-center border-b border-blue-300">
                      <img
                        src={`https://flagcdn.com/w40/${nationFlags[row.nation]}.png`}
                        alt={row.nation}
                        className="h-6 mx-auto"
                      />
                    </td>
                    <td className="px-1 py-2 text-center text-blue-200 border-b border-blue-300">{row.pos}</td>
                    <td className="px-1 py-2 text-center text-blue-200 border-b border-blue-300">{row.age}</td>
                    <td className="px-1 py-2 border-b border-blue-300">
                      <div className={`w-16 mx-auto px-2 py-1.5 text-center text-white rounded ${getRatingColor(row.defense_ratings)} bg-opacity-80`}>
                        {row.defense_ratings}
                      </div>
                    </td>
                    <td className="px-1 py-2 border-b border-blue-300">
                      <div className={`w-16 mx-auto px-2 py-1.5 text-center text-white rounded ${getRatingColor(row.passing_ratings)} bg-opacity-80`}>
                        {row.passing_ratings}
                      </div>
                    </td>
                    <td className="px-1 py-2 border-b border-blue-300">
                      <div className={`w-16 mx-auto px-2 py-1.5 text-center text-white rounded ${getRatingColor(row.shooting_ratings)} bg-opacity-80`}>
                        {row.shooting_ratings}
                      </div>
                    </td>
                    <td className="px-1 py-2 border-b border-blue-300">
                      <div className="bg-blue-950 border-2 text-blue-100 px-2.5 py-1.5 rounded w-16 text-center font-bold mx-auto">
                        {row.overall_ratings}
                      </div>
                    </td>
                    <td className="px-1 py-2 border-b border-blue-300 last:border-r-0">
                      <div className="bg-blue-950 border-2 text-blue-100 px-2.5 py-1.5 rounded w-16 text-center font-bold mx-auto">
                        {row.potential_ratings}
                      </div>
                    </td>
                    <td className="px-1 py-2 text-center text-blue-200 border-b border-blue-300 font-medium">{row.market_value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayersPage;