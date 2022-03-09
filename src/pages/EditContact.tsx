import React, {useContext, useState} from "react";
import {View, Text, StyleSheet, TextInput, ScrollView} from "react-native";
import {useRoute} from "@react-navigation/native";
import NavigationHeader from "../components/NavigationHeader";
import Button from '../components/Button/Button'
import {text} from "../components/textStyles";
import {api, putContact} from "../services/api";
import {useValidation} from 'react-native-form-validator';
import ContactsContext from "../store/contacts";
import {getIndexInitial, getInitials} from "../components/Initials/Initials";

export default function EditContact({navigation}) {
  const route: any = useRoute();
  const contact = route.params.contact;
  const [name, setName] = useState<String>(contact.name ?? '')
  const [email, setEmail] = useState<String>(contact.email ?? '')
  const [phone, setPhone] = useState<String>(contact.phone ?? '')
  const [mobile, setMobile] = useState<String>(contact.mobile ?? '')
  const [address, setAddress] = useState<String>(contact.address ?? '')
  const [district, setDistrict] = useState<String>(contact.district ?? '')
  const [city, setCity] = useState<String>(contact.city ?? '')
  const [state, setState] = useState<String>(contact.state ?? '')
  const {contacts, setContacts} = useContext(ContactsContext)

  const {validate, isFieldInError, getErrorsInField, getErrorMessages, isFormValid} =
    useValidation({state: {name, email, phone, mobile, address, district, city, state},});

  function validForm() {
    validate({
      name: {required: true},
      email: {email: true, required: true},
    })
    return isFormValid();
  }


  const saveButton = (): React.ReactFragment => {
    return (
      <React.Fragment>
        <View style={styles.buttonsContainer}>
          <Button
            text={'Salvar'}
            onClick={async () => {
              if (validForm()) {
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
                await putContact(payload, contact.id).then(response => {
                  if (response.reason) {
                    console.error(response.reason)
                    alert('Ocorreu um erro')
                  } else {
                    let newContacts = contacts;
                    let currentIndexInitial = getIndexInitial(name);
                    let contactIndex = newContacts[getIndexInitial(contact.initials)].findIndex(element => element.key === contact.id)
                    if (getIndexInitial(contact.initials) === currentIndexInitial) {
                      newContacts[getIndexInitial(contact.initials)][contactIndex] = {
                        key: response.id.toString(),
                        initials: getInitials(response.name),
                        name: response.name
                      }
                    } else {
                      newContacts[getIndexInitial(contact.initials)].splice(contactIndex, 1)
                      newContacts[currentIndexInitial].push({
                        key: contact.key,
                        initials: getInitials(name),
                        name: name
                      })
                    }
                    setContacts({...newContacts})
                    navigation.navigate({
                      name: 'ContactDetail',
                      params: {id: response.id, name: response.name}
                    })
                  }
                })

              }
            }
            }/>
        </View>
      </React.Fragment>
    )
  }

  return (
    <View style={styles.container}>
      <NavigationHeader
        title={'Editar Contato'}
        showCancel={'close'}
        rightContent={saveButton()}
      />
      <ScrollView style={styles.scrollContainer}>
        <View style={[styles.inputContainer, isFieldInError('name') && {
          borderColor: '#AD2213'
        }]}>
          {name ? <Text style={[text.caption, isFieldInError('name') && text.captionRed]}>Nome</Text> : null}
          <TextInput
            value={`${name}`}
            onChangeText={setName}
            placeholder={'Nome'}
            placeholderTextColor={isFieldInError('name') ? '#AD2213' : '#1C1C1C'}
            style={[styles.input, text.sub1]}
          />
        </View>
        {isFieldInError('name') &&
        getErrorsInField('name').map(errorMessage => (
          <Text style={[text.caption, text.captionRed, styles.inputWarn]}>{errorMessage}</Text>
        ))}

        <View style={[styles.inputContainer, isFieldInError('email') && {
          borderColor: '#AD2213'
        }]}>
          {email ? <Text style={[text.caption, isFieldInError('email') && text.captionRed]}>Nome</Text> : null}
          <TextInput
            value={`${email}`}
            onChangeText={setEmail}
            placeholder={'Email'}
            placeholderTextColor={isFieldInError('email') ? '#AD2213' : '#1C1C1C'}
            style={[styles.input, text.sub1]}
          />
        </View>
        {isFieldInError('email') &&
        getErrorsInField('email').map(errorMessage => (
          <Text style={[text.caption, text.captionRed, styles.inputWarn]}>{errorMessage}</Text>
        ))}
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
