import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
  container: {
    paddingBottom: 8,
    paddingLeft: 24,
    backgroundColor: '#ffffff',
    borderColor: '#dde3f0',
    paddingTop: 30,
    display: "flex",
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignContent: 'center',
    borderWidth: 1,
    borderBottomColor: '#E1E1E1'
  },
  titleContainer: {
    paddingLeft: 15
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
    alignItems: 'center'
  },
  icon: {
   marginRight: 15,
  }
});
