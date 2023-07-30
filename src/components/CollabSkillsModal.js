import React, { useContext } from "react";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import Button from "../subComponents/Button";
import raiseHand from "../images/raise-hand.png";
import Table from "react-bootstrap/Table";
import UserContext from "../UserContext";
import toast from "react-hot-toast";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../Firebase";
const CollabSkillsModal = ({ set, cid }) => {
  const rating = [1, 2, 3, 4, 5];
  const { user } = useContext(UserContext);
  const uid = user?.uid;
  let [show, setShow] = useState(false);
  const handleNotSignedIn = () => {
    toast.error("Not Loged In !");
  };
  const [skillRating, setSkillRating] = useState({});
  const handleClose = () => {
    setShow(false);
    console.log(cid);
  };
  const handleShow = () => setShow(true);
  const handleRating = (skill) => {
    skillRating[skill] = document.getElementById(skill).value;
    setSkillRating(skillRating);
  };
  const handleSubmit = async (id) => {
    console.log(skillRating);
    const docSnap = await getDoc(doc(db, "collab", id, "requests", uid));
    if (docSnap.exists()) {
      toast.error("Already Applied!");
    } else {
      setDoc(doc(db, "collab", id, "requests", uid), {
        uid: uid,
        rating: skillRating,
        timestamp: serverTimestamp(),
      });
      toast.success("Request Sent");
    }
    handleClose();
  };

  return (
    <div>
      <div className="float-end">
        {user ? (
          <Button
            imgUrl={raiseHand}
            description="Collab"
            textColor="white"
            bgColor="green"
            onClick={handleShow}
          />
        ) : (
          <Button
            imgUrl={raiseHand}
            description="Collab"
            textColor="white"
            bgColor="green"
            onClick={handleNotSignedIn}
          />
        )}
      </div>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        variant="top"
        centered
        scrollable
      >
        <Modal.Header closeButton>
          <Modal.Title>Skill Set</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table striped bordered hover className="text-center">
            <thead>
              <tr>
                <th>Skill</th>
                <th>Proficiency</th>
              </tr>
            </thead>
            <tbody>
              {set?.map((skill, key) => (
                <tr key={key}>
                  <td>{skill}</td>
                  <td>
                    <select id={skill} onChange={() => handleRating(skill)}>
                      <option value={0}>0</option>
                      {rating.map((rate, key) => (
                        <option name={skill} key={key} value={key + 1}>
                          {rate}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button
            description="Cancel"
            textColor="white"
            bgColor="red"
            onClick={handleClose}
          />
          <Button
            description="Submit"
            textColor="white"
            bgColor="green"
            onClick={() => handleSubmit(cid)}
          />
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CollabSkillsModal;
