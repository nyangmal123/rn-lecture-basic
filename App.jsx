import { StatusBar } from 'expo-status-bar';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { useState } from 'react';

export default function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');
  const [category, setCategory] = useState('');
  const [editText, setEditText] = useState('');

  // add Todo - 자료구조짜는 것이 일순위
  const newTodo = {
    id: Date.now(),
    text,
    isDone: false,
    isEdit: false,
    category,
  };
  // addTodo 함수 만들기 & todos 출력하기
  const addTodo = () => {
    setTodos((prev) => [...prev, newTodo]);
    setText('');
  };

  const setDone = (id) => {
    // id를 매개변수로 받고
    // setTodos를 위해 newTodos로 얕은 복사
    // 선택된 todo의 index를 idx로 새로 선언
    // todos[idx]의 isDone값을 !해서 토글링
    // setTodos에 newTodos 저장
    const newTodos = [...todos];
    const idx = newTodos.findIndex((todo) => todo.id === id);
    newTodos[idx].isDone = !newTodos[idx].isDone;
    setTodos(newTodos);
  };
  // deleteTodo 함수 만들기
  // const deleteTodo = () => {
  //   setTodos((todos.id)=>{})
  // }

  // editTodo 함수 만들기
  return (
    <SafeAreaView style={styles.safearea}>
      <StatusBar style='auto' />
      <View style={styles.tabs}>
        {/* setCategory: tab 별로 다른 todos.category */}
        <TouchableOpacity
          onPress={() => setCategory('js')}
          style={{
            ...styles.tab,
            backgroundColor: category === 'js' ? '#0FBCF9' : 'gray',
          }}
        >
          <Text>javascript</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setCategory('react')}
          style={{
            ...styles.tab,
            backgroundColor: category === 'react' ? '#0FBCF9' : 'gray',
          }}
        >
          <Text>react</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setCategory('ct')}
          style={{
            ...styles.tab,
            backgroundColor: category === 'ct' ? '#0FBCF9' : 'gray',
          }}
        >
          <Text>coding test</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder='오늘 할 일을 입력하세요.'
          onSubmitEditing={addTodo}
          onChangeText={setText}
          value={text}
        />
      </View>
      <ScrollView>
        {/* 투두스에서 하나씩 뽑은 투두 출력 */}
        {todos.map((todo) => {
          // 카테고리 if문으로 분류
          if (category === todo.category) {
            return (
              <View key={todo.id} style={styles.task}>
                <Text
                  style={{
                    textDecorationLine: todo.isDone ? 'line-through' : 'none',
                  }}
                >
                  {todo.text}
                </Text>
                <View style={{ flexDirection: 'row' }}>
                  {/* setDone 완료 토글링 함수 적용 */}
                  <TouchableOpacity onPress={() => setDone(todo.id)}>
                    <FontAwesome name='check-circle' size={24} color='black' />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <MaterialIcons name='edit' size={24} color='black' />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Feather name='delete' size={24} color='black' />
                  </TouchableOpacity>
                </View>
              </View>
            );
          }
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safearea: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
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
  inputWrapper: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    paddingVertical: 15,
    marginTop: 15,
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  task: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: '#D9D9D9',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
});
