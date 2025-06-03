import Header from "../Header/Header";
import AssignmentCard from "../Assignment/AssignmentCard";
import UpcomingAssignmentsCard from "../UpcomingAssignmentsCard/UpcomingAssignmentsCard";
import styles from "./AdminDashboard.module.css";
import "../../App.css";

function AdminDashboard({
  assignments,
  newTitle,
  setNewTitle,
  newDescription,
  setNewDescription,
  handleAddAssignment,
  handleToggleComplete,
  upcomingTitles,
  handleAddUpcoming,
  handleDeleteUpcoming,
  totalCount,
  completedCount,
  pendingCount,
  progress,
}: any) {
  return (
    <div className={styles.app}>
      <Header />
      <div className="jumbotron">
        <div className="jumbotron-overlay"></div>
        <img src="/images/rembulan.png" alt="Icon" className="jumbotron-icon" />
        <div className="jumbotron-content">
          <h1 className="jumbotron-title">Homework Dashboard</h1>
        </div>
      </div>
      <div className="container two-column">
        <div className={styles.leftOverview}>
          <div style={{ marginBottom: "1.5rem" }}>
            <h2
              style={{
                fontSize: "1.35rem",
                fontWeight: 700,
                color: "#2563eb",
                marginBottom: 4,
              }}
            >
              Quick Overview
            </h2>
            <div style={{ color: "#6b7280", fontSize: "0.97rem" }}>
             A Snapshot of your assignments and progress this week
            </div>
          </div>
          <UpcomingAssignmentsCard
            upcomingTitles={upcomingTitles}
            onAddUpcoming={handleAddUpcoming}
            onDeleteUpcoming={handleDeleteUpcoming}
          />
          <div className="overview-card">
            <h2 className="overview-title">Overview</h2>
            <div className="overview-item">
              <span>Tugas Tersedia</span>
              <span>{totalCount}</span>
            </div>
            <div className="overview-item">
              <span>Tugas Selesai</span>
              <span>{completedCount}</span>
            </div>
            <div className="overview-item">
              <span>Tugas Pending</span>
              <span>{pendingCount}</span>
            </div>
            <div className="overview-progress">
              <span>Progress</span>
              <div className="progress-bar-bg">
                <div
                  className="progress-bar-fill"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <span>{progress}%</span>
            </div>
          </div>
        </div>
        <div className={styles.rightMain}>
          <div style={{ 
            marginBottom: "1.5rem", 
            marginTop: "1.5rem" 
          }}>
            <h2
              style={{
                fontSize: "1.35rem",
                fontWeight: 700,
                color: "#2563eb",
                marginBottom: 4,
              }}
            >
              All Asignment
            </h2>
            <div style={{ color: "#6b7280", fontSize: "0.97rem" }}>
              A Compeherensive list of all assignments this week including their status
            </div>
          </div>
          <div className="assignment-input">
            <h2 className="input-title">Add New Assignment</h2>
            <div className="input-group">
              <input
                type="text"
                placeholder="Title"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="input-text"
              />
              <textarea
                placeholder="Description"
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                rows={3}
                className="input-textarea"
              />
            </div>
            <button
              onClick={handleAddAssignment}
              className="btn-add-assignment"
            >
              Add Assignment
            </button>
          </div>
          <div className="assignments-grid">
            {assignments.map((assignment: any, index: number) => (
              <AssignmentCard
                key={index}
                assignment={assignment}
                onToggleComplete={() => handleToggleComplete(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
