import React, { Component} from 'react';
import {Spinner,Alert,Button,Col,Row,Form,FormGroup,Container, Label, Input,Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import {categories,subcategories} from './budgetCategories';
import Select from 'react-select';
import {getUser,getName} from '../../utils/common';
import '../../css/BudgetForm.css';
import {addBudgetItem,generateToken,getBudgetData,removeBudgetItem,updateBudgetItem} from '../../utils/apiCalls';
import MUIDataTable from "mui-datatables";
import {Refresh as RefreshIcon,Add as AddIcon, FilterList as FilterListIcon,
        Cancel as CancelIcon,Settings as SettingsIcon, MoreHoriz as MoreHorizIcon,
        MoreVert as MoreVertIcon, Widgets as WidgetsIcon, DateRange as DateRangeIcon} from '@material-ui/icons';
import { Fab, Action } from 'react-tiny-fab';
import 'react-tiny-fab/dist/styles.css';
import {transformBudgetData, shiftBudgetData, tableTheme, ButtonForm, 
        regDate, regAmount,generateAddExpensePayload,generateUpdateExpensePayload,
        generateDeleteExpensePayload,generateBudgetDataPayload, tableColumns} from "./BudgetUtils.js";
import {MuiThemeProvider} from '@material-ui/core';
import ReactLoading from 'react-loading';

  
class Budget extends Component {
    constructor(props){
        super(props);
        this.state = {
            modal:false,
            description:'',
            amount:'',
            category:null,
            subcategories:subcategories,
            subcategory:null,
            date:'',
            alertOn:false,
            alertMessage:'',
            alertColor:'danger',
            loading:'true',
            budgetId:0, 
            buttonFormat:2,
<<<<<<< HEAD
            newUser:false,
            modalFilter:false,
            startDate:'',
            endDate:''
=======
            newUser:false
>>>>>>> main
        }; 
        this.toggleFilter = this.toggleFilter.bind(this);
        this.toggle = this.toggle.bind(this);  
        this.handleChange = this.handleChange.bind(this);
    }
    // Alert
    onDismiss = () => {this.setState({alertOn:false,alertMessage:'',alertColor:'danger',})};
    handleAlert(message,color){
        this.setState({ alertMessage:message,alertOn:true, alertColor:color || 'danger'});
    };
    // Modal
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
    toggleFilter() {
        this.setState({modalFilter:!this.state.modalFilter});
    };
    async handleFilterSubmit() {
        try{
            this.onDismiss();
            if (!this.state.startDate || !this.state.endDate){
                this.handleAlert("Please Fill All Fields");
            }else{
                const startDate = new Date(this.state.startDate);
                const endDate = new Date(this.state.endDate);
                if (!regDate.test(this.state.startDate)){
                    this.handleAlert("Invalid Start Date Format");
                } else if (!regDate.test(this.state.endDate)){
                    this.handleAlert("Invalid End Date Format"); 
                }else if (startDate.getTime() > endDate.getTime()){
                    this.handleAlert("Invalid Date Order Entered"); 
                }else{
                    await this.renderBudget();
                    this.setState({
                        budget:this.state.budget.filter(function(entry){
                            const date = new Date(entry[0]);
                            return date.getTime() >= startDate.getTime() && date.getTime() <= endDate.getTime();
                        }
                        )
                    });
                    this.toggleFilter();
                }
            }
        }catch (error){
            console.log(error);
            this.handleAlert("Oops... Something Went Wrong");
        }
    };
    clearFormFields(){
        this.setState({description:'',amount:'',category:null,subcategories:subcategories,
            subcategory:null,date:'',budgetId:0,startDate:'',endDate:'' 
        });
    };
    handleCategory = category => {
        this.setState({category:category,
            subcategories:subcategories.filter(word => word.parent === category.value)
        });
    };
    handleSubcategory = subcategory => {
        this.setState({subcategory:subcategory});
    };
    async handleSubmit(type){
        try{
            this.onDismiss();
            if (type !== 'delete' && (!this.state.date || !this.state.amount || !this.state.category || !this.state.subcategory ||!this.state.description)){
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
                        const payload = generateAddExpensePayload(this.state,token);
                        data = await addBudgetItem(payload.body,payload.headers);
                    } else if (type === 'update'){
                        const payload = generateUpdateExpensePayload(this.state,token);
                        data = await updateBudgetItem(payload.body,payload.headers);
                    } else {
                        const payload = generateDeleteExpensePayload(this.state,token);
                        data = await removeBudgetItem(payload.body,payload.headers);
                    };
                    if (!data){
                        this.handleAlert("Oops... Something Went Wrong");
                    } else {
                        if(type ==="add"){
                            if (this.state.newUser){
                                this.setState({newUser:false});
                                this.clearFormFields();
                                this.handleAlert("Great! Add another entry or click close to see your budget.",'success');    
                            } else {
                                this.handleAlert("Success",'success');
                                this.clearFormFields();   
                            }    
                        } else {
                            this.toggle();
                        };  
                    };
                    await this.renderBudget();
                } else {
                      this.handleAlert("You Must Login First");
                }; 
            }  
          } catch (error){
            console.log(error);
            this.handleAlert("Oops... Something Went Wrong");
        }
    };

    async thisYear(){
        const year = new Date().getFullYear();
        const month = new Date().getMonth()+1;
        await this.renderBudget();
        this.setState({
            budget:this.state.budget.filter(entry=>
                entry[0].slice(0,4)===year.toString()
            )
        });
    };

    async thisMonth(){
        const year = new Date().getFullYear();
        const month = new Date().getMonth()+1;
        await this.renderBudget();
        this.setState({
            budget:this.state.budget.filter(entry=>
                entry[0].slice(0,4)===year.toString()&& entry[0].slice(5,7)===month.toString()
            )
        });
    };

    // Table
    async renderBudget (){
<<<<<<< HEAD
        this.clearFormFields();
=======
        // this.setState({loading:'loading'});
>>>>>>> main
        if (getUser()){
            const token = await generateToken(getUser());
            const payload = generateBudgetDataPayload(this.state,token);
            const data = await getBudgetData(payload.body,payload.headers);
            const transformedData = transformBudgetData(data);
            shiftBudgetData(transformedData);
            if (transformedData.length === 0){
                this.setState({ budget: transformedData, loading:'complete',modal:true,newUser:true, hiddenButtons:true });
                this.handleAlert("Welcome " +getName()+", add an entry to begin your journey with Green Financing.",'success');
            } else {
                this.setState({ budget: transformedData, loading:'complete' });
            }    
        } else {
            this.setState({loading:'abort'});
        }
    };

    // FAB
    changeStyle(style){
        this.setState({buttonFormat:style});
    };
    
    async componentDidMount(){
        this.setState({loading:'loading'});
        await this.renderBudget();
    };
   
    render() {
        const closeBtnExternal = <button className="close" onClick={this.toggle}></button>;
        const closeBtnInternal = <button style={{outline:'none'}} className="close" onClick={this.toggle} >&times;</button>;
        const options = {
            filter:true,
            filterType: "dropdown",
            columnOrder:[0,3,4,1,2],
            jumpToPage:true,
            search:true,
            searchOpen:true,
            searchPlaceholder:'Search My Budget',
            selectableRows:'none',
            onRowClick:(value, tableMeta, updateValue) => {
                const row = this.state.budget[tableMeta.rowIndex];
                this.toggle();
                this.setState({
                    description:row[3],
                    amount:parseFloat(row[4].slice(1)).toFixed(2),
                    category:categories.find(element => element.value===row[1]),
                    subcategory:subcategories.find(element => element.value===row[2]),
                    date:row[0],
                    budgetId:row[5],
                    hiddenButtons:false,
                    subcategories:subcategories.filter(word => word.parent === row[1])
                });
            },
            MuiTableRow: { hover: { '&$root': { '&:hover': { backgroundColor: 'green' }, } }, 
            }
            
        }
        
        if (this.state.loading === 'loading') {
            return (
                <div>
                    <br></br>
                    <ReactLoading className="loading" type={"spinningBubbles"} color={"#002884"} height={'15%'} width={'15%'} />
                </div>
        )};
        if (this.state.loading === 'abort') { 
            return (
                <div>
                    <br></br>
                    <Alert color={"danger"}>Oops... Something Went Wrong</Alert>
                </div>
        )};
        return (
            <div>
            <div>
<<<<<<< HEAD
            
            <Modal isOpen={this.state.modalFilter} toggle={this.toggleFilter} close={closeBtn}>
                <ModalHeader>Date Range Filter</ModalHeader>
                <ModalBody>
                    <Row>
                        <Col>
                            <Alert color={this.state.alertColor} isOpen={this.state.alertOn} toggle={this.onDismiss}>
                                {this.state.alertMessage}
                            </Alert>
                            <Form >
                            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                <Label><strong>Start Date</strong></Label>
                                <Input
                                type="date"
                                name="startDate"
                                placeholder="start date placeholder"
                                onChange={this.handleChange}
                                value={this.state.startDate}
                                />
                            </FormGroup>
                            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                <Label><strong>End Date</strong></Label>
                                <Input
                                type="date"
                                name="endDate"
                                placeholder="end date placeholder"
                                onChange={this.handleChange}
                                value={this.state.endDate}
                                />
                            </FormGroup>
                            </Form>    
                        </Col>
                    </Row>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={async()=> await this.handleFilterSubmit()}>Apply</Button>{' '}
                    <Button color="secondary" onClick={this.toggleFilter}>Cancel</Button>
                </ModalFooter>
            </Modal>

=======
            <Button color="danger" onClick={() => {this.thisMonth()}}>This Month</Button>
>>>>>>> main
            <div>
            <Modal isOpen={this.state.modal} toggle={this.toggle} close={closeBtnExternal}>
                <ModalHeader toggle={this.toggle} close={closeBtnInternal}>Budget Entry</ModalHeader>
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
                            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                <Label ><strong>Subcategory</strong></Label>
                                <Select
                                    value={this.state.subcategory}
                                    onChange={this.handleSubcategory}
                                    options={this.state.subcategories}
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
            <Container fluid={true}>
            <MuiThemeProvider theme={tableTheme}> 
                    <MUIDataTable
                        title={"My Budget"}
                        data={this.state.budget}
                        columns={tableColumns}
                        options={options}
                        className='table'
                    />  
                    </MuiThemeProvider>      
            </Container>
            <Fab icon={<RefreshIcon/>} onClick={async () => {await this.renderBudget();}} mainButtonStyles={{backgroundColor: '#e74c3c',outline:'none'}} style={ButtonForm[this.state.buttonFormat].refresh}></Fab>
                    <Fab icon={<AddIcon/>} onClick={this.toggle} mainButtonStyles={{backgroundColor: '#e74c3c',outline:'none'}} style={ButtonForm[this.state.buttonFormat].add}></Fab>
                    <Fab icon={<SettingsIcon/>} mainButtonStyles={{backgroundColor: '#D3D3D3',outline:'none'}} style={ButtonForm[this.state.buttonFormat].drag}>
                    <Action style={{backgroundColor: '#3498db',outline:'none', right:75,top:25}} onClick={() => { this.changeStyle(0) }}>
                    <MoreVertIcon/>
                    </Action>
                    <Action style={{backgroundColor: '#3498db',outline:'none',right:100,top:25}} onClick={() => { this.changeStyle(2) }}>
                    <WidgetsIcon/>
                    </Action>
                    <Action style={{backgroundColor: '#3498db',outline:'none',right:110,top:25}} onClick={() => { this.changeStyle(1)}}>
                    <MoreHorizIcon/>
                    </Action>
                    </Fab>
                    <Fab icon={<FilterListIcon/>} mainButtonStyles={{backgroundColor: '#e74c3c',outline:'none'}} style={ButtonForm[this.state.buttonFormat].filter}>
                        <Action style={{backgroundColor: '#3498db',outline:'none'}} onClick={this.toggleFilter}>
                        <DateRangeIcon/>
                        </Action>
                        <Action style={{backgroundColor: '#3498db',outline:'none'}} onClick={async () => {await this.thisYear()}}>
                        Y
                        </Action>
                        <Action style={{backgroundColor: '#3498db',outline:'none'}} onClick={async() => {await this.thisMonth()}}>
                        M
                        </Action>
                    </Fab>   
            </div>
            </div>    
        );
    }
};
 
export default Budget;