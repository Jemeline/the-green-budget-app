import React, { Component} from 'react';
import {Alert,Button,Card,CardHeader,CardBody,CardTitle, Col, Container, Nav, NavLink, NavItem,Row,TabPane,TabContent,Form,
    FormGroup, Label, Input,} from 'reactstrap';
import axios from 'axios';
import {getJWTToken} from '../utils/common';


 
class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            emailLogin : '',
            passwordLogin : '',
            activeTab: '1',
            invalidLoginAlert:false,
            alreadyLoggedInAlert:false,
            emailRegister:'',
            firstnameRegister:'',
            lastnameRegister:'',
            passwordRegister : '',
            passwordConfirm : '',
            invalidPasswordLengthAlert:false,
            invalidPasswordMatchAlert:false,
            failedRegistrationAlert:false,
            alreadyLoggedInRegisterAlert:false,
            alertMessage:'',
            registrationAlert:false,
            loginAlert: false

        };   
        this.handleActiveTab = this.handleActiveTab.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    handleActiveTab(tab) {
        if (this.state.activeTab !== tab) {
          this.setState({ activeTab: tab });
          
        }
    }
    handleAlert(message,alert){
        this.setState({ alertMessage:message});
        this.setState({ [alert]:true});
    }
    handleChange(event) {
        this.setState({ [event.target.name]:event.target.value});
    }

    
    handleSubmit = () => {
        getJWTToken(this.state.emailLogin)
          .then( (response) => {
              sessionStorage.setItem('token', response.data.token);
              if (sessionStorage.getItem('token')){
                axios.post('https://green-budget-app.herokuapp.com/api/users/validate-user', {
                sessionUser:this.state.emailLogin,
                email: this.state.emailLogin,
                password: this.state.passwordLogin
                },{
                    headers: {
                      'Authorization': `Bearer ${sessionStorage.getItem('token')}` 
                }})
                    .then( (response) => {  
                    if (this.getSessionUser() === null) {
                        sessionStorage.setItem('user', response.data.data[0].email);
                        sessionStorage.setItem('admin', response.data.data[0].isAdmin);
                        sessionStorage.setItem('name', response.data.data[0].firstname);
                        this.props.history.push('/dashboard');
                    }else{
                        this.setState({ alertMessage:"Please Logout First"});
                        this.setState({ loginAlert:true});
                    }
                    
                    })
                    .catch(err => {
                        this.setState({ alertMessage:"We do not recognize your username and/or password"});
                        this.setState({ loginAlert:true});
                })
            } else {
                this.setState({ alertMessage:"Oops... Something Went Wrong"});
                this.setState({ loginAlert:true});
            }

            
          })
          .catch(err => {
            this.setState({ invalidLoginAlert:true});
        });  
    }

    handleSubmitRegister = () => {
        this.onDismiss();
        if(this.state.passwordRegister.length < 8){
            this.handleAlert("Your password must have at least 8 characters",'registrationAlert');
        } else if (this.state.passwordRegister !== this.state.passwordConfirm){
            this.handleAlert("Your passwords do not match",'registrationAlert');
        } else if (this.state.emailRegister.length === 0 || this.state.firstnameRegister.length === 0 ||this.state.lastnameRegister.length === 0){
            this.handleAlert("You must fill out all fields",'registrationAlert');
        } else{
            if (this.getSessionUser() !== null){
                this.handleAlert("Please Logout First",'registrationAlert');
            }else{
                getJWTToken(this.state.emailRegister)
          
          .then( (response) => {
              sessionStorage.setItem('token', response.data.token);
              if (sessionStorage.getItem('token')){
                axios.post('http://localhost:5000/api/users/create-user', {
                sessionUser:this.state.emailRegister,
                email: this.state.emailRegister,
                password: this.state.passwordRegister,
                firstname:this.state.firstnameRegister,
                lastname: this.state.lastnameRegister,
                },{
                    headers: {
                      'Authorization': `Bearer ${sessionStorage.getItem('token')}` 
                }})
                    .then( (response) => {  
                        // console.log(response.data.data.email);
                        sessionStorage.setItem('user', response.data.data.email);
                        sessionStorage.setItem('admin', response.data.data.isAdmin);
                        sessionStorage.setItem('name', response.data.data.firstname);
                        this.props.history.push('/dashboard');
                    
                    })
                    .catch(err => {
                        console.log(err);
                        this.setState({ alertMessage:"Oops... Something Went Wrong"});
                        this.setState({ registrationAlert:true});
                })
            } else {
                this.setState({ alertMessage:"Oops... Something Went Wrong"});
                this.setState({ registrationAlert:true});
            }

            
          })
          .catch(err => {
            this.setState({ alertMessage:"Oops... Something Went Wrong"});
            this.setState({ registrationAlert:true});
        });  

            }
            
        }
    }

    onDismiss = () => {this.setState({loginAlert:false});
                this.setState({ registrationAlert:false});

    }
    onDismissAlreadyLoggedIn = () => this.setState({onDismissAlreadyLoggedIn:false});
    onDismissReg = () => this.setState({registrationAlert:false});

    getSessionUser = () => {
        return sessionStorage.getItem('user') || null;
    }

    componentDidMount(){    
    }
    
    render() {
        return (
            <div>
            <h4>Login</h4>
            <p>This is my Login Page.</p>

            <Container style={{width:"50%"}}>
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
                                        <Alert color="danger" isOpen={this.state.loginAlert} toggle={this.onDismiss}>
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
                                            <Button onClick={this.handleSubmit}
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
                                            <Alert color="danger" isOpen={this.state.registrationAlert} toggle={this.onDismiss}>
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
                                                
                                                <Button onClick={this.handleSubmitRegister}
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