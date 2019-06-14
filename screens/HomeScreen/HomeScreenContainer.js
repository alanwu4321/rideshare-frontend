import React from "react";
import HomeScreenPresenter from "./HomeScreenPresenter";

export default class extends React.Component {
  static navigationOptions = {
    title: "Discover"
  };

  render() {
    return <HomeScreenPresenter />;
  }
}
