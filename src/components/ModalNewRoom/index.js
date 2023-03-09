import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore'


export default function ModalNewRoom({ setVisible, updateScreen }) {
  const [roomName, setRoomName] = useState('')

  const user = auth().currentUser.toJSON()

  function handleBtnCreate() {
    if (roomName === '') return;

    firestore().collection('MESSAGE_THREADS')
      .get()
      .then((snapshot) => {
        let userThreads = 0;

        snapshot.docs.map(docItem => {
          if (docItem.data().owner === user.uid) {
            userThreads += 1;
          }
        })

        if (userThreads >= 4) {
          alert('Você já atingiu o limite de grupos por usuário.')
        } else {
          createRoom()
        }
      })

  }

  function createRoom() {
    firestore()
      .collection('MESSAGE_THREADS')
      .add({
        name: roomName,
        owner: user.uid,
        lastMessage: {
          text: `Grupo ${roomName} criado. Bem vindo(a)!`,
          createdAt: firestore.FieldValue.serverTimestamp(),
        }
      })
      .then((docRef) => {
        docRef.collection('MESSAGES')
          .add({
            text: `Grupo ${roomName} criado. Bem vindo(a)!`,
            createdAt: firestore.FieldValue.serverTimestamp(),
            system: true
          })
          .then(() => {
            setVisible();
            updateScreen()
          })
      })
      .catch((err) => {
        console.error(err);
      })
  }

  return (
    <View className='flex-1 bg-transp-modal'>
      <TouchableWithoutFeedback onPress={setVisible}>
        <View className='flex-1'></View>
      </TouchableWithoutFeedback>

      <View className='flex-1 bg-background p-4 items-center'>
        <Text className='text-title mt-4 text-center font-bold text-lg'>Criar um novo Grupo</Text>
        <TextInput
          className='bg-background2 rounded-md w-11/12 my-4 px-2 h-12 text-title'
          value={roomName}
          onChangeText={(text) => setRoomName(text)}
          placeholder='Nome para a sua sala'
          placeholderTextColor='#7c7c8a'
        />

        <TouchableOpacity
          className='rounded-md w-11/12 h-12 flex items-center justify-center mb-3 bg-btn-login'
          onPress={handleBtnCreate}
        >
          <Text className='font-bold text-lg'>Criar sala</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}