import React from 'react';

export const TeamSelect = ({ teams, value, onChange, excludeTeam, label }) => {
  const filteredTeams = excludeTeam
    ? teams.filter((team) => team.name !== excludeTeam)
    : teams;

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e)}
        className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
      >
        <option value="">Select team</option>
        {filteredTeams.map((team) => (
          <option key={team.name} value={team.name}>
            {team.name}
          </option>
        ))}
      </select>
    </div>
  );
};
