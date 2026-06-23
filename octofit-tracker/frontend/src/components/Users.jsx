import { useEffect, useState } from 'react';

const CODESPACE_NAME = import.meta.env.VITE_CODESPACE_NAME;
// VITE_CODESPACE_NAME must be defined in .env.local for the codespace API to work
const API_URL = CODESPACE_NAME
  ? `https://${CODESPACE_NAME}-8000.app.github.dev/api/users/`
  : 'http://localhost:8000/api/users/';

function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setUsers(Array.isArray(data) ? data : (data.results ?? [])))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div className="container mt-4">
      <h2>Users</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id ?? user.id}>
              <td>{user.username}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Users;
