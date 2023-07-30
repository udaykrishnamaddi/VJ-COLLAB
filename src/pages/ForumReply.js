import React, { useEffect, useState,useContext } from "react";
import ForumAnswers from "../components/ForumAnswers";
import ForumFeedCard from "../components/ForumFeedCard";
import Form from "react-bootstrap/Form";
import Button from "../subComponents/Button";

import {
  orderBy,
  collection,
  doc,
  getDoc,
  query,
  onSnapshot,
  serverTimestamp,
  addDoc,
} from "firebase/firestore";
import { useParams } from "react-router-dom";
import UserContext from "../UserContext";
import { db } from "../Firebase";
import toast from "react-hot-toast";

function ForumReply() {
  const { id } = useParams();
  const { user } = useContext(UserContext);
  const [posts, setPosts] = useState([]);
  const [loading, isLoading] = useState(false);
  const [q, setQ] = useState({});
  const [reply, setReply] = useState("");
  const getQ = async () => {
    const docRef = doc(db, "forum", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setQ(docSnap.data());
    } else {
      console.log("No such document!");
    }
  };

  const handleReply = async () => {
    isLoading(true);
    const docData = {
      uid: user?.uid,
      desc: reply,
      timestamp: serverTimestamp(),
    };
    try {
      await addDoc(collection(db, "forum", id, "reply"), docData);
    } catch (err) {
      console.log(err);
    }
    toast.success("Reply posted!");
    isLoading(false);
  };

  useEffect(() => {
    getQ();
  }, []);
  useEffect(() => {
    const q = query(
      collection(db, "forum", id, "reply"),
      orderBy("timestamp", "desc")
    );
    const unsub = onSnapshot(q, (snapshot) => {
      setPosts(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
    console.log("das", posts);
    return unsub;
  }, [posts]);
  return (
    <div className="container">
      <ForumAnswers {...q} />
      <hr className="w-100 mx-auto" />
      <br />
      {posts.map((post) => (
        <ForumAnswers {...post} /> 
      ))}
      {/* answer */}
      <h5>Your Answer: </h5>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>
            <b>Description:</b>
          </Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={reply}
            onChange={(e) => setReply(e.target.value)}
          />
        </Form.Group>
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
            onClick={handleReply}
          />
        )}
      </Form>
    </div>
  );
}

export default ForumReply;
