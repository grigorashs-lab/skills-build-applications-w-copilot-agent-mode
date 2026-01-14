import React, { useEffect, useState } from 'react';

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const apiUrl = `${process.env.REACT_APP_CODESPACE_NAME ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/teams/` : 'http://localhost:8000/api/teams/'}`;

  useEffect(() => {
    console.log('Fetching Teams from:', apiUrl);
    fetch(apiUrl)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setTeams(results);
        console.log('Fetched Teams:', results);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching teams:', err);
        setLoading(false);
      });
  }, [apiUrl]);

  if (loading) return <div className="text-center my-4">Loading Teams...</div>;

  if (!teams.length) return <div className="alert alert-info">No teams found.</div>;

  const headers = teams[0] ? Object.keys(teams[0]) : [];

  return (
    <div>
      <h2 className="mb-4 text-primary">Teams</h2>
      <div className="table-responsive">
        <table className="table table-striped table-bordered table-hover align-middle">
          <thead className="table-light">
            <tr>
              {headers.map((header) => (
                <th key={header}>{header.charAt(0).toUpperCase() + header.slice(1)}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {teams.map((team, idx) => (
              <tr key={team.id || idx}>
                {headers.map((header) => (
                  <td key={header}>{String(team[header])}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Teams;
