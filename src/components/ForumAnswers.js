import { React, useEffect, useState } from "react";
import { Button, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../Firebase";
import moment from "moment";

function ForumAnswers(props) {
  const [name, setName] = useState(" ");
  const [email, setEmail] = useState(" ");
  let desc = props?.desc;
  const getUser = async () => {
    try {
      const ref = doc(db, "users", props?.uid);
      const docSnap = await getDoc(ref);
      setName(docSnap.data()?.name);
      setEmail(docSnap.data()?.email);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUser();
  }, [props]);

  return (
    <div>
      <div
        className="forum-card m-2 border rounded p-2 mx-auto"
        style={{ width: "75vw" }}
      >
        <div className="mx-3">
          <div className="d-flex x">
            <p>
              <b>{name}</b>
            </p>
            <p>
              {moment(props?.timestamp?.toDate()).startOf("minute").fromNow()}
            </p>
          </div>
          <p>{email}</p>
        </div>
        <hr />
        <div className="body ms-3">
          <h4>{props.query}</h4>
          <p>{desc}</p>
        </div>
        <div className="x mx-3">
          <Badge className="mt-3 p-2">{props.domain}</Badge>
        </div>
      </div>
    </div>
  );
}

export default ForumAnswers;
