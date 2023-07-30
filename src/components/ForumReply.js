import React from 'react'
import userIcon from '../images/user-icon.png';

function ForumReply() {
  return (
<div className='m-5 border shadow p-3'>
    <div className='pt-2 pr-2'>
      <img className='img-fluid ' variant='top' src={userIcon} style={{ height: "45px", width: "45px", float: "left" }} />
      <div>
        <h5 className='m-0'><b>Harikesh</b></h5>
        <p className='m-0'>@20071A6629</p>
      </div>
      <hr />
    </div>
      {/* solution */}
      <p className='p-1'>React-Bootstrap replaces the Bootstrap JavaScript. Each component has been built from scratch as a true React component, without unneeded dependencies like jQuery.As one of the oldest React libraries, React-Bootstrap has evolved and grown alongside React, making it an excellent choice as your UI foundation.</p>
</div>
  )
}

export default ForumReply
