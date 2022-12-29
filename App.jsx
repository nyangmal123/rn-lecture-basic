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

// 5개 컴포넌트 모두 따로 임포트해야함
// 기본적으로 display:flex
// flexDirection: "colunm" 기본!

export default function App() {
  return (
    <SafeAreaView>
      <ScrollView>
        <TouchableOpacity className='bg-blue'>
          <Text>Javascript</Text>
        </TouchableOpacity>
        <TouchableOpacity className='bg-blue'>
          <Text>React</Text>
        </TouchableOpacity>
        <TouchableOpacity className='bg-blue'>
          <Text>Coding Test</Text>
        </TouchableOpacity>
        <TextInput />
        <View className='flex-1 fontSize-30 items-center justify-center bg-gray'>
          <Text>Check</Text>
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
      </ScrollView>
    </SafeAreaView>
  );
}
