import React from 'react';
import { View, StyleSheet, Text, AsyncStorage, TouchableOpacity, ScrollView, Image } from 'react-native';
import * as Animatable from 'react-native-animatable';


class Profile extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            _id: '',
            email: '',
            imgUrl: '',
            firstname: '',
            lastname: '',
            avatar: '',
            data: [],
        }

    }



    fetchUser = async () => {

        try {
            const token = await AsyncStorage.getItem('token')
            console.log(token);
            const fetchData = await fetch('https://final-project-node-js.herokuapp.com/auth/profile', {
                method: 'GET',
                headers: {
                    'auth-token': token
                }
            })
            const fetchedData = await fetchData.json()
            console.log(fetchedData);
            this.setState({
                firstname: fetchedData.firstname,
                lastname: fetchedData.lastname,
                avatar: fetchedData.avatar
            })
        } catch (error) {
            console.log(error);
        }
    }


    fetchUserProduct = async () => {

        try {
            const token = await AsyncStorage.getItem('token')
            console.log(token);
            const fetchData = await fetch('https://final-project-node-js.herokuapp.com/posts/profile', {
                method: 'GET',
                headers: {
                    'auth-token': token
                }
            })
            const fetchedData = await fetchData.json()
            console.log(fetchedData);
            this.setState({
                data: fetchedData
            })
        } catch (error) {
            console.log(error);
        }
    }


    AddPost = async (value) => {
        const token = await AsyncStorage.getItem('token')
        try {
            const fetchedAddPost = await fetch('https://final-project-node-js.herokuapp.com/posts/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': token
                },
                body: JSON.stringify(value)
            })
            const data = await fetchedAddPost.json()
            console.log(data);
            if (data.error) {
                console.log(data.error);
            } else {
                this.setState({
                    data: [...this.state.data, value]
                })
                this.props.navigation.navigate('Profile')
            }

        } catch (error) {
            console.log(error);
        }
    }


    componentDidMount() {
        this.fetchUser()
        this.fetchUserProduct()
    }




    render() {
        //posts
        const posts = this.state.data.length ? this.state.data.map((d, index) => {
            return (
                <Animatable.View
                    animation='jello'
                    iterationCount='infinite'
                    key={index}
                    style={{ width: 100, height: 100, margin: 5 }}>
                    <Image
                        style={{ width: '100%', height: '100%' }}
                        source={{ uri: d.img }} />
                    {/* <Text>{d.title}</Text> */}
                </Animatable.View>
            )
        }) : <Text>{'No Postssss'}</Text>



        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Animatable.Image
                        animation='bounceInDown'
                        source={{ uri: this.state.avatar }}
                        style={styles.avatar} />
                </View>
                <View style={styles.footer}>
                    <View style={styles.nameCont}>
                        <Text style={styles.name}>{this.state.firstname + ' ' + this.state.lastname}</Text>


                    </View>
                    <TouchableOpacity
                        onPress={async () => {
                            await AsyncStorage.removeItem('token')
                            this.props.navigation.navigate('SignIn')
                        }
                        }>
                        <Text>Sign Out</Text>
                    </TouchableOpacity>
                    <View style={styles.postsCont}>
                        <ScrollView
                            style={{ width: '100%', height: '100%', flexDirection: 'row', padding: 10, flexWrap: 'wrap' }}
                        >
                            {posts}
                            <View
                                style={{ width: 100, height: 100, margin: 5, }}>
                                <View
                                    style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}
                                >
                                    <TouchableOpacity
                                        onPress={() => this.props.navigation.navigate('AddPost', { add: this.AddPost })}>
                                        <Text
                                            style={{ fontSize: 50, color: '#009387' }}>+</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </ScrollView>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#009387'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    avatar: {
        width: 200,
        height: 200,
        marginBottom: -70,
        zIndex: 100,
        borderRadius: 50
    },
    footer: {
        flex: 3,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
    },
    nameCont: {
        width: '100%',
        height: '30%',
        alignItems: 'center',
    },
    name: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'orange',
        paddingTop: 70
    },
    postsCont: {
        width: '100%',
        height: '70%',
        backgroundColor: 'rgba(12,120,120,0.2)',
        borderRadius: 15
    }
})

export default Profile;