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
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

const validation = Yup.object().shape({
    email: Yup
        .string()
        .email('Must be a valid email ardess')
        .max(30, 'Must be shorter than 30')
        .required('required'),
    password: Yup
        .string()
        .min(6, 'Must be more than 6')
        .required('required'),
    firstname: Yup
        .string(),
    lastname: Yup
        .string(),
    avatar: Yup
        .string()
})

const SignUp = ({ navigation }) => {

    const [error, setError] = React.useState('')


    const signUpFetch = async (value) => {
        try {
            const fetchedsignUp = await fetch('https://final-project-node-js.herokuapp.com/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(value)
            })
            const data = await fetchedsignUp.json()
            console.log(data);
            if (data.error) {
                setError(data.error)
            } else {
                navigation.navigate('SignIn')
            }

        } catch (error) {

        }
    }




    return (
        <Formik
            initialValues={{ firstname: '', lastname: '', email: '', password: '', avatar: '' }}
            validationSchema={validation}
            onSubmit={(values, { setSubmitting, resetForm }) => {
                setSubmitting(true)
                signUpFetch((values))
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
                    <ScrollView>
                        <Animatable.View
                            style={styles.footer}
                            animation='fadeInUpBig'
                        >

                            <Text style={styles.text_footer}>Name</Text>
                            <View style={styles.action}>
                                <FontAwesome
                                    name='user'
                                    color='#05375a'
                                    size={20}
                                />
                                <TextInput
                                    onChangeText={handleChange('firstname')}
                                    onBlur={handleBlur('firstname')}
                                    placeholder='Your name'
                                    placeholderTextColor='#666666'
                                    style={styles.textInput}
                                    value={values.firstname}

                                />
                            </View>
                            <Error touch={touched.firstname} error={errors.firstname} />


                            <Text style={styles.text_footer}>Last name</Text>
                            <View style={styles.action}>
                                <FontAwesome
                                    name='user'
                                    color='#05375a'
                                    size={20}
                                />
                                <TextInput
                                    onChangeText={handleChange('lastname')}
                                    onBlur={handleBlur('lastname')}
                                    placeholder='Your last name'
                                    placeholderTextColor='#666666'
                                    style={styles.textInput}
                                    value={values.lastname}

                                />
                            </View>
                            <Error touch={touched.lastname} error={errors.lastname} />





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

                            <Text style={styles.text_footer}>Password</Text>
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

                            <Text style={styles.text_footer}>Avatar</Text>
                            <View style={styles.action}>
                                <FontAwesome
                                    name='user'
                                    color='#05375a'
                                    size={20}
                                />
                                <TextInput
                                    onChangeText={handleChange('avatar')}
                                    onBlur={handleBlur('avatar')}
                                    placeholder='Image url'
                                    placeholderTextColor='#666666'
                                    style={styles.textInput}
                                    value={values.avatar}

                                />
                            </View>
                            <Error touch={touched.avatar} error={errors.avatar} />

                            {error !== '' ? <Text style={{ color: 'red' }}>{error}</Text> : null}
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
                                        }]}>Sign Up</Text>
                                    </View>

                                </TouchableOpacity>

                            </View>
                        </Animatable.View>
                        </ScrollView>
                    </View>)
            }
            }
        </Formik>
    );
};

export default SignUp;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#009387',
        
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50,
        marginTop: '40%'
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
        marginTop: 25
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

