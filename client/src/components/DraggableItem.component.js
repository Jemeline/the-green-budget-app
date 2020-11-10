import React, { Component} from 'react';
import Draggable from "react-draggable";
import AddIcon from '@material-ui/icons/Add';
import { Fab, Action } from 'react-tiny-fab';
import 'react-tiny-fab/dist/styles.css';

class DraggableItem extends Component {
  render() {
    return <Draggable
    handle=".drag"
    defaultPosition={{x: 0, y: 0}}
    position={null}
    grid={[1, 1]}
    scale={1}
    onStart={this.handleStart}
    onDrag={this.handleDrag}
    onStop={this.handleStop}
    >
        <div className="drag">
    <Fab icon={<AddIcon/>} mainButtonStyles={{backgroundColor: '#e74c3c',outline:'none',position: "fixed"}} ></Fab>                
    </div>
    </ Draggable>
  }
}
 
export default DraggableItem;