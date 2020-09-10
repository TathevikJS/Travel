import React from 'react';
import { SafeAreaView, StyleSheet , ActivityIndicator} from 'react-native'
import Card from './Card';
import { ScrollView } from 'react-native-gesture-handler';



const Cards = (props) => {

  console.log(props.loading);
  const cards =  
  props.data.map(d => {
  return ( <Card 
      loading={props.loading}
      name={d.title}
      nkar={d.imgUrl}
      key={d._id}/> 
  )  
    })

  return (
    <SafeAreaView style={{width: '100%', height: '100%'}}>
      <ScrollView style={styles.Cards}>
      {props.loading ?  <ActivityIndicator style={{paddingTop: '25%'}} size='small' /> 
      : cards}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  Cards: {
    width: '100%',
    backgroundColor: 'orange',
  }
})

export default Cards;