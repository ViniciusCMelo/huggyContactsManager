import React, {useEffect, useState} from "react";
import {View, Text, StyleSheet, Image, SafeAreaView, FlatList, StatusBar} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "../components/Icon/Icon";
import MainButton from "../components/Button/Button";
import {getContactsByPage} from "../services/api";
import Initials, {getInitials} from "../components/Initials/Initials";
import Item from "../components/Item/Item";

export default function Contacts({navigation}) {
  const [user, setUser] = useState();
  const [currentPage, setCurrentPage] = useState<number>(-1);
  const [endOfTheList, setEndOfTheList] = useState<boolean>(false);
  const [contacts, setContacts] = useState([]);

  // if(contact[i].name.firtLetter() == currentContactFirstLetter) ...
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

  useEffect(async () => {
    let newContacts = [];
    await getContactsByPage(currentPage).then(response => {
      response.forEach(contact => {
        newContacts.push({
          key: contact.id.toString(),
          initials: getInitials(contact.name),
          name: contact.name
        })
      })
    })
    setContacts(previousContacts => [...previousContacts, ...newContacts]);
  }, [currentPage]);

  const renderItem = ({item}) => (
    <Item name={item.name} indexLetter={true} initials={item.initials}/>
  );

  return (
    <View style={styles.container}>
      {contacts?.length <= 0 ?
        <View>
          <Image source={require('../../assets/openBook.png')} style={{width: 200, height: 200}}/>
          <Text style={styles.lightText}>Ainda não há contatos</Text>
          <MainButton text={"Adicionar Contato"}
                      onClick={() => {
                      }}
                      icon={<Icon name={'add'} size={18} color={"white"}/>}
          />
        </View> :
        <SafeAreaView style={styles.container}>
          <FlatList
            data={contacts}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            onEndReached={() => setCurrentPage(currentPage + 1)}
            onEndReachedThreshold={0.9}
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
