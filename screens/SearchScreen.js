import React, { memo, useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, ImageBackground, TouchableOpacity, Image, Text } from 'react-native';
import { Appbar, Searchbar } from 'react-native-paper';
import { theme } from '../core/theme';
import BackButton from '../components/BackButton';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
import { connect } from "react-redux";
import { SearchableFlatList } from "react-native-searchable-list";
import { AntDesign } from '@expo/vector-icons';

const SearchScreen = ({ user, navigation }) => {
    const [query, setQuery] = useState('');
    const [users, setUsers] = useState([]);
    const searchAttribute = "firstName";
    const ignoreCase = true;

    useEffect(() => {
        const getAllUsers = async () => {
            try {
                const id = user['user'].id;
                const token = await SecureStore.getItemAsync('Token');
                const { data } = await axios.get(`http://api-splitit.herokuapp.com/api/search/${id}`, {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    }
                })
                setUsers(data);
            } catch (err) {
                console.log(err);
            }
        };
        getAllUsers();
    }, []);

    return (
        <View style={styles.container}>
            <ImageBackground
                source={require('../assets/background_dot.png')}
                resizeMode="repeat"
                style={styles.background}
            >
                <BackButton goBack={() => navigation.navigate('FriendScreen')} />

                <Searchbar
                    placeholder="Search..."
                    onChangeText={query => setQuery(query)}
                    value={query}
                    style={{ margin: 5, marginTop: 75 }}
                    inputStyle={{ color: theme.colors.secondary }}
                />
                <SearchableFlatList
                    data={users}
                    searchTerm={query} searchAttribute={searchAttribute}
                    ignoreCase={ignoreCase}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => navigation.navigate('ProfileScreen', { user: item })}>
                            <View style={styles.subContainer}>
                                <Image style={styles.image} source={{ uri: item.profilePicture }} />
                                <View style={styles.info}>
                                    <Text style={styles.name}>
                                        {item.firstName}{' '}{item.lastName}
                                    </Text>
                                    <Text style={styles.email}>{item.email}</Text>
                                </View>
                                <AntDesign name="right" style={styles.icon} color='grey' size={20} />
                            </View>
                        </TouchableOpacity>
                    )}
                    keyExtractor={(item, index) => index.toString()} />
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
    background: {
        flex: 1,
        width: '100%',
    },
    image: {
        margin: 3,
        width: 60,
        height: 60,
        marginRight: 10,
        borderRadius: 40,
    },
    name: {
        fontSize: 20,
    },
    email: {
        fontSize: 16,
        fontWeight: '100',
    },
    subContainer: {
        flexDirection: 'row',
        margin: 5,
        backgroundColor: 'white',
        borderRadius: 5
    },
    info: {
        flexDirection: 'column',
        justifyContent: 'space-evenly',
    },
    icon: {
        position: 'absolute',
        top: 22,
        right: 0,
    },
});


const mapState = state => ({
    user: state.user,
})

export default connect(mapState)(memo(SearchScreen));