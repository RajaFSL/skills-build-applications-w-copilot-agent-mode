import { useEffect, useState } from 'react'

function getItemsFromPayload(payload) {
  if (Array.isArray(payload)) return payload
  if (Array.isArray(payload?.items)) return payload.items
  if (Array.isArray(payload?.results)) return payload.results
  if (Array.isArray(payload?.data)) return payload.data
  if (Array.isArray(payload?.docs)) return payload.docs
  return []
}

function Leaderboard({ apiBaseUrl }) {
  const [entries, setEntries] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
  const leaderboardUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/leaderboard/`
    : `${apiBaseUrl}/leaderboard/`

  useEffect(() => {
    let active = true

    async function loadLeaderboard() {
      setLoading(true)
      setError('')

      try {
        const response = await fetch(leaderboardUrl)
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`)
        }

        const payload = await response.json()
        if (!active) return
        setEntries(getItemsFromPayload(payload))
      } catch (fetchError) {
        if (!active) return
        setError(fetchError instanceof Error ? fetchError.message : 'Unable to load leaderboard.')
      } finally {
        if (active) {
          setLoading(false)
        }
      }
    }

    void loadLeaderboard()

    return () => {
      active = false
    }
  }, [leaderboardUrl])

  if (loading) return <p>Loading leaderboard...</p>
  if (error) return <div className="alert alert-danger">{error}</div>

  return (
    <section>
      <h2 className="h4 mb-3">Leaderboard</h2>
      <div className="table-responsive">
        <table className="table table-striped table-hover align-middle">
          <thead>
            <tr>
              <th className="text-end">Rank</th>
              <th>User</th>
              <th>Team</th>
              <th className="text-end">Points</th>
              <th>Week</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry) => (
              <tr key={entry._id ?? `${entry.username}-${entry.weekLabel}`}>
                <td className="text-end">{entry.rank}</td>
                <td>{entry.username}</td>
                <td>{entry.teamName}</td>
                <td className="text-end">{entry.points}</td>
                <td>{entry.weekLabel}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default Leaderboard
