import React from 'react';
import {TabNavigator } from 'react-navigation';
import {Icon } from 'react-native-elements';

import Feed from './screens/Feed.js';
import Me from './screens/Me.js';

export const Tabs = TabNavigator({
  Feed:{
    screen: Feed,
  },
  Me:{
    screen: Me,

  }
})
