const calculateMood = (createdAt) => {
    const now = new Date();
    const createdDate = new Date(createdAt);
    const diffInHours = (now - createdDate) / (1000 * 60 * 60);
    
    if (diffInHours < 24) {
      return 'Happy';
    } else if (diffInHours >= 24 && diffInHours < 72) {
      return 'Excited';
    } else {
      return 'Sad';
    }
  };
  
  module.exports = { calculateMood };