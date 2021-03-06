

import React,{Component} from "react";
import {TextInput, StyleSheet, Text, View, AsyncStorage, Picker, SafeAreaView  } from 'react-native';
import MultiSelect from 'react-native-multiple-select';
import { Container, Header, Content, Form, Item, Input, Label, Textarea, Left, Button, Icon, Body, Right } from 'native-base';

import MyHeader from './MyHeader'

import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';

const THEME_COLOR_KEY = 'theme_color';

items = [
  { id: '1', name: 'Apple' },
  { id: '2', name: 'Banana' },
  { id: '3', name: 'Strawberry' },
  { id: '4', name: 'Cherry' },
  { id: '5', name: 'Potato' },
  
];


export default class AddFarm extends React.Component{
    constructor(){
        super();
        this.state={

            
            longitude:0,
            
            latitude:0,
            area:0,
            name:'',
            selectedItems:[],
            
            user:''
            }
            console.disableYellowBox = true;
            
            this.findCoordinates()
    }
    colors = ['blue', 'green', 'red', 'purple'];
    componentDidMount(){
      this.loadAsyncData()
      this.username();
      
    }
    static navigationOptions = {
      title: 'MultiSelScr',
      headerStyle: {
      backgroundColor: 'black',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
      fontWeight: 'bold',
      },
      };

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


      onSelectedItemsChange = selectedItems => {
        
           this.setState({ selectedItems });
            
          };
          username = async() =>{
            const un = await AsyncStorage.getItem('username')
            console.log(un)
            this.setState({user:un})
          }
    findCoordinates = () => {

        navigator.geolocation.getCurrentPosition(
        
        position => {
        
        const longitude = JSON.stringify(position.coords.longitude);
        
        const latitude = JSON.stringify(position.coords.latitude);
        
        this.setState({ longitude});
        
        this.setState({ latitude});
        
        },
        
        error => Alert.alert(error.message),
        
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        
        );
        
        };

        sendCred= async ()=>{
    
    
          fetch("http://192.168.43.19:3000/farmer/farm",{
            method:"POST",
            headers: {
             'Content-Type': 'application/json'
           },
           body:JSON.stringify({
             "name":this.state.name,
             "area":this.state.area,
             "latitude":this.state.latitude,
             "longitude":this.state.longitude,
             "plants":this.state.selectedItems,
             "user":this.state.user

           })
          })
          .then(res=>res.json())
          .then(async (data)=>{
                 try {
                  
                   alert("Your Farm Details has been sent!")
                   this.props.navigation.navigate('Home')
                   
                 } catch (e) {
                   Alert("error hai",e)
                 }
          })
        
       }
      
    render(){
      const themeColorIndex = this.props.navigation.state.params ?
      this.props.navigation.state.params.themeIndex : 0;
    const a = this.colors[themeColorIndex]
    console.log(a)


      const {selectedItems} = this.state
    
       return(
        <View style={styles.container}>
        <MyHeader title='Add Farm' color={a}  navigation={this.props.navigation}/>
              
        <Content>
        <Label style={{marginTop:20, textAlign:'center', fontSize: 24}}>Add Farm</Label>
       
          <Form>
            <Item floatingLabel rounded>
              <Label style={{marginLeft:10,marginTop:-15}}>Farm Name</Label>
              <Input style={{marginLeft:10}} onChangeText={(text)=>this.setState({name:text})}/>
            </Item>
            <Item floatingLabel rounded>
              <Label style={{marginLeft:10,marginTop:-15}}>Farm Area in Square Meters</Label>
              <Input style={{marginLeft:10}} onChangeText={(text)=>this.setState({area:text})} keyboardType='numeric'/>
            </Item>
           
           
            <MapView
        
        provider={PROVIDER_GOOGLE}
        
        style={{ width: 300, height: 200,marginTop:20,alignItems:'center',justifyContent:'center',flex:1,left:40 }}
        
        region ={{
        
        latitude:parseFloat(this.state.latitude),
        
        longitude:parseFloat(this.state.longitude),
        
        latitudeDelta:0.0,
        
        longitudeDelta:0.32
        
        }}
        
        
        showsUserLocation
        
        >
        
        </MapView>
        <SafeAreaView style={{ flex: 1}}>
        <View style={{ flex: 1, padding: 30 }}>
          <MultiSelect
            // hideTags
            items={items}
            uniqueKey="name"
            ref={component => {
              this.multiSelect = component;
            }}
            onSelectedItemsChange={this.onSelectedItemsChange}
            selectedItems={selectedItems}
            selectText=" Select Plants"
            searchInputPlaceholderText="Search Items..."
            onChangeInput={text => console.log(text)}
            tagRemoveIconColor="blue"
            tagBorderColor="blue"
            tagTextColor="blue"
            selectedItemTextColor="blue"
            selectedItemIconColor="blue"
            itemTextColor="red"
            displayKey="name"
            searchInputStyle={{ color: 'blue' }}
           hideSubmitButton={true}
           
            
          />
         
        </View>
      </SafeAreaView>
      
      
        <Button 
        
        
        onPress={()=>this.sendCred()}
        style={{left:100,width:130,marginLeft:18,marginRight:18,marginTop:18, backgroundColor:'#006400', alignItems:'center', alignContent:'center'}}
       >
        <Icon name='ios-send'/>
        
        <Label style={{textAlign:'center',color:'white'}}>Add </Label>
        <Right></Right>
      </Button>

      
          </Form>
          
        </Content>
        
        
        
        
        
        
        
        
        </View>
        
       
        );
        

     
    }
    
}
const styles = StyleSheet.create({
    container: {
        marginTop:0,
      flex: 1,
      
      
    },
    input:{
        marginTop:5,
        width:250,
        height:30,
        borderWidth:1
    }
  });
