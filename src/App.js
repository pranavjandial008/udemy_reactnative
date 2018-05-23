import React from 'react'
import {View,Text} from 'react-native'
import firebase from 'firebase'
import {Header, Button, Spinner} from './components/common'
import FormView from './components/FormView'
export default class App extends React.Component{

    state={loggedIn:null}

    loggedInOrNot =  ()=>{
        console.log("this.state.loggedIn "+this.state.loggedIn)
        switch(this.state.loggedIn){
            case true:
                return( <Button
                        onPress={()=>firebase.auth().signOut()} >
                            Log Out
                      </Button>
                )
                break
            case false:
                return <FormView />
                break
            case null:
                console.log("null right now")  
                return <Spinner />
                break
        }
    }
    componentWillMount(){
        firebase.initializeApp(
          {  apiKey: "AIzaSyAzXoTalZQ2-GQXvEA4e9m9nmlIU5UcAXY",
            authDomain: "authenticationrnudemy.firebaseapp.com",
            databaseURL: "https://authenticationrnudemy.firebaseio.com",
            projectId: "authenticationrnudemy",
            storageBucket: "authenticationrnudemy.appspot.com",
            messagingSenderId: "94254335749"
         }
                )

        //event handler        
        firebase.auth().onAuthStateChanged((user)=>{
            if(user){
                this.setState({loggedIn:true})
            }
            else{
                this.setState({loggedIn:false})
            }
         })
    }
    render(){
        return(
            <View>
                <Header headerText={"Authentication"} />     
                {this.loggedInOrNot()}
            </View>
        )
    }
}