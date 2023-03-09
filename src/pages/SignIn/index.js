import React, { useState } from 'react'
import { Text, View, TouchableOpacity, TextInput, SafeAreaView, Platform } from 'react-native'

import auth from '@react-native-firebase/auth'
import { useNavigation } from '@react-navigation/native';

export default function SignIn() {
  const navigation = useNavigation()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [newUser, setNewUser] = useState(false)

  function handleLogin() {
    if (newUser) {
      // Cadastrar um novo usuário

      if (name === '' | email === '' | password === '') return;

      auth()
        .createUserWithEmailAndPassword(email, password)
        .then((snapshot) => {
          snapshot.user.updateProfile({
            displayName: name
          })
            .then(() => {
              navigation.goBack()
            })
        })
        .catch((error) => {
          if (error.code === 'auth/email-already-in-use') {
            console.log('Este email já está sendo usado!');
          }

          if (error.code === 'auth/invalid-email') {
            console.log('Email inválido!');
          }
        })

    } else {
      // Logar um usuário
      auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          navigation.goBack()
        })
        .catch((error) => {
          if (error.code === 'auth/invalid-email') {
            console.log('Email inválido!');
          }
        })

    }
  }

  return (
    <SafeAreaView className='flex-1 items-center bg-background'>
      <Text className={`text-title font-bold text-3xl ${Platform.OS === 'ios' ? 'mt-20' : 'mt-14'}`}>DgGrupos</Text>
      <Text className='text-subTitle mb-5'>Ajude, colabore, faça networking!</Text>

      {
        newUser && (
          <TextInput
            className='bg-background2 rounded-md w-11/12 mb-3 px-2 h-12 text-title'
            value={name}
            placeholder='Qual seu nome?'
            onChangeText={(txt) => setName(txt)}
            placeholderTextColor='#7c7c8a'
          />
        )
      }
      <TextInput
        className='bg-background2 rounded-md w-11/12 mb-4 px-2 h-12 text-title'
        value={email}
        placeholder='Digite seu e-mail'
        onChangeText={(txt) => setEmail(txt)}
        placeholderTextColor='#7c7c8a'
      />
      <TextInput
        className='bg-background2 rounded-md w-11/12 mb-4 px-2 h-12 text-title'
        value={password}
        placeholder={newUser ? 'Crie uma senha' : 'Digite sua senha'}
        onChangeText={(txt) => setPassword(txt)}
        placeholderTextColor='#7c7c8a'
        secureTextEntry={true}
      />

      <TouchableOpacity
        onPress={handleLogin}
        className={
          `rounded-md w-11/12 h-12 flex items-center justify-center mb-3 ${newUser ? 'bg-btn-create' : 'bg-btn-login'}`
        }>
        <Text className='font-semibold text-base'>
          {newUser ? 'Cadastrar' : 'Acessar'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setNewUser(!newUser)}>
        <Text className='text-sm text-subTitle'>
          {newUser ? 'Já possuo uma conta' : 'Criar uma conta'}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}