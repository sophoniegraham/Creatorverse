import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { listCreators } from "../api/creators"

export default function ListCreators() {
  const [creators, setCreators] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    async function load() {
      try {
        const data = await listCreators()
        setCreators(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  if (loading) return <p>Loading creators...</p>
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>

  return (
    <div>
      <h2>All Creators</h2>
      {creators.length === 0 ? (
        <p>No creators found.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {creators.map((c) => (
            <li
              key={c.Name}
              style={{
                border: "1px solid #ddd",
                padding: "1rem",
                marginBottom: "1rem",
                borderRadius: "8px",
              }}
            >
              <h3>{c.Name}</h3>
              <p>{c.description}</p>

              {c.url && (
                <p>
                  🌐 <a href={c.url} target="_blank" rel="noreferrer">{c.url}</a>
                </p>
              )}

              {c.imageURL && (
                <img
                  src={c.imageURL}
                  alt={c.Name}
                  style={{ maxWidth: "150px", borderRadius: "8px" }}
                />
              )}

              <p>
                <Link to={`/creators/${encodeURIComponent(c.Name)}`}>View</Link> |{" "}
                <Link to={`/creators/${encodeURIComponent(c.Name)}/edit`}>Edit</Link>
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
