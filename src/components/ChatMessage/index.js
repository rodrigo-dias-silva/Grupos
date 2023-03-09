import { View, Text } from 'react-native'
import React, { useMemo } from 'react'

import auth from '@react-native-firebase/auth'

export default function ChatMessage({ data }) {

  const user = auth().currentUser.toJSON()

  const isMyMessage = useMemo(() => {
    return data?.user?._id === user.uid
  }, [data])

  return (
    <View className='p-2'>
      <View className={`rounded p-3 ${isMyMessage ? 'bg-btn-create bg-opacity-40 ml-14' : 'bg-background2 mr-14'}`}>
        {
          !isMyMessage &&
          <Text className='text-btn-login mb-1 font-bold'>{data?.user?.displayName}</Text>
        }
        <Text className={isMyMessage ? 'text-background' : 'text-subTitle'}>{data.text}</Text>
      </View>
    </View>
  )
}