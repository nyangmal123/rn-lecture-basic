import { StatusBar } from 'expo-status-bar';
import {
  Alert,
  DatePickerIOSBase,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';
import Tabs from './components/tabs';
import Todo from './components/Todo';
import {
  onSnapshot,
  query,
  collection,
  doc,
  orderBy,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';
import { dbService } from './firebase';
import { async } from '@firebase/util';

export default function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');
  const [category, setCategory] = useState('');
  const [editText, setEditText] = useState('');

  // add Todo - 자료구조짜는 것이 일순위
  const newTodo = {
    // id: Date.now(),
    text,
    isDone: false,
    isEdit: false,
    category,
    createdAt: Date.now(),
  };
  // addTodo 함수 만들기 & todos 출력하기
  const addTodo = async () => {
    // console.log('addDoc왜 안돼 미친놈아', dbService);
    // console.log(addDoc(collection(dbService, 'todos')));
    // setTodos((prev) => [...prev, newTodo]);
    await addDoc(collection(dbService, 'todos'), newTodo);
    setText('');
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
        onPress: async () => {
          // const newTodos = todos.filter((todo) => todo.id !== id);
          // setTodos(newTodos);
          await deleteDoc(doc(dbService, 'todos', id));
        },
      },
    ]);
  };

  // todos[idx]의 isDone값을 !해서 토글링
  const setDone = async (id) => {
    const idx = todos.findIndex((todo) => todo.id === id);
    await updateDoc(doc(dbService, 'todos', id), {
      isDone: !todos[idx].isDone,
    });
  };
  // isEdit 상태 토글링
  const setEdit = async (id) => {
    const idx = todos.findIndex((todo) => todo.id === id);
    await updateDoc(doc(dbService, 'todos', id), {
      isEdit: !todos[idx].isEdit,
    });
  };
  // editTodo 함수 만들기 - 아이콘에 심어주기
  const editTodo = async (id) => {
    // id 값을 받아서 todos[idx]찾기
    // todos[idx] 값을 editText로 변경

    await updateDoc(doc(dbService, 'todos', id), {
      text: editText,
      isEdit: false,
    });
  };

  const setCat = async (cat) => {
    setCategory(cat);
    // await AsyncStorage.setItem('category', cat);
    await updateDoc(doc(dbService, 'category', 'currentCategory'), {
      category: cat,
    });
  };
  useEffect(() => {
    // 1. onSnapshot API이용해서 todos 컬렉션에 변경이 생길 때 마다
    // 2. todos 컬렉션 안의 모든 document들을 불러와서 setTodos한다.

    const q = query(
      collection(dbService, 'todos'),
      orderBy('createdAt', 'desc')
    );

    onSnapshot(q, (snapshot) => {
      const newTodos = snapshot.docs.map((doc) => {
        const newTodo = {
          id: doc.id,
          ...doc.data(), // doc.data() : {text, createdAt, ... }
        };
        return newTodo;
      });
      setTodos(newTodos);
    });
    // setCategory 파이어베이스에서 불러오기!
    const getCategory = async () => {
      const snapshot = await getDoc(
        doc(dbService, 'category', 'currentCategory')
      );
      setCategory(snapshot.data().category);
    };
    getCategory();
  }, []);

  return (
    <SafeAreaView style={styles.safearea}>
      <StatusBar style='auto' />
      <Tabs setCat={setCat} category={category} />
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
              <Todo
                key={todo.id}
                todo={todo}
                editTodo={editTodo}
                setDone={setDone}
                setEdit={setEdit}
                deleteTodo={deleteTodo}
                setEditText={setEditText}
                editText={editText}
              />
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
});
