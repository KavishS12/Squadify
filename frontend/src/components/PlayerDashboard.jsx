import React from 'react';
import { BarChart, LineChart, RadarChart, PieChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Pie, Cell } from 'recharts';
import PropTypes from 'prop-types';

const PlayerDashboard = ({ player }) => {
  // Define colors based on player's position
  const getPositionColor = (pos) => {
    if (pos.includes('GK')) return '#3b82f6'; // Blue for goalkeepers
    if (pos.includes('DF')) return '#10b981'; // Green for defenders
    if (pos.includes('MF')) return '#f59e0b'; // Amber for midfielders
    if (pos.includes('FW')) return '#ef4444'; // Red for forwards
    return '#8b5cf6'; // Purple default
  };
  
  const positionColor = getPositionColor(player.pos);
  
  // Format stats for radar chart
  const radarData = [
    { stat: 'Defense', value: player.defense_ratings, fullMark: 100 },
    { stat: 'Passing', value: player.passing_ratings, fullMark: 100 },
    { stat: 'Shooting', value: player.shooting_ratings, fullMark: 100 },
    { stat: 'Overall', value: player.overall_ratings, fullMark: 100 },
    { stat: 'Potential', value: player.potential_ratings, fullMark: 100 },
    // Add more if available based on position
    ...(player.pos.includes('GK') ? [{ stat: 'Keeping', value: player.keeping_ratings || 0, fullMark: 100 }] : [])
  ];
  
  // Format passing data
  const passingData = [
    { name: 'Short', value: player.Short_passing || 0 },
    { name: 'Medium', value: player.Medium_passing || 0 },
    { name: 'Long', value: player.Long_passing || 0 },
  ].filter(item => item.value > 0);
  
  // Format defense data
  const defenseData = [
    { name: 'Tackles', value: player.Tackles_defense || 0 },
    { name: 'Challenges', value: player.Challenges_defense || 0 },
    { name: 'Blocks', value: player.Blocks_defense || 0 },
  ].filter(item => item.value > 0);
  
  // Format shooting data if available
  const shootingData = [
    { name: 'Standard', value: player.Standard_shooting || 0 },
    { name: 'Expected', value: player.Expected_shooting || 0 },
  ].filter(item => item.value > 0);
  
  // Format development potential data
  const potentialData = [
    { name: 'Current', value: player.overall_ratings },
    { name: 'Potential', value: player.potential_ratings - player.overall_ratings },
  ];
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];
  
  // Helper function to create position-specific insights
  const getPositionInsights = () => {
    if (player.pos.includes('GK')) {
      return {
        title: 'Goalkeeper Analysis',
        insights: [
          'Focus on keeping and defensive positioning',
          'Command of the penalty area is crucial',
          'Distribution skills impact team play'
        ],
        keyStats: ['keeping_ratings', 'defense_ratings']
      };
    } else if (player.pos.includes('DF')) {
      return {
        title: 'Defender Analysis',
        insights: [
          'Strong tackling and defensive awareness',
          'Aerial ability and positioning are key',
          'Building attacks from the back with passing range'
        ],
        keyStats: ['defense_ratings', 'Tackles_defense', 'Blocks_defense']
      };
    } else if (player.pos.includes('MF')) {
      return {
        title: 'Midfielder Analysis',
        insights: [
          'Balance between defensive work and creative output',
          'Passing range and vision are fundamental',
          'Movement off the ball creates space for teammates'
        ],
        keyStats: ['passing_ratings', 'Medium_passing', 'Long_passing']
      };
    } else if (player.pos.includes('FW')) {
      return {
        title: 'Forward Analysis',
        insights: [
          'Clinical finishing and shot selection',
          'Movement in final third creates scoring chances',
          'Link-up play helps build attacks'
        ],
        keyStats: ['shooting_ratings', 'Standard_shooting', 'Expected_shooting']
      };
    }
    return {
      title: 'Player Analysis',
      insights: [
        'Versatile player with mixed responsibilities',
        'Adaptable to different tactical setups',
        'Balance across multiple skill areas'
      ],
      keyStats: ['overall_ratings', 'potential_ratings']
    };
  };
  
  const positionInsights = getPositionInsights();
  
  // Market value formatter
  const formatMarketValue = (value) => {
    if (value === -1) return "Retired";
    if (value === 0) return "<€25,000";
    
    // If it's a number, format with currency symbol
    if (typeof value === 'number') {
      if (value >= 1000000) {
        return `€${(value / 1000000).toFixed(1)}M`;
      } else if (value >= 1000) {
        return `€${(value / 1000).toFixed(0)}K`;
      }
      return `€${value}`;
    }
    
    return value; // Return as is if already formatted
  };
  
  return (
    <div className="w-full py-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left column - Player Info and Position Analysis */}
        <div className="space-y-6">
          {/* Player Bio */}
          <div className="bg-blue-950 rounded-lg p-4 shadow-lg">
            <div className="flex items-center gap-4 mb-4">
              <img 
                src={player.Image_URL} 
                alt={player.name} 
                className="w-20 h-20 rounded-full object-cover border-2 border-white"
              />
              <div>
                <h2 className="text-xl font-bold text-white">{player.name}</h2>
                <div className="flex items-center gap-2 mt-1">
                  <img
                    src={`https://flagcdn.com/w40/${nationFlags[player.nation] || 'un'}.png`}
                    alt={player.nation}
                    className="h-4"
                  />
                  <span className="text-blue-200">{player.nation}</span>
                </div>
                <div className="mt-1">
                  <span className="text-blue-200 text-sm">Born: {player.born || 'N/A'}</span>
                </div>
                <div className="mt-1">
                  <span className="text-blue-200 text-sm">Age: {player.age}</span>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-2 mt-4">
              <div className="bg-blue-900/50 p-2 rounded">
                <div className="text-xs text-blue-300">Position</div>
                <div className="text-white font-semibold">{player.pos}</div>
              </div>
              <div className="bg-blue-900/50 p-2 rounded">
                <div className="text-xs text-blue-300">Market Value</div>
                <div className="text-white font-semibold">{formatMarketValue(player.Market_Value)}</div>
              </div>
              <div className="bg-blue-900/50 p-2 rounded">
                <div className="text-xs text-blue-300">Club</div>
                <div className="text-white font-semibold">{player.club || 'N/A'}</div>
              </div>
              <div className="bg-blue-900/50 p-2 rounded">
                <div className="text-xs text-blue-300">League</div>
                <div className="text-white font-semibold">{player.league || 'N/A'}</div>
              </div>
            </div>
          </div>
          
          {/* Position-specific insights */}
          <div className="bg-blue-950 rounded-lg p-4 shadow-lg">
            <h3 className="text-lg font-semibold text-white border-b border-blue-800 pb-2 mb-3">{positionInsights.title}</h3>
            <ul className="list-disc pl-5 space-y-2">
              {positionInsights.insights.map((insight, index) => (
                <li key={index} className="text-blue-200">{insight}</li>
              ))}
            </ul>
            
            {/* Last played info */}
            {player.Last_played && (
              <div className="mt-4 p-2 bg-blue-900/30 rounded">
                <div className="text-xs text-blue-300">Last Match</div>
                <div className="text-white">{player.Last_played}</div>
              </div>
            )}
          </div>
        </div>
        
        {/* Middle column - Main Stats Radar and Dev Potential */}
        <div className="space-y-6">
          {/* Overall Rating with Radar Chart */}
          <div className="bg-blue-950 rounded-lg p-4 shadow-lg h-64">
            <h3 className="text-lg font-semibold text-white mb-2">Performance Profile</h3>
            <ResponsiveContainer width="100%" height="85%">
              <RadarChart outerRadius="70%" data={radarData}>
                <PolarGrid stroke="#4a5568" />
                <PolarAngleAxis dataKey="stat" tick={{ fill: '#a0aec0' }} />
                <PolarRadiusAxis domain={[0, 100]} tick={{ fill: '#a0aec0' }} />
                <Radar name="Player Stats" dataKey="value" stroke={positionColor} fill={positionColor} fillOpacity={0.6} />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          
          {/* Development Potential */}
          <div className="bg-blue-950 rounded-lg p-4 shadow-lg">
            <h3 className="text-lg font-semibold text-white mb-2">Development Potential</h3>
            <div className="flex items-center justify-between mb-3">
              <span className="text-blue-200">Current: {player.overall_ratings.toFixed(1)}</span>
              <span className="text-blue-200">Potential: {player.potential_ratings.toFixed(1)}</span>
            </div>
            <ResponsiveContainer width="100%" height={100}>
              <PieChart>
                <Pie
                  data={potentialData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={40}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {potentialData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 0 ? '#3b82f6' : '#10b981'} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => value.toFixed(1)} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Right column - Detailed Stats */}
        <div className="space-y-6">
          {/* Passing Stats */}
          {passingData.length > 0 && (
            <div className="bg-blue-950 rounded-lg p-4 shadow-lg">
              <h3 className="text-lg font-semibold text-white mb-2">Passing Distribution</h3>
              <ResponsiveContainer width="100%" height={150}>
                <BarChart data={passingData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#4a5568" />
                  <XAxis dataKey="name" tick={{ fill: '#a0aec0' }} />
                  <YAxis tick={{ fill: '#a0aec0' }} />
                  <Tooltip />
                  <Bar dataKey="value" fill="#f59e0b" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
          
          {/* Defense Stats */}
          {defenseData.length > 0 && (
            <div className="bg-blue-950 rounded-lg p-4 shadow-lg">
              <h3 className="text-lg font-semibold text-white mb-2">Defensive Actions</h3>
              <ResponsiveContainer width="100%" height={150}>
                <BarChart data={defenseData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#4a5568" />
                  <XAxis dataKey="name" tick={{ fill: '#a0aec0' }} />
                  <YAxis tick={{ fill: '#a0aec0' }} />
                  <Tooltip />
                  <Bar dataKey="value" fill="#10b981" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
          
          {/* Shooting Stats */}
          {shootingData.length > 0 && (
            <div className="bg-blue-950 rounded-lg p-4 shadow-lg">
              <h3 className="text-lg font-semibold text-white mb-2">Shooting Performance</h3>
              <ResponsiveContainer width="100%" height={150}>
                <BarChart data={shootingData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#4a5568" />
                  <XAxis dataKey="name" tick={{ fill: '#a0aec0' }} />
                  <YAxis tick={{ fill: '#a0aec0' }} />
                  <Tooltip />
                  <Bar dataKey="value" fill="#ef4444" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

PlayerDashboard.propTypes = {
  player: PropTypes.object.isRequired,
  nationFlags: PropTypes.object
};

// Make sure the component has access to the nationFlags
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

export default PlayerDashboard;