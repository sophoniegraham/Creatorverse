import { Link } from "react-router-dom";
import styles from "./CreatorCard.module.css";

export default function CreatorCard({ creator }) {
  return (
    <div className={styles.creatorCard}>
      <img
        src={creator.imageURL || "https://via.placeholder.com/150"}
        alt={creator.name}
        className={styles.creatorImage}
      />
      <div className={styles.creatorInfo}>
        <h3>{creator.name}</h3>
        <p>{creator.description}</p>

        {creator.url && (
          <a
            href={creator.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            🌐 Visit Channel
          </a>
        )}

        <div className={styles.cardActions}>
          <Link to={`/creators/${encodeURIComponent(creator.name)}`}>
            👀 View
          </Link>
          <Link to={`/creators/${encodeURIComponent(creator.name)}/edit`}>
            ✏️ Edit
          </Link>
        </div>
      </div>
    </div>
  );
}

