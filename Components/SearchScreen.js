import React, { Component } from "react";
import {
  Text,
  View,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Dimensions
} from "react-native";
import { OutlinedTextField } from "react-native-material-textfield";

const SCREEN_HEIGHT = Math.round(Dimensions.get("window").height);

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchKey: "",
      searchData: []
    };
  }

  fieldRef = React.createRef();

  updateSearch = () => {
    const { data } = this.props.route.params;
    let { current: field } = this.fieldRef;
    // console.log(data);

    if (field.value().length > 0) {
      var searchDataArr = [];

      for (var i = 0; i < data.length; i++) {
        if (
          data[i].spentOn.toUpperCase().includes(field.value().toUpperCase()) ||
          data[i].desc.toUpperCase().includes(field.value().toUpperCase())
        ) {
          searchDataArr.push(data[i]);
        }
      }
      this.setState({
        searchData: searchDataArr
      });
    } else {
      this.setState({
        searchData: []
      });
      return null;
    }
  };

  render() {
    renderSearch = this.state.searchData.map((item, index) => {
      if (this.state.searchData.length > 0) {
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
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate("Details", {
                    data: item
                  });
                }}
              >
                <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                  {item.spentOn}
                </Text>
                <Text>{item.desc}</Text>
              </TouchableOpacity>
            </View>
            <View style={{ flex: 2, paddingTop: 10 }}>
              {item.type == "#28a612" && (
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate("Details", {
                      data: item
                    });
                  }}
                >
                  <Text style={{ color: item.type, fontSize: 15 }}>
                    + {item.value}
                  </Text>
                </TouchableOpacity>
              )}
              {item.type == "#ff2b2b" && (
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate("Details", {
                      data: item
                    });
                  }}
                >
                  <Text style={{ color: item.type, fontSize: 15 }}>
                    - {item.value}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        );
      }
    });

    const { search } = this.state;
    return (
      <SafeAreaView>
        <ScrollView alwaysBounceVertical={false} stickyHeaderIndices={[0]}>
          <View
            style={{
              minHeight: 60,
              backgroundColor: "#0088ff",
              justifyContent: "center",
              flexDirection: "row",
              flex: 1
            }}
          >
            {/* <View
              style={{
                flex: 1,
                justifyContent: "center"
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.goBack();
                }}
              >
                <Icon
                  name="arrow-left"
                  type="simple-line-icon"
                  color="#fff"
                  size={20}
                  underlayColor="#0088ff"
                />
              </TouchableOpacity>
            </View> */}
            <View style={{ flex: 2, justifyContent: "center" }}>
              <Text style={{ color: "#fff", fontSize: 25, marginLeft: 20 }}>
                Search
              </Text>
            </View>
          </View>
          <View style={{ backgroundColor: "#fff", minHeight: SCREEN_HEIGHT }}>
            <OutlinedTextField
              label="Type here..."
              keyboardType="default"
              onChangeText={this.updateSearch}
              ref={this.fieldRef}
              autoFocus={true}
              onSubmitEditing={this.updateSearch}
              inputContainerStyle={{
                backgroundColor: "#fff",
                marginTop: 20,
                margin: 10
              }}
              containerStyle={{ backgroundColor: "#fff" }}
            />
            <View>{renderSearch}</View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default Search;
