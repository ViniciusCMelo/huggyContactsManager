import React, {useState} from "react";
import {View, Text, StyleSheet, TextInput, ScrollView} from "react-native";
import {useNavigation, useRoute} from "@react-navigation/native";
import NavigationHeader from "../components/NavigationHeader";
import Button from '../components/Button/Button'
import {text} from "../components/textStyles";
import {api} from "../services/api";

export default function CreateContact({navigation}) {
  const route = useRoute();
  const [name, setName] = useState<String>('')
  const [email, setEmail] = useState<String>('')
  const [phone, setPhone] = useState<String>('')
  const [mobile, setMobile] = useState<String>('')
  const [address, setAddress] = useState<String>('')
  const [district, setDistrict] = useState<String>('')
  const [city, setCity] = useState<String>('')
  const [state, setState] = useState<String>('')
  const [nameError, setNameError] = useState({status: false, error: 'Campo obrigatório'})
  const [emailError, setEmailError] = useState({status: false, error: ''})

  function validateEmail(email) {
    let re = /\S+@\S+\.\S+/;
    return re.test(email);
  }
  const saveButton = (): React.ReactFragment => {
    return (
      <React.Fragment>
        <View style={styles.buttonsContainer}>
          <Button
            text={'Salvar'}
            onClick={async () => {
              if (!name) {
                setNameError({status: true, error: 'Campo obrigatório'})
              } else {
                setNameError({status: false, error: 'Campo obrigatório'})
              }
              if (email == '') {
                setEmailError({status: true, error: 'Campo obrigatório'})
              }
              if (!validateEmail(email)) {
                setEmailError({status: true, error: 'E-mail inválido'})
              } else {
                setEmailError({status: false, error: 'E-mail inválido'})
              }

              if (!emailError.status && !nameError.status) {

                const payload = {
                  name: name,
                  email: email.toLowerCase(),
                  phone: phone ?? '',
                  mobile: mobile ?? '',
                  address: address ?? '',
                  district: district ?? '',
                  city: city ?? '',
                  state: state ?? ''
                }
                await api.post(`contacts/`, payload)
                  .then(response => {
                    navigation.navigate({
                      name: 'ContactDetail',
                      params: {id: response.data.id, name: response.data.name}
                    })
                  })
                  .catch(error => {
                    console.log(error)
                    alert('Ops, ocorreu um erro.')
                  })
              }
            }}/>
        </View>
      </React.Fragment>

    )
  }
  return (
    <View style={styles.container}>
      <NavigationHeader
        title={'Criar Contato'}
        showCancel={'close'}
        rightContent={saveButton()}
      />
      <ScrollView style={styles.scrollContainer}>
        <View style={[styles.inputContainer, nameError.status && {
          borderColor: '#AD2213'
        }]}>
          {name ? <Text style={[text.caption, nameError.status && text.captionRed]}>Nome</Text> : null}
          <TextInput
            value={`${name}`}
            onChangeText={setName}
            placeholder={'Nome'}
            placeholderTextColor={!!nameError.status ? '#AD2213' : '#1C1C1C'}
            style={[styles.input, text.sub1]}
          />
        </View>
        {!!nameError.status && (
          <Text style={[text.caption, text.captionRed, styles.inputWarn]}>{nameError.error}</Text>
        )}
        <View style={[styles.inputContainer, emailError.status && {
          borderColor: '#AD2213'
        }]}>
          {email ? <Text style={[text.caption, emailError.status && text.captionRed]}>E-mail</Text> : null}
          <TextInput
            value={`${email}`}
            onChangeText={setEmail}
            placeholder={'E-mail'}
            keyboardType={"email-address"}
            placeholderTextColor={emailError.status ? '#AD2213' : '#1C1C1C'}
            style={[styles.input, text.sub1]}
          />
        </View>
        {!!emailError.status && (
          <Text style={[text.caption, text.captionRed, styles.inputWarn]}>{emailError.error}</Text>
        )}
        <View style={styles.inputContainer}>
          {phone ? <Text style={text.caption}>Telefone</Text> : null}
          <TextInput
            value={`${phone}`}
            onChangeText={setPhone}
            placeholder={'Telefone'}
            keyboardType={"number-pad"}
            placeholderTextColor={'#1C1C1C'}
            style={[styles.input, text.sub1]}
          />
        </View>
        <View style={styles.inputContainer}>
          {mobile ? <Text style={text.caption}>Celular</Text> : null}
          <TextInput
            value={`${mobile}`}
            onChangeText={setEmail}
            placeholder={'Celular'}
            keyboardType={"number-pad"}
            placeholderTextColor={'#1C1C1C'}
            style={[styles.input, text.sub1]}
          />
        </View>
        <View style={styles.inputContainer}>
          {address ? <Text style={text.caption}>Endereço</Text> : null}
          <TextInput
            value={`${address}`}
            onChangeText={setAddress}
            placeholder={'Endereço'}
            placeholderTextColor={'#1C1C1C'}
            style={[styles.input, text.sub1]}
          />
        </View>
        <View style={styles.inputContainer}>
          {district ? <Text style={text.caption}>Bairro</Text> : null}
          <TextInput
            value={`${district}`}
            onChangeText={setDistrict}
            placeholder={'Bairro'}
            placeholderTextColor={'#1C1C1C'}
            style={[styles.input, text.sub1]}
          />
        </View>
        <View style={styles.inputContainer}>
          {city ? <Text style={text.caption}>Cidade</Text> : null}
          <TextInput
            value={`${city}`}
            onChangeText={setCity}
            placeholder={'Cidade'}
            placeholderTextColor={'#1C1C1C'}
            style={[styles.input, text.sub1]}
          />
        </View>
        <View style={styles.inputContainer}>
          {state ? <Text style={text.caption}>Estado</Text> : null}
          <TextInput
            value={`${state}`}
            onChangeText={setState}
            placeholder={'Estado'}
            placeholderTextColor={'#1C1C1C'}
            style={[styles.input, text.sub1]}
          />
        </View>
      </ScrollView>
    </View>
  )
}

export const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    display: "flex",
    flexDirection: "column",
    height: '100%'
  }, scrollContainer: {
    backgroundColor: '#ffffff',
    display: "flex",
    flexDirection: "column",
    paddingHorizontal: 16,
  },
  inputContainer: {
    height: 56,
    borderRadius: 16,
    backgroundColor: '#F8F8F8',
    paddingHorizontal: 16,
    display: "flex",
    justifyContent: 'center',
    alignItems: 'flex-start',
    borderWidth: 1,
    borderColor: '#C9C9C9',
    marginTop: 16,
  },
  buttonsContainer: {
    flex: 2,
    flexDirection: "row",
    justifyContent: "flex-end",
    marginRight: 16,
  }, input: {
    width: '100%',
  }, inputWarn: {
    marginLeft: 16,
    marginTop: 4
  }
})
