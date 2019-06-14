import React from "react";
import { TouchableWithoutFeedback,View, Text, Image  } from "react-native";
import AutoHeightImage from "react-native-auto-height-image";
import { withNavigation } from "react-navigation";
import PropTypes from "prop-types";
import styled from "styled-components";
import Layout from "../constants/Layout";
import Colors from "../constants/Colors";
import Avatar from "./Avatar";


const Container = styled.View`
  margin-bottom: 20px;
  padding: 10px;
`;

const monthDictionary = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUN",
  "JUL",
  "AUG",
  "SEP",
  "OCT",
  "NOV",
  "DEC"
];

const capitalize = (s) => {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
}


const ImageContainer = styled.View`
  box-shadow: 0px 10px 15px rgba(60, 60, 60, 0.4);
  width: ${Layout.window.width / 2 };
  border-radius: 15px;
  elevation: 4;
  margin-bottom: 15px;
  min-height: 150px;
  background-color: ${props => props.backgroundColor};
  position: relative;
`;

const Title = styled.Text`
  position: relative;
  top: 20%;
  color:${Colors.tabBar};
  fontWeight: 600;
  marginLeft:20;
  fontSize: ${props => props.size};
`;

const Name = styled.Text`
  color: ${Colors.greyColor};
  margin-left: 10px;
  margin-bottom: 10px;
`;

const Price = styled.Text`
  font-weight: 600;
  margin-left: 10px;
  color: ${Colors.blackColor};
`;


const ProductCard = ({ origin, datetime, destination, rideId, navigation,color }) => (
  <TouchableWithoutFeedback onPress={() => navigation.navigate("Product",{"rideID":rideId, "color":color})}>
    <Container>

      <ImageContainer backgroundColor={color}>
        <View style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'stretch',
        }}>
        <View style={{height: 80, backgroundColor: 'none',flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'stretch',}}>
          <View style={{width: 90, backgroundColor: 'none',  flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'stretch',}}>
          <View style={{height: 60, width:60, backgroundColor: 'white',marginLeft:20, borderRadius:10,flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'stretch'}}>

        <View style={{height: 20, backgroundColor: 'none', paddingTop:5}}>
           <Text style={{color:'black', textAlign:'center',paddingRight:5,fontWeight:'800' }} > {monthDictionary[new Date(datetime).getMonth()]} </Text>
         </View>
         <View style={{height: 40, backgroundColor: 'none'}}>
         <Text style={{color: color, textAlign:'center',paddingRight:5, fontSize: 30, fontWeight:'800' }} > {new Date(datetime).getDate()} </Text>
         </View>
         </View>
          </View> 
          <View style={{width: Layout.window.width / 2- 150, backgroundColor: 'none'}}>
           <Text style={{color:'white', fontSize: 15, fontWeight:'400',position:'relative',top:30 }} > {new Date(datetime).getHours()}:{new Date(datetime).getMinutes()} </Text>
          </View>
          <View style={{width: 60, backgroundColor: 'none',flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'stretch'}}>
              <View style={{height: 30, width:30, borderRadius: 30, backgroundColor: 'white',marginLeft:15}}>
  {/* <Image source={require("../assets/images/smAvatar.png")} width={10} height={10} />
             */}
           <Text style={{color:'#4b6ea4', fontSize: 33, fontWeight:'800',padding:4}} > f </Text>
              </View> 
          </View>
        </View>
        <View style={{height: 100, backgroundColor: 'none',marginTop:-10}}> 
              {/* <Title size={32} > Scarborough \n Waterloo</Title>
             <Title size={32}> {destination}</Title>  */}
             <Text style={{
               position:'relative',
               top:'17%',
               color:'white',
               fontWeight: '600',
               marginLeft:20,
               marginRight:10,
               fontSize: 37,
             }} adjustsFontSizeToFit minimumFontScale={.6} numberOfLines={1}>{capitalize(origin)} to </Text>
                 <Text style={{
                position:'relative',
                top:'17%',
               color:'white',
               fontWeight: '600',
               marginLeft:20,
               marginRight:10,
               fontSize: 37,
             }} adjustsFontSizeToFit minimumFontScale={.6} numberOfLines={1}>{capitalize(destination)}</Text>
        </View>
        <View style={{height: 50, backgroundColor: 'white',paddingTop:5,paddingBottom: 5, borderBottomRightRadius:5,borderBottomLeftRadius:5 }}>
        <Text style={{color:color, fontSize: 15, fontWeight:'400',marginLeft:20,fontWeight:'700' }} > Driver: </Text>
           <Text style={{color:color, fontSize: 15, fontWeight:'400',marginLeft:20 }} > TBD </Text>
        </View>

        </View>
        {/* <AutoHeightImage
          width={Layout.window.width / 2 - 30}
          source={{ uri: imgSrc }}
          style={{
            borderRadius: 15
          }}
        /> */}
      </ImageContainer>
      <Name> From Facebook </Name>
      <Price>$20</Price>
    </Container>
  </TouchableWithoutFeedback>
);

ProductCard.propTypes = {
  origin: PropTypes.string.isRequired,
  destination: PropTypes.string.isRequired,
  rideId: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  datetime: PropTypes.string.isRequired,
};

export default withNavigation(ProductCard);
