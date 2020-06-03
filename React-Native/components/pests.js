import React from 'react' ;
import {View,Text,StyleSheet,SafeAreaView,TouchableOpacity,TouchableHighlight,FlatList,Image,Alert,AsyncStorage, StatusBar} from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail,  Button, Icon, Left, Body, Right } from 'native-base';

import MyHeader from './MyHeader'
import ViewMoreText from 'react-native-view-more-text';
import { SearchBar } from 'react-native-elements';
const THEME_COLOR_KEY = 'theme_color';
 export default class Plant extends React.Component{
    constructor(){
            super();
            this.state = {
              data : [],
              isLoading: true, 
              user:'',
              refreshing:false,
              plants:[]
            }
           
          }
          colors = ['blue', 'green', 'red', 'purple'];
        componentDidMount(){
          this.loadAsyncData()
          this.getData();
          console.disableYellowBox = true;

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
       
    


      
        getData = async()=>{
          console.log('hello1')
          
         
            const response = await fetch('http://192.168.43.19:3000/pest/');
            const data  = await response.json();
              console.log(data)
              
            this.setState({
              data:data,
              isLoading: false,
              plants:data.plants
              
            }
           
            )
          }  

       
          
     render(){
      const themeColorIndex = this.props.navigation.state.params ?
      this.props.navigation.state.params.themeIndex : 0;
    const a = this.colors[themeColorIndex]

         return(
          
<Container style={{backgroundColor:'#006400'}}>
<MyHeader title="Pests"  navigation={this.props.navigation} color={a}/>

<Content>


    
    <FlatList
     data = {this.state.data}
     renderItem = {({item}) =>
          <Card  style={{borderColor:'#006400', borderRadius:30, borderBottomRightRadius:30, borderBottomLeftRadius:30,height:700}}>
            <CardItem  style={{backgroundColor:''}}>
              <Left>
                <Thumbnail source={{uri:item.pestImage}} style={{height:100,width:100}}/>
                
                <Body>
                  <Text style={{textAlign:'center',fontSize:30,fontWeight:'bold',justifyContent:'center',alignItems:'center'}}>Pest Name: {item.pestName}</Text>
         <Text note  style={{marginTop:50,fontWeight:'bold'}}>Scientific Name: {item.scientificName}</Text>
         
         <Text note numberOfLines={2} style={{marginTop:20}}>Severity : {item.severity}</Text>
         <Text note  style={{marginTop:20}}>Diagnostic : {item.diagnostics}</Text>
         <Text note  style={{marginTop:20}}>Prevention : {item.prevention}</Text>
         
                </Body>
                
              </Left>
            </CardItem> 
            
    
          </Card> 
    }
  
    keyExtractor={(item, index) => index.toString()}
     
     />

</Content>

</Container>

         )
     }
 }
 







