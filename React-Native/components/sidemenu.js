import React from 'react'
import {View,Image,SafeAreaView,ScrollView,StyleSheet,AsyncStorage} from 'react-native';
import{Text,List, ListItem,Icon} from 'native-base'

class SideMenu extends React.Component{
     logout =(props)=>{
        AsyncStorage.removeItem("token").then(()=>{
          this.props.navigation.navigate("Login")
        })
     }
    render(){
        return(
            <SafeAreaView style={{flex:1}}>
                <View style={styles.view}>
                    <Image source={require('../assets/icon.png')}
                    style={styles.img}
                    />
                </View>
                <ScrollView>
                    <List>
                        <ListItem onPress={()=>this.props.navigation.navigate('Plant')}>
                            <Text>Plants</Text>
                        </ListItem>
                        <ListItem onPress={()=>this.props.navigation.navigate('Pest')}>
                            <Text>Pests</Text>
                        </ListItem >
                        <ListItem onPress={()=>this.props.navigation.navigate('ViewFarm')}>
                            <Text>My Farms</Text>
                        </ListItem >
                        <ListItem onPress={()=>this.props.navigation.navigate('Settings')}>
                            
                            <Text>Settings</Text>
                        </ListItem >
                        <ListItem noborder style={{bottom:0}} onPress={()=>this.logout()}>
                            <Text>Log Out</Text>
                        </ListItem>
                    </List>
                </ScrollView>
            </SafeAreaView>
        );
    }
}
const styles = StyleSheet.create({
    view:{
      
        justifyContent:'center',
        alignItems:'center',
        height:150
    },
    img:{
        height:120,
        width:120,
        borderRadius:60
    }
})

export default SideMenu;