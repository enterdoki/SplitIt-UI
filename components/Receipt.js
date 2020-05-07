import React, { useState, memo } from 'react';
import axios from 'axios';
import { connect } from "react-redux";
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native';
import { DataTable, Button, Searchbar } from 'react-native-paper';
import { theme } from '../core/theme';
import { SearchableFlatList } from "react-native-searchable-list";
import * as SecureStore from 'expo-secure-store';

const Receipt = ({ user, receipt, friend }) => {
    const [query, setQuery] = useState('');
    const [tagged, setTagged] = useState([]);
    const searchAttribute = "firstName";
    const [tip, setTip] = useState(0);
    const ignoreCase = true;
    const [custom, setCustom] = useState(false);

    const handleTag = (user) => {
        setTagged(tagged => [...tagged, user])
    }

    const remove = (id) => {
        setTagged(tagged.filter(item => item.id !== id))
    }

    const display = () => {
        return (
            <View style={styles.tagged}>
                {tagged.map((item, index) => (
                    <TouchableOpacity key={index} onPress={() => remove(item.id)}><Text style={styles.subText}>{item.firstName},{' '}</Text></TouchableOpacity>
                ))}
            </View>
        )
    }

    const handleSplit = async (array, total) => {
        let promises = [];
        const id = user['user'].id;
        const token = await SecureStore.getItemAsync('Token');
        let number = array.length + 1;

        if (array.length > 0) {
            if (tip !== 0 && tip > -1) {
                total += (total * tip / 100)
            }
            
            let amount = ((total - total/number)/(number-1)).toFixed(2);
            
            for (let i = 0; i < array.length; i++) {
                promises.push(
                    axios.put(`http://api-splitit.herokuapp.com/api/invoice/request/${id}/${array[i].id}`, { balance: amount }, {
                        headers: {
                            "Authorization": `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        }
                    })
                )
            }
            let res = await axios.all(promises);
            if (res) {
                alert("$" + amount + " have been sent to each friend successfully!");
            }
        }
        else {
            alert('You have to tag some friends first!')
        }
    }

    return (
        <View>
            <Searchbar
                placeholder="Search friends..."
                onChangeText={query => setQuery(query)}
                value={query}
                style={{ margin: 5 }}
                inputStyle={{ color: theme.colors.secondary }}
            />

            <SearchableFlatList
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                data={friend['friends']}
                searchTerm={query} searchAttribute={searchAttribute}
                ignoreCase={ignoreCase}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => handleTag(item)}>
                        <View>
                            <Image style={styles.image} source={{ uri: item.profilePicture }} />
                            <Text style={styles.name}>{item.firstName}</Text>
                        </View>
                    </TouchableOpacity>
                )}
                keyExtractor={(item, index) => index.toString()} />
            <DataTable>
                <Text style={styles.title}>{receipt['receiptData']['merchantName'].data}</Text>
                {/* <Text style={styles.title}>Chipotle Mexican Grill</Text> */}
                <DataTable.Header>
                    <DataTable.Title>Item</DataTable.Title>
                    <DataTable.Title numeric>Amount</DataTable.Title>
                    <DataTable.Title numeric>Price ($)</DataTable.Title>
                </DataTable.Header>

                <DataTable.Row>
                    <DataTable.Cell>Chicken Bowl</DataTable.Cell>
                    <DataTable.Cell numeric>1.0</DataTable.Cell>
                    <DataTable.Cell numeric>8.95</DataTable.Cell>
                </DataTable.Row>

                <DataTable.Row>
                    <DataTable.Cell>Chips and Guac</DataTable.Cell>
                    <DataTable.Cell numeric>1.0</DataTable.Cell>
                    <DataTable.Cell numeric>0.00</DataTable.Cell>
                </DataTable.Row>

                <Text style={styles.text}>Sales Tax: ${receipt['receiptData']['taxAmount'].data}</Text>
                <Text style={styles.text}>Total: ${receipt['receiptData']['totalAmount'].data}</Text>

                {/* <Text style={styles.text}>Sales Tax: $0.79</Text>
                <Text style={styles.text}>Total: $9.80</Text> */}
                {tip !== 0 && <Text style={styles.text}>Tip Amount: {tip}%</Text>}
            </DataTable>


            <View style={styles.button}>
                <Text style={{ fontSize: 15, fontWeight: '600' }}>Tip:</Text>
                <Button style={{ margin: 5 }} mode="outlined" onPress={() => setTip(10)}> 10%</Button>
                <Button style={{ margin: 5 }} mode="outlined" onPress={() => setTip(15)}> 15%</Button>
                <Button style={{ margin: 5 }} mode="outlined" onPress={() => setCustom(custom => !custom)}> Custom</Button>
                {custom &&
                    <TextInput
                        editable
                        maxLength={3}
                        style={styles.input}
                        value={tip.toString()}
                        onChangeText={text => setTip(text)}
                    />
                }
            </View>

            {tagged.length > 0 && display()}
            <View style={styles.button}>
                <Button style={{ margin: 5 }} mode="contained" onPress={() => handleSplit(tagged, receipt['receiptData']['totalAmount'].data)}> Split By Total</Button>
                <Button style={{ margin: 5 }} mode="contained" onPress={() => console.log('receipt button pressed')}> Next</Button>
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    text: {
        textAlign: 'right',
        fontSize: 15,
        color: theme.colors.secondary,
        fontWeight: '700'
    },
    subText: {
        textAlign: 'center',
        fontSize: 17.5,
        color: theme.colors.secondary,
        fontWeight: '600'
    },
    title: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
    },
    button: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    image: {
        margin: 3,
        width: 60,
        height: 60,
        marginRight: 10,
        borderRadius: 40,
    },
    name: {
        fontSize: 13,
        textAlign: 'center',
        marginRight: 5
    },
    input: {
        height: 35,
        width: 35,
        backgroundColor: 'white',
        fontSize: 17.5,
        borderRadius: 5,
        textAlign: 'center'
    },
    tagged: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
        margin: 5
    }
});

const mapState = state => ({
    user: state.user,
    receipt: state.receipt,
    friend: state.friend
})

export default connect(mapState)(memo(Receipt));