import './FakeHeader.css';
import React from 'react';

const FakeHeader = (props) => {
return (
  <div className={'Header'}>
    <h1 className={'Title'}>Green Finance</h1>
    <input class={'Button'} type="button" onClick={props.handleLogout} value="Logout" />
  </div>

);
}
export default FakeHeader;
