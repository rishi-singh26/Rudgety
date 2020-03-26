import React, { Component } from "react";
import {
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  StatusBar,
  AsyncStorage
} from "react-native";
import { SocialIcon, Button } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialIcons";
import ReactNativeParallaxHeader from "react-native-parallax-header";
import styles from "../Shared/Styles";
import { findTotal, retriveData, saveData } from "../Shared/functions";
import ActionSheet from "react-native-actionsheet";
import { OutlinedTextField } from "react-native-material-textfield";

var today = new Date();
var date =
  today.getDate() +
  "/" +
  parseInt(today.getMonth() + 1) +
  "/" +
  today.getFullYear();

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
      submissionTypeButtonTitle: "↓",
      submissionType: true, //this manages the income or expence being submitted, true is income and false is expence
      submissionTypeButtonColor: "#16a10a",
      expence: [
        {
          id: 2,
          value: "12",
          date: "20/02/2020",
          desc: "HHhahskmdf",
          type: "#ff2b2b",
          spentOn: "Foodsmdnf"
        }
      ],
      income: [
        {
          id: 1,
          value: "12",
          date: "20/02/2020",
          desc: "HHhah",
          type: "#28a612",
          spentOn: "Food"
        }
      ],
      fullData: [
        {
          id: 1,
          value: "12",
          date: "20/02/2020",
          desc: "HHhah",
          type: "#28a612",
          spentOn: "Food"
        },
        {
          id: 2,
          value: "12",
          date: "20/02/2020",
          desc: "HHhahskmdf",
          type: "#ff2b2b",
          spentOn: "Foodsmdnf"
        }
      ]
    };
  }

  componentDidMount() {
    this.retriveData();
  }

  retriveData = async () => {
    try {
      const value = await AsyncStorage.getItem("fullDataKey2");
      if (value !== null) {
        // We have data!!
        var retrivedData = JSON.parse(value);
        console.log(retrivedData, "Data retrived");
        // this.setState({ fullData: retrivedData });
        // this.setState({ fullData: this.state.fullData });
      }
    } catch (error) {
      // Error retrieving data
      console.log("Error in retriving saved data");
      return "error";
    }
  };

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

  onSubmit = () => {
    var currentFullData = this.state.fullData;
    var currentExpenceData = this.state.expence;
    var currentIncomeData = this.state.income;

    let { current: field } = this.fieldRef;
    let { current: field2 } = this.fieldRef1;
    let { current: field3 } = this.fieldRef2;

    var typeOfData;
    if (this.state.submissionType) {
      typeOfData = "#28a612";
    } else {
      typeOfData = "#ff2b2b";
    }

    var newData = {
      id:
        Math.floor(Math.random() * 100 + 1) +
        Math.floor(Math.random() * 1000 + 1) +
        Math.floor(Math.random() * 100 + 1),
      value: field.value(),
      date: date,
      desc: field3.value(),
      type: typeOfData,
      spentOn: field2.value()
    };
    var newFullData = currentFullData.concat(newData);
    var newtExpenceData = currentExpenceData.concat(newData);
    var newIncomeData = currentIncomeData.concat(newData);

    var currentBalance = findTotal(newIncomeData) - findTotal(newtExpenceData);

    if (currentBalance > 0) {
      this.setState({ fullData: newFullData });
    }
    saveData("fullDataKey2", JSON.stringify(newFullData));

    if (this.state.submissionType) {
      this.setState({ income: newIncomeData });
    } else {
      if (currentBalance > 0) {
        this.setState({ expence: newtExpenceData });
      } else {
        alert("Your balance is 0.");
      }
    }
    this.setState({ showInput: !this.state.showInput });
  };

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
            <View style={{ flex: 1, flexDirection: "row" }}>
              <View style={{ flex: 3 }}>
                <OutlinedTextField
                  label="Enter value"
                  keyboardType="number-pad"
                  //   onSubmitEditing={this.onSubmit}
                  ref={this.fieldRef}
                  autoFocus={true}
                />
              </View>
              <View style={{ flex: 1, marginLeft: 5 }}>
                <Button
                  title={this.state.submissionTypeButtonTitle}
                  onPress={() => {
                    if (this.state.submissionType) {
                      this.setState({
                        submissionType: !this.state.submissionType,
                        submissionTypeButtonColor: "#ff3b3b",
                        submissionTypeButtonTitle: "↑"
                      });
                    } else {
                      this.setState({
                        submissionType: !this.state.submissionType,
                        submissionTypeButtonColor: "#16a10a",
                        submissionTypeButtonTitle: "↓"
                      });
                    }
                  }}
                  buttonStyle={{
                    backgroundColor: this.state.submissionTypeButtonColor
                  }}
                  titleStyle={{ fontSize: 26, fontWeight: "bold" }}
                />
              </View>
            </View>
            <Text></Text>
            <OutlinedTextField
              label="Enter name"
              keyboardType="default"
              title="Food, Shopping, Vacation."
              //   onSubmitEditing={this.onSubmit}
              ref={this.fieldRef1}
              //   autoFocus={true}
            />
            <Text></Text>
            <OutlinedTextField
              label="Enter Description"
              keyboardType="default"
              title="Went to the grocery shop."
              //   onSubmitEditing={this.onSubmit}
              ref={this.fieldRef2}
              //   autoFocus={true}
            />
            <Text></Text>
            <Button title="Submit" onPress={this.onSubmit} />
            <Text style={{ minHeight: 400 }}></Text>
          </View>
        )}
        {!this.state.showInput && <View>{renderFullData}</View>}
      </View>
    );
  };

  render() {
    renderFullData = this.state.fullData
      .slice(0)
      .reverse()
      .map((item, index) => {
        if (this.state.fullData.length > 0) {
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
              <View style={{ flex: 2, paddingTop: 10 }}>
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
        } else {
          return null;
        }
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
