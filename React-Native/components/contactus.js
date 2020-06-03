import React, { Component } from 'react';
import { Container, Header, Content, Form, Item, Input, Label, Textarea, Left, Button, Icon, Body, Right } from 'native-base';
import { TouchableOpacity, StatusBar, Text ,Image,AsyncStorage} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import MyHeader from './MyHeader'
const THEME_COLOR_KEY = 'theme_color';
export default class ContactUs extends Component {
  constructor(){
    super()
    this.state={
      postedBy:'Umer',
      postTitle:'',
      postDescription:'',
      category:'question',
      image:null
    }
  }
  colors = ['blue', 'green', 'red', 'purple'];

  componentDidMount(){
    this.loadAsyncData()
  }
  sendCred= async ()=>{
    
    
    fetch("http://192.168.43.19:3000/community",{
      method:"POST",
      headers: {
       'Content-Type': 'application/json'
     },
     body:JSON.stringify({
       "postTitle":this.state.postTitle,
       "postDescription":this.state.postDescription,
       "category":this.state.category,
       "postedBy":this.state.postedBy
     })
    })
    .then(res=>res.json())
    .then(async (data)=>{
           try {
            
             alert("Your Post has been sent!")
             this.props.navigation.navigate('Posts')
           } catch (e) {
             Alert("error hai",e)
           }
    })
  
 }
 loadAsyncData = async () => {
    

  try {
    const themeColorIndex = await AsyncStorage.getItem(THEME_COLOR_KEY)
    
    if (themeColorIndex !== null) {
      this.props.navigation.setParams({ themeIndex: JSON.parse(themeColorIndex) });
    }
  } catch (e) {
    console.log(e)
  }

  
}



  render() {
    const themeColorIndex = this.props.navigation.state.params ?
    this.props.navigation.state.params.themeIndex : 0;
  const a = this.colors[themeColorIndex]
  console.log(a)
 
    return (
      <Container style={{backgroundColor:''}}>
   <MyHeader title="Community"  navigation={this.props.navigation} isHome={false} color={a} /> 
        <Content>
        <Label style={{marginTop:20, textAlign:'center', fontSize: 24}}>Write a Post</Label>
       
          <Form>
            <Item floatingLabel rounded>
              <Label style={{marginLeft:10,marginTop:-15}}>Post Title</Label>
              <Input style={{marginLeft:10}} onChangeText={(text)=>this.setState({postTitle:text})}/>
            </Item>
           
            <Label style={{marginTop:20, textAlign:'center', fontSize: 20}}>Post Description</Label>   
            <Textarea rowSpan={5} bordered placeholder="Textarea" style={{marginLeft:10, marginRight:10}} onChangeText={(text)=>this.setState({postDescription:text})}/>
            
         
        <Button 
        
        
        onPress={()=>this.sendCred()}
        style={{width:130,marginLeft:18,marginRight:18,marginTop:18, backgroundColor:'#006400', alignItems:'center', alignContent:'center',justifyContent:'center'}}
       >
        <Icon name='ios-send'/>
        
        <Label style={{textAlign:'center',color:'white'}}>Post </Label>
        <Right></Right>
      </Button>

      
          </Form>
          
        </Content>
      </Container>
    );
  }
}