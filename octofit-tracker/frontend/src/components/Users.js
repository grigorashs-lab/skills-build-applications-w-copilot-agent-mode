import React, { useEffect, useState } from 'react';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const apiUrl = `${process.env.REACT_APP_CODESPACE_NAME ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/users/` : 'http://localhost:8000/api/users/'}`;

  useEffect(() => {
    console.log('Fetching Users from:', apiUrl);
    fetch(apiUrl)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setUsers(results);
        console.log('Fetched Users:', results);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching users:', err);
        setLoading(false);
      });
  }, [apiUrl]);

  if (loading) return <div className="text-center my-4">Loading Users...</div>;

  if (!users.length) return <div className="alert alert-info">No users found.</div>;

  const headers = users[0] ? Object.keys(users[0]) : [];

  return (
    <div>
      <h2 className="mb-4 text-primary">Users</h2>
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
            {users.map((user, idx) => (
              <tr key={user.id || idx}>
                {headers.map((header) => (
                  <td key={header}>{String(user[header])}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
