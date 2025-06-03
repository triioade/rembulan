import Header from "../Header/Header";
import AssignmentCard from "../Assignment/AssignmentCard";
import styles from "./StudentDashboard.module.css";
import "../../App.css";
import { useEffect, useState } from "react";

function StudentDashboard({
  assignments: initialAssignments,
  upcomingTitles,
  onLogout,
}: {
  assignments: any[];
  upcomingTitles: string[];
  onLogout: () => void;
}) {
  // Tidak ada dummy, hanya assignments dari props (API/admin)
  const baseAssignments =
    Array.isArray(initialAssignments) && initialAssignments.length > 0
      ? initialAssignments
      : [];

  // Simpan hanya status completed di localStorage (mapping: { [title+deadline]: boolean })
  const [completedMap, setCompletedMap] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    // Load status completed dari localStorage
    const stored = localStorage.getItem("student_completed_map");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed && typeof parsed === "object") {
          setCompletedMap(parsed);
          return;
        }
      } catch {}
    }
    setCompletedMap({});
  }, [baseAssignments.length]); // depend on length, not object reference

  useEffect(() => {
    localStorage.setItem("student_completed_map", JSON.stringify(completedMap));
  }, [completedMap]);

  // Handler untuk toggle completed
  // Gunakan key unik (title+deadline) agar tidak bentrok jika ada tugas dengan judul sama di minggu berbeda
  const handleToggleComplete = (assignment: any) => {
    const key = assignment.title + "|" + assignment.deadline;
    setCompletedMap((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // Gabungkan status completed ke assignments yang ditampilkan
  const assignmentsWithStatus = baseAssignments.map((a) => {
    const key = a.title + "|" + a.deadline;
    return {
      ...a,
      completed: !!completedMap[key],
    };
  });

  // Hitung overview berdasarkan assignments state lokal student
  const totalCount = assignmentsWithStatus.length;
  const completedCount = assignmentsWithStatus.filter((a) => a.completed).length;
  const pendingCount = totalCount - completedCount;
  const progress =
    totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100);

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
          {/* Upcoming assignments dari admin (tanpa tombol add/hapus) */}
          <div className="upcoming-card">
            <h2 className="upcoming-title">Upcoming Assignments</h2>
            <ul className="upcoming-list">
              {upcomingTitles.length === 0 && (
                <li className="upcoming-empty">No upcoming assignments</li>
              )}
              {upcomingTitles.map((t, idx) => (
                <li key={idx} className="upcoming-item">
                  <span style={{ fontWeight: 600 }}>{t}</span>
                </li>
              ))}
            </ul>
          </div>
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
                  style={{
                    width: `${progress}%`,
                  }}
                ></div>
              </div>
              <span>{progress}%</span>
            </div>
          </div>
        </div>
        <div className={styles.rightMain}>
          <div className="assignments-grid">
            {assignmentsWithStatus.map((assignment: any, index: number) => (
              <AssignmentCard
                key={index}
                assignment={assignment}
                onToggleComplete={() => handleToggleComplete(assignment)}
              />
            ))}
          </div>
        </div>
      </div>
      <div style={{ textAlign: "center", margin: "2rem 0" }}>
        <button className="btn-add-assignment" onClick={onLogout}>
          Kembali ke Login
        </button>
      </div>
    </div>
  );
}

export default StudentDashboard;

/*
  Penjelasan bug:
  - Saat pertama kali halaman student dibuka, useEffect([]) akan set assignments ke 4 dummy (karena initialAssignments kosong).
  - Namun, jika parent (App.tsx) melakukan fetch API (misal setStudentAssignments([...])) dan mengirimkan props assignments baru (hanya 2 tugas: Fisika & Kalkulus), maka useEffect([initialAssignments]) akan jalan lagi dan assignments di-overwrite dengan data baru dari props (2 tugas).
  - Akibatnya, tampilan assignments berubah dari 4 dummy menjadi 2 tugas dari props.

  Kesimpulan:
  - Jika parent (App.tsx) mengirim assignments (props) ke StudentDashboard, maka assignments yang tampil adalah assignments dari props (misal: Fisika & Kalkulus).
  - Jika parent tidak mengirim assignments (props kosong), maka assignments yang tampil adalah 4 dummy.
  - Jika assignments dari props berubah (misal setelah fetch API), maka assignments di StudentDashboard akan ikut berubah.

  Untuk memastikan assignments student selalu konsisten:
  - assignments yang tampil = initialAssignments dari props jika ada, jika tidak pakai dummy.
  - Jika ingin assignments student selalu 4 dummy, jangan pernah set assignments dari parent.
  - Jika ingin assignments student sesuai API/admin, pastikan parent mengirim assignments yang diinginkan.
*/
