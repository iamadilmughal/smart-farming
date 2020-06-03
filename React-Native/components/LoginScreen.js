
import React,{useState,useEffect} from 'react';
import { Button ,TextInput} from 'react-native-paper';
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert,
  AsyncStorage,
  StyleSheet,Dimensions,Image
} from 'react-native';

const {width,height}=Dimensions.get('window');

const LoginScreen = (props) => {
  const [email,setEmail] = useState('');
  const [password,setPassword]=useState('')
  
  useEffect(() => {
    const check = async()=>{
    try{
    const tok = await AsyncStorage.getItem('token')
    console.log(tok)
    if(tok !==null){
      props.navigation.navigate('Home')

    }
  }catch(e){
    console.log('There is an error')

  }}
  check()
  }, [])


  
  const sendCred = async (props)=>{

    if(email !== '' && password !==''){
    console.log("First")
    fetch("http://192.168.43.19:3001/signin",{
      method:"POST",
      headers: {
       'Content-Type': 'application/json'
     },
     body:JSON.stringify({
       "email":email,
       "password":password
     })
    })
    .then(res=>res.json())
    .then(async (data)=>{
        console.log('Response Received');
           try {
             await AsyncStorage.setItem('token',data.token)
            alert("login success")
            props.navigation.navigate('Home')

           } catch (e) {
             console.log("error hai",e)
              Alert("Error",e.toString());
           }
    })
  }
  else{
    alert('Please Fill in the Fields!s')
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
      
      >Login with email</Text>
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
        Login
      </Button>
      <TouchableOpacity>
        <Text
      style={{
        fontSize:18,marginLeft:18,marginTop:20
      }}
      onPress={()=>props.navigation.replace("Signup")}
      >dont have a account ?</Text>
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
          <Text style={{fontSize:60,fontWeight:'bold',alignItems:'center',justifyContent:'center',color:'white',marginTop:-250}}>Smart Farming</Text>
        </View>
        <View>
        <TextInput
        label='Email'
        mode="outlined"
        value={email}
        style={{marginLeft:18,marginRight:18,marginTop:18}}
        theme={{colors:{primary:"green"}}}
        onChangeText={(text)=>setEmail(text)}
     
      />
      <TextInput
        label='password'
        mode="outlined"
        secureTextEntry={true}
        value={password}
        onChangeText={(text)=>{setPassword(text)}}
        style={{marginLeft:18,marginRight:18,marginTop:18}}
        theme={{colors:{primary:"green"}}}
     
      />
        </View>
        {/* <View style={styles.button}> */}
          <TouchableOpacity style={styles.button} onPress={() => sendCred(props)}>
          <Text style={{fontSize:20,fontWeight:'bold',alignItems:'center',justifyContent:'center'}}>Sign In</Text>
          </TouchableOpacity>
        {/* </View> */}
        <TouchableOpacity style={styles.button} onPress={()=>props.navigation.replace("Signup")}>
          <Text style={{fontSize:20,fontWeight:'bold'}}>Don't have an account?</Text>
        </TouchableOpacity>
      </View>
      </View>
   </>
  );
};
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


export default LoginScreen;
