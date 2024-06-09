import React from 'react'
import { View } from 'react-native'
import { Text } from 'react-native-paper'
import styles from '../../theme/styles'

export const WelcomeGame = () => {
  return (
    <View style={styles.root}>
      <Text style={{ fontFamily: 'Permanent', fontSize: 26, color: 'white' }}>No tuviste problema con ingresar tu información... interesante</Text>
    </View>
  )
}
