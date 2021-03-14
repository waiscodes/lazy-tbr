import React, { useRef } from "react";
import { Card, Button } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";

const Dashboard = () => {
  const { currentUser } = useAuth();
  const testRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <Card>
      <Card.Body>
        <div className='user-info'>
          <img src='' alt='' />
          <p className='display-name'>Birm Wais</p>
          <p>{currentUser.email}</p>
          <p>Add bio here</p>
          <Button>Edit Profile</Button>
          <Button>Add Recommendation</Button>
        </div>
        <hr />
        <form onSubmit={handleSubmit}>
          <input type='text' name='test' id='test' ref={testRef} />
        </form>
      </Card.Body>
    </Card>
  );
};

export default Dashboard;
