import {StatusBar, StyleSheet, Dimensions} from "react-native";
const windowWidth = Dimensions.get('window').width;


export const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  containerLetter: {
    marginLeft: 16,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 24,
    width: 14,
  },
  indexLetter: {
    fontFamily: 'Roboto_500Medium',
    fontSize: 20,
    letterSpacing: 0.15,
    lineHeight: 28,
    textAlign: 'center'
  },
  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 20,
    paddingVertical: 8,
  },
  title: {
    fontSize: 16,
    fontFamily: 'Roboto_400Regular',
    letterSpacing: 0.15,
    lineHeight: 24,
    color: '#050505',
    marginLeft: 16,
  },
  button: {
    width: windowWidth - 90,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    paddingRight: 8
  }
})
