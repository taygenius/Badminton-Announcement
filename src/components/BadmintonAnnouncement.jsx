import React, { useState, useEffect } from 'react';
import { Calendar, Clock } from 'lucide-react';

const Card = ({ children }) => (
  <div className="bg-white shadow-md rounded-lg overflow-hidden">{children}</div>
);

const CardHeader = ({ children }) => (
  <div className="px-6 py-4 border-b border-gray-200">{children}</div>
);

const CardTitle = ({ children }) => (
  <h2 className="text-2xl font-bold">{children}</h2>
);

const CardContent = ({ children }) => (
  <div className="p-6 space-y-4">{children}</div>
);

const BadmintonAnnouncement = () => {
  const [formData, setFormData] = useState({
    location: 'Brentford Leisure Centre, Chiswick',
    courts: 2,
    players: 10,
    date: '',
    time: '20:00',
    duration: 2,
    racketpalLink: '',
    price: 10,
    shuttleType: 'Feather',
    gameLevel: 'Intermediate',
  });

  const locations = [
    'Brentford Leisure Centre, Chiswick',
    'Reynolds Leisure Center'
  ];

  useEffect(() => {
    // Update players count when courts change
    setFormData(prev => ({
      ...prev,
      players: prev.courts * 5
    }));
  }, [formData.courts]);

  const generateMessage = () => {
    const dateObj = new Date(formData.date);
    const day = dateObj.toLocaleDateString('en-US', { weekday: 'long' });
    
    const [hours, minutes] = formData.time.split(':');
    const startTime = `${hours}:${minutes}`;
    const endTime = `${(parseInt(hours) + formData.duration).toString().padStart(2, '0')}:${minutes}`;
    
    return `Hello Everyone, We are playing on ${day} at the ${formData.location} from *${startTime} to ${endTime}*

${day} | ${formData.duration} hours | £${formData.price}
${formData.courts} Court${formData.courts > 1 ? 's' : ''} | ${formData.players} Players
${formData.shuttleType} shuttles
${formData.gameLevel}
Badminton game

If anyone would like to play please confirm using the link below 😊 

${formData.racketpalLink}`;
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      <Card>
        <CardHeader>
          <CardTitle>Create Badminton Game Announcement</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Location Selection */}
          <div>
            <label className="block text-sm font-medium mb-1">Location</label>
            <select 
              className="w-full p-2 border rounded"
              value={formData.location}
              onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
            >
              {locations.map(loc => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>
          </div>

          {/* Courts and Players */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Number of Courts</label>
              <input 
                type="number" 
                min="1"
                max="4"
                className="w-full p-2 border rounded"
                value={formData.courts}
                onChange={(e) => setFormData(prev => ({ ...prev, courts: parseInt(e.target.value) }))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Number of Players</label>
              <input 
                type="number"
                className="w-full p-2 border rounded"
                value={formData.players}
                onChange={(e) => setFormData(prev => ({ ...prev, players: parseInt(e.target.value) }))}
              />
            </div>
          </div>

          {/* Date and Time */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1 flex items-center gap-2">
                <Calendar className="w-4 h-4" /> Date
              </label>
              <input 
                type="date" 
                className="w-full p-2 border rounded"
                value={formData.date}
                onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 flex items-center gap-2">
                <Clock className="w-4 h-4" /> Start Time
              </label>
              <input 
                type="time" 
                className="w-full p-2 border rounded"
                value={formData.time}
                onChange={(e) => setFormData(prev => ({ ...prev, time: e.target.value }))}
              />
            </div>
          </div>

          {/* Additional Details */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Price (£)</label>
              <input 
                type="number" 
                className="w-full p-2 border rounded"
                value={formData.price}
                onChange={(e) => setFormData(prev => ({ ...prev, price: parseInt(e.target.value) }))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Shuttle Type</label>
              <select 
                className="w-full p-2 border rounded"
                value={formData.shuttleType}
                onChange={(e) => setFormData(prev => ({ ...prev, shuttleType: e.target.value }))}
              >
                <option value="Feather">Feather</option>
                <option value="Plastic">Plastic</option>
                <option value="Nylon">Nylon</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Game Level</label>
              <select 
                className="w-full p-2 border rounded"
                value={formData.gameLevel}
                onChange={(e) => setFormData(prev => ({ ...prev, gameLevel: e.target.value }))}
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Intermediate, Upper Intermediate">Intermediate, Upper Intermediate</option>
                <option value="Advanced">Advanced</option>
                <option value="All Levels">All Levels</option>
              </select>
            </div>
          </div>

          {/* RacketPal Link */}
          <div>
            <label className="block text-sm font-medium mb-1">RacketPal Link</label>
            <input 
              type="url" 
              className="w-full p-2 border rounded"
              placeholder="https://www.racketpal.co.uk/matches?id=..."
              value={formData.racketpalLink}
              onChange={(e) => setFormData(prev => ({ ...prev, racketpalLink: e.target.value }))}
            />
          </div>

          {/* Generated Message */}
          <div className="mt-6">
            <h3 className="text-lg font-medium mb-2">Generated Message</h3>
            <div className="bg-gray-50 p-4 rounded whitespace-pre-wrap font-mono text-sm">
              {generateMessage()}
            </div>
          </div>

          {/* Copy Button */}
          <button 
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
            onClick={() => navigator.clipboard.writeText(generateMessage())}
          >
            Copy to Clipboard
          </button>
        </CardContent>
      </Card>
    </div>
  );
};

export default BadmintonAnnouncement;