import { useEffect, useState } from 'react'

function getItemsFromPayload(payload) {
  if (Array.isArray(payload)) return payload
  if (Array.isArray(payload?.items)) return payload.items
  if (Array.isArray(payload?.results)) return payload.results
  if (Array.isArray(payload?.data)) return payload.data
  if (Array.isArray(payload?.docs)) return payload.docs
  return []
}

function Teams({ apiBaseUrl }) {
  const [teams, setTeams] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true

    async function loadTeams() {
      setLoading(true)
      setError('')

      try {
        const response = await fetch(`${apiBaseUrl}/teams/`)
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`)
        }

        const payload = await response.json()
        if (!active) return
        setTeams(getItemsFromPayload(payload))
      } catch (fetchError) {
        if (!active) return
        setError(fetchError instanceof Error ? fetchError.message : 'Unable to load teams.')
      } finally {
        if (active) {
          setLoading(false)
        }
      }
    }

    void loadTeams()

    return () => {
      active = false
    }
  }, [apiBaseUrl])

  if (loading) return <p>Loading teams...</p>
  if (error) return <div className="alert alert-danger">{error}</div>

  return (
    <section>
      <h2 className="h4 mb-3">Teams</h2>
      <div className="table-responsive">
        <table className="table table-striped table-hover align-middle">
          <thead>
            <tr>
              <th>Team</th>
              <th>Captain</th>
              <th className="text-end">Members</th>
              <th className="text-end">Points</th>
            </tr>
          </thead>
          <tbody>
            {teams.map((team) => (
              <tr key={team._id ?? team.name}>
                <td>{team.name}</td>
                <td>{team.captainUsername}</td>
                <td className="text-end">{team.memberCount}</td>
                <td className="text-end">{team.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default Teams
