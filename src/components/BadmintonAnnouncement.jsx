import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Copy, AlertCircle } from 'lucide-react';

// Simple card components since shadcn/ui components might not be available
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

const Alert = ({ children }) => (
  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">{children}</div>
);

const AlertDescription = ({ children }) => (
  <p className="text-sm text-yellow-700">{children}</p>
);

const BadmintonAnnouncement = () => {
  const [formData, setFormData] = useState({
    location: 'Brentford Leisure Centre, Chiswick',
    courts: 2,
    players: 10,
    date: '',
    time: '',
    price: '10',
    level: 'Intermediate and above',
    racketpalLink: '',
    messageType: 'whatsapp',
  });

  const [errors, setErrors] = useState({});
  const [showMessage, setShowMessage] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const locations = [
    'Brentford Leisure Centre, Chiswick',
    'Reynolds Leisure Center'
  ];

  const levels = [
    'Beginner',
    'Intermediate',
    'Advanced',
    'Intermediate and above'
  ];

  useEffect(() => {
    // Set default date to next Wednesday or Saturday
    const today = new Date();
    const currentDay = today.getDay(); // 0 is Sunday, 3 is Wednesday, 6 is Saturday
    
    let daysUntilWednesday = (3 - currentDay + 7) % 7;
    let daysUntilSaturday = (6 - currentDay + 7) % 7;
    
    // If today is Wednesday, set to next Wednesday
    if (daysUntilWednesday === 0) daysUntilWednesday = 7;
    
    // If today is Saturday, set to next Saturday
    if (daysUntilSaturday === 0) daysUntilSaturday = 7;
    
    const nextDate = new Date(today);
    let defaultTime = '';
    
    if (daysUntilWednesday <= daysUntilSaturday) {
      // Next Wednesday is sooner
      nextDate.setDate(today.getDate() + daysUntilWednesday);
      defaultTime = '20:00';
    } else {
      // Next Saturday is sooner
      nextDate.setDate(today.getDate() + daysUntilSaturday);
      defaultTime = '12:00';
    }
    
    const formattedDate = nextDate.toISOString().split('T')[0];
    
    setFormData(prev => ({
      ...prev,
      date: formattedDate,
      time: defaultTime
    }));
  }, []);

  useEffect(() => {
    // Update players count when courts change
    setFormData(prev => ({
      ...prev,
      players: prev.courts === 1 ? 6 : prev.courts * 5
    }));
  }, [formData.courts]);

  useEffect(() => {
    // Auto-update time based on date selection
    if (formData.date) {
      const selectedDate = new Date(formData.date);
      const dayOfWeek = selectedDate.getDay();
      
      if (dayOfWeek === 3) { // Wednesday
        setFormData(prev => ({ ...prev, time: '20:00' }));
      } else if (dayOfWeek === 6) { // Saturday
        setFormData(prev => ({ ...prev, time: '12:00' }));
      }
    }
  }, [formData.date]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.location) newErrors.location = 'Location is required';
    if (!formData.date) newErrors.date = 'Date is required';
    if (!formData.time) newErrors.time = 'Time is required';
    if (!formData.price) newErrors.price = 'Price is required';
    if (!formData.level) newErrors.level = 'Skill level is required';
    if (!formData.racketpalLink) newErrors.racketpalLink = 'RacketPal link is required';
    
    setErrors(newErrors);
    const isValid = Object.keys(newErrors).length === 0;
    setShowMessage(isValid);
    return isValid;
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Check if all fields are filled after this change
    setTimeout(() => {
      const newFormData = {...formData, [field]: value};
      const newErrors = {};
      
      if (!newFormData.location) newErrors.location = 'Location is required';
      if (!newFormData.date) newErrors.date = 'Date is required';
      if (!newFormData.time) newErrors.time = 'Time is required';
      if (!newFormData.price) newErrors.price = 'Price is required';
      if (!newFormData.level) newErrors.level = 'Skill level is required';
      if (!newFormData.racketpalLink) newErrors.racketpalLink = 'RacketPal link is required';
      
      setErrors(newErrors);
      setShowMessage(Object.keys(newErrors).length === 0);
    }, 0);
  };

  const generateWhatsAppMessage = () => {
    if (!formData.date || !formData.time) return '';
    
    const dateObj = new Date(formData.date);
    const day = dateObj.toLocaleDateString('en-US', { weekday: 'long' });
    const formattedDate = dateObj.toLocaleDateString('en-GB', { day: 'numeric', month: 'numeric', year: 'numeric' });
    
    const [hours, minutes] = formData.time.split(':');
    const startTime = `${hours}:${minutes}`;
    const endHours = (parseInt(hours) + 2).toString().padStart(2, '0');
    const endTime = `${endHours}:${minutes}`;
    
    return `Hello Everyone,
We are playing on ${day} ${formattedDate} at the ${formData.location} from ${startTime} to ${endTime}

🏸 No. Courts: ${formData.courts}
👥 Players: ${formData.players}

If anyone would like to play, please confirm using the link below 😊

${formData.racketpalLink}`;
  };

  const generateRacketpalMessage = () => {
    if (!formData.date || !formData.time) return '';
    
    const dateObj = new Date(formData.date);
    const day = dateObj.toLocaleDateString('en-US', { weekday: 'long' });
    const formattedDate = dateObj.toLocaleDateString('en-GB', { day: 'numeric', month: 'numeric', year: 'numeric' });
    
    const [hours, minutes] = formData.time.split(':');
    const startTime = `${hours}:${minutes}`;
    const endHours = (parseInt(hours) + 2).toString().padStart(2, '0');
    const endTime = `${endHours}:${minutes}`;
    
    return `Hello Everyone,
We are playing a badminton game on ${day} ${formattedDate} at the ${formData.location} from ${startTime} to ${endTime}

⏱️ 2 Hours | £${formData.price}
🏸 No. Court: ${formData.courts}
👥 Players: ${formData.players}
🪶 Feather shuttles
⚡ ${formData.level}

If anyone would like to play, please confirm using the link below 😊

${formData.racketpalLink}`;
  };

  const getMessage = () => {
    return formData.messageType === 'whatsapp' 
      ? generateWhatsAppMessage() 
      : generateRacketpalMessage();
  };

  const copyToClipboard = () => {
    if (validateForm()) {
      navigator.clipboard.writeText(getMessage());
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Create Badminton Game Announcement</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Message Type */}
          <div>
            <label className="block text-sm font-medium mb-1">Message Format</label>
            <div className="flex gap-4">
              <button 
                className={`px-4 py-2 rounded flex items-center gap-2 ${
                  formData.messageType === 'whatsapp' 
                    ? 'bg-green-600 text-white' 
                    : 'bg-gray-200 text-gray-700'
                }`}
                onClick={() => handleChange('messageType', 'whatsapp')}
              >
                WhatsApp
              </button>
              <button 
                className={`px-4 py-2 rounded flex items-center gap-2 ${
                  formData.messageType === 'racketpal' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-700'
                }`}
                onClick={() => handleChange('messageType', 'racketpal')}
              >
                RacketPal
              </button>
            </div>
          </div>

          {/* Location Selection */}
          <div>
            <label className="block text-sm font-medium mb-1">Location</label>
            <select 
              className={`w-full p-2 border rounded ${errors.location ? 'border-red-500' : ''}`}
              value={formData.location}
              onChange={(e) => handleChange('location', e.target.value)}
            >
              {locations.map(loc => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>
            {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location}</p>}
          </div>

          {/* Date and Time */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1 flex items-center gap-2">
                <Calendar className="w-4 h-4" /> Date
              </label>
              <input 
                type="date" 
                className={`w-full p-2 border rounded ${errors.date ? 'border-red-500' : ''}`}
                value={formData.date}
                onChange={(e) => handleChange('date', e.target.value)}
              />
              {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 flex items-center gap-2">
                <Clock className="w-4 h-4" /> Start Time
              </label>
              <input 
                type="time" 
                className={`w-full p-2 border rounded ${errors.time ? 'border-red-500' : ''}`}
                value={formData.time}
                onChange={(e) => handleChange('time', e.target.value)}
              />
              {errors.time && <p className="text-red-500 text-xs mt-1">{errors.time}</p>}
            </div>
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
                onChange={(e) => handleChange('courts', parseInt(e.target.value))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Number of Players</label>
              <input 
                type="number"
                className="w-full p-2 border rounded"
                value={formData.players}
                onChange={(e) => handleChange('players', parseInt(e.target.value))}
              />
              <p className="text-xs text-gray-500">Auto-updates based on courts</p>
            </div>
          </div>

          {/* Price and Skill Level */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Price (£)</label>
              <input 
                type="number" 
                className={`w-full p-2 border rounded ${errors.price ? 'border-red-500' : ''}`}
                value={formData.price}
                onChange={(e) => handleChange('price', e.target.value)}
              />
              {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Skill Level</label>
              <select 
                className={`w-full p-2 border rounded ${errors.level ? 'border-red-500' : ''}`}
                value={formData.level}
                onChange={(e) => handleChange('level', e.target.value)}
              >
                {levels.map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
              {errors.level && <p className="text-red-500 text-xs mt-1">{errors.level}</p>}
            </div>
          </div>

          {/* RacketPal Link */}
          <div>
            <label className="block text-sm font-medium mb-1">RacketPal Link</label>
            <input 
              type="url" 
              className={`w-full p-2 border rounded ${errors.racketpalLink ? 'border-red-500' : ''}`}
              placeholder="https://www.racketpal.co.uk/matches?id=..."
              value={formData.racketpalLink}
              onChange={(e) => handleChange('racketpalLink', e.target.value)}
            />
            {errors.racketpalLink && <p className="text-red-500 text-xs mt-1">{errors.racketpalLink}</p>}
          </div>

          {/* Generated Message */}
          <div className={`mt-6 ${showMessage ? 'block' : 'hidden'}`}>
            <h3 className="text-lg font-medium mb-2">Generated Message</h3>
            <div className="bg-gray-50 p-4 rounded whitespace-pre-wrap font-mono text-sm">
              {getMessage()}
            </div>
            <button 
              className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
              onClick={copyToClipboard}
            >
              <Copy className="w-4 h-4" /> Copy to Clipboard
            </button>
          </div>

          {/* Toast Notification */}
          {showToast && (
            <div className="fixed bottom-4 right-4 bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded shadow-md">
              Message copied to clipboard! ✅
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default BadmintonAnnouncement;