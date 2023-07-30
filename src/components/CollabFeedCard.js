import { React, useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import userIcon from "../images/user-icon.png";
import teamIcon from "../images/team-icon.png";
import { ListGroup, ListGroupItem, Badge } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import CollabSkillsModal from "./CollabSkillsModal";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../Firebase";
const CollabFeedCard = (props) => {
  const [name, setName] = useState(" ");
  const getUser = async () => {
    if(props?.visibility==0){
      setName("Anonymous")
    }
    else{
      try {
        const ref = doc(db, "users", props?.uid);
        const docSnap = await getDoc(ref);
        setName(docSnap.data()?.name);
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    getUser();
  }, [props]);

  return (
    <div className="m-1">
      <Card className="shadow w-75 mx-auto collabcard">
        <Card.Header className="">
          <Card.Img
            className="img-fluid"
            variant="top"
            src={userIcon}
            style={{ height: "45px", width: "45px", float: "left" }}
          />
          <div className="float-start">
            <h6 className="ms-2 mt-2">{name}</h6>
          </div>
        </Card.Header>
        <Card.Body className="p-0 mt-1">
          <div className="container">
            <div className="row">
              <div className="col">
                <Card.Title>
                  <h3 className="m-1 p-2 text-center">{props.name}</h3>
                  <hr className="w-75 mx-auto m-0"></hr>
                </Card.Title>
                <p className="p-2 text-center">{props.desc}</p>
              </div>
            </div>
          </div>
        </Card.Body>
        <hr className="w-100 mx-auto m-0"></hr>
        <Card.Body>
          <div className=" p-2">
            <ListGroup className="mt-1">
              <ListGroupItem>
                <b>Date: </b>
                {props.date}
              </ListGroupItem>
              <ListGroupItem>
                <b>
                  <img
                    src={teamIcon}
                    style={{ height: "25px", weight: "25px", float: "left" }}
                    alt=""
                  />
                  :{" "}
                </b>
                {props.persons != null ? props.persons : "-"}
              </ListGroupItem>
              <ListGroupItem className="p-0">
                <Dropdown>
                  <Dropdown.Toggle variant="light" className="w-100">
                    Skills
                  </Dropdown.Toggle>
                  <Dropdown.Menu className="text-center" variant="dark">
                    {props.skills.map((skill, key) => (
                      <Dropdown.Item key={key}>{skill}</Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </ListGroupItem>
            </ListGroup>
            <Badge className="mt-3 p-2">{props.domain}</Badge>
          </div>
        </Card.Body>
        <Card.Footer className="mt-1">
          <CollabSkillsModal set={props.skills} cid={props.id} />
        </Card.Footer>
      </Card>
    </div>
  );
};

export default CollabFeedCard;
