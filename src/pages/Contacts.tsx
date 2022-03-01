import React, {useContext, useEffect, useRef, useState} from "react";
import {View, Text, StyleSheet, Image, SafeAreaView, FlatList, StatusBar} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "../components/Icon/Icon";
import MainButton from "../components/Button/Button";
import {api, getContactsByPage} from "../services/api";
import Initials, {getInitials} from "../components/Initials/Initials";
import Item from "../components/Item/Item";
import FooterButton from "../components/FooterButton";
import {useIsFocused} from "@react-navigation/native";
import AuthContext from "../store/authenticate";
import authenticate from "../store/authenticate";
import ContactsContext from "../store/contacts";


export default function Contacts({navigation}) {
  const {authenticated} = useContext(AuthContext);
  const isLogged = () => authenticated;
  const {contacts, setContacts} = useContext(ContactsContext)
  const pushContacts = (newContacts) => setContacts([...contacts, ...newContacts])
  const [endOfTheList, setEndOfTheList] = useState<boolean>(false);
  const [lastInitials, setLastInitials] = useState<any[]>([' ']);
  const isFocused = useIsFocused()

  let initials = []
  let page = useRef(0)

  useEffect(() => {
    if(!isLogged()){
      navigation.navigate('Login')
    }
    getContactsByPage(page.current, lastInitials);
  }, [])

  async function getContactsByPage(currentPage, lastInitials) {
    let response = await api.get(`contacts/?page=${currentPage}`)
      .then(response => {
        let newContacts = [];
        if (response.data !== []) {
          for (let i = 0; i < response.data.length; i++) {
            initials = getInitials(response.data[i].name);
            newContacts.push({
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
          pushContacts(newContacts);
          page.current = currentPage + 1;
        } else {
          setEndOfTheList(true)
        }
      })
      .catch(error => {
        return error;
      });
  }

  useEffect(() => {
    setLastInitials([' '])
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
            onEndReached={() => endOfTheList ? null : getContactsByPage(page.current, lastInitials)}
          />
        </SafeAreaView>
      }
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
