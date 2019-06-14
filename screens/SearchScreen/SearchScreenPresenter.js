import React,{Component} from "react";
import styled from "styled-components";
import SearchProducts from "../../components/SearchProducts";
import { iOSColors } from 'react-native-typography'


class SearchScreenClass extends Component {
  constructor() {
    super();
    this.state = {
      // status:true
      recommendedRides: []
    };
  }



  render() {
    return (
      <SearchScreenPresenter
      />
    );
  }
}



const Container = styled.View`
  background-color: white;
  flex: 1;
`;

const SearchResults = styled.Text`
  color: ${iOSColors.gray}
  margin-left:10px;
  margin-bottom: 20px;
  font-weight: 600;
  font-size: 16px;
`;

const SearchScreenPresenter = (products, submitFilter) => (
  <Container>
    <SearchProducts>
      <SearchResults>30 Search Results</SearchResults>
    </SearchProducts>
  </Container>
);

export default SearchScreenClass;
