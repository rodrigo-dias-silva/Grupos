import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native';

export default function ChatList({ data, deleteRoom, userStatus }) {
  const navigation = useNavigation()

  function openChat() {
    if (userStatus) {
      navigation.navigate('Messages', { thread: data })
    } else {
      navigation.navigate('SignIn')
    }

  }

  return (
    <TouchableOpacity
      onPress={openChat}
      onLongPress={() => deleteRoom && deleteRoom()}
    >
      <View className='px-3 py-4 flex-row items-center border-b-2 border-background2'>
        <View className='flex-shrink'>
          <View className='flex-row'>
            <Text
              numberOfLines={1}
              className='text-title font-bold text-lg'
            >
              {data.name}
            </Text>
          </View>

          <Text
            numberOfLines={1}
            className='text-subTitle text-base mt-1'
          >
            {data.lastMessage.text}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}