import React, { useState, memo } from 'react';
import { connect } from "react-redux";
import { View, Text, StyleSheet } from 'react-native';
import { DataTable } from 'react-native-paper';

const Receipt = ({ receipt }) => {
    return (
        <DataTable>
            <Text style={styles.title}>{receipt['receiptData']['merchantName'].data}</Text>
            <DataTable.Header>
                <DataTable.Title>Item</DataTable.Title>
                <DataTable.Title numeric>Amount</DataTable.Title>
                <DataTable.Title numeric>Price</DataTable.Title>
            </DataTable.Header>

            <DataTable.Row>
                <DataTable.Cell>Frozen yogurt</DataTable.Cell>
                <DataTable.Cell numeric>159</DataTable.Cell>
                <DataTable.Cell numeric>6.0</DataTable.Cell>
            </DataTable.Row>

            <DataTable.Row>
                <DataTable.Cell>Ice cream sandwich</DataTable.Cell>
                <DataTable.Cell numeric>237</DataTable.Cell>
                <DataTable.Cell numeric>8.0</DataTable.Cell>
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
    );
};

const styles = StyleSheet.create({
    text: {
        textAlign: 'right',
        fontSize: 15,
    },
    title: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
    }
});

const mapState = state => ({
    receipt: state.receipt
})

export default connect(mapState)(memo(Receipt));