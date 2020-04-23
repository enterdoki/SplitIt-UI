import React, { memo } from 'react';
import { StyleSheet, Image, View, Text, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const FriendCard = ({ friend, navigation }) => {
    return (
        <TouchableOpacity onPress={() => navigation.navigate('ProfileScreen', { user: friend })}>
            <View style={styles.container}>
                <Image style={styles.image} source={{ uri: friend.profilePicture }} />
                <View style={styles.info}>
                    <Text style={styles.name}>
                        {friend.firstName}{' '}{friend.lastName}
                    </Text>
                    <Text style={styles.email}>{friend.email}</Text>
                </View>
                <AntDesign name="right" style={styles.icon} color='grey' size={20} />
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        margin: 5,
        backgroundColor: 'white',
        borderRadius: 5
    },
    image: {
        margin: 3,
        width: 80,
        height: 80,
        marginRight: 10,
        borderRadius: 40,
    },
    info: {
        flexDirection: 'column',
        justifyContent: 'space-evenly',
    },
    name: {
        fontSize: 20,
    },
    email: {
        fontSize: 16,
        fontWeight: '300',
    },
    icon: {
        position: 'absolute',
        top: 33,
        right: 0,
    },
});

export default memo(FriendCard);