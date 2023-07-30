import React from 'react'
import { useState } from 'react';
import { Button, Card, FormControl, FormGroup, FormLabel, InputGroup } from 'react-bootstrap';
import userIcon from '../images/user-icon.png';
// import { RiAddCircleFill } from 'react-icons/ri';
// import { AiFillDelete } from 'react-icons/ai';
import ForumReply from './ForumReply';

function CommentsPage(props) {

  const [addLinkCount, setAddLinkCount] = useState(1);
  const [addLink, setAddLink] = useState([]);

  const handleAddLink = () => setAddLinkCount(addLinkCount + 1);
  const removeAddLink = (index) => {
    if(addLinkCount > 0){
      setAddLinkCount(addLinkCount - 1);
    }    
    let temp = [...addLink];
    temp.splice(index, 1);
    setAddLink(temp);
  }

  const addLinkOnEnter = (e)=>{
    const element = e.target;
    let link = element.value;

    element.addEventListener("keypress", function(event){
        if(event.key==="Enter"){
            event.preventDefault();
            if(element.value!==""){
              link = element.value;
              setAddLink([...addLink, link]);
            }
        }
    })
  }

  console.log(addLink)

  return (
    <div className='mt-3 mb-3  rounded-3 w-75 mx-auto p-3'>
      <div className='m-5 border p-3 shadow'>
        {/* image */}
        <div >
          <img className='img-fluid ' variant='top' src={userIcon} style={{ height: "45px", width: "45px", float: "left" }} />
          <div>
            <h5 className='m-0'><b>saiteja</b></h5>
            <p className='m-0'>@20071A6614</p>
          </div>
          <hr />
        </div>
        {/* use props to get data */}
        <div className='mt-4'>
          <h3>
            <b>How does react work?How do i conditionally render react components</b>
          </h3>
          <p >
            px usually a form of nonsense Latin, but here are 10 generators that make the
            text more interesting. If you want to generate standard lorem ipsum, you can
            generate it in Word or from various websites. “Standard” is so boring though,
            especially when the original text is taken from a 1st-century Roman orator.
          </p>
          <h6 className='bold'>Code:</h6>
          <img src="https://miro.medium.com/max/1400/1*CGH27-rlhqPm2zhDDyqXFw.png" style={{ width: "60vw", height: "30vw" }} className="p-1"></img>
        </div>
      </div>
      {/* reply section */}
        <ForumReply/>
        <ForumReply/>
      {/* comment area */}
      <div className='m-5'>
        <FormGroup>
          <FormLabel><b>Add Comment</b></FormLabel>
          <FormControl as="textarea" rows={4} placeholder="Add your solution / suggestion" />
        </FormGroup>
        <FormGroup className='mt-3'>
          <FormLabel><b>Add Additional Links:</b></FormLabel>
          {[...Array(addLinkCount)].map((index) => (
            <InputGroup className='mt-3'>
              <FormControl 
                className='w-75 d-inline align-items-center'
                key={index} type="link"
                placeholder="e.g: https://www.solution.com/" 
                onClick={(event) => addLinkOnEnter(event)}
              />
              <Button className='btn btn-danger text-white' onClick={() => removeAddLink(index)}>
                {/* <AiFillDelete /> */} - 
              </Button>
            </InputGroup>
          ))}
          <br></br>
          <span>Add Link</span>
          <Button className="mx-auto float-end" onClick={handleAddLink}>
            {/* <RiAddCircleFill /> */} + 
          </Button>
        </FormGroup>

        <br></br>
        <br></br>
        <Button className='btn btn-success float-end mt-3'>Submit</Button>
      </div>
    </div>
  )
}

export default CommentsPage
