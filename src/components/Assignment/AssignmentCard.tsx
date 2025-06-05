import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { differenceInMilliseconds, parseISO } from "date-fns";
import type { Assignment } from "../../App";
import styles from "./AssignmentCard.module.css"; // pastikan file ini ada

// Gabungkan Countdown ke dalam AssignmentCard
function AssignmentCard({
  assignment,
  onToggleComplete,
  onDeleteAssignment,
    isAdmin, // Tambahkan isAdmin

}: {
  assignment: Assignment;
  onToggleComplete: () => void;
  onDeleteAssignment: () => void;
    isAdmin?: boolean;
}) {
  // Countdown logic
  const [timeLeft, setTimeLeft] = useState<number>(
    differenceInMilliseconds(parseISO(assignment.deadline), new Date())
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(
        differenceInMilliseconds(parseISO(assignment.deadline), new Date())
      );
    }, 1000);
    return () => clearInterval(interval);
  }, [assignment.deadline]);

  return (
    <motion.div
      className={`${styles.assignmentCard}${
        assignment.completed ? " " + styles.completed : ""
      }`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h2 className={styles.cardTitle}>{assignment.title}</h2>
      <p className={styles.cardDesc}>{assignment.description}</p>
      <p className={styles.cardDeadline}>
        <strong>Deadline:</strong>{" "}
        {new Date(assignment.deadline).toLocaleString()}
      </p>
      {/* Countdown */}
      {timeLeft <= 0 ? (
        <span className={styles.deadlinePassed}>Deadline passed</span>
      ) : (
        <span className={styles.countdown}>
          {Math.floor(timeLeft / (1000 * 60 * 60 * 24))} days{" "}
          {Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))} hours{" "}
          {Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60))} minutes{" "}
          {Math.floor((timeLeft % (1000 * 60)) / 1000)} seconds left
        </span>
      )}
 {isAdmin && onDeleteAssignment && (
  <button className={styles.btnDelete} onClick={onDeleteAssignment}>
    Hapus
  </button>
)}


      <button
        className={`${styles.btnComplete}${
          assignment.completed ? " " + styles.done : ""
        }`}
        onClick={onToggleComplete}
      >
        {assignment.completed ? "Mark as Pending" : "Mark as Completed"}
      </button>
    </motion.div>
  );
}

export default AssignmentCard;
