"use client";
import React, { useState } from 'react';

// Define the type for a Review
interface Review {
  id: number;
  name: string;
  profilePicture: string;
  rating: number;
  comment: string;
  date: Date; // Change type to Date for easier manipulation
}

// Sample reviews data
const sampleReviews: Review[] = [
  {
    id: 1,
    name: "Aarav Sharma",
    profilePicture: "https://via.placeholder.com/50",
    rating: 5,
    comment: "Flatpur made my home-buying experience incredibly smooth! The interface is user-friendly, and I found a beautiful apartment in Bangalore within days. Highly recommend!",
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5), // 5 days ago
  },
  {
    id: 2,
    name: "Priya Gupta",
    profilePicture: "https://via.placeholder.com/50",
    rating: 4,
    comment: "I had a great experience with Flatpur. The property listings are accurate, and I appreciated the detailed descriptions and photos. A few more filters would make the search even better!",
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30), // 1 month ago
  },
  {
    id: 3,
    name: "Rohan Mehta",
    profilePicture: "https://via.placeholder.com/50",
    rating: 5,
    comment: "Flatpur is a game-changer in the real estate market! I sold my property quickly and effortlessly. Their customer service is top-notch—always ready to assist. Great platform!",
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
  },
  {
    id: 4,
    name: "Neha Verma",
    profilePicture: "https://via.placeholder.com/50",
    rating: 4,
    comment: "I recently rented a flat through Flatpur, and I couldn't be happier! The website is easy to navigate, and the agents were very helpful. I wish there were more listings in my area, though.",
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10), // 10 days ago
  },
  {
    id: 5,
    name: "Vikram Singh",
    profilePicture: "https://via.placeholder.com/50",
    rating: 5,
    comment: "Fantastic experience using Flatpur! The property search was quick, and the site is visually appealing. I love how they provide information about nearby amenities. Will definitely recommend to friends!",
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 15), // 15 days ago
  },
  {
    id: 6,
    name: "Sneha Rao",
    profilePicture: "https://via.placeholder.com/50",
    rating: 4,
    comment: "Using Flatpur has been a pleasure! The design is sleek, and I love the virtual tours of properties. However, I did face some issues with customer support initially, but they resolved it promptly.",
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 20), // 20 days ago
  },
  {
    id: 7,
    name: "Karan Joshi",
    profilePicture: "https://via.placeholder.com/50",
    rating: 5,
    comment: "I can't thank Flatpur enough for helping me find my dream home! The site is reliable and offers a wide range of properties. The mortgage calculator was also a nice touch!",
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 days ago
  },
  {
    id: 8,
    name: "Tanya Patel",
    profilePicture: "https://via.placeholder.com/50",
    rating: 4,
    comment: "Flatpur is a great platform for real estate transactions. I found a lovely house in Pune that fits my budget perfectly. The verification process for properties gave me peace of mind.",
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 8), // 8 days ago
  },
  {
    id: 9,
    name: "Arjun Bansal",
    profilePicture: "https://via.placeholder.com/50",
    rating: 5,
    comment: "Flatpur is a fantastic platform for anyone looking to buy or rent. I found an amazing apartment in Hyderabad within a week. The site has a wealth of information and user-friendly features.",
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 12), // 12 days ago
  },
  {
    id: 10,
    name: "Maya Iyer",
    profilePicture: "https://via.placeholder.com/50",
    rating: 4,
    comment: "I recently sold my property through Flatpur, and it was a breeze! The listing process was straightforward, and I received multiple inquiries quickly. A great service overall!",
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 25), // 25 days ago
  },
];

