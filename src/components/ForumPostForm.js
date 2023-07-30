import React, { useContext } from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "../subComponents/Button";
import { addDoc, serverTimestamp, collection } from "firebase/firestore";
import UserContext from "../UserContext";
import { db } from "../Firebase";
import toast from "react-hot-toast";

const ForumPostForm = () => {
  const { user } = useContext(UserContext);
  const [domain, setDomain] = useState("");
  const [query, setQuery] = useState("");
  const [desc, setDesc] = useState("");
  const [loading, isLoading] = useState(false);
  const handleClose = () => {console.log("close")}
  const handlePost = async () => {
    isLoading(true);
    const docData = {
      uid: user?.uid,
      query:query,
      domain:domain,
      desc:desc,
      timestamp: serverTimestamp(),
    };
    try {
      await addDoc(collection(db, "forum"), docData);
    } catch (err) {
      console.log(err);
    }
    toast.success("Question Posted!")
    isLoading(false);
  };

  return (
    <div>
      <Form>
        <br></br>
        <Form.Group className="mb-3">
          <Form.Label>
            <b>Provide title for your query:</b>
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter title for your query"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </Form.Group>
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>
                <b>Domain:</b>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Domain"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
              />
              <Form.Text>e.g: Web Development</Form.Text>
            </Form.Group>
          </Col>
        </Row>
        <Form.Group className="mb-3">
          <Form.Label>
            <b>Description:</b>
          </Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        </Form.Group>
        <Modal.Footer>
          <Button
            description="Close"
            textColor="white"
            bgColor="red"
            onClick={handleClose}
          />
          {loading ? (
            <Button
              description="Loading"
              textColor="white"
              bgColor="green"
              disabled="True"
            />
          ) : (
            <Button
              description="Post"
              textColor="white"
              bgColor="green"
              onClick={handlePost}
            />
          )}
        </Modal.Footer>
      </Form>
    </div>
  );
};

export default ForumPostForm;
