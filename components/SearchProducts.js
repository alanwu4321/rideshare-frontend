import React, { Component } from 'react';
import { AppRegistry, StyleSheet, AsyncStorage,Text, View, Button,TouchableOpacity,Alert,Modal,TouchableHighlight } from 'react-native';
import PropTypes from "prop-types";
import styled from "styled-components";
import Colors from "../constants/Colors";
import ProductCard from "./ProductCard";
import Jumbotron from "./Jumbotron"
import { iOSUIKit } from 'react-native-typography'
import SearchButton from "./SearchButton";
import PostButton from "./PostButton";
import FilterButton from './FilterButton'
import SubmitButton from './InitSearchButton'
import FormGenerator from '../components/FilterForm'
import { TextField } from 'react-native-material-textfield';
import { Dropdown } from 'react-native-material-dropdown';
import DateTimePicker from "react-native-modal-datetime-picker";
// import Autocomplete from "./Autocomplete"


const DateConverter = (date) => {
  if (date == 'now') date = new Date()
  return new Date(date).toDateString() + " " + new Date(date).toTimeString().replace(/ GMT-(.*)$/,'')
}

class Myproject extends Component {
    constructor(){
        super();
        this.state ={
          status:false,
          isfromDateTimePickerVisible: false,
          istoDateTimePickerVisible: false,
          destination: '',
          origin:'',
          inputfromDatetime:DateConverter('now'),
          inputtoDatetime:DateConverter(new Date().setDate(new Date().getDate() + 7)),
          opacity: "1",
          rides:[]
        }

      }

_retrieveData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      // We have data!!
      console.log(value);
      return value;
    }
  } catch (error) {
    // Error retrieving data
  }
};

initSetup = () => {
this._retrieveData("token").then(token=>{
  this._retrieveData("currentUserID").then(currentUserID=>{
  fetch(`http://localhost:3000/rides/${currentUserID}/recommend`,{
    headers:{
      'Content-Type': 'application/json',
      'Authorization': token,
      'currentUserID': currentUserID
    }
  })
  .then(res=>res.json()) //to cast the body to an object
  .then(res=>{this.setState({rides:res.res})
})
})
})
}

componentWillMount() {
this.initSetup()
}
      showfromDateTimePicker = () => {
        this.setState({ isfromDateTimePickerVisible: true });
        
      };
      showtoDateTimePicker = () => {
        this.setState({ istoDateTimePickerVisible: true });
        
      };
 
    
      hideDateTimePicker = () => {
        this.setState({ isfromDateTimePickerVisible: false });
        this.setState({ istoDateTimePickerVisible: false });
      };
    
      handlefromDatePicked = date => {
        var newDate = new Date(date)
        this.setState({inputfromDatetime:newDate.toDateString() + " " + newDate.toTimeString().replace(/ GMT-(.*)$/,'')})
        this.hideDateTimePicker();
      };
      handletoDatePicked = date => {
        var newDate = new Date(date)
        this.setState({inputtoDatetime:newDate.toDateString() + " " + newDate.toTimeString().replace(/ GMT-(.*)$/,'')})
        this.hideDateTimePicker();
      };
      // handlefromDatePicked = date => {
      //   var newDate = new Date(date)
      //   this.setState({inputDatetime:newDate.toDateString() + " " + newDate.toTimeString().replace(/ GMT-(.*)$/,'')})
      //   this.hideDateTimePicker();
      // };
    
ShowHideTextComponentView = () =>{

if(this.state.status == true)
{
    this.setState({status: false})
}
else
{
    this.setState({status: true})
}
}

onDestinationFieldChange = (change) => {
  console.log(change)
  this.setState({destination:change})
}
onOriginFieldChange  = (change) => {
  console.log(change)
  this.setState({origin:change})
}




