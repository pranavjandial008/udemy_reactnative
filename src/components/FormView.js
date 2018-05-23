import {View,Text  } from "react-native"
import React from 'react'
import firebase from 'firebase'
import {Card,CardSection, Button, CustomInput, Spinner} from './common'

export default class FormView extends React.Component{
    state={email:'',password:'',message:'',loading:false}

    renderButtonOrSpinner=()=>{
        if(this.state.loading){
            return(
                <Spinner size='small'/>
            )
        }
        return(
            <Button onPress={this.onButtonPress} >
            Log In!
            </Button>
        )
    }
    onButtonPress=()=>{

        this.setState({message:'',loading:true}) // need to reset it so that after a failed login,
        //after next press error is not shown 
        const {email,password} = this.state
        firebase.auth().signInWithEmailAndPassword(email,password)
        .then(()=> this.onSuccessfulLogin())
        .catch(()=>{
            firebase.auth().createUserWithEmailAndPassword(email,password)
            .then(()=> {
                console.log("created new user!")
                this.onSuccessfulLogin()
            })
            .catch(()=>{
                this.onUnSuccessfulLogin()
                //this.setState({message:'Authentication Failed!'})
            })
        })
    }
    
    onSuccessfulLogin=()=>{
        this.setState({
            email:'',
            password:'',
            message:'Login Successful!!',
            loading:false

        })
    }
    onUnSuccessfulLogin=()=>{
        this.setState({
            email:'',
            password:'',
            message:'Authentication Failed!',
            loading:false

        })
    }

    render(){
        return(
            <Card>
                <CardSection>
                    <CustomInput 
                        placeholder="user@gmail.com"
                        label={"Email"}
                        value={this.state.email}
                        onChangeText={text=>this.setState({email:text})}
                        />
                </CardSection>

                <CardSection>
                    <CustomInput 
                        placeholder="password"
                        label={"Password"}
                        value={this.state.password}
                        secureTextEntry
                        onChangeText={password=>this.setState({password})}
                        />
                </CardSection>

                <Text style={styles.messageTextStyle}>
                    {this.state.message}
                </Text>
                <CardSection>
                   {this.renderButtonOrSpinner()}
                </CardSection>

            </Card>
        )
    }
}

const styles= {
    messageTextStyle:{
        fontSize: 20,
        color:'red',
        alignSelf:'center',
    }
}