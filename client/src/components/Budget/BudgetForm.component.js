import React, { Component} from 'react';
import {Alert,Button,Col,Row,Form,FormGroup,Container, Label, Input,Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import {categories,subcategories} from '../../utils/budgetCategories';
import Select from 'react-select';
import {getUser} from '../../utils/common';
import '../../css/BudgetForm.css';
import {addBudgetItem,generateToken,getBudgetData,removeBudgetItem,updateBudgetItem} from '../../utils/apiCalls';
import MUIDataTable from "mui-datatables";
import IconButton from '@material-ui/core/IconButton';
import RefreshIcon from '@material-ui/icons/Refresh';
import AddIcon from '@material-ui/icons/Add';
import FilterListIcon from '@material-ui/icons/FilterList';
import CancelIcon from '@material-ui/icons/Cancel';
import SettingsIcon from '@material-ui/icons/Settings';
import { Fab, Action } from 'react-tiny-fab';
import 'react-tiny-fab/dist/styles.css';
import DraggableItem from "./DraggableItem.component";
import Draggable from "react-draggable";
import OpenWithIcon from '@material-ui/icons/OpenWith';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import WidgetsIcon from '@material-ui/icons/Widgets';


function transformBudgetData(data){
    return data.map(item => 
        Object.values(item))
};

function transformBudgetData2(data){
    data.map(item => {item.push(item.shift()); item.push(item.shift());});
};


class BudgetForm extends Component {
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
            budgetData:'',
            loading:'',
            budgetId:0, 
            budgetFormation:[{
                filter:{bottom: 275,right:15},
                refresh:{bottom: 200,right:15},
                add:{bottom: 125,right:15},
                drag:{bottom: 50,right:15}
            }]
        }; 
        this.toggle = this.toggle.bind(this);  
        this.handleChange = this.handleChange.bind(this);
        this.thisMonth = this.thisMonth.bind(this);
    }
    thisMonth(){
        console.log(this.state.budget);
        const year = new Date().getFullYear();
        const month = new Date().getMonth()+1;
        // console.log(month);
        // console.log(year);
        this.setState({
            budget:this.state.budget.filter(entry=> 
                // console.log(entry);
                // console.log(entry[0].slice(0,4)===year.toString())
                entry[0].slice(0,4)===year.toString()&& entry[0].slice(5,7)===month.toString()
            )
        });
        console.log(this.state.budget);
    };
    toggle() {
        this.setState({modal:!this.state.modal,
                    hiddenButtons:!this.hiddenButtons,
                    description:'',
                    amount:'',
                    category:null,
                    subcategories:subcategories,
                    subcategory:null,
                    date:'',
                    alertOn:false,
                    alertMessage:'',
                    alertColor:'danger',
                    budgetId:0,
                    buttonFormat:0
        });
    };
    clearFields(){
        this.setState({
            description:'',
            amount:'',
            category:null,
            subcategories:subcategories,
            subcategory:null,
            date:'',
            budgetId:0,
});

    };
    handleChange(event) {
        this.setState({ [event.target.name]:event.target.value});
    };
    handleCategory = category => {
        this.setState({category:category,
                       subcategories:subcategories.filter(word => word.parent === category.value)
                      });
    };
    handleSubcategory = subcategory => {
        this.setState({subcategory:subcategory});
        // console.log(this.state.category);
    };
    onDismiss = () => {this.setState({alertOn:false})};
    
    handleAlert(message,color){
        color = color || 'danger';
        this.setState({ alertMessage:message,alertOn:true, alertColor:color});
    };
    
    async handleSubmit(type){
        try{
            const regDate = /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/;
            const regAmount =/^\$?([1-9]{1}[0-9]{0,2}(\,[0-9]{3})*(\.[0-9]{0,2})?|[1-9]{1}[0-9]{0,}(\.[0-9]{0,2})?|0(\.[0-9]{0,2})?|(\.[0-9]{1,2})?)$/
            let date;
            this.onDismiss();
            if (type !== 'delete' && (!this.state.date || !this.state.amount || !this.state.category || !this.state.subcategory ||!this.state.description)){
                this.handleAlert("Please Fill All Required Fields");
            } else if (!regDate.test(this.state.date)){
                this.handleAlert("Invalid Date Format");
            } else if (!regAmount.test(this.state.amount)) {
                this.handleAlert("Invalid Amount Format");
            } else{
                if (getUser()){
                    const token = await generateToken(getUser());
                    if (type ==="add"){
                        const payload = {
                            sessionUser:getUser(),
                            email:getUser(),
                            date: this.state.date,
                            category: this.state.category.value,
                            subcategory: this.state.subcategory.value,
                            description:this.state.description,
                            amount:this.state.amount
                        };
                        const headers ={
                            headers: {
                            'Authorization': `Bearer ${token}` 
                        }};
                        const data = await addBudgetItem(payload,headers);
                        if (!data){
                            this.handleAlert("Oops... Something Went Wrong");
                        } else {
                            this.handleAlert("Success",'success');
                            this.clearFields();
                        } 
                    } else if (type === 'update'){
                        const payload = {
                            sessionUser:getUser(),
                            expenseID:this.state.budgetId,
                            date: this.state.date,
                            category: this.state.category.value,
                            subcategory: this.state.subcategory.value,
                            description:this.state.description,
                            amount:this.state.amount
                        };

                        console.log(payload);
                        const headers ={
                            headers: {
                            'Authorization': `Bearer ${token}` 
                        }};
                        const data = await updateBudgetItem(payload,headers);
                        if (!data){
                            this.handleAlert("Oops... Something Went Wrong");
                        } else {
                            this.toggle();
                        } 

                    } else {
                        const payload = {
                            sessionUser:getUser(),
                            expenseID:this.state.budgetId
                        };
                        const headers ={
                            headers: {
                            'Authorization': `Bearer ${token}` 
                        }};
                        const data = await removeBudgetItem(payload,headers);
                        if (!data){
                            this.handleAlert("Oops... Something Went Wrong");
                        } else {
                            this.toggle();
                        }
                    }
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
    
    async renderBudget (){
        // this.setState({ loading: 'true' });
        if (getUser()){
            const token = await generateToken(getUser());
            const payload = {
                sessionUser:getUser(),
                expenseUser:getUser(),
            };
            const headers ={
                    headers: {
                      'Authorization': `Bearer ${token}` 
            }};
            const data = await getBudgetData(payload,headers);
            let transformedData= transformBudgetData(data);
            transformBudgetData2(transformedData);
            this.setState({ budget: transformedData, loading:'false' });
        } else {
            this.setState({loading:'abort'});
        }

    };

    
    async componentDidMount(){
       await this.renderBudget();
    };
   
    render() {
        const closeBtn = <button className="close" onClick={this.toggle}></button>;

        const options = {
            filter:true,
            filterType: "dropdown",
            resizableColumns: true,
            columnOrder:[0,3,4,1,2],
            jumpToPage:true,
            rowHover:true,
            search:true,
            searchOpen:true,
            searchPlaceholder:'Search My Budget',
            selectableRows:'none',
            onRowClick:(value, tableMeta, updateValue) => {
                // console.log(tableMeta);
                
                const row = this.state.budget[tableMeta.rowIndex];
                // console.log(categories.find(element => element.value===row[1]));
                this.toggle();
                this.setState({
                    description:row[3],
                    amount:row[4],
                    category:categories.find(element => element.value===row[1]),
                    subcategory:subcategories.find(element => element.value===row[2]),
                    date:row[0],
                    budgetId:row[5],
                    hiddenButtons:false
                });
            },
            
        }
        const columns = [
            {
                name: "Date",
                options: {
                  filter: false,
                //   filterType:'dropdown',
                //   filterOptions: {
                //     names: ['2020', '2019', '2018'],
                //     logic(date, filterVal) {
                //       date = date.slice(0,4);
                //       const show =
                //         (filterVal.indexOf('2020') >= 0 && date ==='2020') ||
                //         (filterVal.indexOf('2019') >= 0 && date ==='2019') ||
                //         (filterVal.indexOf('2018') >= 0 && date ==='2018');
                //       return !show;
                //     },
                //   },
                }
            },
            {
                name: "Category",
                options: {
                  filter: true,
                }
            },
            {
                name: "Subcategory",
                options: {
                  filter: true,
                }
            },
            {
                name: "Description",
                options: {
                  filter: false, 
                }
            },
            {
                name: "Amount",
                options: {
                  filter: false,
                }
            },
        ]
        const ButtonForm = [
            {
                filter:{bottom: 275,right:15},
                refresh:{bottom: 200,right:15},
                add:{bottom: 125,right:15},
                drag:{bottom: 50,right:15}
            },
            {
                filter:{bottom: 275,right:15},
                refresh:{bottom: 200,right:15},
                add:{bottom: 125,right:15},
                drag:{bottom: 50,right:15}
            },
            {
                filter:{bottom: 125,right:50},
                refresh:{bottom: 50,right:50},
                add:{bottom: 50,right:125},
                drag:{bottom: 125,right:125}
            },
        ];
        if (this.state.loading === 'initial') {
            return <h2>Intializing...</h2>;
        }
        if (this.state.loading === 'true') {
            return <h2>Loading...</h2>;
        }
        if (this.state.loading === 'abort') {
            return <h2>Aborted...</h2>;
        }
        return (
            <div>
            <div>
            <Button color="danger" onClick={this.thisMonth}>This Month</Button>
            
            
            <div>
            <Modal isOpen={this.state.modal} toggle={this.toggle} close={closeBtn}>
                <ModalHeader>Budget Entry</ModalHeader>
                <ModalBody>
                    <Row>
                        <Col>
                            <Alert color={this.state.alertColor} isOpen={this.state.alertOn} toggle={this.onDismiss}>
                                                {this.state.alertMessage}
                            </Alert>
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
            <Container fluid={true}>
                
                    <MUIDataTable
                        title={"My Budget"}
                        data={this.state.budget}
                        columns={columns}
                        options={options}
                        className='table'
                    />        
            </Container>
            
            <Draggable
                handle=".drag"
                defaultPosition={{x: 0, y: 0}}
                position={null}
                grid={[50, 50]}
                scale={1}
                onStart={this.handleStart}
                onDrag={this.handleDrag}
                onStop={this.handleStop}
                >
                <div className="drag">
                    <Fab icon={<RefreshIcon/>} onClick={async () => {await this.renderBudget();}} mainButtonStyles={{backgroundColor: '#e74c3c',outline:'none'}} style={ButtonForm[2].refresh}></Fab>
                    <Fab icon={<AddIcon/>} onClick={this.toggle} mainButtonStyles={{backgroundColor: '#e74c3c',outline:'none'}} style={ButtonForm[2].add}></Fab>
                    <Fab icon={<OpenWithIcon/>} mainButtonStyles={{backgroundColor: '#D3D3D3',outline:'none'}} style={ButtonForm[2].drag}>
                    <Action text="Add Something" style={{backgroundColor: '#3498db',outline:'none', right:40,top:50}} onClick={() => this.setState({buttonFormat:0})}>
                    <MoreVertIcon/>
                    </Action>
                    <Action text="Add Something" style={{backgroundColor: '#3498db',outline:'none', right:100, top:150}} onClick={() => this.setState({buttonFormat:1})}>
                    <WidgetsIcon/>
                    </Action>
                    <Action text="Add Something" style={{backgroundColor: '#3498db',outline:'none', right:40, top:250}} onClick={() => this.setState({buttonFormat:2})}>
                    <MoreHorizIcon/>
                    </Action>
                    </Fab>
                    <Fab icon={<FilterListIcon/>} mainButtonStyles={{backgroundColor: '#e74c3c',outline:'none'}} style={ButtonForm[2].filter}>
                <Action text="Add Something" style={{backgroundColor: '#3498db',outline:'none'}} onClick={() => alert('It works!')}>
                &plus;
                </Action>
                <Action style={{backgroundColor: '#3498db',outline:'none'}} onClick={() => alert('It still works!')}>
                <SettingsIcon/>
                </Action>
                <Action text="Assign Something" style={{backgroundColor: '#3498db',outline:'none'}} onClick={() => alert('It still works!')}>
                =
                </Action>
            </Fab>   
                </div>
                </ Draggable>
       
            
            </div>
            </div>
            
        );
    }
};
 
export default BudgetForm;