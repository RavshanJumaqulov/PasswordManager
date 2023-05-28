import React from 'react'
import * as firebase from 'firebase';
import { Alert } from 'react-native';

export const  AddUser = async (name, email, userImg, gender ) => {
 try {
    return await firebase.database().ref(`users/${uid}`)
    .set({
        name: name,
        email: email,
        uid: uid,
        userImg: userImg,
        gender: gender,
    })
 } catch (error) {
    Alert.alert(error)
 }
}
