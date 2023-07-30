import "./App.css";
import { useEffect, useState } from "react";
import {
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "./Firebase";
import UserContext from "./UserContext";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Collab from "./pages/Collab";
import Forum from "./pages/Forum";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import CollabRequest from "./pages/CollabRequest";
import ForumReply from "./pages/ForumReply";
import { Navbar, Container, Nav } from "react-bootstrap";
import Button from "./subComponents/Button";
import signInIcon from "./images/google-signin.png";
import vjCollabIcon from "./images/vjcollab-icon.png";
import { toast, Toaster } from "react-hot-toast";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./Firebase";
import CommentsPage from "./components/CommentsPage";
import ForumDashboard from "./components/ForumDashboard";

function App() {
  const [user, setUser] = useState(null);
  const provider = new GoogleAuthProvider();
  const navigate = useNavigate();

  const getUser = async (id) => {
    const docRef = doc(db, "users", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      toast.success("Loged In !");
    } else {
      toast.success("Welcome! Create Your Profile");
      navigate("profile");
    }
  };

  const handleSignIn = () => {
    signInWithPopup(auth, provider)
      .then((res) => {
        console.log(res);
        if (res.user?.email.split("@")[1] === "vnrvjiet.in") {
          getUser(res?.user?.uid);
        } else {
          signOut(auth);
          setUser(null);
          toast.error("Login with @vnrvjiet.in");
          auth.currentUser.delete();
        }
      })
      .catch((err) => {
        toast.error("Something Went Wrong !");
        console.log(err);
      });
  };

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return unsub;
  }, []);

  const handleSignOut = () => {
    signOut(auth);
    setUser(null);
    navigate('/')
    toast.success("Loged Out ");
  };

  return (
    <div>
      <Navbar
        collapseOnSelect
        expand="lg"
        className="bg-dark"
        variant="dark"
        style={{ zIndex: "1" }}
      >
        <Container fluid>
          <Navbar.Brand href="/" className="text-white ms-3">
            <img src={vjCollabIcon} style={{ height: "50px", width: "50px" }} />
            <b style={{ fontFamily: "monospace", fontSize: "xx-large" }}>
              {" "}
              VJ Collab
            </b>
            {/* <h3  style={{fontFamily: "monospace"}}  className="d-inline ms-2"><b>VJ Collab</b></h3> */}
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse className="me-5" id="responsive-navbar-nav">
            <Nav className="ms-auto">
              {user && (
                <Nav.Link href="/dashboard" className="collab text-white">
                  Dashboard
                </Nav.Link>
              )}
              <Nav.Link href="/collab" className="collab text-white">
                Collab
              </Nav.Link>
              <Nav.Link href="/forum" className="forum text-white">
                Forums
              </Nav.Link>
              {/* <Nav.Link href="/profile" className='forum text-white'>Profile</Nav.Link> */}
              <div>
                {user ? (
                  <Button
                    imgUrl={signInIcon}
                    onClick={handleSignOut}
                    description="Logout"
                    textColor="black"
                    bgColor="white"
                  />
                ) : (
                  <Button
                    imgUrl={signInIcon}
                    onClick={handleSignIn}
                    description="Log In"
                    textColor="black"
                    bgColor="white"
                  />
                )}
              </div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Toaster />

      <UserContext.Provider value={{ user, handleSignOut }}>
        <Routes>
          <Route path="" element={<Home />} />
          <Route path="/collab" element={<Collab />} />
          <Route path="/forum" element={<Forum />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="forum-dashboard" element={<ForumDashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/commentspage" element={<CommentsPage />} />
          <Route path="/collab/:id" element={<CollabRequest />} />
          <Route path="/forum/:id" element={<ForumReply />} />
        </Routes>
      </UserContext.Provider>
    </div>
  );
}

export default App;
