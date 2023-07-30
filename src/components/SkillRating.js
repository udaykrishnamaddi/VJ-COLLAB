import { React, useState } from "react";
import { Table, Modal } from "react-bootstrap";
import Button from "../subComponents/Button";

function SkillRating(props) {
  let [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => {
    setShow(false);
  };
  console.log("lak", props);

  return (
    <div>
      <Button
        description="View Rating"
        textColor="white"
        bgColor="green"
        onClick={handleShow}
      />
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
              {Object.keys(props).map((skill, key) => (
                <tr key={key}>
                  <td>{skill}</td>
                  <td>{props[skill]}</td>
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
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default SkillRating;
