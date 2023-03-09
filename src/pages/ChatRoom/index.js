import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Alert, FlatList, Modal, SafeAreaView, Text, TouchableOpacity, View } from 'react-native'

import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'
import { useIsFocused, useNavigation } from '@react-navigation/native'

import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

import FabButton from '../../components/FabButton'
import ModalNewRoom from '../../components/ModalNewRoom'
import ChatList from '../../components/ChatList'

export default function ChatRoom() {
  const navigation = useNavigation()
  const isFocused = useIsFocused()

  const [user, setUser] = useState(null)
  const [modalVisible, setModalVisible] = useState(false)
  const [threads, setThreads] = useState([])
  const [loading, setLoading] = useState(true)
  const [updateList, setUpdateList] = useState(false)

  useEffect(() => {
    const hasUser = auth().currentUser ? auth().currentUser.toJSON() : null

    setUser(hasUser)

  }, [isFocused])

  useEffect(() => {
    let isActive = true;

    function getChats() {
      firestore()
        .collection('MESSAGE_THREADS')
        .orderBy('lastMessage.createdAt', 'desc')
        .limit(10)
        .get()
        .then((snapshot) => {
          const thread = snapshot.docs.map(docSnapshot => {
            return {
              _id: docSnapshot.id,
              name: '',
              lastMessage: { text: '' },
              ...docSnapshot.data()
            }
          })

          if (isActive) {
            setThreads(thread)
            setLoading(false)
          }
        })
    }

    getChats()

    return () => {
      isActive = false
    }

  }, [isFocused, updateList])


  function handleSignOut() {
    auth()
      .signOut()
      .then(() => {
        setUser(null)
        navigation.navigate('SignIn')
      })
      .catch(() => {
        alert('Não está logado')
      })
  }

  function deleteRoom(ownerId, idRoom) {
    if (ownerId !== user?.uid) return;

    Alert.alert(
      'Atenção!',
      'Você tem certeza que deseja deletar essa sala?',
      [
        {
          text: 'Cancelar',
          onPress: () => { },
          style: 'cancel'
        },
        {
          text: 'Deletar',
          onPress: () => handleDeleteRoom(idRoom)
        }
      ]
    )
  }

  async function handleDeleteRoom(idRoom) {
    await firestore()
      .collection('MESSAGE_THREADS')
      .doc(idRoom)
      .delete();

    setUpdateList(!updateList)
  }

  if (loading) {
    return (
      <ActivityIndicator size='large' color={'#fff'} />
    )
  }

  return (
    <SafeAreaView className='flex-1 bg-background'>
      <View className='flex-row justify-between pt-10 pb-5 px-3 bg-background2'>
        <View className='flex-row items-center'>

          {
            user && (
              <TouchableOpacity onPress={handleSignOut}>
                <MaterialIcons name='arrow-back' size={26} color='#fff' />
              </TouchableOpacity>
            )
          }

          <Text className='text-2xl font-bold text-title pl-3'>
            Grupos
          </Text>
        </View>

        <TouchableOpacity onPress={() => navigation.navigate('Search')}>
          <MaterialIcons name='search' size={26} color='#fff' />
        </TouchableOpacity>
      </View>

      <FlatList
        data={threads}
        keyExtractor={item => item._id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <ChatList
            data={item}
            deleteRoom={() => deleteRoom(item.owner, item._id)}
            userStatus={user}
          />
        )}
      />

      <FabButton setVisible={() => setModalVisible(true)} userStatus={user} />

      <Modal visible={modalVisible} animationType='fade' transparent={true}>
        <ModalNewRoom
          setVisible={() => setModalVisible(false)}
          updateScreen={() => setUpdateList(!updateList)}
        />
      </Modal>

    </SafeAreaView>
  )
}