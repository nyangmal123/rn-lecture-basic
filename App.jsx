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

export default function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');
  const [category, setcategory] = useState('');
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

  // deleteTodo 함수 만들기

  // editTodo 함수 만들기
  return (
    <SafeAreaView style={styles.safearea}>
      <StatusBar style='auto' />
      <View style={styles.tabs}>
        <TouchableOpacity style={styles.tab}>
          <Text>javascript</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab}>
          <Text>react</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab}>
          <Text>ct</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder='오늘 할 일을 입력하세요.'
        />
      </View>
      <ScrollView>
        <View style={styles.task}>
          <TouchableOpacity>
            <MaterialIcons name='edit' size={24} color='black' />
          </TouchableOpacity>
          <TouchableOpacity>
            <FontAwesome name='check-circle' size={24} color='black' />
          </TouchableOpacity>
          <TouchableOpacity>
            <Feather name='delete' size={24} color='black' />
          </TouchableOpacity>
        </View>
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
