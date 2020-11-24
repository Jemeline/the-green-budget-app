import React, { Component} from 'react';
import {
  Card, Button, CardImg, CardTitle, CardText, CardGroup,
  CardSubtitle, CardBody
} from 'reactstrap';
import pageImage from "../images/Homepage.png";
import "../css/Home.css";

class Home extends Component {
  constructor(props){
    super(props);
    this.state = {}
  }
  render() {
    return <div>
      <img id="homeImage" src={pageImage}></img>
      <CardGroup>
      <Card className="home-card" style={{backgroundColor:"#412234"}}>
        <CardBody className="home-card-body">
          <CardTitle tag="h2">account</CardTitle>
          <CardSubtitle tag="h3" className="mb-2 text-muted">for where your money is going</CardSubtitle>
          <CardText></CardText>
        </CardBody>
      </Card>
      <Card className="home-card" style={{backgroundColor:"#412234"}}>
        <CardBody className="home-card-body">
          <CardTitle tag="h2">assess</CardTitle>
          <CardSubtitle tag="h3" className="mb-2 text-muted">your carbon footprint</CardSubtitle>
          <CardText></CardText>
        </CardBody>
      </Card>
      <Card className="home-card"style={{backgroundColor:"#412234"}}>
        <CardBody className="home-card-body">
          <CardTitle tag="h2">invest</CardTitle>
          <CardSubtitle tag="h3" className="mb-2 text-muted">in your future and the planet's</CardSubtitle>
          <CardText></CardText>
        </CardBody>
      </Card>
      <Card className="home-card" style={{backgroundColor:"#412234"}}>
        <CardBody className="home-card-body">
          <CardTitle tag="h2">inspire</CardTitle>
          <CardSubtitle tag="h3" className="mb-2 text-muted">family and friends to do the same!</CardSubtitle>
          <CardText></CardText>
        </CardBody>
      </Card>
    </CardGroup>
    <Button outline onClick={() => { this.props.history.push('/login')}} style={{color:"#412234",outline:"none"}} outline color="secondary" ><strong>Get started now</strong></Button>{''}

    </div>
  }
}
 
export default Home;