import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { Image } from 'react-native';
import styled, { css } from '@emotion/native';
import { AntDesign, Feather } from '@expo/vector-icons';
import { useState } from 'react';

// @tailwind base;
// @tailwind components;
// @tailwind utilities;

// 5개 컴포넌트 모두 따로 임포트해야함
// 기본적으로 display:flex
// flexDirection: "colunm" 기본!

export default function App() {
  // const [tastList, setTaskList] = useState([]);
  // const Task () =>{
  //   setState[...taskList, setTaskList]
  // };
  const [text, setText] = useState('');

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={{ fontSize: 25, marginTop: 30 }}>
        <View style={styles.menu}>
          <TouchableOpacity style={styles.button}>
            <Text>Javascript</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text>React</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text>Coding Test</Text>
          </TouchableOpacity>
        </View>
        <TextInput style={styles.input} value={text} onChangeText={setText} />
        <View style={styles.checkbox}>
          <Text style={styles.task}>{setText}</Text>
          <View style={styles.editbutton}>
            <TouchableOpacity>
              <AntDesign name='checkcircleo' size={24} color='black' />
            </TouchableOpacity>
            <TouchableOpacity>
              <Feather name='edit' size={24} color='black' />
            </TouchableOpacity>
            <TouchableOpacity>
              <AntDesign name='delete' size={24} color='black' />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  menu: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  button: {
    backgroundColor: 'gray',
    padding: 20,
  },
  input: {
    padding: 30,
    fontSize: 30,
    width: '100%',
    backgroundColor: 'ivory',
  },
  checkbox: {
    flex: 1,
    flexDirection: 'row',
    padding: 20,
    margin: 30,
    backgroundColor: 'gray',
    justifyContent: 'space-between',
  },
  editbutton: {
    flex: 1,
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'space-evenly',
  },
});
