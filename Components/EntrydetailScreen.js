import React, { Component } from "react";
import {
  Text,
  View,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Dimensions
} from "react-native";
import { Icon } from "react-native-elements";

const SCREEN_HEIGHT = Math.round(Dimensions.get("window").height);

class Details extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { data } = this.props.route.params;

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
            <View style={{ flex: 2, justifyContent: "center" }}>
              <Text style={{ color: "#fff", fontSize: 25, marginLeft: 20 }}>
                Details
              </Text>
            </View>
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginTop: 50
            }}
          >
            {data.type === "#28a612" && (
              <Icon name="check" reverse size={25} color={data.type} />
            )}
            {data.type === "#ff2b2b" && (
              <Icon name="clear" reverse size={25} color={data.type} />
            )}

            <Text
              style={{
                fontSize: 40,
                fontWeight: "bold",
                minHeight: 60
              }}
            >
              {data.spentOn}
            </Text>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                color: data.type,
                minHeight: 30
              }}
            >
              {data.desc}
            </Text>
            <Text
              style={{
                fontSize: 30,
                fontWeight: "bold",
                color: data.type,
                minHeight: 70
              }}
            >
              ₹ {data.value}
            </Text>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold"
              }}
            >
              {data.date}
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default Details;
