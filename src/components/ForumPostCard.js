import React from 'react';
import {Button} from 'react-bootstrap'
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import ForumPostForm from './ForumPostForm';

const ForumPostCard = () => {

    let [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div>

            {/* <div className='text-center' >
                <h1 className='d-inline-block text-center'>Welcome to Discussion Portal..</h1>
                
            </div> */}
            <div>
                <h1
                    style={{
                    fontFamily: "shalimar",
                    fontSize: "45px",
                    }}
                    className="d-inline-block m-2 text-center"
                >
                    {" "}
                    <b>Welcome to Discussion Portal..</b>{" "}
                </h1>

            </div>
            <div className=' '>
                    ~~~~~<Button className='bg-dark m-2'  onClick={handleShow}> + Ask a Question</Button>~~~~~

            </div>

            <Modal size="lg" show={show} onHide={handleClose} backdrop="static" scrollable centered>
                <Modal.Header closeButton>
                    <Modal.Title>Post your doubts here</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ForumPostForm />
                </Modal.Body>
               
            </Modal>
        </div>
    );
}

export default ForumPostCard;
