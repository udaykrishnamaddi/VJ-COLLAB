import React from "react";
import { Link } from "react-router-dom";
// import "./Home.css";
function Home() {
  return (
    <div className="">
      <div className=" w-75 mx-auto">
        <div className="">
          <h1
            style={{
              fontFamily: "shalimar",
              fontSize: "80px",
              textAlign: "center",
              marginTop: "1px",
              
            }}
          >
            <b className="">Welcome to VJ Collab..</b>
          </h1>


        </div>
        
        <hr className="w-50 mx-auto"></hr>
        <br></br>
        <div fluid="md" className="container">
          <div className="row">
            <div className="col mb-4" sm={8}>
              <div className="border rounded text-center shadow shadow-3 p-3">
                <br></br>
                <h3>
                  <b>Collaboration</b>
                </h3>
                <hr className="mx-auto w-50"></hr>
                <p>Join, Explore, Connect and Achieve!!!</p>
                <p>
                  Find people that match your interests and work out to solve
                  problems.
                </p>
                <button className="btn btn-primary">
                  <Link
                    className="text-white"
                    to="/collab"
                    style={{ textDecoration: "none" }}
                  >
                    Collaboration
                  </Link>
                </button>
                <br></br>
                <br></br>
              </div>
            </div>
            <div className="col mb-4" sm={8}>
              <div className="border rounded text-center shadow shadow-3 p-3">
                <br></br>
                <h3>
                  <b>Discussion Forums</b>
                </h3>
                <hr className="mx-auto w-50"></hr>
                <p>Got Stuck? Need Help?</p>
                <p>
                  Find people who gone through your problems and get things
                  fixed.
                </p>
                <br></br>
                <button className="btn btn-primary">
                  <Link
                    className="text-white"
                    to="/forum"
                    style={{ textDecoration: "none" }}
                  >
                    Forum
                  </Link>
                </button>
                <br></br>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
