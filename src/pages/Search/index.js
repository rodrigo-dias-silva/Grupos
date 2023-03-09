import React, { useEffect, useState } from 'react'
import { FlatList, Keyboard, SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native'

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useIsFocused } from '@react-navigation/native';
import ChatList from '../../components/ChatList';

export default function Search() {
  const isFocused = useIsFocused()

  const [txtInput, setTxtInput] = useState('')
  const [user, setUser] = useState(null)
  const [chats, setChats] = useState([])

  useEffect(() => {
    const hasUser = auth().currentUser ? auth().currentUser.toJSON() : null

    setUser(hasUser)

  }, [isFocused])

  async function handleSearch() {
    if (txtInput === '') return;

    const responseSearch = await firestore()
      .collection('MESSAGE_THREADS')
      .where('name', '>=', txtInput)
      .where('name', '<=', txtInput + '\uf8ff')
      .get()
      .then((querySnapshot) => {

        const thread = querySnapshot.docs.map(docSnapshot => {
          return {
            _id: docSnapshot.id,
            name: '',
            lastMessage: { text: '' },
            ...docSnapshot.data()
          }
        })

        setChats(thread)
        setTxtInput('')
        Keyboard.dismiss()
      })
  }

  return (
    <SafeAreaView className='bg-background flex-1'>
      <View className='flex-row justify-center mx-2 my-3'>
        <TextInput
          className='bg-background2 rounded-md px-2 mr-2 h-12 text-title flex-1'
          placeholder='Digite o nome da sala...'
          value={txtInput}
          onChangeText={(txt) => setTxtInput(txt)}
          autoCapitalize='none'
          placeholderTextColor='#7c7c8a'
        />
        <TouchableOpacity
          className='bg-btn-login h-12 w-12 rounded-md justify-center items-center'
          onPress={handleSearch}
        >
          <MaterialIcons name='search' size={30} color={'#fff'} />
        </TouchableOpacity>
      </View>

      <FlatList
        showsVerticalScrollIndicator={false}
        data={chats}
        keyExtractor={item => item._id}
        renderItem={({ item }) => <ChatList data={item} userStatus={user} />}
      />
    </SafeAreaView>
  )
}
