import { useEffect, useState } from "react";
import { differenceInMilliseconds, parseISO } from "date-fns";
import { motion } from "framer-motion";
import "../App.css";

export type Assignment = {
  title: string;
  description: string[];
  deadline: string;
};

function Countdown({ deadline }: { deadline: string }) {
  const [timeLeft, setTimeLeft] = useState<number>(
    differenceInMilliseconds(parseISO(deadline), new Date())
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(differenceInMilliseconds(parseISO(deadline), new Date()));
    }, 1000);
    return () => clearInterval(interval);
  }, [deadline]);

  if (timeLeft <= 0)
    return <span className="deadline-passed">Deadline passed</span>;

  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  return (
    <span className="countdown">
      {days}d {hours}h {minutes}m {seconds}s left
    </span>
  );
}

function AssignmentCard({ assignment }: { assignment: Assignment }) {
  const [done, setDone] = useState(false);

  return (
    <motion.div
      className="assignment-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h2 className="card-title">{assignment.title}</h2>
      <ul className="card-desc">
        {assignment.description.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>
      <p className="card-deadline">
        <strong>Deadline:</strong> {new Date(assignment.deadline).toLocaleString()}
      </p>
      <Countdown deadline={assignment.deadline} />
      <button
        className="btn-add-assignment"
        style={{ marginTop: "1rem", backgroundColor: done ? "#16a34a" : "#3b82f6" }}
        onClick={() => setDone(!done)}
      >
        {done ? "Selesai Dikerjakan" : "Sudah Dikerjakan"}
      </button>
    </motion.div>
  );
}

function Dashboard({ selectedClass }: { selectedClass: string }) {
  const [assignments, setAssignments] = useState<Assignment[]>([]);

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        // Replace this with your actual API call
        setAssignments([
          {
            title: "Tugas 1",
            description: ["Baca materi", "Kerjakan soal A", "Upload ke LMS"],
            deadline: new Date(Date.now() + 86400000 * 2).toISOString(),
          },
          {
            title: "Tugas 2",
            description: ["Diskusi kelompok", "Jawab pertanyaan", "Presentasi"],
            deadline: new Date(Date.now() + 86400000 * 4).toISOString(),
          },
          {
            title: "Tugas 3",
            description: ["Analisa kasus", "Tulis laporan", "Kumpulkan PDF"],
            deadline: new Date(Date.now() + 86400000 * 6).toISOString(),
          },
        ]);
      } catch (err) {
        console.error("Error fetching assignments", err);
      }
    };

    fetchAssignments();
  }, [selectedClass]);

  return (
    <div className="container">
      <h1 className="main-title">Tugas untuk Kelas: {selectedClass}</h1>
      <div className="assignments-grid">
        {assignments.map((assignment, idx) => (
          <AssignmentCard key={idx} assignment={assignment} />
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
