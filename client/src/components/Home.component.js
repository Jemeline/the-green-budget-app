import React, { Component} from 'react';
import {
  Card, Button, CardImg, CardTitle, CardText, CardGroup,
  CardSubtitle, CardBody
} from 'reactstrap';
import pageImage from "../images/Homepage.png";
import "../css/Home.css";
import {Link } from 'react-router-dom'

class Home extends Component {
  constructor(props){
    super(props);
    this.state = {}
  }
  render() {
    return <div>
      <img id="homeImage" src={pageImage}></img>
      <CardGroup>
      <Card>
        <CardImg top width="100%" src="https://s.clipartkey.com/mpngs/s/30-300149_transparent-white-home-icon-png-government-budget-india.png" alt="Card image cap" />
        <CardBody>
          <CardTitle tag="h2">account</CardTitle>
          <CardSubtitle tag="h3" className="mb-2 text-muted">for where your money is going</CardSubtitle>
          <CardText></CardText>
        </CardBody>
      </Card>
      <Card>
        <CardImg top width="100%" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZQvF5BHkG7vqwYCjz1ykevEIG1IaNU9cBoQ&usqp=CAU" alt="Card image cap" />
        <CardBody>
          <CardTitle tag="h2">assess</CardTitle>
          <CardSubtitle tag="h3" className="mb-2 text-muted">your carbon footprint</CardSubtitle>
          <CardText></CardText>
        </CardBody>
      </Card>
      <Card>
        <CardImg top width="100%" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR392RYbHgev2ITNnsCBZ6sgLJ6PgqKuTyTyg&usqp=CAU" alt="Card image cap" />
        <CardBody>
          <CardTitle tag="h2">invest</CardTitle>
          <CardSubtitle tag="h3" className="mb-2 text-muted">in your future and the planet's</CardSubtitle>
          <CardText></CardText>
        </CardBody>
      </Card>
      <Card>
        <CardImg top width="100%" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxFhBi6e9w9UQehTBSFtZZlzf_L1LvefA1GA&usqp=CAU" alt="Card image cap" />
        <CardBody>
          <CardTitle tag="h2">inspire</CardTitle>
          <CardSubtitle tag="h3" className="mb-2 text-muted">family and friends to do the same!</CardSubtitle>
          <CardText></CardText>
        </CardBody>
      </Card>
    </CardGroup>
    <Button onClick={() => { this.props.history.push('/login')}} outline color="secondary" ><strong>Get started now</strong></Button>{''}

    </div>
  }
}
 
export default Home;