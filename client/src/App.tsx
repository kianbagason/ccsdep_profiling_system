import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import StudentList from './pages/StudentList';
import AddStudent from './pages/AddStudent';
import EditStudent from './pages/EditStudent';
import FacultyList from './pages/FacultyList';
import AddFaculty from './pages/AddFaculty';
import EditFaculty from './pages/EditFaculty';
import AddEvent from './pages/AddEvent';
import EditEvent from './pages/EditEvent';
import AddSchedule from './pages/AddSchedule';
import EditSchedule from './pages/EditSchedule';
import AddInstruction from './pages/AddInstruction';
import EditInstruction from './pages/EditInstruction';
import InstructionList from './pages/InstructionList';
import ScheduleList from './pages/ScheduleList';
import EventList from './pages/EventList';
import QuerySystem from './pages/QuerySystem';
import Settings from './pages/Settings';

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
