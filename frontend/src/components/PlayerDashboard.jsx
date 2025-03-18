import React from 'react';
import { BarChart, Bar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, LineChart, Line, Cell } from 'recharts';

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

const PlayerDashboard = ({ player }) => {
  // Return early with loading message if player data is not available
  if (!player) return <div className="text-center py-4">Loading player data...</div>;

  // Get all positions for multi-position players
  const positions = player.pos.split(',');
  
  // Format stats for radar chart - core ratings that all players have
  const getRadarStats = () => {
    const radarStats = [
      { stat: 'Defense', value: player.defense_ratings || 0 },
      { stat: 'Passing', value: player.passing_ratings || 0 },
      { stat: 'Shooting', value: player.shooting_ratings || 0 },
      { stat: 'Overall', value: player.overall_ratings || 0 },
      { stat: 'Potential', value: player.potential_ratings || 0 }
    ];
    
    // Add keeping rating only if it exists (for goalkeepers)
    if (player.keeping_ratings) {
      radarStats.push({ stat: 'Keeping', value: player.keeping_ratings });
    }
    
    return radarStats;
  };
  
  // Format defensive stats for bar chart
  const getDefensiveStats = () => {
    return [
      { name: 'Tackles', value: parseFloat(player.Tackles_defense) || 0 },
      { name: 'Challenges', value: parseFloat(player.Challenges_defense) || 0 },
      { name: 'Blocks', value: parseFloat(player.Blocks_defense) || 0 }
    ];
  };
  
  // Format passing stats for bar chart - removed Total Passes
  const getPassingStats = () => {
    return [
      { name: 'Short Passes', value: parseFloat(player.Short_passing) || 0 },
      { name: 'Medium Passes', value: parseFloat(player.Medium_passing) || 0 },
      { name: 'Long Passes', value: parseFloat(player.Long_passing) || 0 }
    ];
  };
  
  // Format ratings comparison for bar chart
  const getRatingsComparisonStats = () => {
    return [
      { name: 'Defense', value: player.defense_ratings || 0 },
      { name: 'Passing', value: player.passing_ratings || 0 },
      { name: 'Shooting', value: player.shooting_ratings || 0 },
      ...(player.keeping_ratings ? [{ name: 'Keeping', value: player.keeping_ratings }] : [])
    ];
  };
  
  // Determine what charts to show based on positions
  const shouldShowDefensiveStats = positions.some(pos => pos === 'DF' || pos === 'GK');
  const shouldShowPassingStats = positions.some(pos => pos === 'MF' || pos === 'DF');
  const shouldShowShootingStats = positions.some(pos => pos === 'FW' || pos === 'MF');
  
  // Get position-specific colors
  const getPositionColor = (pos) => {
    switch (pos) {
      case 'GK': return '#4299e1'; // blue
      case 'DF': return '#48bb78'; // green
      case 'MF': return '#ecc94b'; // yellow
      case 'FW': return '#f56565'; // red
      default: return '#805ad5'; // purple for multi-position
    }
  };
  
  // Get primary color based on first position
  const primaryColor = getPositionColor(positions[0]);
  
  // Format date of birth
  const formatBorn = (born) => {
    if (!born) return 'N/A';
    try {
      const date = new Date(born);
      return date.toLocaleDateString();
    } catch {
      return born;
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-2">
      {/* Player Info Section */}
      <div className="bg-blue-950 rounded-lg p-4 shadow-md col-span-1">
        <div className="flex items-center mb-4">
          <img 
            src={player.Image_URL} 
            alt={player.name}
            className="w-16 h-16 rounded-full object-cover border-2 border-white mr-4"
          />
          <div>
            <h2 className="text-xl font-bold text-white">{player.name}</h2>
            <div className="flex items-center space-x-2 mt-1">
              <img
                src={`https://flagcdn.com/w20/${nationFlags[player.nation] || 'un'}.png`}
                alt={player.nation}
                className="h-4"
              />
              <span className="text-blue-200">{player.nation}</span>
            </div>
            <p className="text-blue-300 text-sm mt-1">
              {player.club || 'No Club'} • {player.league || 'No League'}
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-2 mt-4">
          <div className="bg-blue-900/50 p-2 rounded text-center">
            <p className="text-blue-300 text-xs">Position</p>
            <p className="text-white font-bold">{player.pos}</p>
          </div>
          <div className="bg-blue-900/50 p-2 rounded text-center">
            <p className="text-blue-300 text-xs">Age</p>
            <p className="text-white font-bold">{player.age}</p>
          </div>
          <div className="bg-blue-900/50 p-2 rounded text-center">
            <p className="text-blue-300 text-xs">Born</p>
            <p className="text-white font-bold">{formatBorn(player.born)}</p>
          </div>
          <div className="bg-blue-900/50 p-2 rounded text-center">
            <p className="text-blue-300 text-xs">Last Played</p>
            <p className="text-white font-bold">{player.Last_played || 'N/A'}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-2 mt-2">
          <div className="bg-blue-900/50 p-2 rounded text-center">
            <p className="text-blue-300 text-xs">Overall</p>
            <p className="text-white font-bold">{player.overall_ratings?.toFixed(1)}</p>
          </div>
          <div className="bg-blue-900/50 p-2 rounded text-center">
            <p className="text-blue-300 text-xs">Potential</p>
            <p className="text-white font-bold">{player.potential_ratings?.toFixed(1)}</p>
          </div>
        </div>
        
        <div className="mt-2 bg-blue-900/50 p-3 rounded">
          <p className="text-blue-300 text-xs mb-1">Market Value</p>
          <p className="text-white font-bold">
            {player.Market_Value === -1 
              ? "Retired" 
              : player.Market_Value === 0 
                ? "€<25,000" 
                : "€" + player.Market_Value.toLocaleString()}
          </p>
        </div>
      </div>
      
      {/* Radar Chart for Overall Abilities */}
      <div className="bg-blue-950 rounded-lg p-4 shadow-md col-span-1">
        <h3 className="text-lg font-semibold text-blue-100 mb-2">Player Ratings</h3>
        <ResponsiveContainer width="100%" height={250}>
          <RadarChart outerRadius={90} data={getRadarStats()}>
            <PolarGrid stroke="#4a5568" />
            <PolarAngleAxis dataKey="stat" tick={{ fill: '#a0aec0' }} />
            <PolarRadiusAxis domain={[0, 100]} tick={false} />
            <Radar
              name="Ratings"
              dataKey="value"
              stroke={primaryColor}
              fill={primaryColor}
              fillOpacity={0.6}
            />
            <Tooltip contentStyle={{ backgroundColor: '#1a365d', borderColor: '#2d3748', color: 'white' }} />
          </RadarChart>
        </ResponsiveContainer>
      </div>
      
      {/* Bar Chart comparing all ratings */}
      <div className="bg-blue-950 rounded-lg p-4 shadow-md col-span-1">
        <h3 className="text-lg font-semibold text-blue-100 mb-2">Ratings Comparison</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={getRatingsComparisonStats()} margin={{ top: 20, right: 30, left: 20, bottom: 30 }}>
            <XAxis dataKey="name" tick={{ fill: '#a0aec0' }} />
            <YAxis domain={[0, 100]} tick={{ fill: '#a0aec0' }} />
            <Tooltip contentStyle={{ backgroundColor: '#1a365d', borderColor: '#2d3748', color: 'white' }} />
            <Bar dataKey="value" barSize={30}>
              {getRatingsComparisonStats().map((entry, index) => {
                let color;
                switch(entry.name) {
                  case 'Defense': color = '#48bb78'; break; // green
                  case 'Passing': color = '#ecc94b'; break; // yellow
                  case 'Shooting': color = '#f56565'; break; // red
                  case 'Keeping': color = '#4299e1'; break; // blue
                  default: color = '#805ad5'; // purple
                }
                return <Cell key={`cell-${index}`} fill={color} />;
              })}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      {/* Position-specific statistics */}
      {shouldShowDefensiveStats && (
        <div className="bg-blue-950 rounded-lg p-4 shadow-md col-span-1 md:col-span-3 lg:col-span-1">
          <h3 className="text-lg font-semibold text-blue-100 mb-2">Defensive Stats</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={getDefensiveStats()} margin={{ top: 20, right: 30, left: 20, bottom: 30 }}>
              <XAxis dataKey="name" tick={{ fill: '#a0aec0' }} />
              <YAxis tick={{ fill: '#a0aec0' }} />
              <Tooltip contentStyle={{ backgroundColor: '#1a365d', borderColor: '#2d3748', color: 'white' }} />
              <Bar dataKey="value" fill="#48bb78" barSize={30} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
      
      {shouldShowPassingStats && (
        <div className="bg-blue-950 rounded-lg p-4 shadow-md col-span-1 md:col-span-3 lg:col-span-1">
          <h3 className="text-lg font-semibold text-blue-100 mb-2">Passing Stats</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={getPassingStats()} margin={{ top: 20, right: 30, left: 20, bottom: 30 }}>
              <XAxis dataKey="name" tick={{ fill: '#a0aec0' }} />
              <YAxis tick={{ fill: '#a0aec0' }} />
              <Tooltip contentStyle={{ backgroundColor: '#1a365d', borderColor: '#2d3748', color: 'white' }} />
              <Bar dataKey="value" fill="#ecc94b" barSize={30} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default PlayerDashboard;