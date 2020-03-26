import React, { Component } from "react";
import {
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  StatusBar,
  YellowBox
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import ReactNativeParallaxHeader from "react-native-parallax-header";
import styles from "../Shared/Styles";
import { findTotal, retriveData, saveData } from "../Shared/functions";
import ActionSheet from "react-native-actionsheet";

const IS_IPHONE_X = SCREEN_HEIGHT === 812 || SCREEN_HEIGHT === 896;
const STATUS_BAR_HEIGHT = Platform.OS === "ios" ? (IS_IPHONE_X ? 44 : 20) : 0;
const HEADER_HEIGHT = Platform.OS === "ios" ? (IS_IPHONE_X ? 88 : 64) : 100;
const NAV_BAR_HEIGHT = HEADER_HEIGHT - STATUS_BAR_HEIGHT;
const SCREEN_HEIGHT = Math.round(Dimensions.get("window").height);
const SCREEN_WIDTH = Math.round(Dimensions.get("window").width);

const options = ["Mysore", "Mandya", "Bengaluru", "Bengaluru", "Cancel"];

YellowBox.ignoreWarnings([
  "componentWillReceiveProps has been renamed, and is not recommended for use" // TODO: Remove when fixed
]);

class ExpencesScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  showActionSheet = () => {
    this.ActionSheet.show();
  };

  renderNavBar = () => {
    const { data } = this.props.route.params;
    return (
      <View style={styles.navContainer}>
        <View style={styles.statusBar} />
        <View style={styles.navBar}>
          <Text style={{ color: "#fff", fontSize: 20 }}>Expences</Text>
          <Text style={{ color: "#fff", fontSize: 30 }}>{findTotal(data)}</Text>
        </View>
      </View>
    );
  };

  renderContent = () => {
    const { data } = this.props.route.params;
    return (
      <View>
        {/* <StatusBar barStyle="dark-content" /> */}
        <ActionSheet
          ref={o => (this.ActionSheet = o)}
          // title={<Text style={{ fontSize: 15 }}>Select your city.</Text>}
          // message="hola"
          options={options}
          cancelButtonIndex={4}
          destructiveButtonIndex={4}
          onPress={index => {
            console.log(index, "pressed");
            console.log(options[index]);
          }}
        />
        <View
          style={{
            flex: 1,
            justifyContent: "flex-end",
            alignItems: "center",
            flexDirection: "row",
            backgroundColor: "transparent"
            // marginRight: SCREEN_WIDTH / 20
          }}
        >
          <TouchableOpacity
            style={{ margin: 10 }}
            // onPress={() => {
            //   this.props.navigation.navigate("Search", {
            //     counterList: this.state.taskList,
            //     deletedCounterList: this.state.deletedTaskList
            //   });
            // }}
          >
            <Icon name="search" size={25} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ margin: 10 }}
            onPress={this.showActionSheet}
          >
            <Icon name="more-vert" size={25} color="#000" />
          </TouchableOpacity>
        </View>
        {renderExpences}
        <Text>Expences</Text>
        <Text>Expences</Text>
        <Text>Expences</Text>
        <Text>Expences</Text>
        <Text>Expences</Text>
        <Text>Expences</Text>
        <Text>Expences</Text>
        <Text>Expences</Text>
        <Text>Expences</Text>
        <Text>Expences</Text>
        <Text>Expences</Text>
        <Text>Expences</Text>
        <Text>Expences</Text>
        <Text>Expences</Text>
        <Text>Expences</Text>
        <Text>Expences</Text>
        <Text>Expences</Text>
        <Text>Expences</Text>
        <Text>Expences</Text>
        <Text>Expences</Text>
        <Text>Expences</Text>
        <Text>Expences</Text>
        <Text>Expences</Text>
        <Text>Expences</Text>
        <Text>Expences</Text>
        <Text>Expences</Text>
        <Text>Expences</Text>
        <Text>Expences</Text>
        <Text>Expences</Text>
        <Text>Expences</Text>
      </View>
    );
  };

  headerComponent = () => {
    const { data } = this.props.route.params;
    return (
      <View
        style={{
          flex: 1,
          marginTop: 20
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            marginTop: 10,
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center"
          }}
        >
          <Text style={{ color: "#fff", fontSize: 20 }}>Expences</Text>
          <Text style={{ color: "#fff", fontSize: 40 }}>{findTotal(data)}</Text>
        </View>
      </View>
    );
  };

  render() {
    const { data } = this.props.route.params;

    renderExpences = data
      .slice(0)
      .reverse()
      .map((item, index) => {
        return (
          <View
            key={item.id}
            style={{
              flex: 1,
              flexDirection: "row",
              backgroundColor: "#fff",
              //   marginBottom: 3,
              paddingTop: 10,
              paddingBottom: 10,
              paddingLeft: 20
            }}
          >
            <View style={{ flex: 5, flexDirection: "column" }}>
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                {item.spentOn}
              </Text>
              <Text>{item.desc}</Text>
            </View>
            <View style={{ flex: 1, paddingTop: 10 }}>
              <Text style={{ color: item.type, fontSize: 17 }}>
                - {item.value}
              </Text>
            </View>
          </View>
        );
      });

    return (
      <View style={styles.container}>
        <ReactNativeParallaxHeader
          headerMinHeight={HEADER_HEIGHT}
          headerMaxHeight={300}
          extraScrollHeight={20}
          navbarColor="#0088ff"
          title={<this.headerComponent />}
          titleStyle={[styles.titleStyle, { paddingTop: 25 }]}
          // backgroundColor="#fa4e6f"
          backgroundColor="#0088ff"
          backgroundImageScale={1.2}
          renderNavBar={this.renderNavBar}
          renderContent={this.renderContent}
          containerStyle={styles.container}
          contentContainerStyle={styles.contentContainer}
          innerContainerStyle={styles.container}
          scrollViewProps={{
            onScrollBeginDrag: () => console.log("onScrollBeginDrag"),
            onScrollEndDrag: () => console.log("onScrollEndDrag")
          }}
          alwaysShowTitle={false}
          alwaysShowNavBar={false}
        />
      </View>
    );
  }
}

export default ExpencesScreen;
