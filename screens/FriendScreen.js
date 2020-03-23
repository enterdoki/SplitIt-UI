import React, { memo, useState } from 'react';
import { View, ScrollView, StyleSheet, ImageBackground, TouchableOpacity, Text } from 'react-native';
import { Appbar } from 'react-native-paper';

const FriendScreen = ({ }) => {
    return (
        <View style={styles.container}>
            <ImageBackground
                source={require('../assets/background_dot.png')}
                resizeMode="repeat"
                style={styles.background}
            >
                <Appbar.Header >
                    <Appbar.Content
                        style={{alignItems: 'center'}}
                        title='Friends List'
                    />
                </Appbar.Header>
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <Text>Friend List Screen</Text>
                </ScrollView>
            </ImageBackground>
        </View >
    );
};

const styles = StyleSheet.create({
    bar: {
        flex: 1,
        alignItems: 'center',
        // width: 50,
        // height: 50,
        // overflow:'hidden'
        justifyContent: 'center',

    },
    container: {
        flex: 1,
        // alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    background: {
        flex: 1,
        width: '100%',
    }
});

export default memo(FriendScreen);