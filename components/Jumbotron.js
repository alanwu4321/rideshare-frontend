import React from "react";
import { TouchableOpacity,Text } from "react-native";
import styled from "styled-components";
import PropTypes from "prop-types";
import Colors from "../constants/Colors";
import { iOSUIKit } from 'react-native-typography'
import { iOSColors } from 'react-native-typography'




const Container = styled.View`
    margin-left: 10px;
`;

const Greeting = styled.Text`
    margin-left: 5px;
    margin-bottom: 2px;
    color: ${iOSColors.purple};
    fontSize: 20;
    fontWeight: 600;
`;
const Discover = styled.Text`
    margin-left: 5px;
    margin-bottom: -1px;
    color: ${iOSColors.black};
    fontSize: 50;
    fontWeight: 800;
`;

const Rides = styled.Text`
    margin-left: 5px;
    margin-bottom: 7px;
    color: ${iOSColors.black};
    fontSize: 50;
    fontWeight: 300;
`;

const Quote = styled.Text`
    margin-left: 5px;
    margin-bottom: 1px;
    color: ${iOSColors.gray};
    fontSize: 15;
`;


const ButtonContainer = styled.View`
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

const DataContainer = styled.View`
  margin-left: 10px;
`;

const Name = styled.Text`
  font-weight: 500;
  font-size: 16px;
`;

const Rating = styled.Text`
  color: ${Colors.greyColor};
`;

const FirstButtonContainer = styled.View`
  margin-right: 2.5%;
`;


const Jumbotron = ({user,screen, text, subText}) => (
    <Container>
      <Greeting>Hello {user},</Greeting>
      <Discover>{screen}</Discover>
      <Rides>Rides</Rides>
      <Quote>{text}</Quote>
      <Quote>{subText}</Quote>
    </Container>
);

Jumbotron.propTypes = {
  user: PropTypes.string.isRequired,
  screen: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  subText: PropTypes.string
};

export default Jumbotron;
