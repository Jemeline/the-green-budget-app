import React, { Component} from 'react';
import Draggable from "react-draggable";

class DraggableItem extends Component {
  render() {
    return <Draggable
    handle=".drag"
    defaultPosition={{x: 0, y: 0}}
    position={null}
    grid={[5, 5]}
    scale={1}
    onStart={this.handleStart}
    onDrag={this.handleDrag}
    onStop={this.handleStop}
    >
    <div className="drag">I can be dragged</div>
    </ Draggable>
  }
}
 
export default DraggableItem;