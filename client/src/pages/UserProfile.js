import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const UserProfile = ({ user }) => {
  const [activeTab, setActiveTab] = useState('profile');
  const [profileData, setProfileData] = useState({
    username: user?.username || '',
    email: user?.email || '',
    bio: 'Food enthusiast and recipe creator',
    location: 'New York, USA',
    phone: '+1 (555) 123-4567',
    website: 'www.myrecipes.com'
  });
  const [profileImage, setProfileImage] = useState('https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150');
  const [isEditing, setIsEditing] = useState(false);

  if (!user) {
    return (
      <div className="profile-container">
        <div className="profile-login-card">
          <div className="profile-login-content">
            <div className="profile-login-icon">🔐</div>
            <h2>Please Login</h2>
            <p>You need to be logged in to view your profile.</p>
            <div className="profile-login-buttons">
              <Link to="/login" className="btn btn-primary">Login</Link>
              <Link to="/register" className="btn btn-secondary">Register</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically save to backend
    alert('Profile updated successfully!');
  };

  return (
    <div className="profile-container">
      <div className="profile-wrapper">
        {/* Profile Header Card */}
        <div className="profile-header-card">
          <div className="profile-cover">
            <div className="profile-avatar-section">
              <div className="profile-avatar">
                <img src={profileImage} alt="Profile" />
                <label className="avatar-upload-btn">
                  📷
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleImageUpload}
                    style={{ display: 'none' }}
                  />
                </label>
              </div>
              <div className="profile-basic-info">
                <h1>{profileData.username}</h1>
                <p>{profileData.bio}</p>
                <div className="profile-stats">
                  <div className="stat">
                    <span className="stat-number">12</span>
                    <span className="stat-label">Recipes</span>
                  </div>
                  <div className="stat">
                    <span className="stat-number">4.8</span>
                    <span className="stat-label">Rating</span>
                  </div>
                  <div className="stat">
                    <span className="stat-number">156</span>
                    <span className="stat-label">Followers</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Navigation */}
        <div className="profile-nav-card">
          <div className="profile-tabs">
            <button 
              className={`tab-btn ${activeTab === 'profile' ? 'active' : ''}`}
              onClick={() => setActiveTab('profile')}
            >
              👤 Profile
            </button>
            <button 
              className={`tab-btn ${activeTab === 'recipes' ? 'active' : ''}`}
              onClick={() => setActiveTab('recipes')}
            >
              🍳 My Recipes
            </button>
            <button 
              className={`tab-btn ${activeTab === 'settings' ? 'active' : ''}`}
              onClick={() => setActiveTab('settings')}
            >
              ⚙️ Settings
            </button>
          </div>
        </div>

        {/* Profile Content */}
        <div className="profile-content">
          {activeTab === 'profile' && (
            <div className="profile-info-grid">
              <div className="info-card">
                <h3>📧 Contact Information</h3>
                <div className="info-item">
                  <span className="info-label">Email:</span>
                  <span className="info-value">{profileData.email}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Phone:</span>
                  <span className="info-value">{profileData.phone}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Location:</span>
                  <span className="info-value">{profileData.location}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Website:</span>
                  <span className="info-value">{profileData.website}</span>
                </div>
              </div>

              <div className="info-card">
                <h3>📊 Activity Stats</h3>
                <div className="activity-stats">
                  <div className="activity-item">
                    <div className="activity-icon">🍳</div>
                    <div className="activity-details">
                      <span className="activity-number">12</span>
                      <span className="activity-label">Recipes Created</span>
                    </div>
                  </div>
                  <div className="activity-item">
                    <div className="activity-icon">⭐</div>
                    <div className="activity-details">
                      <span className="activity-number">4.8</span>
                      <span className="activity-label">Average Rating</span>
                    </div>
                  </div>
                  <div className="activity-item">
                    <div className="activity-icon">👥</div>
                    <div className="activity-details">
                      <span className="activity-number">156</span>
                      <span className="activity-label">Followers</span>
                    </div>
                  </div>
                  <div className="activity-item">
                    <div className="activity-icon">👀</div>
                    <div className="activity-details">
                      <span className="activity-number">2.3k</span>
                      <span className="activity-label">Profile Views</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="info-card">
                <h3>🚀 Quick Actions</h3>
                <div className="quick-actions">
                  <Link to="/submit" className="action-btn">
                    <span className="action-icon">➕</span>
                    <span>Add New Recipe</span>
                  </Link>
                  <Link to="/recipes" className="action-btn">
                    <span className="action-icon">🔍</span>
                    <span>Browse Recipes</span>
                  </Link>
                  <button className="action-btn">
                    <span className="action-icon">📤</span>
                    <span>Share Profile</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'recipes' && (
            <div className="recipes-tab">
              <div className="recipes-header">
                <h3>My Recipe Collection</h3>
                <Link to="/submit" className="btn btn-primary">Add New Recipe</Link>
              </div>
              <div className="my-recipes-grid">
                <div className="recipe-card-mini">
                  <img src="https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=300" alt="Recipe" />
                  <div className="recipe-card-mini-content">
                    <h4>Classic Pancakes</h4>
                    <p>⭐ 4.5 • 👀 234 views</p>
                  </div>
                </div>
                <div className="recipe-card-mini">
                  <img src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=300" alt="Recipe" />
                  <div className="recipe-card-mini-content">
                    <h4>Vegan Buddha Bowl</h4>
                    <p>⭐ 4.8 • 👀 189 views</p>
                  </div>
                </div>
                <div className="add-recipe-card">
                  <Link to="/submit" className="add-recipe-link">
                    <div className="add-recipe-icon">➕</div>
                    <span>Add New Recipe</span>
                  </Link>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="settings-tab">
              <div className="settings-card">
                <div className="settings-header">
                  <h3>⚙️ Profile Settings</h3>
                  <button 
                    className="btn btn-secondary"
                    onClick={() => setIsEditing(!isEditing)}
                  >
                    {isEditing ? 'Cancel' : 'Edit Profile'}
                  </button>
                </div>
                
                <div className="settings-form">
                  <div className="form-group">
                    <label>Username</label>
                    <input
                      type="text"
                      name="username"
                      value={profileData.username}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      name="email"
                      value={profileData.email}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Bio</label>
                    <textarea
                      name="bio"
                      value={profileData.bio}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Location</label>
                    <input
                      type="text"
                      name="location"
                      value={profileData.location}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Phone</label>
                    <input
                      type="text"
                      name="phone"
                      value={profileData.phone}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Website</label>
                    <input
                      type="text"
                      name="website"
                      value={profileData.website}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </div>
                  
                  {isEditing && (
                    <div className="form-actions">
                      <button className="btn btn-primary" onClick={handleSave}>
                        Save Changes
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;