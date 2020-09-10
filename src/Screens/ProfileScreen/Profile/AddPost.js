import React from 'react';
import * as Animatable from 'react-native-animatable';
import {View,StyleSheet, StatusBar, Text, TextInput, TouchableOpacity, AsyncStorage} from 'react-native';
import  {Formik} from 'formik'

const AddPost = (props) => {
    console.log(props.route);

    
    
    return ( 
        <Formik
        initialValues={{ title: '', imgUrl: '' }}
        onSubmit={(values, { setSubmitting, resetForm }) => {
            setSubmitting(true)

                 props.route.params.add(values)
            
            resetForm()
            setSubmitting(false)
        }
        }
    >

        {(
            {
                values,
                handleChange,
                handleBlur,
                handleSubmit
            }
        ) => {
            return (
                <View style={styles.container}>
                    <StatusBar backgroundColor='#009387' barStyle='light-content' />
                    <Animatable.View 
                    animation="slideInDown" 
                    style={styles.header}>
                        <Text style={styles.text_header}>Add Post</Text>
                    </Animatable.View>
                        <Animatable.View
                        style={styles.footer}
                        animation='fadeInUpBig'
                    >
                        <Text style={styles.text_footer}>Title</Text>
                        <View style={styles.action}>
                            <TextInput
                                onChangeText={handleChange('title')}
                                onBlur={handleBlur('title')}
                                placeholder='Title'
                                placeholderTextColor='#666666'
                                style={styles.textInput}
                                value={values.title}

                            />
                        </View>

                        <Text style={[styles.text_footer, { marginTop: 32 }]}>Image URL</Text>
                        <View style={styles.action}>
                            <TextInput
                                onChangeText={handleChange('imgUrl')}
                                onBlur={handleBlur('imgUrl')}
                                placeholder=' Image URL'
                                placeholderTextColor='#666666'
                                style={styles.textInput}
                                value={values.imgUrl}
                            />
                        </View>

                        <View style={styles.button}>
                            <TouchableOpacity
                                style={styles.signIn}
                                onPress={handleSubmit}
                            >
                                <View
                                    style={styles.signIn}
                                >
                                    <Text style={[styles.textSign, {
                                        color: '#fff'
                                    }]}>Add</Text>
                                </View>

                            </TouchableOpacity>
                        </View>
                        </Animatable.View>
              
                </View>)
        }
        }
    </Formik>
);
};

export default AddPost;

const styles = StyleSheet.create({
container: {
    flex: 1,
    backgroundColor: '#009387'
},
header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 50
},
footer: {
    flex: 3,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30
},
text_header: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30
},
text_footer: {
    color: '#05375a',
    fontSize: 18
},
action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5
},

textInput: {
    width: '80%',
    paddingLeft: 15,
    color: '#05375a',
},

button: {
    alignItems: 'center',
    marginTop: 50
},
signIn: {
    backgroundColor: '#08d4c4',
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10
},
textSign: {
    fontSize: 18,
    fontWeight: 'bold'
}
});