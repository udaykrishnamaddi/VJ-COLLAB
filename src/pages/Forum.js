import React, { useEffect,useState} from "react";
import ForumFeedCard from "../components/ForumFeedCard";
import { Col, Row } from "react-bootstrap";
import ForumPostCard from "../components/ForumPostCard";
import { onSnapshot,query,where,collection,orderBy } from "firebase/firestore";
import { db } from "../Firebase";
const Forum = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const q = query(collection(db, "forum"), orderBy("timestamp", "desc"));
    const unsub = onSnapshot(q, (snapshot) => {
      setPosts(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
    return unsub;
  }, []);

  return (
    <div className="">
      <div className="text-center" >
        <ForumPostCard />
      </div>

      <Row xs={1} md={1} className="g-4 m-3">
        {posts.map((post) => (
          <Col>
            <ForumFeedCard {...post} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Forum;
