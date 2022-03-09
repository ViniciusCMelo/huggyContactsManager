import React, {useContext, useEffect, useRef, useState} from "react";
import {View, Text, StyleSheet, Image, SafeAreaView, FlatList, StatusBar, Animated} from "react-native";
import Icon from "../components/Icon/Icon";
import MainButton from "../components/Button/Button";
import {api} from "../services/api";
import Initials, {getIndexInitial, getInitials} from "../components/Initials/Initials";
import Item from "../components/Item/Item";
import FooterButton from "../components/FooterButton";
import {useIsFocused} from "@react-navigation/native";
import AuthContext from "../store/authenticate";
import ContactsContext from "../store/contacts";


export default function Contacts({navigation}) {
  const {authenticated} = useContext(AuthContext);
  const isLogged = () => authenticated;
  const {contacts, setContacts} = useContext(ContactsContext)

  const [endOfTheList, setEndOfTheList] = useState<boolean>(false);
  const isFocused = useIsFocused()

  let page = useRef(0)

  useEffect(() => {
    if (!isLogged()) {
      navigation.navigate('Login')
    }
    getContactsByPage(page.current);
  }, [])

  async function getContactsByPage(currentPage) {
    let response = await api.get(`contacts/?page=${currentPage}`)
      .then(response => {
        let newContacts = contacts;
        if (response.data !== []) {
          for (let i = 0; i < response.data.length; i++) {
            let indexInitial = getIndexInitial(response.data[i].name)
            if (!(indexInitial in newContacts)) {
              newContacts[indexInitial] = [{
                key: response.data[i].id.toString(),
                initials: getInitials(response.data[i].name),
                name: response.data[i].name
              }]
            } else {
              newContacts[indexInitial].push({
                key: response.data[i].id.toString(),
                initials: getInitials(response.data[i].name),
                name: response.data[i].name
              })
            }
          }
          setContacts({...newContacts});
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
    setEndOfTheList(false)
  }, [isFocused])


  const renderItem = (item) => {
    let loopRender = []
    for (let i = 0; i < item[1].length; i++) {
      if (i === 0) {
        loopRender.push(<React.Fragment>
          <Item key={item[1][i]?.key}
                initials={item[1][i]?.initials}
                name={item[1][i]?.name}
                indexLetter={{letter: item[0], status: true}}
                id={item[1][i]?.key}/></React.Fragment>)
      } else {
        loopRender.push(<React.Fragment>
          <Item key={item[1][i]?.key}
                initials={item[1][i]?.initials}
                name={item[1][i]?.name}
                indexLetter={{letter: item[1][i]?.initials, status: false}}
                id={item[1][i]?.key}/></React.Fragment>)
      }
    }
    return <View key={item[0]}>{loopRender}</View>
  }

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
            data={Object.entries(contacts)}
            renderItem={({item}) => renderItem(item)}
            onEndReached={() => endOfTheList ? null : getContactsByPage(page.current)}
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
