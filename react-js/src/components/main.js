import React from 'react';
import { Switch, Route } from 'react-router-dom';
import ProtectedRoute from "./protected.route"

import Landing from './landing';
import AdminLogin from './alogin';
import FAQ from './faq';
import ContactUs from './contactus';
import Registration from './reg';
import ProductDetails from './addPest';
import RestaurantDetails from './addPlant';
import ChangePassword from './changep';
import ProductTable from './viewAllPests';
import RestaurantTable from './viewPlants';
import EditRestaurant from './editr';
import SendMessage from './message';
import AddImage from './addrimage';
import EditFood from './editfood';
import Reservations from './viewUsers';
import Orders from './viewExperts';
import ProductImage from './addpimage';
import Posts from './posts';
import WritePost from './writePost'
import Forum from './forum';
import EditUser from './editUser';
import SendNotification from './sendNotification';
import Library from './library';
import AddDisease from './addDisease';




const Main = () => (
  <Switch>
    <Route exact path="/" component={Landing} />
    <Route path="/alogin" component={AdminLogin} />
    <Route path="/faq" component={FAQ} />
    <Route path="/contactus" component={ContactUs} />
    <Route path="/reg" component={Registration} />
    <ProtectedRoute path="/addPest" component={ProductDetails} />
    <ProtectedRoute path="/addPlant" component={RestaurantDetails} />
    <Route path="/changep" component={ChangePassword} />
    <Route path="/pests" component={ProductTable} />
    <Route path="/viewPlants" component={RestaurantTable} />
    <Route path="/message" component={SendMessage} />
    <Route path="/addrimage" component={AddImage} />
    <Route path="/editr/:id" component={EditRestaurant} />
    <Route path="/editfood/:id" component={EditFood} />
    <Route path="/viewUsers" component={Reservations} />
    <Route path="/viewExperts" component={Orders} />
    <Route path="/addpimage" component={ProductImage} />
    <Route path="/community" component={Posts} />
    <Route path="/write" component={WritePost} />
    <Route path="/forum" component={Forum} />
    <Route path="/post/:id" component={Posts} />
    <ProtectedRoute path="/edit/:type/:id" component={EditUser} />
    <Route path="/sendNotification" component={SendNotification} />
    <Route path="/addDisease" component={AddDisease}/>
    <Route path="/library" component={Library}/>
  
    


  </Switch>
)

export default Main;