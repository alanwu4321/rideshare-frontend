// @ts-nocheck
import React, { Component } from "react";
import { AppRegistry, StyleSheet, Text, View, Button } from "react-native";
import styled from "styled-components";
import { products } from "../../dummy";
import MasonryProducts from "../../components/MasonryProducts";
import {
  AsyncStorage
} from 'react-native';

class HomeScreenClass extends Component {
  constructor() {
    super();
    this.state = {
      // status:true
      upcomingRides: [],
      recommendedRides: []
    };
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
    .then(res=>{this.setState({recommendedRides:res.res})
  })
    fetch(`http://localhost:3000/rides/${currentUserID}/upcoming`,{
      headers:{
        'Content-Type': 'application/json',
        'Authorization': token,
        'currentUserID': currentUserID
      }
    })
    .then(res=>res.json()) //to cast the body to an object
    .then(res=>{
      this.setState({upcomingRides:res.res})
  })
  })
  })
}

componentWillMount() {
  this.initSetup()
  
}

  update = () => {
    console.log("updating")
    this.initSetup()
  };

  render() {
    return <HomeScreenPresenter update={this.update} recommendedRides={this.state.recommendedRides} upcomingRides={this.state.upcomingRides}/>
  }
}

const Container = styled.View`
  background-color: white;
  flex: 1;
`;

const HomeScreenPresenter = ({upcomingRides,update,recommendedRides}) => (
  <Container>
    <MasonryProducts recommendedRides={recommendedRides} products={upcomingRides} update={update}/>
  </Container>
);

export default HomeScreenClass;
