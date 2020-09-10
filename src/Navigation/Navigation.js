
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Home from '../Screens/HomeScreen/Home';
import Cards from '../Screens/CardsScreen/Cards';
import HomeIcon from '../../assets/Navigation/house.png'
import CardsIcon from '../../assets/Navigation/goal.png'
import ProfileIcon from '../../assets/Navigation/ui.png'
import SignIn from '../Screens/ProfileScreen/SignIn'
import Begin from '../Screens/ProfileScreen/Begin'


import { Image, AsyncStorage } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';
import SignUp from '../Screens/ProfileScreen/SignUp';
import Profile from '../Screens/ProfileScreen/Profile/Profile';
import AddPost from '../Screens/ProfileScreen/Profile/AddPost';

const Main = createStackNavigator();


const ProfileNav = () => {
    return (
        <Main.Navigator
            headerMode='none'
            initialRouteName='Begin'>
            <Main.Screen name="AddPost" component={AddPost} />
            <Main.Screen name="Begin" component={Begin} />
            <Main.Screen name="SignIn" component={SignIn} />
            <Main.Screen name="SignUp" component={SignUp} />
            <Main.Screen name="Profile" component={Profile} />
        </Main.Navigator>
    );
}

const Tab = createMaterialBottomTabNavigator();

const Navigation = (props) => {
    //console.log(props);
    return (
        <Tab.Navigator
            initialRouteName="Home"
            activeColor="green"
            inactiveColor="white"
            barStyle={{ backgroundColor: '#009387' }}
            labeled={false}
        >
            <Tab.Screen
                name="Home"
                children={() => <Home />}
                options={
                    {
                        tabBarLabel: 'Home',
                        tabBarIcon: () => (
                            <Image source={HomeIcon} style={{ width: 25, height: 25 }} />
                        )
                    }
                } />
            <Tab.Screen
                name="Cards"
                children={() =>
                    <Cards
                        data={props.data}
                        loading={props.loading} />}
                options={
                    {
                        tabBarLabel: 'Photos',
                        tabBarIcon: () => (
                            <Image source={CardsIcon} style={{ width: 25, height: 25 }} />
                        )
                    }
                } />
            <Tab.Screen
                name="Add"
                component={ProfileNav}
                options={
                    {
                        tabBarLabel: 'Add',
                        tabBarIcon: () => (
                            <Image source={ProfileIcon} style={{ width: 25, height: 25 }} />
                        )
                    }
                }
            />

        </Tab.Navigator>
    );
}

export default Navigation;