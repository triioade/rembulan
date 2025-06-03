import { useEffect, useState } from "react";
import Header from "./components/Header/Header";
import ClassSelector from "./components/ClassSelector/ClassSelector";
import AdminDashboard from "./components/AdminDashboard/AdminDashboard";
import StudentDashboard from "./components/StudentDashboard/StudentDashboard";
// import Dashboard from "./components/Dashboard/Dashboard"; // tambahkan jika ingin pakai Dashboard
import "./App.css";

// Tipe Assignment dengan status selesai
export type Assignment = {
  title: string;
  description: string;
  deadline: string;
  completed?: boolean;
};

// Fungsi helper untuk menghasilkan deadline otomatis pada Sabtu malam minggu ini
function getThisSaturdayNight(): Date {
  const now = new Date();
  const currentDay = now.getDay(); // 0 (Minggu) sampai 6 (Sabtu)
  let daysUntilSaturday = 6 - currentDay;
  // Jika sudah melewati Sabtu, gunakan Sabtu minggu berikutnya bila perlu
  if (daysUntilSaturday < 0) daysUntilSaturday = 0;
  const saturday = new Date(now);
  saturday.setDate(now.getDate() + daysUntilSaturday);
  saturday.setHours(23, 59, 59, 0);
  return saturday;
}

// Dummy assignments untuk contoh
const dummyAssignments: Assignment[] = [
  {
    title: "Kalkulus",
    description: "Forum Diskusi",
    deadline: getThisSaturdayNight().toISOString(),
    completed: false,
  },
  {
    title: "Fisika",
    description: "Forum Diskusi & Tugas Menulis",
    deadline: getThisSaturdayNight().toISOString(),
    completed: false,
  },
  {
    title: "Logika",
    description: "Forum Diskusi & Tugas Menulis",
    deadline: getThisSaturdayNight().toISOString(),
    completed: false,
  },
];

// Ganti helper cookies dengan localStorage
function saveAssignmentsToStorage(assignments: Assignment[]) {
  try {
    localStorage.setItem("assignments", JSON.stringify(assignments));
  } catch (e) {
    console.error("Failed to save assignments:", e);
  }
}
function loadAssignmentsFromStorage(): Assignment[] {
  try {
    const data = localStorage.getItem("assignments");
    if (!data) return [];
    const parsed = JSON.parse(data);
    if (Array.isArray(parsed)) return parsed;
  } catch (e) {
    console.error("Failed to load assignments:", e);
  }
  return [];
}

function App() {
  const [role, setRole] = useState<"admin" | "mahasiswa" | null>(null);
  // const [selectedClass, setSelectedClass] = useState<string | null>(null);

  // Admin state
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [newTitle, setNewTitle] = useState<string>("");
  const [newDescription, setNewDescription] = useState<string>("");

  // State khusus upcoming (judul saja)
  const [upcomingTitles, setUpcomingTitles] = useState<string[]>([
    "Fisika",
    "Math",
    "English",
  ]);
  // Student state
  const [studentAssignments, setStudentAssignments] = useState<Assignment[]>([]);
  const [studentUpcoming, setStudentUpcoming] = useState<string[]>([]);

  // Load assignments for admin (localStorage)
  useEffect(() => {
    if (role === "admin") {
      const stored = loadAssignmentsFromStorage();
      if (stored.length > 0) {
        setAssignments(stored);
      } else {
        setAssignments(dummyAssignments);
      }
    }
  }, [role]);

  // Save assignments for admin
  useEffect(() => {
    if (role === "admin") {
      saveAssignmentsToStorage(assignments);
    }
  }, [assignments, role]);

  // Simulasi fetch API untuk mahasiswa
  useEffect(() => {
    if (role === "mahasiswa") {
      // Ganti dengan fetch ke API asli jika sudah ada
      setTimeout(() => {
        setStudentAssignments([
          {
            title: "Kalkulus",
            description: "Forum Diskusi",
            deadline: getThisSaturdayNight().toISOString(),
            completed: false,
          },
          {
            title: "Fisika",
            description: "Forum Diskusi & Tugas Menulis",
            deadline: getThisSaturdayNight().toISOString(),
            completed: false,
          },
        ]);
        setStudentUpcoming([
          "Fisika",
          "Math",
          "English",
        ]);
      }, 500);
    }
  }, [role]);

  // Admin handlers
  const handleAddAssignment = () => {
    if (!newTitle.trim()) return;
    const newAssignment: Assignment = {
      title: newTitle,
      description: newDescription,
      deadline: getThisSaturdayNight().toISOString(),
      completed: false,
    };
    setAssignments([...assignments, newAssignment]);
    setNewTitle("");
    setNewDescription("");
  };

  const handleToggleComplete = (index: number) => {
    setAssignments((prev) =>
      prev.map((a, i) => (i === index ? { ...a, completed: !a.completed } : a))
    );
  };

  const handleAddUpcoming = (title: string) => {
    setUpcomingTitles([...upcomingTitles, title]);
  };

  const handleDeleteUpcoming = (idx: number) => {
    setUpcomingTitles(upcomingTitles.filter((_, i) => i !== idx));
  };

  // Overview counts
  const getCounts = (list: Assignment[]) => {
    const totalCount = list.length;
    const completedCount = list.filter((a) => a.completed).length;
    const pendingCount = totalCount - completedCount;
    const progress =
      totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100);
    return { totalCount, completedCount, pendingCount, progress };
  };

  // Routing
  if (!role) {
    return <ClassSelector onSelectRole={setRole} />;
  }

  // if (!selectedClass) {
  //   // Render komponen pemilihan kelas di sini
  //   // Setelah pilih, setSelectedClass("kelasA") misal
  //   return null;
  // }

  if (role === "admin") {
    const { totalCount, completedCount, pendingCount, progress } = getCounts(assignments);
    return (
      <AdminDashboard
        assignments={assignments}
        setAssignments={setAssignments}
        newTitle={newTitle}
        setNewTitle={setNewTitle}
        newDescription={newDescription}
        setNewDescription={setNewDescription}
        handleAddAssignment={handleAddAssignment}
        handleToggleComplete={handleToggleComplete}
        upcomingTitles={upcomingTitles}
        handleAddUpcoming={handleAddUpcoming}
        handleDeleteUpcoming={handleDeleteUpcoming}
        totalCount={totalCount}
        completedCount={completedCount}
        pendingCount={pendingCount}
        progress={progress}
      />
    );
  }

  if (role === "mahasiswa") {
    // Jangan hitung totalCount dari studentAssignments di App,
    // tapi hitung di StudentDashboard dari assignmentsWithStatus (state lokal student)
    return (
      <StudentDashboard
        assignments={studentAssignments}
        upcomingTitles={studentUpcoming}
        onLogout={() => setRole(null)}
      />
    );
  }

  // Contoh penggunaan Dashboard (misal untuk siswa per kelas, bukan admin/mahasiswa global):
  // Tambahkan routing atau kondisi untuk memanggil Dashboard jika diperlukan.
  // Contoh sederhana (hapus/comment jika tidak dipakai):
  //
  // import { useState } from "react";
  // const [selectedClass, setSelectedClass] = useState<string | null>(null);
  //
  // if (selectedClass) {
  //   return <Dashboard selectedClass={selectedClass} />;
  // }
  //
  // Atau, gunakan Dashboard di halaman lain sesuai kebutuhan aplikasi .

  return null;
}

export default App;
