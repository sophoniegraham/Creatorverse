import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { getCreator, updateCreator } from "../api/creators"

export default function EditCreator() {
  const { Name } = useParams()   // URL param (original Name)
  const navigate = useNavigate()

  const [form, setForm] = useState({
    Name: "",
    description: "",
    url: "",
    imageURL: ""
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  // Load existing creator data
  useEffect(() => {
    async function load() {
      try {
        const data = await getCreator(Name)
        if (data) setForm(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [Name])

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError("")
    setSuccess("")

    try {
      await updateCreator(Name, form)   // send updated data
      setSuccess("Creator updated successfully ✅")
      setTimeout(() => navigate(`/creators/${encodeURIComponent(form.Name)}`), 1200) // redirect after save
    } catch (err) {
      setError(err.message)
    }
  }

  if (loading) return <p>Loading...</p>

  return (
    <div>
      <h2>Edit Creator</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Name:{" "}
            <input
              type="text"
              name="Name"
              value={form.Name}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Description:{" "}
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Website URL:{" "}
            <input
              type="url"
              name="url"
              value={form.url || ""}
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <label>
            Image URL:{" "}
            <input
              type="url"
              name="imageURL"
              value={form.imageURL || ""}
              onChange={handleChange}
            />
          </label>
        </div>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  )
}
