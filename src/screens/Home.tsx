import { View, StyleSheet, Image, Text } from "react-native";
import React, {useEffect} from 'react';

import { API_URL } from "../context/AuthContext";


const Home = () => {
   


    return (
        <View style={styles.container}>
            <Image source={{ uri: 'https://st4.depositphotos.com/7507140/39889/v/450/depositphotos_398897258-stock-illustration-spanish-language-vector-template-welcome.jpg' }} style={styles.image} />
            <Text>Wellcome</Text>
        </View>
    );
};    
    


const styles = StyleSheet.create({
    container:{
        alignItems: 'center',
        width: '100%',
        height:'100%',
        backgroundColor: 'red'
    },
    image:{
        width: '50%',
        height: '50%',
        resizeMode: 'contain',
    
    },
    
    

});


export default Home;