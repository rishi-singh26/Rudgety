import { StyleSheet, Dimensions } from "react-native";

const SCREEN_HEIGHT = Math.round(Dimensions.get("window").height);
const SCREEN_WIDTH = Math.round(Dimensions.get("window").width);
const IS_IPHONE_X = SCREEN_HEIGHT === 812 || SCREEN_HEIGHT === 896;
const STATUS_BAR_HEIGHT = Platform.OS === "ios" ? (IS_IPHONE_X ? 44 : 20) : 60;
const HEADER_HEIGHT = Platform.OS === "ios" ? (IS_IPHONE_X ? 88 : 64) : 70;
const NAV_BAR_HEIGHT = HEADER_HEIGHT - STATUS_BAR_HEIGHT;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  contentContainer: {
    flexGrow: 1
  },
  navContainer: {
    height: HEADER_HEIGHT,
    marginHorizontal: 10
  },
  statusBar: {
    height: STATUS_BAR_HEIGHT,
    backgroundColor: "transparent"
  },
  navBar: {
    height: NAV_BAR_HEIGHT,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "transparent"
  },
  titleStyle: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 18,
    paddingTop: 10
  }
});

export default styles;
