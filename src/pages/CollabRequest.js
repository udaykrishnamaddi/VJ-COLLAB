import { React, useContext, useEffect, useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import UserContext from "../UserContext";
import { db } from "../Firebase";
import { doc,query, onSnapshot, collection, orderBy, deleteDoc, getDoc } from "firebase/firestore";
import RequestFeed from "../components/RequestFeed";
import Button from "../subComponents/Button";
import { toast } from "react-hot-toast";
import { Row,Col,Modal,Table } from "react-bootstrap";
import EditPost from "../components/EditPost";

function CollabRequest() {
  const { id } = useParams();
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [edit, setEdit] = useState([]);
  let [show, setShow] = useState(false);
  useEffect(() => {
    const q = query(
      collection(db, "collab", id, "requests"),
      orderBy("timestamp")
    );
    const unsub = onSnapshot(q, (snapshot) => {
      setPosts(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
    return unsub;
  }, []);

  const handleEdit = async (id) =>{
    const ref=doc(db,"collab",id);
    const docSnap=await getDoc(ref);
    setEdit(docSnap.data());
    setShow(true);
  }
  const handleDelete = async (id) =>{
    await deleteDoc(doc(db,"collab",id))
    .then(toast.success("Post Deleted"))
    navigate('/dashboard')
    .catch((err)=>{console.log(err)})
  }
  const handleClose = () =>{setShow(false)};

  return (
    <div className="m-4">
      <h4 className="text-center">Collab Request</h4>
      <Row className="mx-auto">
        <Col >
          <Button size="sm"
            description="Edit"
            textColor="white"
            bgColor="green"
            onClick={() => handleEdit(id)}
          />
          

        </Col>
        <Col>
          <Button size="sm"
            description="Delete"
            textColor="white"
            bgColor="red"
            onClick={() => handleDelete(id)}
          />

        </Col>
      </Row>
      {posts.length == 0 ? (
        <h4 className="text-center">No Collaborators yet!</h4>
      ) : (
        <Table responsive="sm" striped className="text-center" >
          <thead>
            <tr>
              <th>Name</th>
              <th>Links</th>
              <th>Skills</th>
              <th>Action</th>
            </tr>
            
          </thead>
          <tbody>
            {posts.map((post) => (
              <RequestFeed {...post} postid={id} />
            ))}
          </tbody>
        </Table>
      )}
      <Modal
        size="lg"
        show={show}
        onHide={handleClose}
        backdrop="static"
        scrollable
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditPost {... edit} postid={id}/>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default CollabRequest;
