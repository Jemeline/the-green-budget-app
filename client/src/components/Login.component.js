import React, { Component} from 'react';
import {Alert,Button,Card,CardHeader,CardBody,Col, Container, Nav, NavLink, NavItem,Row,TabPane,TabContent,Form,
    FormGroup, Label, Input,} from 'reactstrap';
import {getUser, handleLoginUser, generateTokenValidationPayload, generateRegisterUserPayload} from '../utils/common';
import {generateToken, validateToken, register} from '../utils/apiCalls';

class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            activeTab: '1',
            emailLogin : '',
            passwordLogin : '',
            emailRegister:'',
            firstnameRegister:'',
            lastnameRegister:'',
            passwordRegister : '',
            passwordConfirm : '',
            alertMessage:'',
            registrationAlert:false,
            alertOn: false
    
        };
        this.handleActiveTab = this.handleActiveTab.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    handleActiveTab(tab) {
        if (this.state.activeTab !== tab) {
          this.setState({ activeTab: tab });
          this.onDismiss(); 
        }
    }
    handleAlert(message){
        this.setState({ alertMessage:message});
        this.setState({ alertOn:true});
    }
    handleChange(event) {
        this.setState({ [event.target.name]:event.target.value});
    }
    onDismiss = () => {this.setState({alertOn:false})};
    
    async handleLogin(){
      try{
        this.onDismiss();
        if (!getUser()){
          const token = await generateToken(this.state.emailLogin);
          const body = generateTokenValidationPayload(this.state,token).body;
          const headers= generateTokenValidationPayload(this.state,token).headers;
          const data = await validateToken(body,headers);
          if (!data){
            this.handleAlert("We do not recognize your username and/or password");
          } else {
            handleLoginUser(data);
            this.props.history.push('/dashboard');
          }  
        } else {
          this.handleAlert("You are Already Logged In");
        };
      } catch (error){
        console.log(error);
        this.handleAlert("Oops... Something Went Wrong");
      }
    };
    
    async handleRegister(){
      try{
        this.onDismiss();
        if (this.state.passwordRegister.length < 8){
          this.handleAlert("Your password must have at least 8 characters");
        } else if (this.state.passwordRegister !== this.state.passwordConfirm){
            this.handleAlert("Your passwords do not match");
        } else if (this.state.emailRegister.length === 0 || this.state.firstnameRegister.length === 0 ||this.state.lastnameRegister.length === 0){
            this.handleAlert("You must fill out all fields");
        } else{
            if (!getUser()){
              const token = await generateToken(this.state.emailRegister);
              const body = generateRegisterUserPayload(this.state,token).body;
              const headers= generateRegisterUserPayload(this.state,token).headers;
              const data = await register(body,headers);
              if (!data){
                this.handleAlert("Oops... Something Went Wrong");
              } else {
                handleLoginUser(data);
                this.props.history.push('/dashboard');
              }  
            } else {
              this.handleAlert("You are Already Logged In");
            };  
        }  
      } catch (error){
        console.log(error);
        this.handleAlert("Oops... Something Went Wrong");
      }
    };
    
    render() {
        return (
            <div>
            <Container style={{width:"50%",position:"absolute",top: "25%", bottom: 0, left: 0, right: 0,margin: "auto"}} >
                <Row>
                    <Col>
                        <Card>
                        <CardHeader>
                            <Nav tabs>
                            <NavItem>
                                <NavLink active={this.state.activeTab === '1'}
                                    onClick={() => {this.handleActiveTab('1')}}>
                                        Login
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink active={this.state.activeTab === '2'}
                                    onClick={() => {this.handleActiveTab('2')}}>
                                        Register
                                </NavLink>
                            </NavItem>
                            </Nav>
                            <TabContent activeTab={this.state.activeTab}>
                                <TabPane tabId="1">
                                <Row>
                                <Col>
                                    <CardBody>
                                        <Alert color="danger" isOpen={this.state.alertOn} toggle={this.onDismiss}>
                                                {this.state.alertMessage}
                                        </Alert>
                                        <Container >
                                        <Form className="form">
                                            <Col>
                                                <FormGroup>
                                                <Label>Email</Label>
                                                <Input
                                                    type="email"
                                                    name="emailLogin"
                                                    placeholder="email@email.com"
                                                    onChange={this.handleChange}
                                                />
                                                </FormGroup>
                                            </Col>
                                            <Col>
                                                <FormGroup>
                                                <Label>Password</Label>
                                                <Input
                                                    type="password"
                                                    name="passwordLogin"
                                                    placeholder="********"
                                                    onChange={this.handleChange}
                                                />
                                                </FormGroup>
                                            </Col>
                                            <Button onClick={async () => {await this.handleLogin();}}
                                                    color="success"
                                            >Login</Button>
                                        </Form>
                                        </Container>
                                    </CardBody>
                                </Col>
                                </Row>
                                </TabPane>
                                <TabPane tabId="2">
                                <Row>
                                    <Col>
                                        <CardBody>
                                            <Alert color="danger" isOpen={this.state.alertOn} toggle={this.onDismiss}>
                                                {this.state.alertMessage}
                                            </Alert>
                                            <Container>
                                            <Form className="form"> 
                                                <Row form>
                                                    <Col>
                                                    <FormGroup>
                                                    <Label>Email</Label>
                                                    <Input
                                                        type="email"
                                                        name="emailRegister"
                                                        placeholder="email@email.com"
                                                        onChange={this.handleChange}
                                                    />
                                                    </FormGroup>
                                                    </Col>
                                                </Row>
                                                <Row form>
                                                    <Col md={6}>
                                                    <FormGroup>
                                                        <Label>Firstname</Label>
                                                        <Input type="text" name="firstnameRegister" placeholder="First Name" onChange={this.handleChange}/>
                                                    </FormGroup>
                                                    </Col>
                                                    <Col md={6}>
                                                    <FormGroup>
                                                        <Label>Lastname</Label>
                                                        <Input type="text" name="lastnameRegister" placeholder="Last Name" onChange={this.handleChange}/>
                                                    </FormGroup>
                                                    </Col>
                                                </Row>
                                                <Row form>
                                                    <Col md={6}>
                                                    <FormGroup>
                                                        <Label>Password</Label>
                                                        <Input type="password" name="passwordRegister" placeholder="********" onChange={this.handleChange}/>
                                                    </FormGroup>
                                                    </Col>
                                                    <Col md={6}>
                                                    <FormGroup>
                                                        <Label>Confirm Password</Label>
                                                        <Input type="password" name="passwordConfirm" placeholder="********" onChange={this.handleChange}/>
                                                    </FormGroup>
                                                    </Col>
                                                </Row>
                                                
                                                <Button onClick={async () => {await this.handleRegister();}}
                                                        color="success"
                                                >Register</Button>
                                            </Form>
                                            </Container>
                                        </CardBody>
                                    </Col>
                                </Row>
                                </TabPane>
                            </TabContent>
                        </CardHeader>
                        </Card>
                    </Col>
                </Row>
            </Container>
            
            </div>
        );
    }
}
 
export default Login;