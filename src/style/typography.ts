import { Dimensions } from "react-native"

export const shadowStyle: any = {
  shadowOffset: { width: 0, height: 10 },
  shadowColor: 'grey',
  shadowOpacity: 0.2,
  shadowRadius: 5,
  elevation: 4
}

export const height = Dimensions.get('screen').height

export const width = Dimensions.get('screen').width

// Function to format the date and time
export function formatStartTime(dateString) {
  // Create a new Date object from the input date string
  // Input date string in ISO format
  const isoDateString = dateString
  // Input date string in ISO format

  // Create a Date object from the ISO string
  const date = new Date(isoDateString);

  // Convert the date to IST (GMT+5:30)
  const offset = 5.5 * 60 * 60 * 1000; // IST offset in milliseconds
  const istDate = new Date(date.getTime() + offset);

  // Extract date parts
  const day = istDate.getUTCDate();
  const month = istDate.toLocaleString('default', { month: 'long' });
  const hours = istDate.getUTCHours();
  const minutes = istDate.getUTCMinutes();
  const period = hours >= 12 ? 'PM' : 'AM';

  // Convert to 12-hour format
  const formattedHours = hours % 12 || 12;
  const formattedMinutes = minutes.toString().padStart(2, '0');

  // Format the date string as '15 June | 06:00 AM (IST)'
  const formattedDate = `${day} ${month} | ${formattedHours}:${formattedMinutes} ${period} (IST)`;


  return formattedDate; // 14 June | 11:59 AM (IST)

}

export function startISTCheckTime(datestring) {
  const [datePart, timePart, meridiem] = datestring.split(' ');
  const [day, month, year] = datePart.split('-');
  let [hours, minutes] = timePart.split(':');

  // Adjust the hours based on AM/PM
  if (meridiem === 'PM' && hours !== '12') {
    hours = parseInt(hours) + 12;
  } else if (meridiem === 'AM' && hours === '12') {
    hours = '00';
  }

  const date = new Date(`${year}-${month}-${day}T${hours}:${minutes}:00`);

  // Get the month name
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
  const monthName = monthNames[parseInt(month) - 1];

  // Convert 24-hour time to 12-hour format
  let formattedHour = date.getHours() % 12 || 12;
  const formattedMinutes = minutes.padStart(2, '0');
  const ampm = date.getHours() >= 12 ? 'PM' : 'AM';

  // Combine everything into the desired format
  const formattedDate = `${day} ${monthName} | ${formattedHour}:${formattedMinutes} ${ampm}`;

  return formattedDate

}

export function formatDate(dateString) {
  // Create a new Date object from the input date string
  const date = new Date(dateString);

  // Get the day, month name, and year
  const day = date.getUTCDate();
  const month = date.toLocaleString('en-US', { month: 'long' });
  const year = date.getUTCFullYear();

  // Return the formatted date string
  return `${day} ${month} ${year}`;
}

// Function to format the time
export function formatTime(dateString) {
  // Create a new Date object from the input date string
  const date = new Date(dateString);

  // Options for formatting the time
  const options = {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
    timeZone: 'Asia/Kolkata', // IST time zone
  };

  // Format the time using toLocaleTimeString
  const timeString = date.toLocaleTimeString('en-US', options);

  // Return the formatted time string
  return `${timeString} (IST)`;
}


export const formatStartDate = (date: any) => {
  const tempDate = new Date(date);
  const formattedDate =
    tempDate.getFullYear() +
    '-' +
    ('0' + (tempDate.getMonth() + 1)).slice(-2) +
    '-' +
    ('0' + tempDate.getDate()).slice(-2) +
    ' ' +
    ('0' + tempDate.getHours()).slice(-2) +
    ':' +
    ('0' + tempDate.getMinutes()).slice(-2);
  return formattedDate;
};


export const formattedDate = (date: any) => {
  const tempDate = new Date(date);
  const formattedDate =
    ('0' + tempDate.getDate()).slice(-2) +
    '-' +
    ('0' + (tempDate.getMonth() + 1)).slice(-2) +
    '-' +
    ('0' + tempDate.getFullYear()).slice(-2);
  return formattedDate;
};

export const formattedTime = (date: any) => {
  const tempDate = new Date(date);
  let hours = tempDate.getHours();
  let minutes = tempDate.getMinutes();
  let ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12;
  let formattedTime =
    ('0' + hours).slice(-2) + ':' + ('0' + minutes).slice(-2) + ' ' + ampm;
  return formattedTime;
};
