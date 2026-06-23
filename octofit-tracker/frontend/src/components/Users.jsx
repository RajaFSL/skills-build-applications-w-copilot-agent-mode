import { useEffect, useState } from 'react'

function getItemsFromPayload(payload) {
  if (Array.isArray(payload)) return payload
  if (Array.isArray(payload?.items)) return payload.items
  if (Array.isArray(payload?.results)) return payload.results
  if (Array.isArray(payload?.data)) return payload.data
  if (Array.isArray(payload?.docs)) return payload.docs
  return []
}

function Users({ apiBaseUrl }) {
  const [users, setUsers] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true

    async function loadUsers() {
      setLoading(true)
      setError('')

      try {
        const response = await fetch(`${apiBaseUrl}/users/`)
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`)
        }

        const payload = await response.json()
        if (!active) return
        setUsers(getItemsFromPayload(payload))
      } catch (fetchError) {
        if (!active) return
        setError(fetchError instanceof Error ? fetchError.message : 'Unable to load users.')
      } finally {
        if (active) {
          setLoading(false)
        }
      }
    }

    void loadUsers()

    return () => {
      active = false
    }
  }, [apiBaseUrl])

  if (loading) return <p>Loading users...</p>
  if (error) return <div className="alert alert-danger">{error}</div>

  return (
    <section>
      <h2 className="h4 mb-3">Users</h2>
      <div className="table-responsive">
        <table className="table table-striped table-hover align-middle">
          <thead>
            <tr>
              <th>Username</th>
              <th>Name</th>
              <th>Email</th>
              <th>Team</th>
              <th className="text-end">Points</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id ?? user.username}>
                <td>{user.username}</td>
                <td>{user.displayName}</td>
                <td>{user.email}</td>
                <td>{user.teamName}</td>
                <td className="text-end">{user.totalPoints}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default Users
