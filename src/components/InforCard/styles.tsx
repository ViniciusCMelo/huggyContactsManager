import React from "react";
import {StyleSheet} from "react-native";

export const style = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff'
  },
  titleContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 24,
    paddingLeft: 16,
    paddingBottom: 16,
    backgroundColor: '#ffffff',
  },
  infoContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginHorizontal: 16,
    borderBottomColor: '#E1E1E1',
    borderBottomWidth: 1
  },
  title: {
    fontFamily: 'Rubik_500Medium',
    fontSize: 12,
    lineHeight: 16,
    color: '#321BDE'
  },
  infoTitle: {
    fontFamily: 'Rubik_400Regular',
    fontSize: 12,
    lineHeight: 16,
    color: '#1C1C1C',
    paddingTop: 9
  },
  infoContent: {
    fontFamily: 'Rubik_400Regular',
    fontSize: 14,
    lineHeight: 22,
    color: '#050505',
    paddingBottom: 8
  }
})
