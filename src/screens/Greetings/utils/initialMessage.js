import meetingTips from '../components/icons/meeting-tips.png';
import bookMeeting from '../components/icons/book-meeting.png';
import shareFeedback from '../components/icons/share-feedback.png';
import roomDirections from '../components/icons/room-directions.png';
import scheduleMeeting from '../components/icons/schedule-meeting.png';

const options = [
  {
    itemDescription: 'Schedule a Meeting',
    itemColor: 'rgba(239,243,251,1)',
    itemIcon: scheduleMeeting,
    textColor: 'rgba(77,128,209,1)'
  },
  {
    itemDescription: 'Get Room Directions',
    itemColor: 'rgba(251,245,241,1)',
    textColor: 'rgba(208,152,68,1)',
    itemIcon: roomDirections
  },
  {
    itemDescription: 'Share some Feedback',
    itemColor: 'rgba(239,250,236,1)',
    textColor: 'rgba(78,191,86,1)',
    itemIcon: shareFeedback
  },
  {
    itemDescription: 'View Meeting Tips',
    itemColor: 'rgba(250,244,252,1)',
    textColor: 'rgba(178,97,208,1)',
    itemIcon: meetingTips
  },
  {
    itemDescription: 'Book an Instant Meeting Room',
    itemColor: 'rgba(250,240,240,1)',
    textColor: 'rgba(210,115,115,1)',
    itemIcon: bookMeeting
  }
];

export default (name = 'Ebun') => {
  const message = `Welcome to the Converge Companion App. 
  What would you like to do?`;
  const text = {
    title: `Hi ${name}, ${message}`,
    options
  };
  return text;
};
