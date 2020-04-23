import React, { memo, useState, } from 'react';
import { View, Text, ScrollView, StyleSheet, ImageBackground, Image, TouchableOpacity } from 'react-native';
import { Appbar, Button } from 'react-native-paper';
import BackButton from '../components/BackButton';

const ProfileScreen = ({ navigation }) => {
    const user = navigation.state.params.user;
    const [status, setStatus] = useState('');


    return (
        <View style={styles.container}>

            <View style={styles.header}></View>

            <BackButton goBack={() => navigation.navigate('FriendScreen')} />

            <Image style={styles.avatar} source={{ uri: user.profilePicture }} />

            <ScrollView style={styles.body}>
                <View style={styles.bodyContent}>
                    <Text style={styles.name}>{user.firstName}{' '}{user.lastName}</Text>
                    <Text style={styles.info}>{user.email}</Text>

                    <TouchableOpacity style={styles.buttonContainer} onPress={() => console.log('add')}>
                        <Text style={{ fontSize: 18, color: 'white' }}>Add user</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.buttonContainer} onPress={() => console.log('add')}>
                        <Text style={{ fontSize: 18, color: 'white' }}>Block user</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.buttonContainer} onPress={() => console.log('add')}>
                        <Text style={{ fontSize: 18, color: 'white' }}>Delete friend</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    )
};

const styles = StyleSheet.create({
    header: {
        backgroundColor: "#0091ea",
        height: 200,
    },
    avatar: {
        width: 130,
        height: 130,
        borderRadius: 63,
        borderWidth: 4,
        borderColor: "white",
        marginBottom: 10,
        alignSelf: 'center',
        position: 'absolute',
        marginTop: 130
    },
    name: {
        fontSize: 22,
        color: "#FFFFFF",
        fontWeight: '600',
    },
    body: {
        marginTop: 40,
    },
    bodyContent: {
        flex: 1,
        alignItems: 'center',
        padding: 30,
    },
    name: {
        fontSize: 28,
        color: "#696969",
        fontWeight: "600"
    },
    info: {
        fontSize: 20,
        fontWeight: "400",
        color: "#0091ea",
        marginTop: 10
    },
    description: {
        fontSize: 16,
        color: "#696969",
        marginTop: 10,
        textAlign: 'center'
    },
    buttonContainer: {
        marginTop: 10,
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        width: 250,
        borderRadius: 5,
        backgroundColor: "#0091ea",
    },
});




export default memo(ProfileScreen);