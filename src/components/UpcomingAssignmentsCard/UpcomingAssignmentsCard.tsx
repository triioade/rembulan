import { useState } from "react";
import "../../App.css";

function UpcomingAssignmentsCard({
  upcomingTitles,
  onAddUpcoming,
  onDeleteUpcoming,
}: {
  upcomingTitles: string[];
  onAddUpcoming: (title: string) => void;
  onDeleteUpcoming: (index: number) => void;
}) {
  const [showInput, setShowInput] = useState(false);
  const [title, setTitle] = useState("");

  return (
    <div className="upcoming-card">
      <h2 className="upcoming-title">Upcoming Assignments</h2>
      <ul className="upcoming-list">
        {upcomingTitles.length === 0 && (
          <li className="upcoming-empty">No upcoming assignments</li>
        )}
        {upcomingTitles.map((t, idx) => (
          <li
            key={idx}
            className="upcoming-item"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span style={{ fontWeight: 600 }}>{t}</span>
            <button
              className="btn-delete-upcoming"
              onClick={() => onDeleteUpcoming(idx)}
              title="Hapus"
            >
              Hapus
            </button>
          </li>
        ))}
      </ul>
      {showInput ? (
        <form
          style={{ marginTop: 12, display: "flex", gap: 8 }}
          onSubmit={(e) => {
            e.preventDefault();
            if (!title.trim()) return;
            onAddUpcoming(title.trim());
            setTitle("");
            setShowInput(false);
          }}
        >
          <input
            type="text"
            placeholder="Judul tugas"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input-text"
            style={{ flex: 1 }}
            autoFocus
          />
          <button
            type="submit"
            className="btn-add-assignment"
            style={{ padding: "0.5rem 1rem" }}
          >
            Add
          </button>
          <button
            type="button"
            className="btn-delete-upcoming"
            style={{ padding: "0.5rem 1rem" }}
            onClick={() => setShowInput(false)}
          >
            Batal
          </button>
        </form>
      ) : (
        <button
          className="btn-add-assignment"
          style={{ marginTop: 12, width: "100%" }}
          onClick={() => setShowInput(true)}
        >
          Tambah Upcoming
        </button>
      )}
    </div>
  );
}

export default UpcomingAssignmentsCard;
