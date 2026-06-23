import { useEffect, useState } from 'react'

function getItemsFromPayload(payload) {
  if (Array.isArray(payload)) return payload
  if (Array.isArray(payload?.items)) return payload.items
  if (Array.isArray(payload?.results)) return payload.results
  if (Array.isArray(payload?.data)) return payload.data
  if (Array.isArray(payload?.docs)) return payload.docs
  return []
}

function Activities({ apiBaseUrl }) {
  const [activities, setActivities] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
  const activitiesUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/activities/`
    : `${apiBaseUrl}/activities/`

  useEffect(() => {
    let active = true

    async function loadActivities() {
      setLoading(true)
      setError('')

      try {
        const response = await fetch(activitiesUrl)
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`)
        }

        const payload = await response.json()
        if (!active) return
        setActivities(getItemsFromPayload(payload))
      } catch (fetchError) {
        if (!active) return
        setError(fetchError instanceof Error ? fetchError.message : 'Unable to load activities.')
      } finally {
        if (active) {
          setLoading(false)
        }
      }
    }

    void loadActivities()

    return () => {
      active = false
    }
  }, [activitiesUrl])

  if (loading) return <p>Loading activities...</p>
  if (error) return <div className="alert alert-danger">{error}</div>

  return (
    <section>
      <h2 className="h4 mb-3">Activities</h2>
      <div className="table-responsive">
        <table className="table table-striped table-hover align-middle">
          <thead>
            <tr>
              <th>User</th>
              <th>Activity</th>
              <th className="text-end">Duration (min)</th>
              <th className="text-end">Calories</th>
              <th>Completed</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((activity) => (
              <tr key={activity._id ?? `${activity.username}-${activity.completedAt}`}>
                <td>{activity.username}</td>
                <td>{activity.activityType}</td>
                <td className="text-end">{activity.durationMinutes}</td>
                <td className="text-end">{activity.caloriesBurned}</td>
                <td>{activity.completedAt ? new Date(activity.completedAt).toLocaleString() : 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default Activities
