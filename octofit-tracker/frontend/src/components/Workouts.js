import React, { useEffect, useState } from 'react';

const Workouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const apiUrl = `${process.env.REACT_APP_CODESPACE_NAME ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/workouts/` : 'http://localhost:8000/api/workouts/'}`;

  useEffect(() => {
    console.log('Fetching Workouts from:', apiUrl);
    fetch(apiUrl)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setWorkouts(results);
        console.log('Fetched Workouts:', results);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching workouts:', err);
        setLoading(false);
      });
  }, [apiUrl]);

  if (loading) return <div className="text-center my-4">Loading Workouts...</div>;

  if (!workouts.length) return <div className="alert alert-info">No workouts found.</div>;

  const headers = workouts[0] ? Object.keys(workouts[0]) : [];

  return (
    <div>
      <h2 className="mb-4 text-primary">Workouts</h2>
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
            {workouts.map((workout, idx) => (
              <tr key={workout.id || idx}>
                {headers.map((header) => (
                  <td key={header}>{String(workout[header])}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Workouts;
