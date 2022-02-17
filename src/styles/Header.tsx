import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
  container: {
    padding: 24,
    paddingBottom: 8,
    backgroundColor: '#ffffff',
    borderColor: '#dde3f0',
    paddingTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontFamily: "Roboto",
    color: "#050505",
    lineHeight: 28,
    paddingTop: 14,
    paddingBottom: 14,
  },
  menuButton: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(21, 195, 214,0.7)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
