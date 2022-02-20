import React, {useEffect, useState} from "react";
import {View, Text, StyleSheet, ScrollView} from "react-native";
import {useRoute} from "@react-navigation/native";
import Initials, {getInitials} from "../components/Initials/Initials";
import InfoCard from "../components/InforCard/InfoCard";
import {api} from "../services/api";
import FooterButton from "../components/FooterButton";

interface ContactRouteParam {
  id: string,
  name: string
}

export default function ContactDetail(){
  const route = useRoute();
  const params = route.params as ContactRouteParam;
  const [contact, setContact] = useState<any>()

  async function  getContactDetails(id: string){
    await api.get(`contacts/${id}`).then(response => {
      setContact(response.data)
    })

  }
  useEffect(() =>{
    getContactDetails(params.id)
  }, [])

  return (
    <ScrollView style={styles.container}>
      <FooterButton destination={'EditContact'} icon={'edit'}/>
      <View style={styles.contactHeader}>
        <Initials name={getInitials(params.name)} size={"lg"}/>
        <Text style={styles.largeFont}>{params.name}</Text>
        <Text style={styles.smallFont}>{params.id}</Text>
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
  }

})
