import React,{Component} from 'react';
import { StyleSheet,  View ,ScrollView, Alert, AsyncStorage,Image,ImageBackground} from 'react-native';
import MyHeader from './MyHeader';
import { Card ,Title} from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { Container, Header, Content, Button, Icon, Text } from 'native-base';



const SHOW_NOTIFICATIONS_KEY = 'notifications';
const THEME_COLOR_KEY = 'theme_color';
export default class HomeScreen extends React.Component {
    state={
        info:{
            name:"loading!!",
            temp:"loading!!",
            humidity:"loading!!",
            desc:"loading!!",
            icon:"loading!!"
        }
    }

    colors = ['blue', 'green', 'red', 'purple'];
async getWeather(){
    Mycity = await AsyncStorage.getItem("city")
    if(!Mycity){
        Mycity=this.props.navigation.getParam('city','islamabad')
    }
 
    //Mycity = await AsyncStorage.getItem("city")
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${Mycity}&units=metric&APPID=05c7525886db4ae6a5db7943450d1e8c`)
    .then(res=>res.json())
    .then(data=>{
      
        this.setState({
            info:{

                name:data.name,
                temp:data.main.temp,
                humidity:data.main.humidity,
                desc:data.weather[0].description,
                icon:data.weather[0].icon
    }
})
    

}).catch(err=>{
    Alert.alert("Error"+err.message,[{text:"ok"}])
})
}   

componentDidMount(){
    this.getWeather()
    this.loadAsyncData();
    this.username();
 
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

  username = async() =>{
    const un = await AsyncStorage.getItem('username')
    console.log(un)
  }


    render(){
        const themeColorIndex = this.props.navigation.state.params ?
        this.props.navigation.state.params.themeIndex : 0;
      const a = this.colors[themeColorIndex]
   
    if(this.props.navigation.getParam('city')){
        this.getWeather()
    }
        
  return (
    <ScrollView>
    <View style={styles.container}>
      
      <MyHeader title="Home" color={a} isHome={true} navigation={this.props.navigation}/>
      {/* <Custom title="Current Weather" color={a} navigation={this.props.navigation} isHome={true}/> */}
      <Card style={{margin:20}}>
    
    <Card.Content >
      <Title style={{fontSize:30}}>Health Check</Title>
      <Title style={{fontSize:20,marginTop:20}}>Take a Picture of Your Crop to detect Disease!</Title>
      
    </Card.Content>
    <Card.Cover source={ require('../assets/plant.jpg')} />
  
  </Card>

  <View style={{flexDirection:'row'}}>

  <Button rounded style={{width:140,alignItems:'center',marginLeft:20,backgroundColor:'#006400'}} onPress={()=>this.props.navigation.navigate('Upload')}>
            
            <Text>Upload Picture</Text>
          </Button>

  {/* <Button rounded style={{width:150,alignItems:'center',marginLeft:90,backgroundColor:'#006400',justifyContent:'center'}}onPress={()=>this.props.navigation.navigate('Camera')}>
            <Text style={{marginLeft:19}}>
            <Icon left name='camera'/>
            </Text>
            <Text style={{marginRight:22}} >Take Picture</Text>
          </Button> */}

          
      <Button rounded style={{width:170,alignItems:'center',marginLeft:70,backgroundColor:'#006400',justifyContent:'center'}}onPress={()=>this.props.navigation.navigate('Camera')}>
            <Icon name='camera'/>
            <Text >Take Picture</Text>
          </Button>

          
          


          </View>

      <Card style={{margin:20,backgroundColor:'#C0C0C0'}}>
      {/* <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']}> */}
          <View style={{padding:20,alignItems:"center"}}>
          <Title style={styles.text}>{this.state.info.name}</Title>
            <Image style={{width:120,height:120}}
            source={{uri:'http://openweathermap.org/img/w/'+this.state.info.icon+".png"}} />
            <Title style={styles.text}>Temparature :{this.state.info.temp}</Title>
            <Title style={styles.text}> Description :{this.state.info.desc}</Title>
           
            <Title style={styles.text}> Humidity :{this.state.info.humidity}</Title>
          </View>
          {/* </LinearGradient> */}

      </Card>

      <Button rounded style={{width:170,alignItems:'center',marginLeft:110,backgroundColor:'#006400',justifyContent:'center'}}onPress={()=>this.props.navigation.navigate('Search')}>
            <Icon name='md-options'/>
            <Text >Select City</Text>
          </Button>

 
     
      </View>

      </ScrollView>

  );
}
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f4f4f4',
  
    },
    text:{
        textAlign:'center',
        marginBottom:10,
        color:'white',
        fontSize:22
    }
  });
  