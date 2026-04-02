import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar.tsx';
import Dashboard from './pages/Dashboard.tsx';
import StudentList from './pages/StudentList.tsx';
import AddStudent from './pages/AddStudent.tsx';
import EditStudent from './pages/EditStudent.tsx';
import FacultyList from './pages/FacultyList.tsx';
import AddFaculty from './pages/AddFaculty.tsx';
import EditFaculty from './pages/EditFaculty.tsx';
import AddEvent from './pages/AddEvent.tsx';
import EditEvent from './pages/EditEvent.tsx';
import AddSchedule from './pages/AddSchedule.tsx';
import EditSchedule from './pages/EditSchedule.tsx';
import AddInstruction from './pages/AddInstruction.tsx';
import EditInstruction from './pages/EditInstruction.tsx';
import InstructionList from './pages/InstructionList.tsx';
import ScheduleList from './pages/ScheduleList.tsx';
import EventList from './pages/EventList.tsx';
import QuerySystem from './pages/QuerySystem.tsx';
import Settings from './pages/Settings.tsx';

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
            <Route path="/students/edit/:id" element={<EditStudent />} />
            <Route path="/faculty" element={<FacultyList />} />
            <Route path="/faculty/add" element={<AddFaculty />} />
            <Route path="/faculty/edit/:id" element={<EditFaculty />} />
            <Route path="/events" element={<EventList />} />
            <Route path="/events/add" element={<AddEvent />} />
            <Route path="/events/edit/:id" element={<EditEvent />} />
            <Route path="/schedule" element={<ScheduleList />} />
            <Route path="/schedule/add" element={<AddSchedule />} />
            <Route path="/schedule/edit/:id" element={<EditSchedule />} />
            <Route path="/instruction" element={<InstructionList />} />
            <Route path="/instruction/add" element={<AddInstruction />} />
            <Route path="/instruction/edit/:id" element={<EditInstruction />} />
            <Route path="/query" element={<QuerySystem />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
