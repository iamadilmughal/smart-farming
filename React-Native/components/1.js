import React from 'react'
import { Container, Header, Left, Body, Right, Button, Icon, Title, Subtitle } from 'native-base';

// const Custom = (props) => {
//  const a = props.color
//  const title = props.title
//  let {isHome} = this.props;
class Custom extends React.Component{
  render(){
    let {title,isHome,color} = this.props
        return(
            <Container >
        <Header style={{backgroundColor:color,marginBottom:0}}>
          <Left>
            {
              isHome?
              <Button transparent onPress={()=>this.props.navigation.openDrawer()}>
              <Icon name='menu' />
            </Button>: 
             <Button transparent>
              <Icon name='arrow-back' onPress={()=>this.props.navigation.goBack()} />
            </Button>
            }
          
          </Left>
          <Body>
            <Title style={{color:'white'}}>Smart Farming</Title>
           
            <Subtitle style={{color:'white'}}>{title}</Subtitle>
          </Body>
          <Right>
            {/* <Button transparent>
              <Icon name='menu' />
            </Button> */}
          </Right>
        </Header>
      </Container>
        );
    }
  }

export default Custom;