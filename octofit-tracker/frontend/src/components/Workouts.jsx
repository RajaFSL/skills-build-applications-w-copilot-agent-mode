import { useEffect, useState } from 'react'

function getItemsFromPayload(payload) {
  if (Array.isArray(payload)) return payload
  if (Array.isArray(payload?.items)) return payload.items
  if (Array.isArray(payload?.results)) return payload.results
  if (Array.isArray(payload?.data)) return payload.data
  if (Array.isArray(payload?.docs)) return payload.docs
  return []
}

function Workouts({ apiBaseUrl }) {
  const [workouts, setWorkouts] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true

    async function loadWorkouts() {
      setLoading(true)
      setError('')

      try {
        const response = await fetch(`${apiBaseUrl}/workouts/`)
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`)
        }

        const payload = await response.json()
        if (!active) return
        setWorkouts(getItemsFromPayload(payload))
      } catch (fetchError) {
        if (!active) return
        setError(fetchError instanceof Error ? fetchError.message : 'Unable to load workouts.')
      } finally {
        if (active) {
          setLoading(false)
        }
      }
    }

    void loadWorkouts()

    return () => {
      active = false
    }
  }, [apiBaseUrl])

  if (loading) return <p>Loading workouts...</p>
  if (error) return <div className="alert alert-danger">{error}</div>

  return (
    <section>
      <h2 className="h4 mb-3">Workouts</h2>
      <div className="table-responsive">
        <table className="table table-striped table-hover align-middle">
          <thead>
            <tr>
              <th>Title</th>
              <th>Target Area</th>
              <th>Intensity</th>
              <th>Difficulty</th>
              <th className="text-end">Duration (min)</th>
            </tr>
          </thead>
          <tbody>
            {workouts.map((workout) => (
              <tr key={workout._id ?? workout.title}>
                <td>{workout.title}</td>
                <td>{workout.targetArea}</td>
                <td>{workout.intensity}</td>
                <td>{workout.difficulty}</td>
                <td className="text-end">{workout.durationMinutes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default Workouts
