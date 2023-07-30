import { React, useEffect, useState, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import CollabFeedCard from "../components/CollabFeedCard";
import { Outlet, Link, useNavigate } from "react-router-dom";
import UserContext from "../UserContext";
import { db } from "../Firebase";
import {
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  where,
  query,
  collection,
} from "firebase/firestore";
import { Row, Col } from "react-bootstrap";
function Dashboard() {
  const { user } = useContext(UserContext);
  const uid = user?.uid;
  const [name, setName] = useState("Loading..");
  const [posts, setPosts] = useState([]);
  const getDetails = async () => {
    if (user) {
      const docRef = doc(db, "users", user?.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setName(docSnap.data().name);
      } else {
        console.log("No such document!");
      }
    }
  };
  useEffect(() => {
    getDetails();
  }, [user]);

  useEffect(() => {
   if(user){
    const q = query(collection(db, "collab"), where("uid", "==", uid));
    const unsub = onSnapshot(q, (snapshot) => {
      setPosts(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
    return unsub;
   }
  }, [user]);

  return (
    <div>
      {!user ? (
        <h1 className="text-center">User Not Loged in</h1>
      ) : (
        <div>
          {/* <h4 className="text-center m-5">Welcome back!</h4> */}
          <div className="container-fluid mt-5">
            <div className="row">
              <div className="col">
                <div className="profile-bar text-center w-100">
                  <div className="profile ">
                    {/* <img style={{borderRadius:"50%"}} src={url} alt="" /> */}
                    <h4>{name}</h4>
                    <h6>{user?.email}</h6>
                    <Link to="/profile">
                      <p>View Profile</p>
                    </Link>
                  </div>
                  <Row className="m-4 p-3 bg-dark">
                    <Col>
                      <Link
                        className="text-white"
                        style={{ textDecoration: "none" }}
                        to="/dashboard"
                      >
                        {" "}
                        Collaboration{" "}
                      </Link>
                    </Col>
                    <Col>
                      <Link
                        className="text-white"
                        style={{ textDecoration: "none" }}
                        to="/forum-dashboard"
                      >
                        Discussion
                      </Link>
                    </Col>
                  </Row>
                  <Outlet />
                </div>
              </div>
            </div>
          </div>
          <div>
            <Row xs={1} md={3} className="g-4 mt-3">
              {posts.map((post) => (
                <Col className="mx-auto">
                  <Link to={`/collab/${post.id}`}>
                    <CollabFeedCard {...post} />
                  </Link>
                </Col>
              ))}
            </Row>
          </div>
        </div>
      )}
      {/* collab posts */}
    </div>
  );
}

export default Dashboard;
