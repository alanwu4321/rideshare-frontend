import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Colors from "../constants/Colors";
import ProductCard from "./ProductCard";
import Jumbotron from "./Jumbotron"
import { iOSUIKit } from 'react-native-typography'
import SearchButton from "./SearchButton";
import PostButton from "./PostButton";
import { Button, View } from "react-native";



const ScrollView = styled.ScrollView``;

const MasonryContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const Title1 = styled.Text`
  margin-left: 10px;
  margin-bottom: 10px;

`;

const Title2 = styled.Text`
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

const splitArray = arr => {
  const { length } = arr;
  const half = length / 2;
  const firstHalf = arr.slice(0, half);
  const secondHalf = arr.slice(half, length);
  return { firstHalf, secondHalf };
};

const getColor = (index) => {
  // var colors = ["#F6F6F6","#0082D9","#DD4C80","#4C63C0","#FF5353","#1A8448","#FF7272","#33ADFF","#1F3692","#FF9191","#FB5590"]
  var colorsv1 = ["#ff7172","#f5a623","#2fd492","#6e97ff","#FECEAB","#FE4365","#FF7272","#FC9D9A","#FC9D9A","#C8C8A9","#83AF9B","#83AF9B","#83AF9B"]
  
  return colorsv1[index]
}

const MasonryProducts = ({ recommendedRides=[], products=[], children = null, update }) => (
  <ScrollView>

    <Jumbotron user="Alan" screen="Discover" text="View upcoming trips" subText="and favourite destinations" />

    <ButtonContainer>
      <Column>
      <FirstButtonContainer>
      <PostButton text="Post a Ride" accent />
      </FirstButtonContainer>
      <SearchButton text="Search For a Ride" />
      </Column>
    </ButtonContainer>   
    <Button title="Refresh" onPress={update} />
    
    <Title2 style={iOSUIKit.title3Emphasized} onPress={update}> Upcoming </ Title2>
    {children}

    <ScrollView
      horizontal={true}
      contentContainerStyle={{
        paddingHorizontal: 20,
        paddingVertical: 15
      }}
    >
      <MasonryContainer>
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

    <Title1 style={iOSUIKit.title3Emphasized}> For You</Title1>
    {children}

    <ScrollView horizontal={true}
      contentContainerStyle={{
        paddingHorizontal: 20,
        paddingVertical: 15
      }}>

      <MasonryContainer>
        {recommendedRides.map((product,index) => (
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

// MasonryProducts.propTypes = {
//   products: PropTypes.instanceOf(Array),
//   children: PropTypes.oneOfType([
//     PropTypes.arrayOf(PropTypes.node),
//     PropTypes.node
//   ])
// };

export default MasonryProducts;
