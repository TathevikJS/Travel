import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import * as Animatable from 'react-native-animatable';
import { Formik } from 'formik'
import * as Yup from 'yup'
import Error from './Error'

import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    StyleSheet,
    StatusBar,
    KeyboardAvoidingView,
    KeyboardAvoidingViewBase,
    AsyncStorage,
} from 'react-native';


const validation = Yup.object().shape({
    email: Yup
        .string()
        .email('Must be a valid email ardess')
        .max(30, 'Must be shorter than 30')
        .required('required'),
    password: Yup
        .string()
        .min(6, 'Must be more than 6')
        .required('required')
})


const SignIn = ({ navigation }) => {

    const [error, seterror] = React.useState('')

    const signInFetch = async (value) => {
        try {
            const fetchedSignIn = await fetch('https://final-project-node-js.herokuapp.com/auth/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(value)
            })
            const data = await fetchedSignIn.json()
            if(data.error){
                seterror(data.error)
            }else{
            await AsyncStorage.setItem('token', data.auth_token) 
            console.log(data.auth_token)
            navigation.navigate('Profile')
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={validation}
            onSubmit={(values, { setSubmitting, resetForm }) => {
                setSubmitting(true)
                signInFetch(values)
                resetForm()
                setSubmitting(false)
            }
            }
        >

            {(
                {
                    values,
                    touched,
                    errors,
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
                            <Text style={styles.text_header}>Welcome</Text>
                        </Animatable.View>


                        <Animatable.View
                            style={styles.footer}
                            animation='fadeInUpBig'
                        >
                            <Text style={styles.text_footer}>Email</Text>
                            <View style={styles.action}>
                                <FontAwesome
                                    name='user-o'
                                    color='#05375a'
                                    size={20}
                                />
                                <TextInput
                                    onChangeText={handleChange('email')}
                                    onBlur={handleBlur('email')}
                                    placeholder='Your Email'
                                    placeholderTextColor='#666666'
                                    style={styles.textInput}
                                    value={values.email}

                                />
                            </View>
                            <Error touch={touched.email} error={errors.email} />

                            <Text style={[styles.text_footer, { marginTop: 32 }]}>Password</Text>
                            <View style={styles.action}>
                                <FontAwesome
                                    name='lock'
                                    color='#05375a'
                                    size={20}
                                />
                                <TextInput
                                    onChangeText={handleChange('password')}
                                    onBlur={handleBlur('password')}
                                    placeholder='Your Password'
                                    placeholderTextColor='#666666'
                                    style={styles.textInput}
                                    value={values.password}
                                    secureTextEntry={true}
                                />
                            </View>
                            <Error touch={touched.password} error={errors.password} />
                            {error !== '' ? <Text style={{color: 'red'}}>{error}</Text> : null}
                            <View style={styles.button}>
                                <TouchableOpacity
                                    style={styles.signIn}
                                    onPress={
                                         handleSubmit
                                        
                                    }
                                >
                                    <View
                                        style={styles.signIn}
                                    >
                                        <Text style={[styles.textSign, {
                                            color: '#fff'
                                        }]}>Sign In</Text>
                                    </View>

                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={() => navigation.navigate('SignUp')}
                                    style={[styles.signIn, {
                                        borderColor: '#009387',
                                        borderWidth: 1,
                                        marginTop: 15
                                    }]}
                                >
                                    <Text style={[styles.textSign, {
                                        color: '#009387'
                                    }]}>Sign Up</Text>
                                </TouchableOpacity>
                            </View>
                        </Animatable.View>

                    </View>)
            }
            }
        </Formik>
    );
};

export default SignIn;

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