const ReviewSection: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>(sampleReviews);
  const [newReview, setNewReview] = useState<Omit<Review, 'id' | 'date'>>({
    name: '',
    profilePicture: '',
    rating: 0,
    comment: '',
  });
  const [showModal, setShowModal] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewReview({ ...newReview, [name]: value });
  };

  const handleAddReview = () => {
    if (newReview.name && newReview.comment && newReview.rating) {
      setReviews([
        ...reviews,
        {
          ...newReview,
          id: reviews.length + 1,
          date: new Date(),
          profilePicture: newReview.profilePicture || "https://via.placeholder.com/50",
        },
      ]);
      setNewReview({ name: '', profilePicture: '', rating: 0, comment: '' });
      setShowModal(false); // Close modal after submission
    } else {
      alert('Please fill in all fields.');
    }
  };

  // Function to format the date as "x days ago" or "x months ago"
  const formatDate = (date: Date) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);
    const diffInMonths = Math.floor(diffInDays / 30);

    if (diffInDays < 30) {
      return diffInDays === 1 ? '1 day ago' : `${diffInDays} days ago`;
    } else {
      return diffInMonths === 1 ? '1 month ago' : `${diffInMonths} months ago`;
    }
  };

  // Function to render stars based on the rating
  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} style={{ color: i <= rating ? '#FFD700' : '#ccc' }}>★</span>
      );
    }
    return stars;
  };

  // Inline styles
  const styles = {
    reviewSection: {
      width: '90%',
      margin: '20px auto',
      textAlign: 'center' as const,
    },
    reviewsContainer: {
      display: 'flex',
      overflowX: 'auto' as const,
      gap: '20px',
      padding: '10px',
      scrollSnapType: 'x mandatory' as const,
      scrollbarWidth: 'thin' as const,
    },
    reviewCard: {
      backgroundColor: '#f9f9f9',
      border: '1px solid #e0e0e0',
      borderRadius: '10px',
      padding: '15px',
      minWidth: '250px',
      textAlign: 'left' as const,
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
      scrollSnapAlign: 'start' as const,
    },
    reviewCardImage: {
      borderRadius: '50%',
      width: '50px',
      height: '50px',
      marginBottom: '10px',
    },
    reviewContent: {
      margin: '0 0 5px',
    },
    addReviewButton: {
      padding: '10px 20px',
      backgroundColor: 'Green',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      marginTop: '20px',
    },
    modal: {
      position: 'fixed' as const,
      top: '0',
      left: '0',
      right: '0',
      bottom: '0',
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContent: {
      backgroundColor: 'white',
      padding: '20px',
      borderRadius: '10px',
      width: '400px',
      position: 'relative' as const,
    },
    close: {
      position: 'absolute' as const,
      top: '10px',
      right: '10px',
      cursor: 'pointer',
      fontSize: '20px',
    },
    modalInput: {
      width: '100%',
      padding: '10px',
      marginBottom: '10px',
      border: '1px solid #ccc',
      borderRadius: '5px',
    },
    modalButton: {
      padding: '10px 20px',
      backgroundColor: '#28a745',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
    },
  };

  return (
    <div style={styles.reviewSection}>
      <h2>Customer Reviews</h2>
      <div style={styles.reviewsContainer}>
        {reviews.map((review) => (
          <div key={review.id} style={styles.reviewCard}>
            <img src={review.profilePicture} alt={review.name} style={styles.reviewCardImage} />
            <h6 style={styles.reviewContent}>{review.name}</h6>
            <div style={styles.reviewContent}>
              {renderStars(review.rating)} {/* Display stars instead of rating */}
            </div>
            <p style={styles.reviewContent}>{review.comment}</p>
            <p style={styles.reviewContent}><small>{formatDate(review.date)}</small></p> {/* Format date */}
          </div>
        ))}
      </div>

      <button style={styles.addReviewButton} onClick={() => setShowModal(true)}>
        Add Review
      </button>

      {showModal && (
        <div style={styles.modal}>
          <div style={styles.modalContent}>
            <span style={styles.close} onClick={() => setShowModal(false)}>&times;</span>
            <h2>Add Your Review</h2>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={newReview.name}
              onChange={handleInputChange}
              style={styles.modalInput}
            />
            <input
              type="text"
              name="profilePicture"
              placeholder="Profile Picture URL (optional)"
              value={newReview.profilePicture}
              onChange={handleInputChange}
              style={styles.modalInput}
            />
            <input
              type="number"
              name="rating"
              placeholder="Rating (1-5)"
              value={newReview.rating}
              onChange={handleInputChange}
              style={styles.modalInput}
              min={1}
              max={5}
            />
            <textarea
              name="comment"
              placeholder="Your Review"
              value={newReview.comment}
              onChange={handleInputChange}
              style={styles.modalInput}
            />
            <button style={styles.modalButton} onClick={handleAddReview}>
              Submit Review
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewSection;
