import React, {useContext, useEffect, useState} from "react";
import {View, Text, StyleSheet, ScrollView} from "react-native";
import {useIsFocused, useNavigation, useRoute} from "@react-navigation/native";
import Initials, {getIndexInitial, getInitials} from "../components/Initials/Initials";
import InfoCard from "../components/InforCard/InfoCard";
import {api} from "../services/api";
import FooterButton from "../components/FooterButton";
import NavigationHeader from "../components/NavigationHeader";
import {BorderlessButton} from "react-native-gesture-handler";
import Icon from "../components/Icon/Icon";
import ContactsContext from "../store/contacts";

interface ContactRouteParam {
  id: string,
  name: string
}

export default function ContactDetail() {
  const route = useRoute();
  const params = route.params as ContactRouteParam;
  const [contact, setContact] = useState<any>()
  const isFocused = useIsFocused()
  const navigation = useNavigation()
  const {contacts, setContacts} = useContext(ContactsContext)

  const removeContact = (contact) => {
    let newContacts = contacts
    let contactIndex = newContacts[getIndexInitial(contact.name)].findIndex(element => element.key === contact.id)
    newContacts[getIndexInitial(contact.initials)].splice(contactIndex, 1)
    setContacts(newContacts);
  }

  async function getContactDetails(id: string) {
    await api.get(`contacts/${id}`).then(response => {
      setContact({...response.data, initials: getInitials(response.data.name)})
    })
  }

  useEffect(() => {
    //@TODO: Investigate why this is being called after navigation to Contacts Page.
    getContactDetails(params.id)
  }, [isFocused])

  const deleteButton = (): React.ReactFragment => {
    return (
      <React.Fragment>
        <View style={styles.buttonsContainer}>
          <BorderlessButton style={styles.icon} onPress={async () => {
            await api.delete(`contacts/${contact.id}`).then(response => {
              removeContact(contact)
              alert('Contato deletado')
              navigation.navigate('Contacts')
            })
          }}>
            <Icon name="delete" size={24} color="black"/>
          </BorderlessButton>
        </View>
      </React.Fragment>

    )
  }

  return (
    <View><NavigationHeader
      title={''}
      showCancel={'arrow_back'}
      rightContent={deleteButton()}
    />
      <ScrollView style={styles.container}>
        <FooterButton destination={'EditContact'} icon={'edit'} params={{contact: contact}}/>
        <View style={styles.contactHeader}>
          <Initials name={contact?.initials} size={"lg"}/>
          <Text style={styles.largeFont}>{contact?.name}</Text>
          <Text style={styles.smallFont}>{contact?.id}</Text>
          <View style={styles.border}/>
        </View>
        <InfoCard title={'Detalhes'} info={[
          {
            title: 'Nome',
            content: `${contact?.name ? contact?.name : 'Não disponível'}`
          },
          {
            title: 'E-mail',
            content: `${contact?.email ? contact?.email : 'Não disponível'}`
          },
          {
            title: 'Telefone',
            content: `${contact?.phone ? contact?.phone : 'Não disponível'}`
          },
          {
            title: 'Celular',
            content: `${contact?.mobile ? contact?.mobile : 'Não disponível'}`
          },
        ]}/>
        <InfoCard title={'Endereço'} info={[
          {
            title: 'Endereço',
            content: `${contact?.address ? contact?.address : 'Não disponível'}`
          },
          {
            title: 'Bairro',
            content: `${contact?.district ? contact?.district : 'Não disponível'}`
          },
          {
            title: 'Cidade',
            content: `${contact?.city ? contact?.city : 'Não disponível'}`
          },
          {
            title: 'Estado',
            content: `${contact?.state ? contact?.state : 'Não disponível'}`
          },
        ]}/>
      </ScrollView>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff'

  },
  contactHeader: {
    display: 'flex',
    flexDirection: "column",
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  border: {
    borderBottomColor: "#E1E1E1",
    borderBottomWidth: 1,
    marginTop: 32,
    width: '100%',
  },
  largeFont: {
    fontSize: 20,
    fontFamily: "Roboto_500Medium",
    color: "#050505",
    lineHeight: 28,
    paddingTop: 14,
    paddingBottom: 8,
  },
  smallFont: {
    fontFamily: "Roboto_400Regular",
    fontSize: 14,
    lineHeight: 18,
    letterSpacing: 0.25
  },
  icon: {
    marginRight: 15,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: 'center'
  },
})
