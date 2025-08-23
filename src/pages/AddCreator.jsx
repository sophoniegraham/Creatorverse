import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { createCreator } from "../api/creators"

export default function AddCreator() {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [url, setUrl] = useState("")
  const [imageURL, setImageURL] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      // Must match Supabase column names exactly
      await createCreator({
        Name: name,
        description,
        url,
        imageURL,
      })
      navigate("/") // go back to the list
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div>
      <h2>Add Creator</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "1rem" }}>
          <label>
            Name:{" "}
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label>
            Description:{" "}
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </label>
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label>
            URL:{" "}
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </label>
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label>
            Image URL:{" "}
            <input
              type="text"
              value={imageURL}
              onChange={(e) => setImageURL(e.target.value)}
            />
          </label>
        </div>

        <button type="submit">Add Creator</button>
      </form>
    </div>
  )
}
