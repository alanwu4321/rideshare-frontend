import React from "react";
import { withNavigation } from "react-navigation";
import { TouchableOpacity } from "react-native";
import styled from "styled-components";
import PropTypes from "prop-types";
import Colors from "../constants/Colors";


const Container = styled.View`
  background-color: ${props =>
    props.accent ? Colors.tintColor : Colors.lightGreyColor};
  padding: 10px 15px;
  border-radius: 20px;
`;

const Text = styled.Text`
  color: ${props => (props.accent ? "white" : Colors.blackColor)};
  font-weight: 500;
`;

const FilterButton = ({ text, accent = false, navigation, onPress}) => (
  <TouchableOpacity onPress={onPress}>
    <Container accent={accent}>
      <Text accent={accent}>{text}</Text>
    </Container>
  </TouchableOpacity>
);


export default FilterButton;
