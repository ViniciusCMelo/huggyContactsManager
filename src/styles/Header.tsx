import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
  container: {
    padding: 24,
    paddingBottom: 8,
    backgroundColor: '#ffffff',
    borderColor: '#dde3f0',
    paddingTop: 30,
    display: "flex",
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "500",
    fontFamily: "Roboto_500Medium",
    color: "#050505",
    lineHeight: 28,
    paddingTop: 14,
    paddingBottom: 14,
  },
  buttonsContainer: {
    flex: 2,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  icon: {
    marginLeft: 19,
  }
});
