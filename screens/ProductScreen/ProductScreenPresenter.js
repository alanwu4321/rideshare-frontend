import React from "react";
import { StatusBar,View } from "react-native";
import styled from "styled-components";
import Swiper from "react-native-swiper";
import Layout from "../../constants/Layout";
import Colors from "../../constants/Colors";
import UserPartials from "../../components/UserPartials";

export default class extends React.Component {
  constructor() {
    // @ts-ignore
    super();
    this.state = {
      // status:true
      ride: {}
    };
  }

  componentWillMount(){
    fetch(`http://localhost:3000/rides/${this.props.rideID.rideID}`)
      .then(res => res.json()) 
      .then(res => {
        this.setState({ride: res })
        console.log(res)
      });
  }

  render(){
    return <ProductScreenPresenter color={this.props.rideID.color} ride={this.state.ride}/>
  }
}

const DateConverter = (date) => {
  if (date == 'now') date = new Date()
  return new Date(date).toDateString() + " " + new Date(date).toTimeString().replace(/ GMT-(.*)$/,'')
}

const capitalize = (s) => {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
}


const ProductScreenPresenter = ({color,ride}) => (
  <Container>
    <StatusBar barStyle="light-content" />
    <ScrollView contentContainerStyle={{ paddingBottom: 40 }} bounces={false}>
      <View
        style={{ height: getHeight(), marginBottom: 20, backgroundColor:color }}
      >
      </View>
      <DataContainer>
        <TimeLocation>{DateConverter(ride.datetime)}</TimeLocation>
        <NamePrice>
          <NamePriceText>{capitalize(ride.origin)} to {capitalize(ride.destination)}</NamePriceText>
          {/* <NamePriceText>{rideID}</NamePriceText> */}
        </NamePrice>
        <Divider />
        <Description>
          {ride.message}
        </Description>
        {/* <Description>
          Seize the Moment. Meet Spark, a mini drone that features all of DJI's
          signature technologies, allowing you to seize the moment whenever you
          feel inspired.
        </Description> */}
        <ReadMore>From Facebook</ReadMore>
        <UserPartials
          name={ride.user}
          rating={4.6}
          avatarUrl={require("../../assets/images/smAvatar.png")}
          url={ride.link}
          rideID={ride._id}
        />
      </DataContainer>
    </ScrollView>
  </Container>
);

const getHeight = () =>
  Layout.window.height <= 667
    ? Layout.window.height / 2.8
    : Layout.window.height / 2.3;

const Container = styled.View`
  flex: 1;
  background-color: white;
`;

const ScrollView = styled.ScrollView``;

const Image = styled.Image`
  width: ${Layout.window.width};
  height: ${getHeight()};
  position: relative;
`;

const DataContainer = styled.View`
  padding-horizontal: 20px;
`;

const TimeLocation = styled.Text`
  color: ${Colors.greyColor};
  font-size: 14px;
  font-weight: 400;
  margin-bottom: 10px;
`;

const NamePrice = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const NamePriceText = styled.Text`
  font-size: 24px;
  color: ${Colors.blackColor};
  font-weight: 600;
`;

const Divider = styled.View`
  width: 100%;
  height: 2px;
  background-color: rgba(151, 151, 151, 0.1);
  margin-bottom: 25px;
`;

const Description = styled.Text`
  margin-bottom: 25px;
  color: ${Colors.greyColor};
`;

const ReadMore = styled.Text`
  color: ${Colors.blackColor};
  margin-bottom: 40px;
`;