submitFilter = () => {
    const {
      destination,
      origin,
      inputfromDatetime,
      inputtoDatetime
    } = this.state;

    from = new Date(inputfromDatetime).toISOString().replace(/.000(.*)$/, "");
    to = new Date(inputtoDatetime).toISOString().replace(/.000(.*)$/, "");

    this.setState({opacity:"0.2"})

  fetch(`http://localhost:3000/rides?origin=${origin}&destination=${destination}&startDate=${from}&endDate=${to}`)
  .then(res=>res.json()) 
  .then(res=>this.setState({rides:res, opacity:"1"}))
  }


render() {

  
  

    return (
        <View>
<DateTimePicker mode='datetime' isVisible={this.state.isfromDateTimePickerVisible} onConfirm={this.handlefromDatePicked} onCancel={this.hideDateTimePicker}/> 
<DateTimePicker mode='datetime' isVisible={this.state.istoDateTimePickerVisible} onConfirm={this.handletoDatePicked} onCancel={this.hideDateTimePicker}/> 

        <SearchProducts products={this.state.rides} onPress={this.ShowHideTextComponentView} opacity={this.state.opacity}>
        {
          this.state.status ? <FormContainer>
            <TextField label="Origin" value={this.state.origin} onChangeText={this.onOriginFieldChange} /> 
            <TextField label="Destination" value={this.state.destination} onChangeText={this.onDestinationFieldChange}/>
            <TextField label="From: Date & Time" value={this.state.inputfromDatetime} onFocus={this.showfromDateTimePicker} /> 
            <TextField label="To: Date & Time" value={this.state.inputtoDatetime} onFocus={this.showtoDateTimePicker} /> 
          {
       
          <ButtonContainer>
          <Column>
          </Column>
          <SubmitButton text="Search" onPress={this.submitFilter}/>

        </ButtonContainer>

          }
          </FormContainer>

        : null
        }
        </SearchProducts>
        </View>
    );
  }

}

 

const ScrollView = styled.ScrollView``;

const MasonryContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  opacity: ${props => props.opacity};
`;

const Title1 = styled.Text`
  margin-left: 10px;
  margin-bottom: 10px;

`;


const ButtonContainer = styled.View`
  margin-left: 10px;
  margin-top: 14px;
  margin-bottom: 14px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const Column = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const FirstButtonContainer = styled.View`
  margin-right: 2.5%;
`;

const FormContainer = styled.View`
  padding: 40px;
`;



const getColor = (index) => {
  // var colors = ["#F6F6F6","#0082D9","#DD4C80","#4C63C0","#FF5353","#1A8448","#FF7272","#33ADFF","#1F3692","#FF9191","#FB5590"]
  var colorsv1 = ["#ff7172","#f5a623","#2fd492","#6e97ff","#FECEAB","#FE4365","#FF7272","#FC9D9A","#FC9D9A","#C8C8A9","#83AF9B","#83AF9B","#83AF9B"]
  
  return colorsv1[index]
}


const SearchProducts = ({ products, children = null, onPress, opacity }) => (
  <ScrollView>
    <Jumbotron user="Alan" screen="Search" text="Full string search" subText="or fill up the form below" />
    
    <ButtonContainer>
      <Column>
      <FirstButtonContainer>
      <FilterButton text="Apply Filter" accent onPress={onPress}/>
      </FirstButtonContainer>
      </Column>
    </ButtonContainer>

    {children}

    <Title1 style={iOSUIKit.title3Emphasized}> For You</Title1>

    <ScrollView horizontal={true}
      contentContainerStyle={{
        paddingHorizontal: 20,
        paddingVertical: 15
      }}>

      <MasonryContainer opacity={opacity}>
      {products.map((product,index) => (
          <ProductCard
            rideId={product["_id"]}
            origin={product["_source"]["origin"]}
            destination={product["_source"]["destination"]}
            datetime={product["_source"]["datetime"]}
            key={product["_id"]}
            color={getColor(index)}
          />
        ))}
      </MasonryContainer>
    </ScrollView>
  </ScrollView>
);

SearchProducts.propTypes = {
  products: PropTypes.instanceOf(Array),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

export default Myproject;
