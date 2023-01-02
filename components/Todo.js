import React from 'react';
import { TextInput, View, Text, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';

export default function Todo({
  todo,
  setEditText,
  editTodo,
  setDone,
  setEdit,
  deleteTodo,
}) {
  return (
    <View key={todo.id} style={styles.task}>
      {/* isEdit = true면 텍스트인풋창, false면 텍스트창 */}
      {/* 인풋창에도 텍스트값을 저장하도록 함수 적용*/}
      {todo.isEdit ? (
        <TextInput
          style={{ backgroundColor: 'white', flex: 1 }}
          defaultValue={todo.text}
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
          <MaterialIcons
            style={{ marginLeft: 10 }}
            name='edit'
            size={24}
            color='black'
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => deleteTodo(todo.id)}>
          <Feather
            style={{ marginLeft: 10 }}
            name='delete'
            size={24}
            color='black'
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
