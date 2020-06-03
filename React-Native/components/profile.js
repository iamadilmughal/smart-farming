import React,{useEffect,useState} from 'react';
import { TextInput} from 'react-native-paper';
import {
  ActivityIndicator,
 AsyncStorage
} from 'react-native';
import MyHeader from './MyHeader'
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body,Item,Input } from 'native-base';


const ProfileScreen = (props) => {
   const [email,setEmail] = useState("loading")
   const[address,setAddress] = useState("loading")
   const[phone,setPhone] = useState("loading")
   const Boiler = async ()=>{
      const token = await AsyncStorage.getItem("token")
      
    fetch('http://192.168.43.19:3001/name',{
    headers:new Headers({
      Authorization:"Bearer "+token
    })
    }).then(res=>res.json())
    .then(data=>{
      console.log(data)
      setEmail(data.email),
      setPhone(data.phone),
      setAddress(data.address)
      
      AsyncStorage.setItem('username',data.email)
      
    }
    )
   }
useEffect(()=>{
   Boiler()
},[])
 

  

  return (
   <> 

   {/* <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
    <Text style={{fontSize:18}}>Hello {email}</Text>
    </View> */}
    <Container>
       <MyHeader title="Profile" navigation={props.navigation}  isHome={true}  color="green" />
        <Content>
          <Card style={{flex: 0}}>
            <CardItem style={{height:250}}>
              <Left>
                <Thumbnail source={require('../assets/person.png')} style={{height:80,width:90}} />
                <Body>
                <Text style={{fontSize:30,fontWeight:'bold'}}>Name : {email}</Text>
                  <Text style={{marginTop:20}}>Address: {address}</Text>
    <Text note style={{marginTop:10}}>Phone : {phone}</Text>
                </Body>
              </Left>
            </CardItem>
            </Card>
            </Content>
            </Container>
   
   </>
  );
};



export default ProfileScreen;