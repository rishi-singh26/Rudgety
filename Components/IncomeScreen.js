import React, { Component } from "react";
import {
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  StatusBar,
  YellowBox,
  BackHandler,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import ReactNativeParallaxHeader from "react-native-parallax-header";
import styles from "../Shared/Styles";
import {
  findTotal,
  retriveData,
  saveData,
  findTotalIncome,
} from "../Shared/functions";
// import ActionSheet from "react-native-actionsheet";
import SwipeablePanel from "rn-swipeable-panel";

const IS_IPHONE_X = SCREEN_HEIGHT === 812 || SCREEN_HEIGHT === 896;
const STATUS_BAR_HEIGHT = Platform.OS === "ios" ? (IS_IPHONE_X ? 44 : 20) : 0;
const HEADER_HEIGHT = Platform.OS === "ios" ? (IS_IPHONE_X ? 88 : 64) : 100;
const NAV_BAR_HEIGHT = HEADER_HEIGHT - STATUS_BAR_HEIGHT;
const SCREEN_HEIGHT = Math.round(Dimensions.get("window").height);
const SCREEN_WIDTH = Math.round(Dimensions.get("window").width);

const options = ["Expences", "Income", "About Developer", "Cancel"];

YellowBox.ignoreWarnings([
  "componentWillReceiveProps has been renamed, and is not recommended for use", // TODO: Remove when fixed
]);

var renderIncomes = "";

class ExpencesScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      swipeablePanelActive: false,
      swipablePnaelData: "",
      swipablePnaelIndex: "",
    };
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

  componentDidMount() {
    // This is the first method in the activity lifecycle
    // Addding Event Listener for the BackPress
    BackHandler.addEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
    console.log("Component did mount");
  }

  componentWillUnmount() {
    // This is the Last method in the activity lifecycle
    // Removing Event Listener for the BackPress
    BackHandler.removeEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
    console.log("Component will unmount");
  }

  handleBackButtonClick() {
    if (this.state.swipeablePanelActive) {
      this.setState({ swipeablePanelActive: !this.state.swipeablePanelActive });
    } else {
      this.props.navigation.navigate("Home");
    }
    // We can move to any screen. If we want
    // Returning true means we have handled the backpress
    // Returning false means we haven't handled the backpress
    return true;
  }

  closePanel = () => {
    this.setState({ swipeablePanelActive: false });
  };

  renderNavBar = () => {
    const { data } = this.props.route.params;
    return (
      <View style={styles.navContainer}>
        <View style={styles.statusBar} />
        <View style={styles.navBar}>
          <Text style={{ color: "#fff", fontSize: 30, fontWeight: "bold" }}>
            Income
          </Text>
          <Text style={{ color: "#fff", fontSize: 30, fontWeight: "bold" }}>
            {findTotalIncome(data)}
          </Text>
        </View>
      </View>
    );
  };

  renderContent = () => {
    const { data } = this.props.route.params;
    return (
      <View>
        <SwipeablePanel
          fullWidth
          isActive={this.state.swipeablePanelActive}
          onClose={this.closePanel}
          onPressCloseButton={this.closePanel}
          showCloseButton={false}
          fullWidth={true}
          openLarge={false}
          onlyLarge={false}
          noBackgroundOpacity={true}
          style={{ backgroundColor: "#f0f0f0" }}
          closeOnTouchOutside={true}
          // noBar={true}
        >
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginTop: 20,
            }}
          >
            {this.state.swipablePnaelData.type === "#28a612" && (
              <View
                style={{
                  backgroundColor: this.state.swipablePnaelData.type,
                  minWidth: 60,
                  minHeight: 60,
                  borderRadius: 50,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Icon name="check" reverse size={25} color="#fff" />
              </View>
            )}
            {this.state.swipablePnaelData.type === "#ff2b2b" && (
              <View
                style={{
                  backgroundColor: this.state.swipablePnaelData.type,
                  minWidth: 60,
                  minHeight: 60,
                  borderRadius: 50,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Icon name="clear" reverse size={25} color="#fff" />
              </View>
            )}

            <Text
              style={{
                fontSize: 40,
                fontWeight: "bold",
                minHeight: 60,
              }}
            >
              {this.state.swipablePnaelData.spentOn}
            </Text>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                color: this.state.swipablePnaelData.type,
                minHeight: 30,
              }}
            >
              {this.state.swipablePnaelData.desc}
            </Text>
            <Text
              style={{
                fontSize: 30,
                fontWeight: "bold",
                color: this.state.swipablePnaelData.type,
                minHeight: 70,
              }}
            >
              ₹ {this.state.swipablePnaelData.value}
            </Text>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
              }}
            >
              {this.state.swipablePnaelData.date}
            </Text>
          </View>
        </SwipeablePanel>
        <View
          style={{
            flex: 1,
            justifyContent: "flex-end",
            alignItems: "center",
            flexDirection: "row",
            backgroundColor: "transparent",
            margin: 10,
            // marginRight: SCREEN_WIDTH / 20
          }}
        >
          <TouchableOpacity
            style={{ margin: 10 }}
            onPress={() => {
              this.props.navigation.navigate("Search", {
                data: data,
              });
            }}
          >
            <Icon name="search" size={25} color="#000" />
          </TouchableOpacity>
        </View>
        {renderIncomes}
      </View>
    );
  };

  headerComponent = () => {
    const { data } = this.props.route.params;
    return (
      <View
        style={{
          flex: 1,
          marginTop: 20,
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            marginTop: 10,
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#fff", fontSize: 30, fontWeight: "bold" }}>
            Income
          </Text>
          <Text style={{ color: "#fff", fontSize: 30, fontWeight: "bold" }}>
            {findTotalIncome(data)}
          </Text>
        </View>
      </View>
    );
  };

  render() {
    const { data } = this.props.route.params;

    renderIncomes = data
      .slice(0)
      .reverse()
      .map((item, index) => {
        if (item.type === "#28a612") {
          return (
            <TouchableOpacity
              key={item.id}
              onPress={() => {
                this.setState({
                  swipablePnaelData: item,
                  swipablePnaelIndex: index,
                });
                this.setState({ swipeablePanelActive: true });
              }}
            >
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  backgroundColor: "#fff",
                  //   marginBottom: 3,
                  paddingTop: 10,
                  paddingBottom: 10,
                  paddingLeft: 20,
                }}
              >
                <View style={{ flex: 7, flexDirection: "column" }}>
                  <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                    {item.spentOn}
                  </Text>
                  <Text>{item.desc}</Text>
                </View>
                <View style={{ flex: 2, paddingTop: 10 }}>
                  <Text style={{ color: item.type, fontSize: 15 }}>
                    + {item.value}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        } else {
          return null;
        }
      });

    return (
      <View style={styles.container}>
        <ReactNativeParallaxHeader
          headerMinHeight={HEADER_HEIGHT}
          headerMaxHeight={180}
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
            onScrollEndDrag: () => console.log("onScrollEndDrag"),
          }}
          alwaysShowTitle={false}
          alwaysShowNavBar={false}
        />
      </View>
    );
  }
}

export default ExpencesScreen;
