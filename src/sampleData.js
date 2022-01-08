import moment from 'moment';

const sampleMessages = [
  {
    id: 1,
    username: 'Miles',
    color: 'rgb(255, 0, 0)',
    timestamp: moment().format('h:mm'),
    message: 'This is a test message!!!',
  },
  {
    id: 2,
    username: 'NotMiles',
    color: 'rgb(0, 255, 0)',
    timestamp: moment().format('h:mm'),
    message: 'This is a different test message!!!',
  },
  {
    id: 3,
    username: 'seliM',
    color: 'rgb(0, 0, 255)',
    timestamp: moment().format('h:mm'),
    message: 'Whats good bro LUL',
  },
];

export default sampleMessages;
