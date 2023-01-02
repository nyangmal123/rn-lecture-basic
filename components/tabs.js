import React, { Component } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { StyleSheet } from 'react-native';

export default function Tabs({ setCat, category }) {
  return (
    <View style={styles.tabs}>
      {/* setCategory: tab 별로 다른 todos.category */}
      {/* AsyncStorage로 새로고침해도 저장되도록 setCat함수를 만들어 적용해준다. */}
      <TouchableOpacity
        onPress={() => setCat('js')}
        style={{
          ...styles.tab,
          backgroundColor: category === 'js' ? '#0FBCF9' : 'gray',
        }}
      >
        <Text style={styles.tabText}>javascript</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setCat('react')}
        style={{
          ...styles.tab,
          backgroundColor: category === 'react' ? '#0FBCF9' : 'gray',
        }}
      >
        <Text style={styles.tabText}>react</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setCat('ct')}
        style={{
          ...styles.tab,
          backgroundColor: category === 'ct' ? '#0FBCF9' : 'gray',
        }}
      >
        <Text style={styles.tabText}>coding test</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tab: {
    backgroundColor: '#0FBCF9',
    paddingHorizontal: 10,
    paddingVertical: 15,
    width: '30%',
    alignItems: 'center',
  },
  tabText: {
    fontWeight: '600',
  },
});
