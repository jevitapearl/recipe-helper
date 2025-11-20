import React from 'react';

const ProfilePage = () => {
  const user = {}; // Placeholder for user data

  return (
    <div className="profile-page">
      <h1>Profile</h1>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
    </div>
  );
};

export default ProfilePage;
