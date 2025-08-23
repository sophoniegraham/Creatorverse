import { Routes, Route, Link } from "react-router-dom"
import ListCreators from "./pages/ListCreators"
import AddCreator from "./pages/AddCreator"
import ViewCreator from "./pages/ViewCreator"
import EditCreator from "./pages/EditCreator"

export default function App() {
  return (
    <div className="container">
      <h1>
        <Link to="/">Creatorverse</Link>
      </h1>

      <nav style={{ marginBottom: "1rem" }}>
        <Link to="/">Home  </Link>

        <Link to="/creators/new">   Add Creator</Link>
      </nav>

      <Routes>
        <Route path="/" element={<ListCreators />} />
        <Route path="/creators/new" element={<AddCreator />} />
        <Route path="/creators/:name" element={<ViewCreator />} /> 
        <Route path="/creators/:name/edit" element={<EditCreator />} />
      </Routes>
    </div>
  )
}
