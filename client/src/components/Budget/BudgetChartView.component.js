import React, { Component} from 'react';
import DoughnutChart from "../Charts/DoughnutChart.component";
import LineChart from "../Charts/LineChart.component";
import { Container, Row, Col } from 'reactstrap';
import ShowChartIcon from '@material-ui/icons/ShowChart';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

class BudgetChartView extends Component {
  _isMounted = false;
  constructor(props){
    super(props);
        this.state = {
            formats:[],        
        } 
    }
    componentDidMount() {
        this._isMounted = true;
        if (this._isMounted){
            this.setState({formats:["line","donut"]})
        }
        
    };
    componentWillUnmount() {
        this._isMounted = false;
    };
    handleFormat = (event, newFormats) => {
            this.setState({formats:newFormats});
    };
       
  render() {
    const toggleGroup = <ToggleButtonGroup orientation="vertical" style={{float:'left'}} value={this.state.formats} onChange={this.handleFormat} aria-label="text formatting">
                            <ToggleButton style={{outline:'none'}} value="line" aria-label="bold">
                                <ShowChartIcon />
                            </ToggleButton>
                            <ToggleButton style={{outline:'none'}} value="donut" aria-label="italic">
                                <DonutLargeIcon />
                            </ToggleButton>
                        </ToggleButtonGroup>

        if (this.state.formats.length>1){
            return (
                <div>
                    {toggleGroup}
                    <Container fluid={true}>
                    <Row>
                        <Col xl="6"><LineChart/></Col>
                        <Col xl="6"><DoughnutChart/></Col>
                    </Row>
                    </Container>
                </div>);
        } else if (this.state.formats[0]==='donut'){
            return (
                <div>
                    {toggleGroup}
                    <Container >
                        <Col xl={{size:"10", offset:"1"}}><DoughnutChart/></Col>
                    </Container>
                </div>)
        } else if (this.state.formats[0]==='line'){
            return (
                <div>
                    {toggleGroup}
                    <Container >
                        <Col xl={{size:"10", offset:"1"}}><LineChart/></Col>
                    </Container>
                </div>)
        } else {
            return (
                <div>
                    {toggleGroup}
                </div>)
        }
      
    };  
};
export default BudgetChartView;

