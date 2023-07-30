import React from "react";
import { useState, useEffect, useContext } from "react";
import Button1 from "../subComponents/Button";
import { Form, Row, Col, Button, InputGroup } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import toast from "react-hot-toast";
import { db } from "../Firebase";
import { doc, serverTimestamp, updateDoc } from "firebase/firestore";
import UserContext from "../UserContext";
function EditPost(props) {
  const { user } = useContext(UserContext);
  let [skillSet, setSkillSet] = useState(props.skills);
  let color = ["red", "green", "brown"];
  let visibility;
  const [aym, setAym] = useState(props.visibility);
  const [loading, isLoading] = useState(false);
  const [name, setName] = useState(props.name);
  const [domain, setDomain] = useState(props.domain);
  const [persons, setPersons] = useState(props.persons);
  const [desc, setDesc] = useState(props.desc);
  const [date, setDate] = useState(props.date);
  const addSkill = () => {
    let skill = document.getElementById("getReqSkill").value;
    skillSet = [...skillSet, skill];
    setSkillSet(skillSet);
  };

  const removeSkill = (skill) => {
    let temp = [...skillSet];
    let index = temp.indexOf(skill);
    temp.splice(index, 1);
    setSkillSet(temp);
  };
  const handlePost = async () => {
    isLoading(true);
    let [x, y, z] = date.split("-");
    const res = [z, y, x].join("-");
    aym ? (visibility = 0) : (visibility = 1);
    const docData = {
      name: name,
      uid: user?.uid,
      domain: domain,
      persons: persons,
      desc: desc,
      skills: skillSet,
      date: res,
      time: serverTimestamp(),
      visibility: visibility,
    };
    try {
      await updateDoc(doc(db, "collab",props.postid), docData);
    } catch (err) {
      console.log(err);
    }
    isLoading(false);
    toast.success("Post Updated !");
  };

  useEffect(() => {
    document.getElementById("getReqSkill").value = "";
  }, [skillSet]);

  const addSkillOnEnter = () => {
    let input = document.getElementById("getReqSkill");
    input.addEventListener("keypress", function (event) {
      if (event.key === "Enter") {
        event.preventDefault();
        if (input.value !== "") {
          document.getElementById("addSkill").click();
        }
      }
    });
  };

  return (
    <div>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>
            <b>Contest Name:</b>
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Contest Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>
                <b>End Date:</b>
              </Form.Label>
              <Form.Control
                type="date"
                value={date || ""}
                data-date-format="DD MM YYYY"
                onChange={(e) => setDate(e.target.value)}
              />
              <Form.Text>Deadline to accept requests</Form.Text>
            </Form.Group>
          </Col>
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
            <b>Skill Set Required:</b>
          </Form.Label>
          <InputGroup className="mb-3">
            <Form.Control
              type="text"
              placeholder="Enter a Skill"
              id="getReqSkill"
              onClick={addSkillOnEnter}
            />
            <Button id="addSkill" variant="success" onClick={addSkill}>
              Add
            </Button>
          </InputGroup>

          {skillSet.length !== 0 ? (
            <div className="displayReqSkills border p-2">
              <b>Selected Skills:</b>
              <br></br>
              <hr></hr>
              {skillSet.map((skill, key) => (
                <p
                  className="border p-2"
                  key={key}
                  style={{
                    backgroundColor: color[key % 3],
                    color: "white",
                    display: "inline-block",
                  }}
                >
                  <span role="button" onClick={() => removeSkill(skill)}>
                    {" "}
                    x{" "}
                  </span>
                  {skill}
                </p>
              ))}
            </div>
          ) : (
            <p></p>
          )}
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>
            <b>Candidates Required:</b>
          </Form.Label>
          <Form.Control
            value={persons}
            onChange={(e) => setPersons(e.target.value)}
            type="number"
            onKeyPress={(e) => !/[0-9]/.test(e.key) && e.preventDefault()}
          />
        </Form.Group>
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
        <Form.Check
          type="switch"
          id="custom-switch"
          label="Ghost Mode"
          onClick={() => setAym(!aym)}
        />
      </Form>
      <Modal.Footer>
        {loading ? (
          <Button1
            description="Loading"
            textColor="white"
            bgColor="green"
            disabled="True"
          />
        ) : (
          <Button1
            description="Post"
            textColor="white"
            bgColor="green"
            onClick={handlePost}
          />
        )}
      </Modal.Footer>
    </div>
  );
}

export default EditPost;
