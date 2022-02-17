import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
  button: {
    display: "flex",
    backgroundColor: "#321BDE",
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "center",
  },
  iconContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: 'center',
    paddingLeft: 14,
  },
  buttonText: {
    color: '#ffffff',
    fontFamily: 'Roboto_500Medium',
    fontSize: 14,
    letterSpacing: 1.5,
    paddingTop: 9,
    paddingBottom: 9,
    paddingRight: 12,
  },
});
