import React, { useState, memo } from 'react';
import { connect } from "react-redux";
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { DataTable, Button, Searchbar } from 'react-native-paper';
import { theme } from '../core/theme';
import { SearchableFlatList } from "react-native-searchable-list";

const Receipt = ({ receipt, friend }) => {
    const [query, setQuery] = useState('');
    const searchAttribute = "firstName";
    const ignoreCase = true;
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
                    <TouchableOpacity onPress={() => console.log('test')}>
                        <View>
                            <Image style={styles.image} source={{ uri: item.profilePicture }} />
                            <Text style={styles.name}>{item.firstName}</Text>
                        </View>
                    </TouchableOpacity>
                )}
                keyExtractor={(item, index) => index.toString()} />
            <DataTable>
                <Text style={styles.title}>{receipt['receiptData']['merchantName'].data}</Text>
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
            </DataTable>
            <View style={styles.button}>
                <Button style={{ margin: 5 }} mode="contained" onPress={() => console.log('receipt button pressed')}> Next</Button>
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    text: {
        textAlign: 'right',
        fontSize: 15,
        color: theme.colors.secondary
    },
    title: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
    },
    button: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
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
});

const mapState = state => ({
    receipt: state.receipt,
    friend: state.friend
})

export default connect(mapState)(memo(Receipt));