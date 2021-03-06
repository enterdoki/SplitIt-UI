import React, { memo, useState, } from 'react';
import { View, ScrollView, StyleSheet, ImageBackground, TouchableOpacity, Image, Text } from 'react-native';
import { Appbar, Button } from 'react-native-paper';
import { connect } from "react-redux";
import FriendCard from '../components/FriendCard';
import { acceptFriendThunk, declineFriendThunk } from '../store/utilities/friend';

const PendingFriendScreen = ({ user, friend, navigation, acceptFriendThunk, declineFriendThunk }) => {
    return (
        <View style={styles.container}>
            <ImageBackground
                source={require('../assets/background_dot.png')}
                resizeMode="repeat"
                style={styles.background}
            >
                <Appbar.Header >
                    <Appbar.Action icon={require('../assets/arrow_back.png')} onPress={() => navigation.navigate('FriendScreen')} />
                    <Appbar.Content
                        style={{ alignItems: 'center' }}
                        title='Pending Friend Requests'
                    />
                </Appbar.Header>

                {friend['pending'] !== undefined ? <ScrollView contentContainerStyle={styles.scrollContainer}>
                    {friend['pending'].map((item, index) => (
                        <View key={index}>
                            <FriendCard navigation={navigation} friend={item} />
                            <View style={styles.button}>
                                <Button style={{ margin: 5 }} mode="contained" onPress={() => acceptFriendThunk(item, user['user'].id, item.id)}>Accept</Button>
                                <Button style={{ margin: 5 }} mode="contained" onPress={() => declineFriendThunk(item, user['user'].id, item.id)}>Decline</Button>
                            </View>
                        </View>
                    ))}
                </ScrollView> : (<View />)}
            </ImageBackground>
        </View >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    background: {
        flex: 1,
        width: '100%',
    },
    scrollContainer: {
        flexGrow: 1,
    },
    button: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
});


const mapState = state => ({
    user: state.user,
    friend: state.friend,
})

export default connect(mapState, { acceptFriendThunk, declineFriendThunk })(memo(PendingFriendScreen));