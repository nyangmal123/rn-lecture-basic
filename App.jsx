import { StatusBar } from 'expo-status-bar';
import {
  Alert,
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
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';

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
  // filter로 선택된 todo.id 값 받아와서 없앤 새로운 배열을 setTodos()
  const deleteTodo = (id) => {
    // alert API 사용하기
    Alert.alert('Todo삭제', '정말 삭제하시겠습니까?', [
      {
        text: '취소',
        style: 'cancel',
        // onPress 해줄 것이 없어서 안썼음!
      },
      {
        text: '삭제',
        style: 'destructive',
        onPress: () => {
          const newTodos = todos.filter((todo) => todo.id !== id);
          setTodos(newTodos);
        },
      },
    ]);
  };

  // isEdit 상태 토글링
  const setEdit = (id) => {
    // edit 아이콘 누르면 함수 실행
    // 선택한 todo의 isEdit 상태 변경
    // edit 아이콘 누르면 출력된 todo가 입력창으로 변경돼야 함
    // edit TextInput 창에 입력된 텍스트도 상태 저장해주는 state 필요
    const newTodos = [...todos];
    const idx = newTodos.findIndex((todo) => todo.id === id);
    newTodos[idx].isEdit = !newTodos[idx].isEdit;
    setTodos(newTodos);
  };
  // editTodo 함수 만들기 - 아이콘에 심어주기
  const editTodo = (id) => {
    // id 값을 받아서 todos[idx]찾기
    // todos[idx] 값을 editText로 변경

    const newTodos = [...todos];
    const idx = todos.findIndex((todo) => todo.id === id);
    newTodos[idx].text = editText;
    newTodos[idx].isEdit = false;
    setTodos(newTodos);
  };

  const setCat = async (cat) => {
    setCategory(cat);
    await AsyncStorage.setItem('category', cat);
  };
  // 새로고침해도 데이터가 날아가지 않도록
  // async-storage에 최신 todos상태를 저장
  // 함수마다 끝은 항상 setTodos이니까 한 번에 쓰도록 바꿔보자
  useEffect(() => {
    // 최신의 todos를 AsyncStorage에 저장
    const saveTodos = async () => {
      await AsyncStorage.setItem('todos', JSON.stringify(todos));
    };
    // 초기 state값은 제로이므로 그 이후에 저장된 것이 있을 경우에만 이 함수를 실행하도록.
    if (todos.length > 0) saveTodos();
  }, [todos]);

  useEffect(() => {
    // 랜더링하면 가져올 데이터 - todos, category
    // category는 문자열이어서 parse, stringify 해줄 필요 없음
    const getData = async () => {
      const resp_todos = await AsyncStorage.getItem('todos');
      const resp_cat = await AsyncStorage.getItem('category');
      // 배열과 객체는 반드시 parsing해줘야 알아차릴 수 있다.
      setTodos(JSON.parse(resp_todos));
      setCategory(resp_cat ?? 'js');
    };
    getData();
  }, []);

  return (
    <SafeAreaView style={styles.safearea}>
      <StatusBar style='auto' />
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
                {/* isEdit = true면 텍스트인풋창, false면 텍스트창 */}
                {/* 인풋창에도 텍스트값을 저장하도록 함수 적용*/}
                {todo.isEdit ? (
                  <TextInput
                    style={{ backgroundColor: 'white', flex: 1 }}
                    value={editText}
                    onSubmitEditing={() => editTodo(todo.id)}
                    onChangeText={setEditText}
                  />
                ) : (
                  <Text
                    style={{
                      textDecorationLine: todo.isDone ? 'line-through' : 'none',
                    }}
                  >
                    {todo.text}
                  </Text>
                )}
                <View style={{ flexDirection: 'row' }}>
                  {/* setDone 완료 토글링 함수 적용 */}
                  <TouchableOpacity onPress={() => setDone(todo.id)}>
                    <FontAwesome name='check-circle' size={24} color='black' />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setEdit(todo.id)}>
                    <MaterialIcons name='edit' size={24} color='black' />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => deleteTodo(todo.id)}>
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
