import React, {useEffect, useState} from "react";
import {View, Text, StyleSheet, Image, SafeAreaView, FlatList, StatusBar} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "../components/Icon/Icon";
import MainButton from "../components/Button/Button";
import {api, getContactsByPage} from "../services/api";
import Initials, {getInitials} from "../components/Initials/Initials";
import Item from "../components/Item/Item";
import FooterButton from "../components/FooterButton";
import {useIsFocused} from "@react-navigation/native";

export default function Contacts({navigation}) {
  const [user, setUser] = useState();
  const [currentPage, setCurrentPage] = useState<number>(-1);
  const [endOfTheList, setEndOfTheList] = useState<boolean>(false);
  const [contacts, setContacts] = useState<any[]>([]);
  const [lastInitials, setLastInitials] = useState<any[]>([' ']);
  const isFocused = useIsFocused()

  const getUserData = () => {
    try {
      AsyncStorage.getItem('user')
        .then(value => {
          if (value !== null || undefined) {
            if (typeof value === "string") {
              setUser(JSON.parse(value))
              setCurrentPage(0);
            }
          } else {
            navigation.navigate("Login")
          }
        })
    } catch (error) {
      console.log(error)
      navigation.navigate("Login")
    }
  }

  useEffect(() => {
    getUserData();
  }, [])

  let initials = []

  async function getContactsByPage(page, lastInitials) {
    let contacts = [];
    let response = await api.get(`contacts/?page=${page}`)
      .then(response => {
        if (response.data !== []) {
          for (let i = 0; i < response.data.length; i++) {
            initials = getInitials(response.data[i].name).normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            contacts.push({
              key: response.data[i].id.toString(),
              initials: initials,
              letterIndex: {
                status: (initials[0] === lastInitials[0]),
                letter: (initials[0] === undefined ? '&' : initials[0]),
              },
              name: response.data[i].name
            })
            lastInitials = initials;
          }
          setLastInitials(initials);
          setContacts(previousContacts => [...previousContacts, ...contacts]);
        }
      })
      .catch(error => {
        return error;
      });
  }

  useEffect(() => {
    getContactsByPage(currentPage, lastInitials);
  }, [currentPage]);

  useEffect(() => {
    setContacts([])
    setLastInitials([' '])
    setCurrentPage(-1)
    setEndOfTheList(false)
  }, [isFocused])

  const renderItem = ({item}) => (
    <Item
      name={item.name}
      indexLetter={item.letterIndex}
      initials={item.initials}
      id={item.key}
    />
  );

  return (
    <View style={styles.container}>
      {contacts?.length <= 0 ?
        <View>
          <Image source={require('../../assets/openBook.png')} style={{width: 200, height: 200}}/>
          <Text style={styles.lightText}>Ainda não há contatos</Text>
          <MainButton text={"Adicionar Contato"}
                      onClick={() => navigation.navigate('CreateContact')}
                      icon={<Icon name={'add'} size={18} color={"white"}/>}
          />
        </View> :
        <SafeAreaView style={styles.container}>
          <FooterButton destination={'CreateContact'} icon={'add'}/>
          <FlatList
            data={contacts}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            onEndReached={() => setCurrentPage(currentPage + 1)}
          />
        </SafeAreaView>}

    </View>
  )
}
export const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    height: '100%'
  },
  lightText: {
    fontFamily: 'Roboto_400Regular',
    fontStyle: 'normal',
    textAlign: 'center',
    fontSize: 16,
    color: '#757575',
    letterSpacing: 0.15,
    lineHeight: 24,
    paddingBottom: 24,
    paddingTop: 16,
  },
  title: {
    fontSize: 32,
  },
})
