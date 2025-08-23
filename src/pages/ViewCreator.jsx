import { useEffect, useState } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import { getCreator, deleteCreator } from "../api/creators"

export default function ViewCreator() {
  const { name } = useParams()
  const navigate = useNavigate()

  const [creator, setCreator] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    async function load() {
      try {
        const data = await getCreator(name)
        if (data) setCreator(data)
        else setError("Creator not found")
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [name])

  async function handleDelete() {
    if (!window.confirm("Are you sure you want to delete this creator?")) return

    try {
      await deleteCreator(name)
      navigate("/") // go back to list after delete
    } catch (err) {
      setError(err.message)
    }
  }

  if (loading) return <p>Loading...</p>
  if (error) return <p style={{ color: "red" }}>{error}</p>

  return (
    <div>
      <h2>{creator.Name}</h2>
      <p>{creator.description}</p>
      {creator.url && (
        <p>
          🌐 <a href={creator.url} target="_blank" rel="noreferrer">{creator.url}</a>
        </p>
      )}
      {creator.imageURL && <img src={creator.imageURL} alt={creator.Name} width="200" />}

      <p>
        <Link to={`/creators/${encodeURIComponent(creator.Name)}/edit`}>✏️ Edit</Link>
        {" | "}
        <button onClick={handleDelete} style={{ color: "red" }}>
          🗑️ Delete
        </button>
      </p>
    </div>
  )
}
