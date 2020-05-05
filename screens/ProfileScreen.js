import React, { memo, useState, useEffect } from 'react';
import { connect } from "react-redux";
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
import { View, Text, ScrollView, StyleSheet, ImageBackground, Image, TouchableOpacity } from 'react-native';
import { Appbar, Button } from 'react-native-paper';
import BackButton from '../components/BackButton';
import { addFriendThunk, deleteFriendThunk } from '../store/utilities/friend';

const ProfileScreen = ({ user, navigation, addFriendThunk, deleteFriendThunk }) => {
    const profile = navigation.state.params.user;
    const [status, setStatus] = useState('');
    
    useEffect(() => {
        const getStatus = async () => {
            try {
                const id = user['user'].id;
                const token = await SecureStore.getItemAsync('Token');
                const { data } = await axios.get(`http://api-splitit.herokuapp.com/api/friend/status/${id}/${profile.id}`, {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    }
                })
                
                setStatus(data['status']);
            } catch (err) {
                console.log(err);
            }
        };
        getStatus();
    }, []);

    return (
        <View style={styles.container}>

            <View style={styles.header}></View>

            <BackButton goBack={() => navigation.navigate('FriendScreen')} />

            <Image style={styles.avatar} source={{ uri: profile.profilePicture }} />

            <ScrollView style={styles.body}>
                <View style={styles.bodyContent}>
                    <Text style={styles.name}>{profile.firstName}{' '}{profile.lastName}</Text>
                    <Text style={styles.info}>{profile.email}</Text>

                    {status !== 'ACCEPTED' && <TouchableOpacity style={styles.buttonContainer} onPress={() => addFriendThunk(profile, user['user'].id, profile.id)}>
                        <Text style={{ fontSize: 18, color: 'white' }}>Add user</Text>
                    </TouchableOpacity>}

                    {(status !== 'PENDING' && status === 'ACCEPTED') && <TouchableOpacity style={styles.buttonContainer} onPress={() => console.log('add')}>
                        <Text style={{ fontSize: 18, color: 'white' }}>Block user</Text>
                    </TouchableOpacity>}

                    {(status !== 'PENDING' && status === 'ACCEPTED') && <TouchableOpacity style={styles.buttonContainer} onPress={() => deleteFriendThunk(profile, user['user'].id, profile.id)}>
                        <Text style={{ fontSize: 18, color: 'white' }}>Remove friend</Text>
                    </TouchableOpacity>}
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

const mapState = state => ({
    user: state.user,
})


export default connect(mapState, { addFriendThunk, deleteFriendThunk })(memo(ProfileScreen));