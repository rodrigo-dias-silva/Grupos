import React, { useEffect, useState } from 'react'
import { FlatList, KeyboardAvoidingView, Platform, SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native'

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import Feather from 'react-native-vector-icons/Feather'

import ChatMessage from '../../components/ChatMessage';

export default function Messages({ route }) {

  const { thread } = route.params;
  const [messages, setMessages] = useState([])
  const [textInput, setTextInput] = useState('')

  const user = auth().currentUser.toJSON()

  useEffect(() => {
    const unsubscribeListener = firestore().collection('MESSAGE_THREADS')
      .doc(thread._id)
      .collection('MESSAGES')
      .orderBy('createdAt', 'desc')
      .onSnapshot(querySnapshot => {
        const messages = querySnapshot.docs.map(doc => {
          const firebaseData = doc.data()

          const data = {
            _id: doc.id,
            text: '',
            createdAt: firestore.FieldValue.serverTimestamp(),
            ...firebaseData
          }

          if (!firebaseData.system) {
            data.user = {
              ...firebaseData.user,
              name: firebaseData.user.displayName
            }
          }

          return data
        })

        setMessages(messages)
      })

    return () => unsubscribeListener()


  }, [])

  async function handleSend() {
    if (textInput === '') return;

    await firestore()
      .collection('MESSAGE_THREADS')
      .doc(thread._id)
      .collection('MESSAGES')
      .add({
        text: textInput,
        createdAt: firestore.FieldValue.serverTimestamp(),
        user: {
          _id: user.uid,
          displayName: user.displayName
        }
      })

    await firestore()
      .collection('MESSAGE_THREADS')
      .doc(thread._id)
      .set({
        lastMessage: {
          text: textInput,
          createdAt: firestore.FieldValue.serverTimestamp(),
        }
      }, { merge: true })

    setTextInput('')
  }


  return (
    <SafeAreaView className='flex-1 bg-background'>
      <FlatList
        style={{ width: '100%' }}
        data={messages}
        keyExtractor={item => item._id}
        renderItem={({ item }) => <ChatMessage data={item} />}
        showsVerticalScrollIndicator={false}
        inverted={true}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ width: '100%' }}
        keyboardVerticalOffset={100}
      >
        <View className='flex-row m-3 items-end'>
          <View className='flex-row items-center bg-background2 flex-1 mr-3 rounded-3xl '>
            <TextInput
              className='flex-1 mx-3 max-h-32 min-h-12 text-title'
              placeholder='Digite sua mensagem...'
              placeholderTextColor='#7c7c8a'
              value={textInput}
              onChangeText={(txt) => setTextInput(txt)}
              multiline={true}
            />
          </View>
          <TouchableOpacity
            className='h-12 w-12 items-center justify-center bg-btn-login rounded-full'
            onPress={handleSend}
          >
            <View className='relative -left-[1px] -bottom-[2px]'>
              <Feather name='send' size={22} color='#fff' />
            </View>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}