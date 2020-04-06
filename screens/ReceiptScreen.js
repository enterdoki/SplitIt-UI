import React, { memo, useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, ImageBackground, Image, Modal } from 'react-native';
import moment from 'moment';
import { Appbar, Button, Card, Title, Paragraph } from 'react-native-paper';
import { connect } from "react-redux";
import * as SecureStore from 'expo-secure-store';
import ImageViewer from 'react-native-image-zoom-viewer';
import axios from 'axios';

const ReceiptScreen = ({ user }) => {
    const [receipts, setReceipts] = useState([]);
    const [clicked, setClicked] = useState(false);
    const [images, setImages] = useState([]);
    
    useEffect(() => {
        const getReceipts = async () => {
            try {
                const id = user['user'].id;
                const token = await SecureStore.getItemAsync('Token');
                const { data } = await axios.get(`http://api-splitit.herokuapp.com/api/user/${id}/receipts`, {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    }
                })
                setReceipts(data);
            } catch (err) {
                console.log(err);
            }
        };
        getReceipts();
    }, []);


    const imageViewer = (index) => {
        setImages([{url: receipts[index].imageURL}]);
        setClicked(clicked => !clicked);
    };

    const loadReceipts = () => {
        return (
            receipts.map((item, index) => (
                <Card key={index} style={{ margin: 5 }} onPress={() => imageViewer(index)}>
                    <Card.Content>
                        <Title>{item.name}</Title>
                        <Paragraph>{moment(item.uploadDate).format('MMMM Do YYYY, h:mm a')}</Paragraph>
                    </Card.Content>
                    {/* <Card.Cover source={{ uri: item.imageURL }} /> */}
                </Card>
            ))
        );
    };

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
                        title='Past Receipts'
                    />
                </Appbar.Header>
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    {loadReceipts()}
                </ScrollView>
                <Modal visible={clicked} transparent={true}>
                    <ImageViewer imageUrls={images} onSwipeDown={() => setClicked(clicked => !clicked)}  enableSwipeDown={true}/>
                </Modal>
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

const mapState = state => ({
    user: state.user,
})

export default connect(mapState)(memo(ReceiptScreen));