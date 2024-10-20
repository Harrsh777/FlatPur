import React from 'react';

const ContactSection: React.FC = () => {
  return (
    <div style={styles.container}>
      {/* Top Section: Cards */}
      <div style={styles.cardsContainer}>
        <div style={styles.card}>
          <div style={styles.icon}>📞</div>
          <h4 style={styles.heading}>(+91) 80049 59778</h4>
          <p style={styles.text}>We're here for you! Call us anytime to discuss your real estate needs or inquiries.</p>
        </div>
        <div style={styles.card}>
          <div style={styles.icon}>✉️</div>
          <h4 style={styles.heading}>amaaz@flatpur.com</h4>
          <p style={styles.text}>Have questions? Email us anytime, and our team will respond promptly to assist you.</p>
        </div>
        <div style={styles.card}>
          <div style={styles.icon}>📍</div>
          <h4 style={styles.heading}>Jajmau, Kanpur</h4>
          <p style={styles.text}>Come visit us at Flatpur! Our friendly team is ready to help you find your dream property.</p>
        </div>
      </div>

      {/* Bottom Section: Map */}
      <div style={styles.mapContainer}>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14291.493173692685!2d80.32175812672947!3d26.44992397105252!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399c389cc2ca99a7%3A0x3928c1dd2be05bc!2sKanpur%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1694594991213!5m2!1sen!2sin"
          width="100%"
          height="300px"
          style={styles.map}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  );
};

// Inline Styles
const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
  },
  cardsContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '20px',
  },
  card: {
    backgroundColor: '#f0f4fa',
    borderRadius: '10px',
    padding: '20px',
    textAlign: 'center' as 'center', // Ensure TypeScript recognizes this as a valid type
    width: '30%',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
  },
  icon: {
    fontSize: '30px',
    marginBottom: '10px',
  },
  heading: {
    margin: '10px 0',
    fontSize: '18px',
    fontWeight: '600',
  },
  text: {
    fontSize: '14px',
    color: '#6c757d',
  },
  mapContainer: {
    marginTop: '20px',
    borderRadius: '10px',
    overflow: 'hidden',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
  },
  map: {
    border: '0',
  },
};

export default ContactSection;
