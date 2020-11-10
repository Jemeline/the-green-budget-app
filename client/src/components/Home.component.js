import React, { Component} from 'react';
import DraggableItem from './DraggableItem.component';

class Home extends Component {
  render() {
    return <div>
      <h4>Home</h4>
      <p>This is Home page.</p>
      <DraggableItem/>
    </div>
  }
}
 
export default Home;