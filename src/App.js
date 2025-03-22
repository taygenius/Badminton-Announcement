import React from 'react';
import BadmintonAnnouncement from './components/BadmintonAnnouncement';

function App() {
  return (
    <div className="App min-h-screen py-8 bg-gradient-to-b from-blue-50 to-blue-100">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-blue-800">Badminton Announcement Creator</h1>
        <p className="text-gray-600">Create and share badminton game announcements easily</p>
      </header>
      <BadmintonAnnouncement />
      <footer className="mt-12 text-center text-gray-500 text-sm">
        <p>&copy; {new Date().getFullYear()} Badminton Announcement Creator</p>
      </footer>
    </div>
  );
}

export default App;
