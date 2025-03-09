import React from 'react';
import { LineChart, PieChart, AreaChart, ScatterChart, Area, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Pie, Cell, Scatter, ZAxis, RadialBarChart, RadialBar } from 'recharts';
import PropTypes from 'prop-types';

const PlayerDashboardAlt = ({ player }) => {
  // Position-specific color schemes and configurations
  const positionConfig = {
    'GK': {
      primaryColor: '#3b82f6',
      secondaryColor: '#1e40af',
      gradient: ['#93c5fd', '#3b82f6', '#1d4ed8'],
      icon: '🧤',
      keyAttributes: ['keeping_ratings', 'defense_ratings', 'Playing_Time_stats']
    },
    'DF': {
      primaryColor: '#10b981',
      secondaryColor: '#047857',
      gradient: ['#6ee7b7', '#10b981', '#047857'],
      icon: '🛡️',
      keyAttributes: ['defense_ratings', 'Tackles_defense', 'Blocks_defense']
    },
    'MF': {
      primaryColor: '#f59e0b',
      secondaryColor: '#b45309',
      gradient: ['#fcd34d', '#f59e0b', '#b45309'],
      icon: '⚙️',
      keyAttributes: ['passing_ratings', 'Total_passing', 'Progression_stats']
    },
    'FW': {
      primaryColor: '#ef4444',
      secondaryColor: '#b91c1c',
      gradient: ['#fca5a5', '#ef4444', '#b91c1c'],
      icon: '⚽',
      keyAttributes: ['shooting_ratings', 'Standard_shooting', 'Expected_shooting']
    }
  };
  
  // Determine player's primary position
  let primaryPosition = 'DF'; // Default
  if (player.pos.includes('GK')) primaryPosition = 'GK';
  else if (player.pos.includes('FW')) primaryPosition = 'FW';
  else if (player.pos.includes('MF')) primaryPosition = 'MF';
  else if (player.pos.includes('DF')) primaryPosition = 'DF';
  
  const posStyle = positionConfig[primaryPosition];
  
  // Age analysis - calculate if player is in prime, developing, or veteran
  const getAgeCategory = (age, position) => {
    // Different positions have different prime age ranges
    const primeAges = {
      'GK': [28, 35],
      'DF': [26, 32],
      'MF': [25, 31],
      'FW': [24, 30]
    };
    
    const [primeStart, primeEnd] = primeAges[position];
    
    if (age < primeStart) return { category: 'Developing', icon: '📈', description: 'Still developing, has room to grow' };
    if (age <= primeEnd) return { category: 'Prime', icon: '⭐', description: 'In peak physical condition' };
    return { category: 'Veteran', icon: '🏆', description: 'Experienced but declining physically' };
  };
  
  const ageAnalysis = getAgeCategory(player.age, primaryPosition);
  
  // Calculate growth potential as a percentage
  const growthPotential = ((player.potential_ratings - player.overall_ratings) / player.overall_ratings * 100).toFixed(1);
  
  // Calculate skill balance - how evenly distributed are the player's skills
  const mainSkills = [
    player.defense_ratings || 0, 
    player.passing_ratings || 0, 
    player.shooting_ratings || 0,
    primaryPosition === 'GK' ? (player.keeping_ratings || 0) : 0
  ].filter(val => val > 0);
  
  const avgSkill = mainSkills.reduce((sum, curr) => sum + curr, 0) / mainSkills.length;
  const skillVariance = Math.sqrt(mainSkills.reduce((sum, curr) => sum + Math.pow(curr - avgSkill, 2), 0) / mainSkills.length);
  const balanceScore = Math.max(0, 100 - skillVariance).toFixed(0);
  
  // Format market value with currency symbol
  const formatMarketValue = (value) => {
    if (value === -1) return "Retired";
    if (value === 0) return "<€25,000";
    
    if (typeof value === 'number') {
      if (value >= 1000000) {
        return `€${(value / 1000000).toFixed(1)}M`;
      } else if (value >= 1000) {
        return `€${(value / 1000).toFixed(0)}K`;
      }
      return `€${value}`;
    }
    
    return value;
  };
  
  // Performance metrics for spider chart
  const performanceData = [
    { subject: 'Defense', A: player.defense_ratings || 0, fullMark: 100 },
    { subject: 'Passing', A: player.passing_ratings || 0, fullMark: 100 },
    { subject: 'Shooting', A: player.shooting_ratings || 0, fullMark: 100 },
    { subject: 'Overall', A: player.overall_ratings || 0, fullMark: 100 },
    ...(primaryPosition === 'GK' ? [{ subject: 'Keeping', A: player.keeping_ratings || 0, fullMark: 100 }] : [])
  ];
  
  // Radial bar data for skill comparison
  const radialData = [
    { name: 'Actual', value: player.overall_ratings, fill: posStyle.primaryColor },
    { name: 'Potential', value: player.potential_ratings, fill: '#8884d8' }
  ];
  
  // Area chart for skill distribution
  const areaData = [
    { name: 'Defense', value: player.defense_ratings || 0 },
    { name: 'Passing', value: player.passing_ratings || 0 },
    { name: 'Shooting', value: player.shooting_ratings || 0 },
    ...(primaryPosition === 'GK' ? [{ name: 'Keeping', value: player.keeping_ratings || 0 }] : [])
  ];
  
  // Get position-specific attributes to highlight
  const getPositionAttributes = () => {
    switch(primaryPosition) {
      case 'GK':
        return [
          { name: 'Reflexes', value: (player.keeping_ratings || 0) * 0.8 + Math.random() * 20 },
          { name: 'Positioning', value: (player.keeping_ratings || 0) * 0.7 + Math.random() * 25 },
          { name: 'Handling', value: (player.keeping_ratings || 0) * 0.75 + Math.random() * 22 },
          { name: 'Distribution', value: (player.passing_ratings || 0) }
        ];
      case 'DF':
        return [
          { name: 'Tackling', value: (player.Tackles_defense || 0) || ((player.defense_ratings || 0) * 0.9 + Math.random() * 10) },
          { name: 'Positioning', value: (player.defense_ratings || 0) * 0.8 + Math.random() * 15 },
          { name: 'Aerial', value: (player.defense_ratings || 0) * 0.7 + Math.random() * 25 },
          { name: 'Strength', value: (player.defense_ratings || 0) * 0.85 + Math.random() * 12 }
        ];
      case 'MF':
        return [
          { name: 'Vision', value: (player.passing_ratings || 0) * 0.9 + Math.random() * 10 },
          { name: 'Technique', value: (player.passing_ratings || 0) * 0.85 + Math.random() * 15 },
          { name: 'Stamina', value: (player.overall_ratings || 0) * 0.8 + Math.random() * 15 },
          { name: 'Creativity', value: (player.passing_ratings || 0) * 0.8 + Math.random() * 20 }
        ];
      case 'FW':
        return [
          { name: 'Finishing', value: (player.shooting_ratings || 0) * 0.9 + Math.random() * 10 },
          { name: 'Movement', value: (player.shooting_ratings || 0) * 0.8 + Math.random() * 15 },
          { name: 'Composure', value: (player.shooting_ratings || 0) * 0.75 + Math.random() * 20 },
          { name: 'Speed', value: (player.overall_ratings || 0) * 0.7 + Math.random() * 25 }
        ];
      default:
        return [];
    }
  };
  
  const positionAttributes = getPositionAttributes();
  
  // Generate player summary
  const generatePlayerSummary = () => {
    const strengths = [];
    const weaknesses = [];
    
    // Analyze based on position
    if (primaryPosition === 'GK') {
      if (player.keeping_ratings > 75) strengths.push('Shot stopping');
      else weaknesses.push('Shot stopping');
      
      if (player.passing_ratings > 70) strengths.push('Distribution');
      else weaknesses.push('Distribution');
    } else {
      if (player.defense_ratings > 75) strengths.push('Defensive work');
      else if (player.defense_ratings < 60) weaknesses.push('Defensive contribution');
      
      if (player.passing_ratings > 75) strengths.push('Ball distribution');
      else if (player.passing_ratings < 60) weaknesses.push('Passing accuracy');
      
      if (player.shooting_ratings > 75) strengths.push('Goal threat');
      else if (primaryPosition === 'FW' && player.shooting_ratings < 70) weaknesses.push('Finishing ability');
    }
    
    // Age-based analysis
    if (ageAnalysis.category === 'Developing') {
      strengths.push('Room for development');
      if (growthPotential > 10) strengths.push('High ceiling');
      else weaknesses.push('Limited growth potential');
    } else if (ageAnalysis.category === 'Prime') {
      strengths.push('Peak physical condition');
    } else {
      strengths.push('Experience');
      weaknesses.push('Physical decline');
    }
    
    // Balance analysis
    if (balanceScore > 75) {
      strengths.push('Well-rounded skillset');
    } else {
      weaknesses.push('Unbalanced skill profile');
    }
    
    return {
      strengths: strengths.slice(0, 3),
      weaknesses: weaknesses.slice(0, 2)
    };
  };
  
  const playerSummary = generatePlayerSummary();
  
  return (
    <div className="w-full">
      {/* Header Profile Section with Background Gradient */}
      <div 
        className="w-full p-4 rounded-lg mb-4 relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${posStyle.primaryColor} 0%, ${posStyle.secondaryColor} 100%)`,
          boxShadow: `0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)`
        }}
      >
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute right-0 bottom-0 text-white text-opacity-20 text-9xl font-bold">
            {posStyle.icon}
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 relative z-10">
          {/* Player Image */}
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-white p-1">
              <img 
                src={player.Image_URL} 
                alt={player.name} 
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div className="absolute -bottom-2 -right-2 bg-white rounded-full w-8 h-8 flex items-center justify-center font-bold shadow-md">
              {player.age}
            </div>
          </div>
          
          {/* Player Info */}
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-2xl font-bold text-white">{player.name}</h2>
              <div className="flex items-center">
                <img
                  src={`https://flagcdn.com/w40/${nationFlags[player.nation] || 'un'}.png`}
                  alt={player.nation}
                  className="h-4 mr-1"
                />
                <span className="text-white text-opacity-90 text-sm">{player.nation}</span>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-x-6 gap-y-1 mt-1">
              <div className="text-white text-opacity-90 text-sm flex items-center">
                <span className="font-semibold mr-1">Position:</span> {player.pos}
              </div>
              <div className="text-white text-opacity-90 text-sm flex items-center">
                <span className="font-semibold mr-1">Club:</span> {player.club || 'N/A'}
              </div>
              <div className="text-white text-opacity-90 text-sm flex items-center">
                <span className="font-semibold mr-1">Value:</span> {formatMarketValue(player.Market_Value)}
              </div>
            </div>
            
            {/* Rating Badge */}
            <div className="flex items-center gap-2 mt-2">
              <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg px-3 py-1 flex items-center">
                <span className="text-white font-bold mr-1">{player.overall_ratings.toFixed(1)}</span>
                <span className="text-white text-opacity-70 text-xs">OVERALL</span>
              </div>
              <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg px-3 py-1 flex items-center">
                <span className="text-white font-bold mr-1">{player.potential_ratings.toFixed(1)}</span>
                <span className="text-white text-opacity-70 text-xs">POTENTIAL</span>
              </div>
              <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg px-3 py-1 flex items-center">
                <span className="text-white font-bold mr-1">{ageAnalysis.category}</span>
                <span className="text-lg ml-1">{ageAnalysis.icon}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Left Column */}
        <div className="space-y-4">
          {/* Player Analysis Card */}
          <div className="bg-blue-950 rounded-lg p-4 shadow-md">
            <h3 className="font-bold text-lg text-white flex items-center border-b border-blue-800 pb-2 mb-3">
              <span className="mr-2">Player Analysis</span>
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: posStyle.primaryColor }}></div>
            </h3>
            
            <div className="mb-4">
              <p className="text-blue-200 mb-3 italic">"{player.name} is a {ageAnalysis.category.toLowerCase()} {primaryPosition} player with {growthPotential > 10 ? 'significant' : 'some'} room for growth."</p>
              
              <div className="grid grid-cols-2 gap-3 mt-4">
                <div>
                  <h4 className="text-white font-semibold mb-1 flex items-center">
                    <span className="mr-2">Strengths</span>
                    <span className="text-green-400 text-sm">+</span>
                  </h4>
                  <ul className="space-y-1">
                    {playerSummary.strengths.map((strength, idx) => (
                      <li key={idx} className="text-green-300 text-sm flex items-center">
                        <span className="mr-1">•</span> {strength}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-white font-semibold mb-1 flex items-center">
                    <span className="mr-2">Weaknesses</span>
                    <span className="text-red-400 text-sm">-</span>
                  </h4>
                  <ul className="space-y-1">
                    {playerSummary.weaknesses.map((weakness, idx) => (
                      <li key={idx} className="text-red-300 text-sm flex items-center">
                        <span className="mr-1">•</span> {weakness}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            
            {/* Age Profile */}
            <div className="mt-4 bg-blue-900/30 rounded-lg p-3">
              <div className="flex items-center">
                <div className="text-lg mr-2">{ageAnalysis.icon}</div>
                <div>
                  <h4 className="text-white font-semibold">{ageAnalysis.category} Stage</h4>
                  <p className="text-blue-200 text-sm">{ageAnalysis.description}</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Position-Specific Attributes */}
          <div className="bg-blue-950 rounded-lg p-4 shadow-md">
            <h3 className="font-bold text-lg text-white flex items-center border-b border-blue-800 pb-2 mb-3">
              <span className="mr-2">{primaryPosition} Attributes</span>
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: posStyle.primaryColor }}></div>
            </h3>
            
            <div className="grid grid-cols-2 gap-3">
              {positionAttributes.map((attr, idx) => (
                <div key={idx} className="bg-blue-900/30 rounded-lg p-3">
                  <div className="flex justify-between mb-1">
                    <span className="text-blue-200">{attr.name}</span>
                    <span className="text-white font-semibold">{Math.round(attr.value)}</span>
                  </div>
                  <div className="w-full bg-blue-900/50 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full" 
                      style={{ 
                        width: `${Math.min(100, Math.max(0, attr.value))}%`,
                        background: `linear-gradient(90deg, ${posStyle.gradient[0]}, ${posStyle.gradient[1]})` 
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Development Path */}
            <div className="mt-4">
              <h4 className="text-white font-semibold mb-2">Development Path</h4>
              <div className="flex items-center">
                <div className="flex-1 h-2 bg-blue-900/50 rounded-full">
                  <div 
                    className="h-2 rounded-full" 
                    style={{ 
                      width: `${(player.overall_ratings / player.potential_ratings) * 100}%`,
                      background: `linear-gradient(90deg, ${posStyle.gradient[0]}, ${posStyle.gradient[2]})` 
                    }}
                  ></div>
                </div>
                <div className="ml-3 text-blue-200 text-sm">{growthPotential}% growth potential</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right Column */}
        <div className="space-y-4">
          {/* Skill Distribution Chart */}
          <div className="bg-blue-950 rounded-lg p-4 shadow-md">
            <h3 className="font-bold text-lg text-white flex items-center border-b border-blue-800 pb-2 mb-3">
              <span className="mr-2">Skill Distribution</span>
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: posStyle.primaryColor }}></div>
            </h3>
            
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={areaData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={posStyle.primaryColor} stopOpacity={0.8}/>
                    <stop offset="95%" stopColor={posStyle.primaryColor} stopOpacity={0.2}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#4a5568" opacity={0.3} />
                <XAxis dataKey="name" tick={{ fill: '#a0aec0' }} />
                <YAxis domain={[0, 100]} tick={{ fill: '#a0aec0' }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1e3a8a', 
                    borderColor: '#3b82f6',
                    color: 'white'
                  }}
                />
                <Area type="monotone" dataKey="value" stroke={posStyle.primaryColor} fillOpacity={1} fill="url(#colorGradient)" />
              </AreaChart>
            </ResponsiveContainer>
            
            <div className="mt-2 flex justify-between">
              <div className="text-blue-200 text-sm">
                <span className="font-semibold">Balance Score:</span> {balanceScore}/100
              </div>
              <div className="text-blue-200 text-sm">
                <span className="font-semibold">Average Rating:</span> {avgSkill.toFixed(1)}
              </div>
            </div>
          </div>
          
          {/* Rating Comparison */}
          <div className="bg-blue-950 rounded-lg p-4 shadow-md">
            <h3 className="font-bold text-lg text-white flex items-center border-b border-blue-800 pb-2 mb-3">
              <span className="mr-2">Performance Ratings</span>
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: posStyle.primaryColor }}></div>
            </h3>
            
            <div className="flex">
              <div className="w-1/2">
                <ResponsiveContainer width="100%" height={200}>
                  <RadialBarChart 
                    cx="50%" 
                    cy="50%" 
                    innerRadius="30%" 
                    outerRadius="100%" 
                    barSize={10} 
                    data={radialData} 
                    startAngle={90} 
                    endAngle={-270}
                  >
                    <RadialBar
                      background
                      dataKey="value"
                      label={{ position: 'insideStart', fill: '#fff' }}
                    />
                    <Tooltip
                      contentStyle={{ 
                        backgroundColor: '#1e3a8a', 
                        borderColor: '#3b82f6',
                        color: 'white'
                      }}
                    />
                    <Legend iconSize={10} layout="vertical" verticalAlign="middle" align="right" />
                  </RadialBarChart>
                </ResponsiveContainer>
              </div>
              
              <div className="w-1/2 flex flex-col justify-center">
                <div className="mb-3">
                  <div className="text-xs text-blue-300">Current Rating</div>
                  <div className="text-2xl font-bold text-white">{player.overall_ratings.toFixed(1)}</div>
                </div>
                <div className="mb-3">
                  <div className="text-xs text-blue-300">Potential Rating</div>
                  <div className="text-2xl font-bold text-white">{player.potential_ratings.toFixed(1)}</div>
                </div>
                <div>
                  <div className="text-xs text-blue-300">Growth Potential</div>
                  <div className="text-lg font-semibold text-green-400">+{(player.potential_ratings - player.overall_ratings).toFixed(1)} points</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Additional Position-Specific Info */}
          <div className="bg-blue-950 rounded-lg p-4 shadow-md">
            <h3 className="font-bold text-lg text-white flex items-center border-b border-blue-800 pb-2 mb-3">
              <span className="mr-2">Career Information</span>
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: posStyle.primaryColor }}></div>
            </h3>
            
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-blue-900/30 p-3 rounded-lg">
                <h4 className="text-sm text-blue-300 mb-1">Current Club</h4>
                <p className="text-white font-medium">{player.club || 'N/A'}</p>
              </div>
              <div className="bg-blue-900/30 p-3 rounded-lg">
                <h4 className="text-sm text-blue-300 mb-1">League</h4>
                <p className="text-white font-medium">{player.league || 'N/A'}</p>
              </div>
              <div className="bg-blue-900/30 p-3 rounded-lg">
                <h4 className="text-sm text-blue-300 mb-1">Born</h4>
                <p className="text-white font-medium">{player.born || 'N/A'}</p>
              </div>
              <div className="bg-blue-900/30 p-3 rounded-lg">
                <h4 className="text-sm text-blue-300 mb-1">Last Played</h4>
                <p className="text-white font-medium">{player.Last_played || 'N/A'}</p>
              </div>
            </div>
            
            {/* Market Value Tag */}
            <div className="mt-4 flex items-center justify-between p-3 rounded-lg" 
                style={{ 
                  background: `linear-gradient(90deg, ${posStyle.gradient[1]} 0%, rgba(30, 58, 138, 0.3) 100%)` 
                }}
            >
              <div>
                <h4 className="text-white font-semibold">Market Value</h4>
                <p className="text-blue-200 text-sm">{player.Market_Value === -1 ? 'Retired player' : 'Current valuation'}</p>
              </div>
              <div className="text-white text-xl font-bold">
                {formatMarketValue(player.Market_Value)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

PlayerDashboardAlt.propTypes = {
  player: PropTypes.object.isRequired,
  nationFlags: PropTypes.object
};

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

export default PlayerDashboardAlt;