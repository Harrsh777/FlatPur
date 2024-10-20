"use client";

import React, { useState } from 'react';
import './customCalendarStyles.css';
import emailjs from 'emailjs-com';  // Import emailjs

const AppointmentModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [timeSlots, setTimeSlots] = useState<string | null>(null);
  const [fullName, setFullName] = useState('');
  const [contactNumber, setContactNumber] = useState('');

  // Generate the next 10 days for the calendar
  const generateNext10Days = () => {
    const dates = [];
    for (let i = 0; i < 10; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
  };

  const handleTimeSlotClick = (time: string) => {
    setTimeSlots(time);
  };

  // EmailJS function to send email
  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName || !contactNumber || !selectedDate || !timeSlots) {
      alert('Please fill in all fields.');
      return;
    }

    // Prepare email data
    const templateParams = {
      fullName,
      contactNumber,
      selectedDate: selectedDate?.toLocaleDateString(),
      timeSlots,
    };

    // Send email via EmailJS
    emailjs
      .send('service_t05mdq2', 'template_96f30ia', templateParams, 'lhUeUTxZFvL1bVHaC')
      .then(
        (response) => {
          alert('Appointment booked successfully! You will receive a confirmation call shortly.');
          onClose();
        },
        (error) => {
          alert('SignUp first to make appointments');
          console.error('EmailJS Error:', error); // Log the error for debugging
        }
      );
  };

  if (!isOpen) return null;

  return (
    <div style={styles.modalOverlay}>
      <div style={styles.modal}>
        <button style={styles.closeButton} onClick={onClose}>
          &times;
        </button>

        <h2 style={styles.heading}>Book an Appointment</h2>

        {/* Calendar - showing next 10 days */}
        <div style={styles.calendarContainer}>
          <div style={styles.dateRow}>
            {generateNext10Days().map((date, index) => (
              <button
                key={index}
                style={{
                  ...styles.dateButton,
                  backgroundColor: selectedDate?.toDateString() === date.toDateString() ? '#FF5A5F' : '#f2f2f2',
                  color: selectedDate?.toDateString() === date.toDateString() ? '#fff' : '#333',
                }}
                onClick={() => handleDateClick(date)}
              >
                {date.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric' })}
              </button>
            ))}
          </div>
        </div>

        {/* Time Slots */}
        <div style={styles.timeSlotsContainer}>
          <h3 style={styles.sectionTitle}>Available Times</h3>
          <div style={styles.timeSlots}>
            {['10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM', '06:00 PM'].map((time) => (
              <button
                key={time}
                style={{
                  ...styles.timeSlotButton,
                  backgroundColor: timeSlots === time ? '#FF5A5F' : '#f2f2f2',
                  color: timeSlots === time ? '#fff' : '#333',
                }}
                onClick={() => handleTimeSlotClick(time)}
              >
                {time}
              </button>
            ))}
          </div>
        </div>

        {/* Appointment Details */}
        <form onSubmit={sendEmail}>
          <div style={styles.inputContainer}>
            <label style={styles.label}>Full Name</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              style={styles.input}
              placeholder="Enter your full name"
            />
          </div>
          <div style={styles.inputContainer}>
            <label style={styles.label}>Contact Number</label>
            <input
              type="text"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
              style={styles.input}
              placeholder="Enter your contact number"
            />
          </div>

          <button type="submit" style={styles.bookButton} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#FF3B3F'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FF5A5F'}>
            Book Now
          </button>
        </form>
      </div>
    </div>
  );
};

// Rest of the FloatingButton and styles remain unchanged
const FloatingButton: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <>
      <button style={floatingButtonStyles} onClick={openModal}>
        Book a Visit
      </button>

      <AppointmentModal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
};

const floatingButtonStyles: React.CSSProperties = {
  position: 'fixed',
  bottom: '20px',
  right: '20px',
  backgroundColor: 'green',
  color: 'white',
  padding: '15px 20px',
  borderRadius: '50px',
  border: 'none',
  fontSize: '16px',
  cursor: 'pointer',
  zIndex: 1000,
};

const styles: { [key: string]: React.CSSProperties } = {
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modal: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '10px',
    width: '400px',
    position: 'relative',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  },
  closeButton: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    backgroundColor: 'transparent',
    color: '#333',
    border: 'none',
    fontSize: '24px',
    cursor: 'pointer',
  },
  heading: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  calendarContainer: {
    marginBottom: '20px',
  },
  dateRow: {
    display: 'flex',
    justifyContent: 'space-between',
    overflowX: 'scroll',
  },
  dateButton: {
    flex: '0 0 auto',
    padding: '10px',
    border: 'none',
    borderRadius: '5px',
    margin: '0 5px',
    cursor: 'pointer',
  },
  timeSlotsContainer: {
    marginBottom: '20px',
  },
  sectionTitle: {
    fontSize: '16px',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  timeSlots: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  timeSlotButton: {
    flex: '0 0 48%',
    padding: '10px',
    marginBottom: '10px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  inputContainer: {
    marginBottom: '15px',
  },
  label: {
    fontSize: '14px',
    marginBottom: '5px',
    display: 'block',
  },
  input: {
    width: '100%',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  bookButton: {
    backgroundColor: '#FF5A5F',
    color: '#fff',
    padding: '10px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    width: '100%',
    fontSize: '16px',
  },
};

export default FloatingButton;
