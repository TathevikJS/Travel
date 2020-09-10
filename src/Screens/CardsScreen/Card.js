import React from 'react';
import { View, Text, ImageBackground, StyleSheet, StatusBar, ActivityIndicator } from 'react-native'

const Card = (props) => {
  return (
    <View style={styles.Card}>
      <StatusBar backgroundColor='#009387' />
        <ImageBackground
          source={{ uri: props.nkar }}
          style={{ width: '100%', height: '100%' }}
        > 
        <View style={{ width: '100%', height: '70%' }}></View>
          <View style={{ width: '100%', height: '30%', backgroundColor: 'rgba(120, 120, 120, 0.6)' }}>
            <Text style={{ fontSize: 30, fontWeight: 'bold', marginLeft: 12, marginTop: 10, color: 'orange' }}>{props.name}</Text>
          </View>
  </ImageBackground> 
    </View>
  );
}

const styles = StyleSheet.create({

  Card: {
    width: '80%',
    height: 200,
    backgroundColor: 'yellow',
    marginVertical: 20,
    alignSelf: 'center'
  }
})

export default Card;