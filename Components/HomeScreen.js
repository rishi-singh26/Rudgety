import React, { Component } from "react";
import {
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  StatusBar
} from "react-native";
import { SocialIcon, Button } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialIcons";
import ReactNativeParallaxHeader from "react-native-parallax-header";
import styles from "../Shared/Styles";
import { findTotal, retriveData, saveData } from "../Shared/functions";
import ActionSheet from "react-native-actionsheet";
import { OutlinedTextField } from "react-native-material-textfield";

const IS_IPHONE_X = SCREEN_HEIGHT === 812 || SCREEN_HEIGHT === 896;
const STATUS_BAR_HEIGHT = Platform.OS === "ios" ? (IS_IPHONE_X ? 44 : 20) : 20;
const HEADER_HEIGHT = Platform.OS === "ios" ? (IS_IPHONE_X ? 88 : 64) : 100;
const NAV_BAR_HEIGHT = HEADER_HEIGHT - STATUS_BAR_HEIGHT;
const SCREEN_HEIGHT = Math.round(Dimensions.get("window").height);
const SCREEN_WIDTH = Math.round(Dimensions.get("window").width);
// ↑↓
const options = ["Mysore", "Mandya", "Bengaluru", "Bengaluru", "Cancel"];

const images = {
  background: require("../assets/background.png") // Put your own image here
};
class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showInput: false,
      submissionTypeButtonTitle: "↑↓",
      expence: [
        {
          id: 1,
          value: "300",
          date: "12/02/2020",
          desc: "Just spent it.",
          type: "#ff2b2b",
          spentOn: "Khana"
        },
        {
          id: 2,
          value: "230",
          date: "17/02/2020",
          desc: "Not this time.",
          type: "#ff2b2b",
          spentOn: "Khana"
        },
        {
          id: 3,
          value: "723",
          date: "22/02/2020",
          desc: "Yup this was tough.",
          type: "#ff2b2b",
          spentOn: "Khana"
        },
        {
          id: 4,
          value: "426",
          date: "28/02/2020",
          desc: "Just spent it.",
          type: "#ff2b2b",
          spentOn: "Khana"
        }
      ],
      income: [
        {
          id: 1,
          value: "1200",
          date: "12/02/2020",
          desc: "Just got it.",
          type: "#28a612",
          spentOn: "Khana"
        },
        {
          id: 2,
          value: "3000",
          date: "22/02/2020",
          desc: "Not this time.",
          type: "#28a612",
          spentOn: "Khana"
        }
      ],
      fullData: [
        {
          id: 1,
          value: "1200",
          date: "12/02/2020",
          desc: "Just got it.",
          type: "#28a612",
          spentOn: "Khana"
        },
        {
          id: 2,
          value: "300",
          date: "12/02/2020",
          desc: "Just spent it.",
          type: "#ff2b2b",
          spentOn: "Khana"
        },
        {
          id: 3,
          value: "230",
          date: "17/02/2020",
          desc: "Not this time.",
          type: "#ff2b2b",
          spentOn: "Khana"
        },
        {
          id: 4,
          value: "723",
          date: "22/02/2020",
          desc: "Yup this was tough.",
          type: "#ff2b2b",
          spentOn: "Khana"
        },
        {
          id: 5,
          value: "3000",
          date: "22/02/2020",
          desc: "Not this time.",
          type: "#28a612",
          spentOn: "Khana"
        },
        {
          id: 6,
          value: "426",
          date: "28/02/2020",
          desc: "Just spent it.",
          type: "#ff2b2b",
          spentOn: "Khana"
        },
        {
          id: 7,
          value: "426",
          date: "28/02/2020",
          desc: "Just spent it.",
          type: "#ff2b2b",
          spentOn: "Khana"
        },
        {
          id: 8,
          value: "426",
          date: "28/02/2020",
          desc: "Just spent it.",
          type: "#ff2b2b",
          spentOn: "Khana"
        },
        {
          id: 9,
          value: "426",
          date: "28/02/2020",
          desc: "Just spent it.",
          type: "#ff2b2b",
          spentOn: "Khana"
        },
        {
          id: 10,
          value: "426",
          date: "28/02/2020",
          desc: "Just spent it.",
          type: "#ff2b2b",
          spentOn: "Khana"
        },
        {
          id: 11,
          value: "426",
          date: "28/02/2020",
          desc: "Just spent it.",
          type: "#ff2b2b",
          spentOn: "Khana"
        },
        {
          id: 12,
          value: "426",
          date: "28/02/2020",
          desc: "Just spent it.",
          type: "#ff2b2b",
          spentOn: "Khana"
        },
        {
          id: 13,
          value: "426",
          date: "28/02/2020",
          desc: "Just spent it.",
          type: "#ff2b2b",
          spentOn: "Khana"
        }
      ]
    };
  }

  showActionSheet = () => {
    this.ActionSheet.show();
  };

  renderNavBar = () => (
    <View style={[styles.navContainer, { paddingTop: 20 }]}>
      <View
        style={[
          styles.statusBar,
          {
            flex: 1,
            flexDirection: "row",
            paddingTop: 20
          }
        ]}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "flex-start"
          }}
        >
          {/* <SocialIcon type="money" light raised={true} /> */}
          <Text
            style={{
              color: "#fff",
              fontSize: 25
            }}
          >
            Cash: {findTotal(this.state.income) - findTotal(this.state.expence)}
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: "flex-end",
            alignItems: "center",
            flexDirection: "row"
          }}
        >
          <TouchableOpacity
            style={{ margin: 10 }}
            onPress={() => {
              this.setState({ showInput: !this.state.showInput });
            }}
          >
            <Icon name="add" size={27} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ margin: 10 }}
            // onPress={() => {
            //   this.props.navigation.navigate("Search", {
            //     counterList: this.state.taskList,
            //     deletedCounterList: this.state.deletedTaskList
            //   });
            // }}
          >
            <Icon name="search" size={25} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ margin: 10 }}
            onPress={this.showActionSheet}
          >
            <Icon name="more-vert" size={25} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  headerComponent = () => {
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
          <Text style={{ color: "#fff", fontSize: 20 }}>Balance</Text>
          <Text style={{ color: "#fff", fontSize: 40 }}>
            {findTotal(this.state.income) - findTotal(this.state.expence)}
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            minWidth: 100
          }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignContent: "flex-start"
            }}
          >
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate("Expences", {
                  data: this.state.expence
                });
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  fontSize: 20,
                  fontWeight: "bold"
                }}
              >
                <Text style={{ color: "red" }}>↑</Text>
                {findTotal(this.state.expence)}
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignContent: "flex-end"
            }}
          >
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate("Income", {
                  data: this.state.income
                });
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  fontSize: 20,
                  fontWeight: "bold",
                  marginLeft: 30
                }}
              >
                <Text style={{ color: "#19ff25" }}>↓</Text>
                {findTotal(this.state.income)}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  fieldRef = React.createRef();
  fieldRef1 = React.createRef();
  fieldRef2 = React.createRef();

  onSubmit = () => {};

  renderContent = () => {
    return (
      <View>
        {/* <StatusBar barStyle="light-content" /> */}
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
            backgroundColor: "transparent",
            marginTop: 10,
            marginRight: SCREEN_WIDTH / 50
          }}
        >
          <TouchableOpacity
            style={{ margin: 10 }}
            onPress={() => {
              this.setState({ showInput: !this.state.showInput });
            }}
          >
            <Icon name="add" size={27} color="#000" />
          </TouchableOpacity>
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
        {this.state.showInput && (
          <View
            style={[
              {
                padding: 10,
                margin: 10
              }
            ]}
          >
            <Text>Make a new entry here.</Text>
            <Text></Text>
            {/* <View style={{ flex: 1, flexDirection: "row" }}> */}
            {/* <View> */}
            <OutlinedTextField
              label="Enter counter name"
              keyboardType="number-pad"
              title="Pressing the enter key on the keyboard will create this counter."
              //   onSubmitEditing={this.onSubmit}
              ref={this.fieldRef}
              autoFocus={true}
            />
            {/* </View> */}
            {/* <View> */}
            <Text></Text>
            <Button
              title={this.state.submissionTypeButtonTitle}
              onPress={this.onSubmit}
            />
            {/* </View> */}
            {/* </View> */}
            <Text></Text>
            <OutlinedTextField
              label="Enter counter name"
              keyboardType="default"
              title="Pressing the enter key on the keyboard will create this counter."
              //   onSubmitEditing={this.onSubmit}
              ref={this.fieldRef1}
              //   autoFocus={true}
            />
            <Text></Text>
            <OutlinedTextField
              label="Enter counter name"
              keyboardType="default"
              title="Pressing the enter key on the keyboard will create this counter."
              //   onSubmitEditing={this.onSubmit}
              ref={this.fieldRef2}
              //   autoFocus={true}
            />
            <Text></Text>
            <Button title="Submit" onPress={this.onSubmit} />
          </View>
        )}
        <View>{renderFullData}</View>
      </View>
    );
  };

  render() {
    renderFullData = this.state.fullData
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
              {item.type == "#28a612" && (
                <Text style={{ color: item.type, fontSize: 17 }}>
                  + {item.value}
                </Text>
              )}
              {item.type == "#ff2b2b" && (
                <Text style={{ color: item.type, fontSize: 17 }}>
                  - {item.value}
                </Text>
              )}
            </View>
          </View>
        );
      });

    return (
      <View style={styles.container}>
        <ReactNativeParallaxHeader
          headerMinHeight={HEADER_HEIGHT}
          headerMaxHeight={300}
          extraScrollHeight={100}
          navbarColor="#0088ff"
          title={<this.headerComponent />}
          titleStyle={styles.titleStyle}
          backgroundColor="#0088ff"
          //   backgroundImage={images.background}
          backgroundImageScale={1.2}
          renderNavBar={this.renderNavBar}
          renderContent={this.renderContent}
          containerStyle={[styles.container]}
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

export default HomeScreen;
