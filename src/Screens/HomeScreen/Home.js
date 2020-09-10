import React from 'react';
import  {View, Text , StyleSheet, ImageBackground, Image, SafeAreaView, AsyncStorage} from 'react-native'
import HomeIcon from '../../../assets/Home/home.gif'
import NextIcon from '../../../assets/Home/next.png'
import { TouchableOpacity } from 'react-native-gesture-handler';


const Home = ({navigation}) => {
  
    return ( 
        <SafeAreaView style={styles.Home}>
          <View style={styles.imgCont}>
              <Image source={HomeIcon} style={{width: '100%', height: '100%'}}/>
          </View>
          <View style={styles.nextPageCont}>
            <View style={styles.textCont}>
              <Text style={{fontSize: 40, fontWeight: 'bold', marginLeft: 10, marginTop: 20}} >
              Lets Discover the World Together
              </Text>
            </View>
            <View style={styles.buttonCont}>
                <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate('Begin')}>
                  <Image source={NextIcon} style={{width: '100%', height: '100%'}}/>
                </TouchableOpacity>
            </View>
          </View>

        </SafeAreaView>
     );
}

const styles = StyleSheet.create({
Home: {
    width: '100%',
    height: '100%',
  },
  imgCont: {
    width: '100%',
    height: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextPageCont: {
    width: '100%',
    height: '50%',
    flexDirection: 'row'
  },
  textCont: {
    width: '50%',
    height: '100%',
  },
  buttonCont: {
    width: '50%',
    height: '100%',
    justifyContent:'flex-end',
    alignItems: 'flex-end'
  },
  button: {
    width: 80,
    height: 80,
    marginBottom: 80,
    marginRight: 20
  }
})

export default Home;