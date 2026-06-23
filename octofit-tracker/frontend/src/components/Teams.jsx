import { useEffect, useState } from 'react';

const CODESPACE_NAME = import.meta.env.VITE_CODESPACE_NAME;
// VITE_CODESPACE_NAME must be defined in .env.local for the codespace API to work
const API_URL = CODESPACE_NAME
  ? `https://${CODESPACE_NAME}-8000.app.github.dev/api/teams/`
  : 'http://localhost:8000/api/teams/';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setTeams(Array.isArray(data) ? data : (data.results ?? [])))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div className="container mt-4">
      <h2>Teams</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Team Name</th>
            <th>Members</th>
          </tr>
        </thead>
        <tbody>
          {teams.map((team) => (
            <tr key={team._id ?? team.id}>
              <td>{team.name}</td>
              <td>{Array.isArray(team.members) ? team.members.join(', ') : team.members}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Teams;
