import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Avatar from "./Avatar";
import Colors from "../constants/Colors";
import SmallButton from "./SmallButton";
import {
  Linking,
  Text,
  StyleSheet,
  Alert
} from 'react-native';

const Container = styled.View`
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

// const openLink = (url) => {
//   console.log("yo")
//   console.log(url)
//   // Linking.canOpenURL(url).then(supported => {
//   //   if (supported) {
//   //     Linking.openURL(url);
//   //   } else {
//   //     console.log('Don\'t know how to open URI: ');
//   //   }
//   // });
// }

// const payload = {
//   data: {
//     id: 'de0db600-9a0a-416d-b42b-a19d31aad039',
//     attributes: {
//       field_rotation: '-96',
//       field_rotation_x: '10',
//     },
//   },
// };

// fetch(`http://httpbin.org/patch`, {
//   method: 'patch',
//   body: JSON.stringify(payload),
//   headers: {
//     "Content-Type": "application/vnd.api+json"
//   }
// })
// .then(res => res.json())
// .then(console.log)

const onPress = (rideID) => {

  fetch('http://localhost:3001/users/5cfc995ac428f484f139cd30')
  .then(res=>res.json()) //to cast the body to an object
  .then(res=>updateBookedRides(res.res.booked,rideID))

}

const updateBookedRides = (booked, rideID) => {

  var arr = booked
  
  arr = arr.concat([
    `${rideID}`
  ]);

  var payload = {
    payload: {
      booked: arr
    }
  }

  fetch(`http://localhost:3001/users/5cfc995ac428f484f139cd30`, {
    method: "patch",
    body: JSON.stringify(payload),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
  .then(res => res.json())
  .then(res=>Alert.alert(`Booked!`))
}


const UserPartials = ({ avatarUrl, rating, name, url, rideID }) => (
  <Container>
    <Column>
      <Avatar source={avatarUrl} />
      <DataContainer>
        <Name>{name}</Name>
        <Rating>{`⭑ ${rating}`}</Rating>
      </DataContainer>
    </Column>
    <Column>
      <FirstButtonContainer>
        <SmallButton
          text="Go To Post"
          onPress={() => Linking.openURL(url)}
        />
      </FirstButtonContainer>
      <SmallButton text="Book Now" accent onPress={() => onPress(rideID)} />
    </Column>
  </Container>
);

// UserPartials.propTypes = {
//   avatarUrl: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
//   rating: PropTypes.number.isRequired,
//   name: PropTypes.string.isRequired
// };

export default UserPartials;
