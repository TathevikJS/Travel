import React from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    StyleSheet,
    StatusBar,
    AsyncStorage,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


const Begin = ({navigation}) => {

    return (
      <View style={styles.container}>
         <StatusBar backgroundColor='#009387' barStyle='dark-content'/>
        <View style={styles.header}>
            <Animatable.Image 
            animation="bounceIn"
            source={{uri: 'https://i.pinimg.com/originals/ac/8f/61/ac8f610d390a504026b5e7bd2b67818f.gif'}}
            style={styles.logo}
            resizeMode="stretch"
            />
        </View>
        <Animatable.View 
            style={[styles.footer, {
                backgroundColor: '#fff'
            }]}
            animation="fadeInUpBig"
        >
            <Text style={[styles.title, {
                color: '#05375a'
            }]}>Stay connected with everyone!</Text>
            <Text style={styles.text}>Sign in with account</Text>
            <View style={styles.button}>
            <TouchableOpacity onPress={async () => await AsyncStorage.getItem('token') ? navigation.navigate('Profile') : navigation.navigate('SignIn') }>
                <View    
                    style={styles.signIn}
                >
                    <Text style={styles.textSign}>Get Started</Text>
                    <MaterialIcons 
                        name="navigate-next"
                        color="#fff"
                        size={20}
                    />
                </View>
            </TouchableOpacity>
            </View>
        </Animatable.View>   

      </View>
    );
};

export default Begin;


const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#009387'
  },
  header: {
      flex: 2,
      justifyContent: 'center',
      alignItems: 'center'
  },
  footer: {
      flex: 1,
      backgroundColor: '#fff',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      paddingVertical: 50,
      paddingHorizontal: 30
  },
  logo: {
      width: 280,
      height: 280
  },
  title: {
      color: '#05375a',
      fontSize: 30,
      fontWeight: 'bold'
  },
  text: {
      color: 'grey',
      marginTop:5
  },
  button: {
      alignItems: 'flex-end',
      marginTop: 30
  },
  signIn: {
      width: 150,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 50,
      flexDirection: 'row',
      backgroundColor: '#009387'
  },
  textSign: {
      color: 'white',
      fontWeight: 'bold'
  }
});

