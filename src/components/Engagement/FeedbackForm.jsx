import React, { useState } from 'react';
import { MessageSquare, MapPin } from 'lucide-react';
import Card from '../shared/Card';
import Button from '../shared/Button';
import './FeedbackForm.css';

const FeedbackForm = () => {
  const [formData, setFormData] = useState({
    category: 'environment',
    location: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ category: 'environment', location: '', message: '' });
    }, 3000);
  };

  return (
    <Card title="Submit Feedback" subtitle="Share your concerns and ideas" icon={<MessageSquare size={20} />}>
      {submitted ? (
        <div className="feedback-success">
          <div className="success-icon">✓</div>
          <h4>Thank you for your feedback!</h4>
          <p>Your input helps us create a better city for everyone.</p>
        </div>
      ) : (
        <form className="feedback-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Category</label>
            <select
              className="form-select"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            >
              <option value="environment">Environment</option>
              <option value="traffic">Traffic & Transportation</option>
              <option value="infrastructure">Infrastructure</option>
              <option value="safety">Safety</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">
              <MapPin size={16} />
              Location (Optional)
            </label>
            <input
              type="text"
              className="form-input"
              placeholder="e.g., District 5, Main Street"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Your Message</label>
            <textarea
              className="form-textarea"
              rows={4}
              placeholder="Describe your concern or suggestion..."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              required
            />
          </div>

          <Button variant="primary" fullWidth type="submit">
            Submit Feedback
          </Button>
        </form>
      )}
    </Card>
  );
};

export default FeedbackForm;
