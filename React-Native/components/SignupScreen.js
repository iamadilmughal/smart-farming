
import React,{useState} from 'react';
import { Button ,TextInput} from 'react-native-paper';
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  KeyboardAvoidingView,
  AsyncStorage,
  Alert,StyleSheet,Image,Dimensions
} from 'react-native';

const {width,height}=Dimensions.get('window');

const SignupScreen = (props) => {

  const [email,setEmail] = useState('');
  const [password,setPassword]=useState('')
  const [phone,setPhone]=useState('')
  const [address,setAddress]=useState('')

  const sendCred= async (props)=>{
    
    if(email !== '' && password !=='' && phone!=='' && address!==''){
    
     fetch("http://192.168.43.19:3001/signup",{
       method:"POST",
       headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({
        "email":email,
        "password":password,
        "phone":phone,
        "address":address
      })
     })
     .then(res=>res.json())
     .then(async (data)=>{
            try {
              await AsyncStorage.setItem('token',data.token)
              alert("Signup success")
              this.props.navigation.replace('Login')
            } catch (e) {
              Alert("error hai",e)
            }
     })
    }
    else{
      alert('Please fill in the fields!')
    }
  }

 


  const validate =(props)=>{
    if(email==""){
      Alert("Enter Username")
    }
    else if(password==""){
      Alert("Enter Password")
    }
    else if (email != null && password !=null){
      sendCred(props);
    }
  
  }
  return (
   <> 
   {/* <KeyboardAvoidingView behavior="position">
     <StatusBar backgroundColor="blue" barStyle="light-content" />
      <Text 
      style={{fontSize:35,marginLeft:18,marginTop:10,color:"#3b3b3b"}}>welcome to</Text>
      <Text 
      style={{fontSize:30,marginLeft:18,color:"blue"}}
      >Smart Farming</Text>
      <View
      style={{
        borderBottomColor:"blue",
        borderBottomWidth:4,
        borderRadius:10,
        marginLeft:20,
        marginRight:150,
        marginTop:4
      }}
       />
      <Text
      style={{
        fontSize:20,marginLeft:18,marginTop:20
      }}
      
      >create new account</Text>
      <TextInput
        label='Email'
        mode="outlined"
        value={email}
        style={{marginLeft:18,marginRight:18,marginTop:18}}
        theme={{colors:{primary:"blue"}}}
        onChangeText={(text)=>setEmail(text)}
     
      />
      <TextInput
        label='password'
        mode="outlined"
        secureTextEntry={true}
        value={password}
        onChangeText={(text)=>{setPassword(text)}}
        style={{marginLeft:18,marginRight:18,marginTop:18}}
        theme={{colors:{primary:"blue"}}}
     
      />
      <Button 
        mode="contained"
        style={{marginLeft:18,marginRight:18,marginTop:18}}
       onPress={() => sendCred(props)}>
        signup
      </Button>
      <TouchableOpacity>
        <Text
      style={{
        fontSize:18,marginLeft:18,marginTop:20
      }}
      onPress={()=>props.navigation.replace("Login")}
      >already have a account ?</Text>
      </TouchableOpacity>
      
      </KeyboardAvoidingView> */}

<View style={{flex:1,backgroundColor:'white',justifyContent:'flex-end'}}>
      
      <View style={{...StyleSheet.absoluteFill}}>
        <Image 
        source={require('../assets/1234.jpg')}
        style={{flex:1,height:null,width:null}} />
      </View>
      

      <View style={{height:height/1,justifyContent:'center'}}>
      <View style={styles.button1}>
          <Text style={{fontSize:60,fontWeight:'bold',alignItems:'center',justifyContent:'center',color:'white',marginTop:-150}}>Smart Farming</Text>
        </View>
        <View>
        <TextInput
        label='Username'
        mode="outlined"
        value={email}
        style={{marginLeft:18,marginRight:18,marginTop:18}}
        theme={{colors:{primary:"blue"}}}
        onChangeText={(text)=>setEmail(text)}
     
      />
      <TextInput
        label='password'
        mode="outlined"
        secureTextEntry={true}
        value={password}
        onChangeText={(text)=>{setPassword(text)}}
        style={{marginLeft:18,marginRight:18,marginTop:18}}
        theme={{colors:{primary:"blue"}}}
     
      />
       <TextInput
        label='Phone No'
        mode="outlined"
        keyboardType='numeric'
        
        value={phone}
        onChangeText={(text)=>{setPhone(text)}}
        style={{marginLeft:18,marginRight:18,marginTop:18}}
        theme={{colors:{primary:"blue"}}}
     
      />
       <TextInput
        label='Address'
        mode="outlined"
        
        value={address}
        onChangeText={(text)=>{setAddress(text)}}
        style={{marginLeft:18,marginRight:18,marginTop:18}}
        theme={{colors:{primary:"blue"}}}
     
      />
        </View>
        {/* <View style={styles.button}> */}
          <TouchableOpacity style={styles.button} onPress={() => sendCred(props)}>
          <Text style={{fontSize:20,fontWeight:'bold',alignItems:'center',justifyContent:'center'}}>Sign Up</Text>
          </TouchableOpacity>
        {/* </View> */}
        <TouchableOpacity style={styles.button} onPress={()=>props.navigation.replace("Login")}>
          <Text style={{fontSize:20,fontWeight:'bold'}}>Already have an account?</Text>
        </TouchableOpacity>
      </View>
      </View>
   </>
  );
  
    }

    const styles=StyleSheet.create({
      button:{
        
        height:70,
        marginHorizontal:20,
        borderRadius:35,
        alignItems:'center',
        marginTop:20,
        justifyContent:'center',
        backgroundColor:'lightblue'
      },
      button1:{
        
        height:70,
        marginHorizontal:20,
        
        alignItems:'center',
        marginTop:20,
        justifyContent:'center',
        
       
      }
    })
export default SignupScreen;
