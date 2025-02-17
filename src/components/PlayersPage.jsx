import React from 'react';

const SoccerStatsTable = () => {
    const data = [
        { id: 1, player: "Erling Haaland", team: "Man City", goals: 36, assists: 8, played: 35, goalsPerNinety: 1.17, mpg: 77, totalShots: 107, shotAccuracy: 56 },
        { id: 2, player: "Harry Kane", team: "Tottenham", goals: 30, assists: 3, played: 38, goalsPerNinety: 0.79, mpg: 114, totalShots: 100, shotAccuracy: 63 },
        { id: 3, player: "Ivan Toney", team: "Brentford", goals: 20, assists: 4, played: 33, goalsPerNinety: 0.61, mpg: 148, totalShots: 78, shotAccuracy: 54 },
        { id: 4, player: "Mohamed Salah", team: "Liverpool", goals: 19, assists: 12, played: 38, goalsPerNinety: 0.52, mpg: 173, totalShots: 97, shotAccuracy: 48 },
        { id: 5, player: "Callum Wilson", team: "Newcastle", goals: 18, assists: 5, played: 31, goalsPerNinety: 0.86, mpg: 105, totalShots: 63, shotAccuracy: 56 },
        { id: 6, player: "Marcus Rashford", team: "Man Utd", goals: 17, assists: 5, played: 35, goalsPerNinety: 0.53, mpg: 170, totalShots: 81, shotAccuracy: 62 },
        { id: 7, player: "Gabriel Martinelli", team: "Arsenal", goals: 15, assists: 5, played: 36, goalsPerNinety: 0.48, mpg: 187, totalShots: 55, shotAccuracy: 58 },
        { id: 8, player: "Ollie Watkins", team: "Aston Villa", goals: 15, assists: 6, played: 37, goalsPerNinety: 0.43, mpg: 209, totalShots: 70, shotAccuracy: 67 },
        { id: 9, player: "Martin Ødegaard", team: "Arsenal", goals: 15, assists: 7, played: 37, goalsPerNinety: 0.43, mpg: 210, totalShots: 60, shotAccuracy: 55 },
        { id: 10, player: "Bukayo Saka", team: "Arsenal", goals: 14, assists: 11, played: 38, goalsPerNinety: 0.39, mpg: 228, totalShots: 60, shotAccuracy: 53 },
        { id: 11, player: "Alexander Mitrovic", team: "Fulham", goals: 14, assists: 1, played: 34, goalsPerNinety: 0.48, mpg: 144, totalShots: 71, shotAccuracy: 46 },
        { id: 12, player: "Rodrigo", team: "Leeds", goals: 13, assists: 1, played: 31, goalsPerNinety: 0.52, mpg: 156, totalShots: 65, shotAccuracy: 51 },
        { id: 13, player: "Phil Foden", team: "Man City", goals: 11, assists: 5, played: 32, goalsPerNinety: 0.41, mpg: 198, totalShots: 58, shotAccuracy: 59 },
        { id: 14, player: "Darwin Núñez", team: "Liverpool", goals: 9, assists: 3, played: 29, goalsPerNinety: 0.38, mpg: 212, totalShots: 75, shotAccuracy: 44 },
        { id: 15, player: "James Maddison", team: "Leicester", goals: 9, assists: 8, played: 30, goalsPerNinety: 0.35, mpg: 225, totalShots: 52, shotAccuracy: 50 },
        { id: 16, player: "Kai Havertz", team: "Chelsea", goals: 7, assists: 3, played: 35, goalsPerNinety: 0.22, mpg: 315, totalShots: 45, shotAccuracy: 47 },
        { id: 17, player: "Bruno Fernandes", team: "Man Utd", goals: 8, assists: 8, played: 37, goalsPerNinety: 0.23, mpg: 298, totalShots: 68, shotAccuracy: 49 },
        { id: 18, player: "Leandro Trossard", team: "Brighton", goals: 8, assists: 3, played: 30, goalsPerNinety: 0.31, mpg: 245, totalShots: 42, shotAccuracy: 52 },
        { id: 19, player: "Son Heung-min", team: "Tottenham", goals: 10, assists: 6, played: 36, goalsPerNinety: 0.30, mpg: 234, totalShots: 58, shotAccuracy: 57 },
        { id: 20, player: "Gabriel Jesus", team: "Arsenal", goals: 11, assists: 6, played: 26, goalsPerNinety: 0.47, mpg: 156, totalShots: 51, shotAccuracy: 61 },
        { id: 21, player: "Miguel Almirón", team: "Newcastle", goals: 11, assists: 2, played: 35, goalsPerNinety: 0.34, mpg: 208, totalShots: 48, shotAccuracy: 58 },
        { id: 22, player: "Raheem Sterling", team: "Chelsea", goals: 6, assists: 2, played: 28, goalsPerNinety: 0.24, mpg: 301, totalShots: 39, shotAccuracy: 51 },
        { id: 23, player: "Wilfried Zaha", team: "Crystal Palace", goals: 7, assists: 2, played: 27, goalsPerNinety: 0.29, mpg: 249, totalShots: 41, shotAccuracy: 54 },
        { id: 24, player: "Eberechi Eze", team: "Crystal Palace", goals: 10, assists: 4, played: 38, goalsPerNinety: 0.28, mpg: 246, totalShots: 54, shotAccuracy: 57 },
        { id: 25, player: "James Ward-Prowse", team: "Southampton", goals: 9, assists: 4, played: 38, goalsPerNinety: 0.25, mpg: 272, totalShots: 46, shotAccuracy: 59 }
    ];

    return (
        <div className="w-full min-h-screen bg-black pt-16">
          <div className="max-w-[90vw] mx-auto p-4">
            <div className="overflow-x-auto rounded-lg shadow-lg">
              <table className="min-w-full table-auto">
                <thead>
                  <tr className="bg-purple-900">
                    <th className="p-2 text-left text-violet-100 font-semibold border-b border-purple-700 whitespace-nowrap">#</th>
                    <th className="p-2 text-left text-violet-100 font-semibold border-b border-purple-700 whitespace-nowrap">Player</th>
                    <th className="p-2 text-left text-violet-100 font-semibold border-b border-purple-700 whitespace-nowrap">Team</th>
                    <th className="p-2 text-left text-violet-100 font-semibold border-b border-purple-700 whitespace-nowrap">Goals</th>
                    <th className="p-2 text-left text-violet-100 font-semibold border-b border-purple-700 whitespace-nowrap">Assists</th>
                    <th className="p-2 text-left text-violet-100 font-semibold border-b border-purple-700 whitespace-nowrap">Played</th>
                    <th className="p-2 text-left text-violet-100 font-semibold border-b border-purple-700 whitespace-nowrap">G/90</th>
                    <th className="p-2 text-left text-violet-100 font-semibold border-b border-purple-700 whitespace-nowrap">MPG</th>
                    <th className="p-2 text-left text-violet-100 font-semibold border-b border-purple-700 whitespace-nowrap">Shots</th>
                    <th className="p-2 text-left text-violet-100 font-semibold border-b border-purple-700 whitespace-nowrap">Accuracy</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((row) => (
                    <tr 
                      key={row.id}
                      className="hover:bg-purple-900/30 transition-colors"
                    >
                      <td className="p-2 text-violet-200 border-b border-purple-800 whitespace-nowrap">{row.id}</td>
                      <td className="p-2 text-violet-200 border-b border-purple-800 font-medium whitespace-nowrap">{row.player}</td>
                      <td className="p-2 text-violet-300 border-b border-purple-800 whitespace-nowrap">{row.team}</td>
                      <td className="p-2 border-b border-purple-800 whitespace-nowrap">
                        <div className="bg-violet-800 text-violet-100 px-2 py-1 rounded w-10 text-center">
                          {row.goals}
                        </div>
                      </td>
                      <td className="p-2 text-violet-200 border-b border-purple-800 whitespace-nowrap">{row.assists}</td>
                      <td className="p-2 text-violet-200 border-b border-purple-800 whitespace-nowrap">{row.played}</td>
                      <td className="p-2 text-violet-200 border-b border-purple-800 whitespace-nowrap">{row.goalsPerNinety}</td>
                      <td className="p-2 text-violet-200 border-b border-purple-800 whitespace-nowrap">{row.mpg}</td>
                      <td className="p-2 text-violet-200 border-b border-purple-800 whitespace-nowrap">{row.totalShots}</td>
                      <td className="p-2 text-violet-200 border-b border-purple-800 whitespace-nowrap">{row.shotAccuracy}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
    );
};

export default SoccerStatsTable;