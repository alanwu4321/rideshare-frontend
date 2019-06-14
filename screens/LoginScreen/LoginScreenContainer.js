import React from "react";
import LoginScreenPresenter from "./LoginScreenPresenter";
import {
  AsyncStorage
} from 'react-native';

export default class extends React.Component {
  state = {
    email: "",
    password: ""
  };

  onInputChange = (text, name) => {
    this.setState({
      [name]: text
    });
  };

  _storeData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      // Error saving data
    }
  };

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

  handleLogin = () => {
    const {
      email,
      password
    } = this.state;
    var payload = {
      payload: {
        password: password,
        name: email
      }
    }
    fetch(`http://localhost:3001/users/login`, {
        method: "post",
        body: JSON.stringify(payload),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
      .then(res => res.json())
      .then(async res => {
        await this._storeData("token", res.res.token)
        await this._storeData("currentUserID", res.res.user._id)
        await this._storeData("currentUserName", res.res.user.name)
        this.props.navigation.navigate("Main")
      })
  }

  render() {
    const {
      email,
      password
    } = this.state;
    return ( <
      LoginScreenPresenter email = {
        email
      }
      password = {
        password
      }
      onInputChange = {
        this.onInputChange
      }
      onPress = {
        this.handleLogin
      }
      />
    );
  }
}