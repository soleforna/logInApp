import { View, StyleSheet, TextInput, Image, Button } from "react-native";
import React, {useState} from 'react';
import { useAuth } from "../context/AuthContext";


const Login = () =>{

    const [email, setmail] = useState('');
    const [password, setPassword] = useState('');
    const {onLogin, onRegister} = useAuth();

    const login = async () => {
        const result = await onLogin!(email, password);
        if (result && result.error) {
            alert(result.msg);
        }
    }

    const register= async () =>{
        const result = await onRegister!(email, password);
        if (result && result.error) {
            alert(result.msg);
        } else {
            login();
        }
    }

    return(
        <View style={styles.container}>
            <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/295/295128.png' }}  style={styles.image} />
            <View style={styles.form}>
                <TextInput style={styles.input} placeholder="E-mail" onChangeText={(text: string) => setmail(text)} value={email}/>
                <TextInput style={styles.input} placeholder="Password" onChangeText={(text: string) => setPassword(text)} value={password}/>
                <Button onPress={login} title="Sign in" />
                <Button onPress={register} title="Create Account" />
            </View>
           
        </View>
    )
}


const styles = StyleSheet.create({
    container:{
        alignItems: 'center',
        width: '100%'
    },
    image:{
        width: '50%',
        height: '50%',
        resizeMode: 'contain'
    },
    form:{
        gap: 20,
        width: '60%',

    },
    input:{
        height: 44,
        borderWidth: 1,
        borderRadius: 4,
        padding: 10,
        backgroundColor: '#fff'
    },
    

});


export default Login;