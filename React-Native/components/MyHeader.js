import { Appbar } from 'react-native-paper';
import React from 'react';



 class MyHeader extends React.Component{
   render(){
     let {title,color,isHome} = this.props;
    return(
        <Appbar.Header
       style={{backgroundColor:color}}>
         {
           isHome?
           <Appbar.Action icon="menu" onPress={()=>this.props.navigation.openDrawer()} />:
           <Appbar.BackAction onPress={()=>this.props.navigation.goBack()}/>
         }
         
       
        <Appbar.Content
          title="Smart Farming"
          subtitle={title}
          style = {{alignItems:"center"}}


        />
        
     
      </Appbar.Header>
    )
}
 }


export default MyHeader;