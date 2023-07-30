import {React,useState} from "react";
import SkillRating from "../components/SkillRating";
import { InputGroup } from "react-bootstrap";
import Button from "../subComponents/Button";
import { useEffect } from "react";
import { db } from "../Firebase";
import Table from 'react-bootstrap/Table';
import{deleteDoc, doc,getDoc, updateDoc} from "firebase/firestore"
import { toast } from "react-hot-toast";
import ButtonGroup from 'react-bootstrap/ButtonGroup';
function RequestFeed(props) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const getUser = async () => {
    const docRef = doc(db, "users", props?.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
    console.log(docSnap.data())
      setName(docSnap.data().name);
      setLink(docSnap.data().linkedin);
    } else {
      console.log("No such document!");
    }
  };
  const handleAccept = async () =>{
      await updateDoc(doc(db,"collab",props.postid,"requests",props.id),{status:1})
      .then(toast.success("Collaborator accepted"))
  }
  const handleReject = async () =>{
    await deleteDoc(doc(db,"collab",props.postid,"requests",props.id))
    .then(toast.success("Collaborator Rejected"))
  }

  useEffect(() => {
    getUser();
  }, [props]);

  return (
    <>
      
      
        <tr>
          <td>{name}</td>
          <td><a href={link}>Linkedin</a></td>
          <td><SkillRating {...props.rating} /></td>
          <td>
              
              <ButtonGroup size="sm">
                <Button bgColor="red" textColor="white" description="-" onClick={handleReject}/>
                <Button bgColor="green" textColor="white" description="+" onClick={handleAccept}/>
              </ButtonGroup>
          </td>
        </tr>
        
      
    


    </>
  );
}

export default RequestFeed;
