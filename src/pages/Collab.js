import { React, useState, useEffect } from "react";
import CollabPostCard from "../components/CollabPostCard";
import CollabFeedCard from "../components/CollabFeedCard";
import { Row, Col, Dropdown, FormControl, FormCheck, FormLabel, Button, InputGroup } from "react-bootstrap";
import { orderBy, collection, query, onSnapshot } from "firebase/firestore";
import { db } from "../Firebase";
import FormCheckLabel from "react-bootstrap/esm/FormCheckLabel";
import FormCheckInput from "react-bootstrap/esm/FormCheckInput";

function Collab() {
  const [allPosts, setAllPosts] = useState([]);
  const [posts, setPosts] = useState(allPosts);

  useEffect(() => {
    const q = query(collection(db, "collab"), orderBy("time", "desc"));
    const unsub = onSnapshot(q, (snapshot) => {
      setAllPosts(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setPosts(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
    setPosts(allPosts)
    return unsub;
  }, []);

  const domains = ['ML', 'Cloud', 'Web', 'App', 'Cryptography', 'AI'];
  const domainsIndex = {'ml': 0, 'cloud': 1, 'web': 2, 'app': 3, 'cryptography': 4, 'ai': 5};
  const [domainsBool, setDomainsBool] = useState([false, false, false, false, false, false]);

  const addDelFilter = (index)=>{
    let temp = domainsBool;
    temp[index] = !temp[index];
    setDomainsBool(temp);
  }

  const applyFilter = () => {
    let temp = [];
    let count = 0;
    allPosts.map((post)=>{
      if(domainsBool[domainsIndex[post.domain.toLowerCase()]] === true){
        count++;
        temp.push(post);
      }
    })
    if(count==0) setPosts(allPosts);
    else setPosts(temp);
  }

  const clearFilter = () => {
    setPosts(allPosts);
    let temp = domainsBool;
    for(let i=0; i<domains.length; i++){
      temp[i] = false;
      document.getElementById(domains[i]).checked = false;
    }
    setDomainsBool(temp);
  }

  return (
    <div>
      <CollabPostCard/>
      <div className="text-center mt-3 ">
      <Dropdown className=" mt-1 ">
        <Dropdown.Toggle className="bg-dark mx-auto">Select Domain</Dropdown.Toggle>
        <Dropdown.Menu>
          {domains.map((domain, key) => (
            // <Dropdown.Item key={key}>
            <span className="d-block ms-3" key={key}>
              <FormCheckInput id={domains[key]} type="checkbox" onClick={() => addDelFilter(key)} />
              <FormCheckLabel className="ms-3">{domain}</FormCheckLabel>
            </span>
            // </Dropdown.Item>
          ))}
          <Dropdown.Divider />
          <InputGroup>
            <Dropdown.Item className="text-center d-inline w-50 border" onClick={clearFilter} >
              Clear
            </Dropdown.Item>
            <Dropdown.Item className="text-center d-inline w-50 border" onClick={applyFilter} >
              Apply
            </Dropdown.Item>
          </InputGroup>
        </Dropdown.Menu>
      </Dropdown>
      </div><br />
      <div>
      <Row xs={1} md={3} className="g-4 mt-1">
        {posts.map((post) => (
          <Col className="mx-auto">
            <CollabFeedCard {...post} />
          </Col>
        ))}
      </Row>
      </div>
    </div>
  );
}

export default Collab;
