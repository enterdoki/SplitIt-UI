import React, { memo, useState, useEffect } from 'react';
import { connect } from "react-redux";
import { View, ScrollView, StyleSheet, ImageBackground, TouchableOpacity, Text } from 'react-native';
import { Appbar, Searchbar, Button } from 'react-native-paper';
import FriendCard from '../components/FriendCard';
import { theme } from '../core/theme';
import { AntDesign } from '@expo/vector-icons';


const FriendScreen = ({ friend, navigation }) => {
    
    return (
        <View style={styles.container}>
            <ImageBackground
                source={require('../assets/background_dot.png')}
                resizeMode="repeat"
                style={styles.background}
            >
                <Appbar.Header >
                    <Appbar.Content
                        style={{ alignItems: 'center' }}
                        title='Friends List'
                    />
                </Appbar.Header>

                {/* <Searchbar
                    placeholder="Search friends..."
                    onChangeText={query => setQuery(query)}
                    value={query}
                    style={{ margin: 5 }}
                    inputStyle={{ color: theme.colors.secondary }}
                /> */}


                <View style={styles.button}>
                    <Button style={{ margin: 5 }} mode="contained" onPress={() => navigation.navigate('SearchScreen')}> Search For Friends</Button>
                </View>

                <TouchableOpacity>
                    <View style={styles.subContainer}>
                        <View style={styles.info}>
                            <Text style={styles.name}>
                                Pending Friend Requests
                            </Text>
                        </View>
                        <AntDesign name="right" style={styles.icon} color='grey' size={20} />
                    </View>
                </TouchableOpacity>

                {friend['friends'] !== undefined ? <ScrollView contentContainerStyle={styles.scrollContainer}>
                    {friend['friends'].map((item, index) => (
                        <FriendCard key={index} friend={item} />
                    ))}
                </ScrollView> : (<View />)}
            </ImageBackground>
        </View >
    );
};

const styles = StyleSheet.create({
    bar: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',

    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    scrollContainer: {
        flexGrow: 1,
    },
    background: {
        flex: 1,
        width: '100%',
    },
    button: {
        margin: 5,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon: {
        position: 'absolute',
        top: 8,
        right: 0,
    },
    info: {
        flexDirection: 'column',
        justifyContent: 'space-evenly',
    },
    subContainer: {
        flexDirection: 'row',
        margin: 5,
        padding: 7,
        backgroundColor: 'white',
        borderRadius: 5
    },
    name: {
        fontSize: 20,
    },
});

const mapState = state => ({
    user: state.user,
    friend: state.friend
})

export default connect(mapState)(memo(FriendScreen));