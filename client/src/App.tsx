import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar.tsx';
import Dashboard from './pages/Dashboard.tsx';
import StudentList from './pages/StudentList.tsx';
import AddStudent from './pages/AddStudent.tsx';
import FacultyList from './pages/FacultyList.tsx';
import InstructionList from './pages/InstructionList.tsx';
import ScheduleList from './pages/ScheduleList.tsx';
import EventList from './pages/EventList.tsx';
import QuerySystem from './pages/QuerySystem.tsx';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <Router>
      <div className="app-container">
        <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/students" element={<StudentList />} />
            <Route path="/students/add" element={<AddStudent />} />
            <Route path="/faculty" element={<FacultyList />} />
            <Route path="/instruction" element={<InstructionList />} />
            <Route path="/schedule" element={<ScheduleList />} />
            <Route path="/events" element={<EventList />} />
            <Route path="/query" element={<QuerySystem />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
