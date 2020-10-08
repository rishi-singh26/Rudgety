import React, { Component } from "react";
import {
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  StatusBar,
  AsyncStorage,
  Modal,
  StyleSheet,
  TouchableHighlight,
  SafeAreaView,
  ScrollView,
  Alert,
  Image,
  BackHandler,
} from "react-native";
import { SocialIcon, Button } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialIcons";
import ReactNativeParallaxHeader from "react-native-parallax-header";
import styles from "../Shared/Styles";
import {
  findTotal,
  retriveData,
  saveData,
  findTotalExpence,
  findTotalIncome,
} from "../Shared/functions";
import ActionSheet from "react-native-actionsheet";
import { OutlinedTextField } from "react-native-material-textfield";
import Dialog from "react-native-dialog";
import SwipeablePanel from "rn-swipeable-panel";

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
// .splice(indexOfElementYouWantToDelete, noOfelementsYouWantToDelete)
const options = ["Edit last entry", "Expences", "Income", "Cancel"];

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showInput: false,
      submissionTypeButtonTitle: "↓",
      submissionType: true, //this manages the income or expence being submitted, true is income and false is expence
      submissionTypeButtonColor: "#16a10a", //this state manages the background color of the submission type button
      addEntryIconName: "add",
      fullData: [], //this manages the fullData data
      valueErrorMess: "", //thishandles error message for value field of the add entry form
      nameErrorMess: "", //thishandles error message for name field of the add entry form
      descErrorMess: "", //thishandles error message for desc field of the add entry form
      submitEntryBtnBackgroundColor: "#0088ff", //this state handles the background color for the submit button in the add entry from
      submitEntryBtnTitle: "Submit",
      editLastEntryViewVisible: false, //this state manages the the popup view which pops to edit the  most recent entry
      newValue: "", //this manages the new value while editing the last entry
      newName: "", //this manages the new name while editing the last entry
      newDescription: "", //this manages the new description while editing the last entry
      editEntryType: "Income ▼", //this manages the type of entry while editing the last entry
      fullDataKey: "fullDataKey1", //this manages the storage key for the full data
      swipeablePanelActive: false, //this state manages the swipable bottem panel
      swipablePnaelData: "", //this state manages the data in swipable panel
      swipablePnaelIndex: "", //this state manages th eindex of the data in the swipable panel
    };
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

  componentDidMount() {
    this.retriveFullData();
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
    if (this.state.showInput) {
      this.setState({ showInput: !this.state.showInput });
      if (this.state.addEntryIconName === "add") {
        this.setState({ addEntryIconName: "undo" });
      } else {
        this.setState({ addEntryIconName: "add" });
      }
    } else if (this.state.swipeablePanelActive) {
      this.setState({ swipeablePanelActive: !this.state.swipeablePanelActive });
    } else {
      BackHandler.exitApp();
    }
    // We can move to any screen. If we want
    // Returning true means we have handled the backpress
    // Returning false means we haven't handled the backpress
    return true;
  }

  openPanel = () => {
    this.setState({ swipeablePanelActive: true });
  };

  closePanel = () => {
    this.setState({ swipeablePanelActive: false });
  };

  retriveFullData = async () => {
    console.log("Retriving Data");
    try {
      const value = await AsyncStorage.getItem(this.state.fullDataKey);
      if (value !== null) {
        // We have data!!
        var retrivedData = JSON.parse(value);
        console.log(JSON.parse(retrivedData), "Full Data retrived");
        console.log(typeof JSON.parse(retrivedData), "type of Data retrived");
        this.setState({ fullData: JSON.parse(retrivedData) });
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

  renderNavBar = () => {
    if (findTotalIncome(this.state.fullData)) {
      return (
        <View style={styles.navContainer}>
          <View style={styles.statusBar} />
          <View style={styles.navBar}>
            <Text
              style={{
                color: "#fff",
                fontSize: 30,
                fontWeight: "bold",
              }}
            >
              Balance: ₹{" "}
              {findTotalIncome(this.state.fullData) -
                findTotalExpence(this.state.fullData)}
            </Text>
            <TouchableOpacity
              style={{ margin: 10 }}
              onPress={this.showActionSheet}
            >
              <Icon name="more-vert" size={25} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.navContainer}>
          <View style={styles.navContainer} />
          <View style={styles.navBar}>
            <Text
              style={{
                color: "#fff",
                fontSize: 30,
                fontWeight: "bold",
                paddingBottom: 20,
              }}
            >
              Rudgety
            </Text>
            <TouchableOpacity
              style={{ margin: 10 }}
              onPress={this.showActionSheet}
            >
              <Icon name="more-vert" size={25} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  };

  headerComponent = () => {
    console.log(findTotalIncome(this.state.fullData), "total income");
    console.log(typeof findTotalIncome(this.state.fullData));
    if (findTotalIncome(this.state.fullData)) {
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
              justifyContent: "center",
              alignContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ color: "#fff", fontSize: 30, fontWeight: "bold" }}>
              Balance
            </Text>
            <Text style={{ color: "#fff", fontSize: 30, fontWeight: "bold" }}>
              ₹{" "}
              {findTotalIncome(this.state.fullData) -
                findTotalExpence(this.state.fullData)}
            </Text>
          </View>
          <View
            style={{
              flex: 2,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              minWidth: (SCREEN_WIDTH / 10) * 4,
              marginLeft: 20,
            }}
          >
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignContent: "flex-start",
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  if (findTotalExpence(this.state.fullData) > 0) {
                    this.props.navigation.navigate("Expences", {
                      data: this.state.fullData,
                    });
                  } else {
                    alert("No Expences yet!!");
                  }
                }}
              >
                <Text
                  style={{
                    color: "#fff",
                    fontSize: 25,
                    fontWeight: "bold",
                  }}
                >
                  <Text style={{ color: "red" }}>↑ </Text>
                  <Text style={{ color: "#fff" }}>₹</Text>
                  {findTotalExpence(this.state.fullData)}
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignContent: "flex-end",
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  if (findTotalIncome(this.state.fullData) > 0) {
                    this.props.navigation.navigate("Income", {
                      data: this.state.fullData,
                    });
                  } else {
                    alert("No Income Yet!!");
                  }
                }}
              >
                <Text
                  style={{
                    color: "#fff",
                    fontSize: 25,
                    fontWeight: "bold",
                    marginLeft: 30,
                  }}
                >
                  <Text style={{ color: "#19ff25" }}>↓ </Text>
                  <Text style={{ color: "#fff" }}>₹</Text>
                  {findTotalIncome(this.state.fullData)}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      );
    } else {
      return (
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Text style={{ color: "#fff", fontSize: 40, fontWeight: "bold" }}>
            Rudgety
          </Text>
        </View>
      );
    }
  };

  fieldRef = React.createRef();
  fieldRef1 = React.createRef();
  fieldRef2 = React.createRef();

  onSubmit = () => {
    var currentFullData = this.state.fullData;

    let { current: field } = this.fieldRef;
    let { current: field2 } = this.fieldRef1;
    let { current: field3 } = this.fieldRef2;

    if (field.value().length === 0) {
      this.setState({ valueErrorMess: "Please enter a value." });
    } else {
      this.setState({ valueErrorMess: "" });
    }
    if (field2.value().length === 0) {
      this.setState({ nameErrorMess: "Please enter a name." });
    } else {
      this.setState({ nameErrorMess: "" });
    }
    if (field3.value().length === 0) {
      this.setState({ descErrorMess: "Please enter a description." });
    } else {
      this.setState({ descErrorMess: "" });
    }

    if (
      field.value().length > 0 &&
      field2.value().length > 0 &&
      field3.value().length > 0
    ) {
      if (
        findTotalIncome(this.state.fullData) > 0 ||
        this.state.submissionType
      ) {
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
          spentOn: field2.value(),
        };
        var newFullData = currentFullData.concat(newData);

        var currentBalance =
          findTotalIncome(newFullData) - findTotalExpence(newFullData);

        if (currentBalance > 0 || currentFullData.length === 0) {
          this.setState({ fullData: newFullData });
        }
        saveData(this.state.fullDataKey, JSON.stringify(newFullData));

        this.setState({ showInput: !this.state.showInput });
        if (this.state.addEntryIconName === "add") {
          this.setState({ addEntryIconName: "undo" });
        } else {
          this.setState({ addEntryIconName: "add" });
        }
        this.setState({ submitEntryBtnBackgroundColor: "#0088ff" });
      } else {
        alert("No Income yet!!");
      }
    } else {
      this.setState({
        submitEntryBtnBackgroundColor: "#f00",
        submitEntryBtnTitle: "Please enter the details and submit",
      });
    }
  };

  renderContent = () => {
    return (
      <View>
        {/* <StatusBar barStyle="light-content" /> */}
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
              marginTop: 0,
              // minHeight: SCREEN_HEIGHT,
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
                fontSize: 27,
                fontWeight: "bold",
                minHeight: 60,
                marginLeft: SCREEN_WIDTH / 11,
                marginRight: SCREEN_WIDTH / 11,
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
                marginLeft: SCREEN_WIDTH / 9,
                marginRight: SCREEN_WIDTH / 9,
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
        <ActionSheet
          ref={(o) => (this.ActionSheet = o)}
          options={options}
          cancelButtonIndex={3}
          destructiveButtonIndex={3}
          onPress={(index) => {
            console.log(index, "pressed");
            console.log(options[index]);
            if (index === 0) {
              if (this.state.fullData.length > 0) {
                this.setState({
                  editLastEntryViewVisible: true,
                });
              } else {
                alert("Make an entry first!!");
              }
            } else if (index === 1) {
              if (findTotalExpence(this.state.fullData) > 0) {
                this.props.navigation.navigate("Expences", {
                  data: this.state.fullData,
                });
              } else {
                alert("No Expences yet!!");
              }
            } else if (index === 2) {
              if (findTotalIncome(this.state.fullData) > 0) {
                this.props.navigation.navigate("Income", {
                  data: this.state.fullData,
                });
              } else {
                alert("No Income yet!!");
              }
            }
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
            marginRight: SCREEN_WIDTH / 50,
          }}
        >
          <TouchableOpacity
            style={{ margin: 10 }}
            onPress={() => {
              this.setState({ showInput: !this.state.showInput });
              if (this.state.addEntryIconName === "add") {
                this.setState({ addEntryIconName: "undo" });
              } else {
                this.setState({ addEntryIconName: "add" });
              }
              this.setState({
                valueErrorMess: "",
                nameErrorMess: "",
                descErrorMess: "",
                submitEntryBtnBackgroundColor: "#0088ff",
                submitEntryBtnTitle: "Submit",
              });
            }}
          >
            <Icon name={this.state.addEntryIconName} size={27} color="#000" />
          </TouchableOpacity>

          <TouchableOpacity
            style={{ margin: 10 }}
            onPress={() => {
              this.props.navigation.navigate("Search", {
                data: this.state.fullData,
              });
            }}
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
                margin: 10,
              },
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
                  error={this.state.valueErrorMess}
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
                        submissionTypeButtonTitle: "↑",
                      });
                    } else {
                      this.setState({
                        submissionType: !this.state.submissionType,
                        submissionTypeButtonColor: "#16a10a",
                        submissionTypeButtonTitle: "↓",
                      });
                    }
                  }}
                  buttonStyle={{
                    backgroundColor: this.state.submissionTypeButtonColor,
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
              ref={this.fieldRef1}
              error={this.state.nameErrorMess}
            />
            <Text></Text>
            <OutlinedTextField
              label="Enter Description"
              keyboardType="default"
              title="Went to the grocery shop."
              ref={this.fieldRef2}
              error={this.state.descErrorMess}
            />
            <Text></Text>
            <Button
              title={this.state.submitEntryBtnTitle}
              onPress={this.onSubmit}
              buttonStyle={{
                backgroundColor: this.state.submitEntryBtnBackgroundColor,
              }}
            />
            <Text style={{ minHeight: 400 }}></Text>
          </View>
        )}
        {!this.state.showInput && this.state.fullData.length > 0 && (
          <View>{renderFullData}</View>
        )}
        {this.state.editLastEntryViewVisible && (
          <Dialog.Container visible={this.state.editLastEntryViewVisible}>
            <Dialog.Title>Edit Entry</Dialog.Title>
            <Dialog.Description>
              You can edit the most recently added entry.
            </Dialog.Description>
            <Dialog.Input
              label="Enter new Vlaue"
              wrapperStyle={{
                borderColor: "gray",
                borderWidth: 1,
                borderRadius: 5,
                padding: 5,
              }}
              keyboardType="number-pad"
              onChangeText={(text) => this.setState({ newValue: text })}
              value={this.state.newValue}
            ></Dialog.Input>
            <Dialog.Input
              label="Enter new Name"
              wrapperStyle={{
                borderColor: "gray",
                borderWidth: 1,
                borderRadius: 5,
                padding: 5,
              }}
              keyboardType="default"
              onChangeText={(text) => this.setState({ newName: text })}
              value={this.state.newName}
            ></Dialog.Input>
            <Dialog.Input
              label="Enter new Description"
              wrapperStyle={{
                borderColor: "gray",
                borderWidth: 1,
                borderRadius: 5,
                padding: 5,
              }}
              keyboardType="default"
              onChangeText={(text) => this.setState({ newDescription: text })}
              value={this.state.newDescription}
            ></Dialog.Input>
            <Dialog.Button
              label={this.state.editEntryType}
              onPress={() => {
                if (this.state.editEntryType === "Income ▼") {
                  this.setState({
                    editEntryType: "Expence ▼",
                    submissionTypeButtonColor: "#ff3b3b",
                  });
                } else if (this.state.editEntryType === "Expence ▼") {
                  this.setState({
                    editEntryType: "Income ▼",
                    submissionTypeButtonColor: "#16a10a",
                  });
                }
              }}
              color={this.state.submissionTypeButtonColor}
              bold={true}
            />
            <Dialog.Button
              label="Cancel"
              onPress={this.toggleDilog}
              color="gray"
              bold={true}
            />
            <Dialog.Button
              label="Submit"
              onPress={this.editMostRecentData}
              color="#3d98ff"
              bold={true}
            />
          </Dialog.Container>
        )}
        {this.state.fullData.length === 0 && !this.state.showInput && (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginTop: 30,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                this.setState({ showInput: !this.state.showInput });
                if (this.state.showInput) {
                  this.setState({ addEntryIconName: "add" });
                } else {
                  this.setState({ addEntryIconName: "undo" });
                }
                this.setState({
                  valueErrorMess: "",
                  nameErrorMess: "",
                  descErrorMess: "",
                  submitEntryBtnBackgroundColor: "#0088ff",
                  submitEntryBtnTitle: "Submit",
                });
              }}
            >
              <Image
                style={{ width: 200, height: 200 }}
                source={require("../assets/add.png")}
              />
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };

  toggleDilog = () => {
    this.setState({ editLastEntryViewVisible: false });
  };

  editMostRecentData = async () => {
    if (
      this.state.newValue.length > 0 &&
      this.state.newName.length > 0 &&
      this.state.newDescription.length > 0
    ) {
      this.setState({ editLastEntryViewVisible: false });
      var typeOfData;
      if (this.state.editEntryType === "Income ▼") {
        typeOfData = "#28a612";
      } else if (this.state.editEntryType === "Expence ▼") {
        typeOfData = "#ff2b2b";
      }
      var curreentData = this.state.fullData;
      var newData = {
        id:
          Math.floor(Math.random() * 100 + 1) +
          Math.floor(Math.random() * 1000 + 1) +
          Math.floor(Math.random() * 100 + 1),
        value: this.state.newValue,
        date: date,
        desc: this.state.newDescription,
        type: typeOfData,
        spentOn: this.state.newName,
      };
      var poppedCurrentData = curreentData.pop();
      var newFullData = curreentData.concat(newData);
      //   console.log(poppedCurrentData);
      this.setState({ fullData: newFullData });
      saveData(this.state.fullDataKey, JSON.stringify(newFullData));
    } else {
      alert("Fill in the details first!!");
    }
  };

  render() {
    renderFullData = this.state.fullData
      .slice(0)
      .reverse()
      .map((item, index) => {
        if (this.state.fullData.length > 0) {
          return (
            <View key={item.id} style={{ flex: 1, flexDirection: "row" }}>
              <View style={{ flex: 7 }}>
                <TouchableOpacity
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
                      <Text>{item.date}</Text>
                    </View>

                    <View style={{ flex: 2, paddingTop: 10 }}>
                      {item.type == "#28a612" && (
                        <Text style={{ color: item.type, fontSize: 15 }}>
                          + {item.value}
                        </Text>
                      )}
                      {item.type == "#ff2b2b" && (
                        <Text style={{ color: item.type, fontSize: 15 }}>
                          - {item.value}
                        </Text>
                      )}
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={{ flex: 1, paddingTop: 8 }}>
                <TouchableOpacity
                  style={{ margin: 10 }}
                  onPress={() => {
                    Alert.alert(
                      "Are you sure?",
                      "It can't be brought back!!",
                      [
                        {
                          text: "Cancel",
                          onPress: () => console.log("Cancel Pressed"),
                          style: "cancel",
                        },
                        {
                          text: "OK",
                          onPress: () => {
                            console.log("OK Pressed");
                            var currentFullData = this.state.fullData;
                            currentFullData.splice(
                              currentFullData.length - index - 1,
                              1
                            );
                            this.setState({ fullData: currentFullData });
                            console.log(currentFullData);
                            saveData(
                              this.state.fullDataKey,
                              JSON.stringify(currentFullData)
                            );
                          },
                        },
                      ],
                      { cancelable: false }
                    );
                  }}
                >
                  <Icon name="delete" size={20} color="#545454" />
                </TouchableOpacity>
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
          headerMaxHeight={180}
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
            onScrollEndDrag: () => console.log("onScrollEndDrag"),
          }}
          alwaysShowTitle={false}
          alwaysShowNavBar={false}
        />
      </View>
    );
  }
}

export default HomeScreen;
