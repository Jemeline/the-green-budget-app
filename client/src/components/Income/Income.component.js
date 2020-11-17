import React, { Component} from 'react';
import {Alert,Button,Col,Row,Form,FormGroup,Container, Label, Input,Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import {categories} from './incomeCategories';
import Select from 'react-select';
import {getUser,getName,capitalizeFirst} from '../../utils/common';
import {addIncomeItem,generateToken,getIncomeData,removeIncomeItem,updateIncomeItem} from '../../utils/apiCalls';
import MUIDataTable from "mui-datatables";
import {Add as AddIcon} from '@material-ui/icons';
import { Fab } from 'react-tiny-fab';
import 'react-tiny-fab/dist/styles.css';
import {transformIncomeData, shiftIncomeData, tableTheme, 
        regDate, regAmount,generateAddIncomePayload,generateUpdateIncomePayload,
        generateDeleteIncomePayload,generateIncomeDataPayload, tableColumns} from "./IncomeUtils.js";
import {MuiThemeProvider} from '@material-ui/core';
import ReactLoading from 'react-loading';


class Income extends Component {
    constructor(props){
        super(props);
        this.state = {
            modal:false,
            description:'',
            amount:'',
            category:null,
            date:'',
            alertOn:false,
            alertMessage:'',
            alertColor:'danger',
            loading:'true',
            incomeId:0,
            newUser:false,
            modalFilter:false,

        }; 
        this.toggle = this.toggle.bind(this);  
        this.handleChange = this.handleChange.bind(this);
    }
    
    
// Alert
    onDismiss = () => {this.setState({alertOn:false,alertMessage:'',alertColor:'danger',})};
    handleAlert(message,color){
        this.setState({ alertMessage:message,alertOn:true, alertColor:color || 'danger'});
    };
    
//  Income Modal
    handleChange(event) {
        this.setState({ [event.target.name]:event.target.value});
    };
    toggle() {
        if (!this.state.newUser){
            this.setState({
                modal:!this.state.modal,
                hiddenButtons:!this.hiddenButtons,
            });
            this.clearFormFields();
            this.onDismiss();
        }
    };
    clearFormFields(){
        this.setState({description:'',amount:'',category:null,date:'',incomeId:0 });
    };
    handleCategory = category => {
        this.setState({category:category,});
    };
    async handleSubmit(type){
        try{
            this.onDismiss();
            if (type !== 'delete' && (!this.state.date || !this.state.amount || !this.state.category || !this.state.description)){
                this.handleAlert("Please Fill All Fields");
            } else if (!regDate.test(this.state.date)){
                this.handleAlert("Invalid Date Format");
            } else if (!regAmount.test(this.state.amount)) {
                this.handleAlert("Invalid Amount Format");
            } else{
                if (getUser()){
                    let data;
                    const token = await generateToken(getUser());
                    if (type ==="add"){
                        const payload = generateAddIncomePayload(this.state,token);
                        data = await addIncomeItem(payload.body,payload.headers);
                    } else if (type === 'update'){
                        const payload = generateUpdateIncomePayload(this.state,token);
                        data = await updateIncomeItem(payload.body,payload.headers);
                    } else {
                        const payload = generateDeleteIncomePayload(this.state,token);
                        data = await removeIncomeItem(payload.body,payload.headers);
                    };
                    if (!data){
                        this.handleAlert("Oops... Something Went Wrong");
                    } else {
                        if(type ==="add"){
                            if (this.state.newUser){
                                this.setState({newUser:false});
                                this.clearFormFields();
                                this.handleAlert("Great! Add another entry or click close to see your income.",'success');    
                            } else {
                                this.handleAlert("Success",'success');
                                this.clearFormFields();   
                            }    
                        } else {
                            this.toggle();
                        };  
                    };
                    await this.renderIncomeTable();
                } else {
                    this.props.history.push('/login');
                }; 
            }  
          } catch (error){
            console.log(error.message);
            this.handleAlert("Oops... Something Went Wrong");
        }
    };
    
// Table
    async renderIncomeTable (){
        try {
        this.clearFormFields();
        if (getUser()){
            const token = await generateToken(getUser());
            const payload = generateIncomeDataPayload(token);
            const data = await getIncomeData(payload.body,payload.headers);
            const transformedData = transformIncomeData(data);
            shiftIncomeData(transformedData);
            if (transformedData.length === 0){
                this.setState({ income: transformedData, loading:'complete',modal:true,newUser:true, hiddenButtons:true });
                this.handleAlert("Welcome " +capitalizeFirst(getName())+", add an entry to begin your journey with Green Financing.",'success');
            } else {
                this.setState({ income: transformedData, loading:'complete' });
            }
        } else {
            this.props.history.push('/login');
        }
        }catch (error){
            console.log(error);
            this.setState({loading:"error"})
        }
    };      

// General
    async componentDidMount(){
        this.setState({loading:'loading'});
        await this.renderIncomeTable();    
    };
    

    render() {
        const closeBtnExternal = <button className="close" onClick={this.toggle}></button>;
        const closeBtnInternal = <button style={{outline:'none'}} className="close" onClick={this.toggle} >&times;</button>;
        const options = {
            filter:true,
            filterType: "dropdown",
            columnOrder:[0,2,3,1],
            jumpToPage:true,
            search:true,
            searchOpen:true,
            searchPlaceholder:'Search My Income',
            selectableRows:'none',
            onRowClick:(value, tableMeta, updateValue) => {
                const row = this.state.income[tableMeta.rowIndex];
                this.toggle();
                this.setState({
                    description:row[2],
                    amount:parseFloat(row[3].slice(1)).toFixed(2),
                    category:categories.find(element => element.value===row[1]),
                    date:row[0],
                    incomeId:row[4],
                    hiddenButtons:false,
                });
            },
            MuiTableRow: { hover: { '&$root': { '&:hover': { backgroundColor: 'green' }, } }, 
            }    
        };
       
        if (this.state.loading === 'loading') {
            return (
                <div>
                    <br></br>
                    <ReactLoading className="loading" type={"spinningBubbles"} color={"#002884"} height={'15%'} width={'15%'} />
                </div>
        )};
        if (this.state.loading === 'error') {
            return (
                <div>
                    <br></br>
                    <ReactLoading className="loading" type={"spinningBubbles"} color={"#A62817"} height={'15%'} width={'15%'} />
                </div>
        )};
        
        return (
            <div>
            <div>
            <div>
            <Modal isOpen={this.state.modal} toggle={this.toggle} close={closeBtnExternal}>
                <ModalHeader toggle={this.toggle} close={closeBtnInternal}>Income Entry</ModalHeader>
                <ModalBody>
                    <Row>
                        <Col>
                            <Alert color={this.state.alertColor} isOpen={this.state.alertOn} toggle={this.onDismiss}>{this.state.alertMessage}</Alert>
                            <Form >
                            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                <Label><strong>Description</strong></Label>
                                <Input type="text" value={this.state.description} name="description" placeholder="Enter Description" onChange={this.handleChange} />
                            </FormGroup>
                            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                <Label><strong>Date</strong></Label>
                                <Input
                                type="date"
                                name="date"
                                placeholder="date placeholder"
                                onChange={this.handleChange}
                                value={this.state.date}
                                />
                            </FormGroup>
                            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                <Label><strong>Amount</strong></Label>
                                <Input type="number" value={this.state.amount} placeholder="0.00" name="amount" min="0" step="0.01" id="amount" pattern="^\d+(?:\.\d{1,2})?$" onChange={this.handleChange}/>    
                            </FormGroup>
                            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                <Label><strong>Category</strong></Label>
                                <Select
                                    value={this.state.category}
                                    onChange={this.handleCategory}
                                    options={categories}
                                />   
                            </FormGroup>
                            </Form>    
                        </Col>
                    </Row>
                </ModalBody>
                <ModalFooter>
                <Button outline color="info" hidden={!this.state.hiddenButtons} onClick={async () => {await this.handleSubmit('add');}}>Add</Button>{' '}
                <Button outline color="info" hidden={this.state.hiddenButtons} onClick={async () => {await this.handleSubmit('update');}}>Update</Button>{' '}
                <Button outline color="danger" hidden={this.state.hiddenButtons} onClick={async () => {await this.handleSubmit('delete');}}>Delete</Button>{' '}
                <Button outline color="secondary" onClick={this.toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
            </div>
            <br></br>
            <Container>
                
            <MuiThemeProvider theme={tableTheme}> 
                    <MUIDataTable
                        title={"My Income"}
                        data={this.state.income}
                        columns={tableColumns}
                        options={options}
                        className='table'
                    />  
                    </MuiThemeProvider>      
            </Container>
                <Fab icon={<AddIcon/>} onClick={this.toggle} mainButtonStyles={{backgroundColor: '#3f50b5',outline:'none'}} style={{bottom: 5,right:5}}></Fab>
            </div>
            </div>    
        );
    }
};
 
export default Income;