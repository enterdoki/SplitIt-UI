import React, { useState, memo } from 'react';
import { connect } from "react-redux";
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native';
import { Appbar, Button, Card, Title, Paragraph } from 'react-native-paper';

const Details = ({ friend }) => {
    const display = () => {
        return (
            friend['data'].map((item, index) => (
                <Card key={index} style={{ margin: 5 }}>
                    {item['balance'] > 0 && <Card.Content>
                        <Paragraph style={styles.paragraph}>You owe {item['userTwo'].firstName} ${item['balance']}.</Paragraph>
                    </Card.Content>}

                </Card>
            ))
        )
    }

    return (
        <View>
            {display()}
        </View>
    )
}

const styles = StyleSheet.create({
    paragraph: {
        fontSize: 17,
        fontWeight: '600',
        color: 'red'
    }
});


const mapState = state => ({
    friend: state.friend
})

export default connect(mapState)(memo(Details));