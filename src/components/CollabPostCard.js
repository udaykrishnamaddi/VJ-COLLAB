import React, { useContext } from "react";
import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import CollabPostForm from "./CollabPostForm";
import UserContext from "../UserContext";
import toast from "react-hot-toast";
function CollabPostCard() {
  let [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleNotSignedIn = () => {
    toast.error("Not Signed In!");
  };
  const { user } = useContext(UserContext);
  return (
    <div>
      <div className="text-center">
        {/* Collab Request */}
        <div>
          <h1
            style={{
              fontFamily: "shalimar",
              fontSize: "65px",
            }}
            className="d-inline-block text-center"
          >
            {" "}
            <b>Your Feed</b>{" "}
          </h1>

        </div>

        
          {user ? (
            <Button
              className=" bg-dark mt-5"
              style={{ marginRight: "15px" }}
              onClick={handleShow}
            >
              {" "}
              + Post Collaboration
            </Button>
          ) : (
            <Button
              className=" bg-dark mt-5"
              style={{ marginRight: "15px" }}
              onClick={handleNotSignedIn}
            >
              {" "}
              + Post Collaboration
            </Button>
          )}

        
        
        
      </div>
      {/* Modal for collaboration post form */}
      <Modal
        size="lg"
        show={show}
        onHide={handleClose}
        backdrop="static"
        scrollable
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Create Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CollabPostForm />
        </Modal.Body>
      </Modal>
      

    </div>

  );
}

export default CollabPostCard;
