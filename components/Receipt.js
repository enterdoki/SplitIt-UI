import React, { useState, memo } from 'react';
import { connect } from "react-redux";
import { View, Text, StyleSheet } from 'react-native';
import { DataTable, Button } from 'react-native-paper';
import { theme } from '../core/theme';

const Receipt = ({ receipt }) => {
    console.log(receipt['receiptData']);
    return (
        <View>
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

                {/* <DataTable.Pagination
                page={1}
                numberOfPages={3}
                onPageChange={(page) => { console.log(page); }}
                label="1-2 of 6"
            /> */}
                <Text style={styles.text}>Sales Tax: ${receipt['receiptData']['taxAmount'].data}</Text>
                <Text style={styles.text}>Total: ${receipt['receiptData']['totalAmount'].data}</Text>
            </DataTable>
            <View style={styles.button}>
                <Button style={{margin: 5}} mode="contained" onPress={() => console.log('receipt button pressed')}> Next</Button>
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
    },
    button: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    }
});

const mapState = state => ({
    receipt: state.receipt
})

export default connect(mapState)(memo(Receipt));