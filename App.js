import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
// 5개 컴포넌트 모두 따로 임포트해야함
// 기본적으로 display:flex
// flexDirection: "colunm" 기본!

export default function App() {
  const [text, setText] = useState('');
  console.log('text:', text);
  return (
    // div = View 위에서 임포트 해야와 한다.
    <ScrollView>
      // 로컬에서 이미지 불러오는 방법
      <Image source={require('./assets/splash.png')} />
      // 웹 이미지 가져오고 싶다 ex.파베
      <Image
        style={{ width: 100, height: 100 }}
        source={{
          uri: 'https://item.kakaocdn.net/do/e884bc5c959213e5ac28c250e35f552ab3a18fdf58bc66ec3f4b6084b7d0b570',
        }}
      />
      // 글자는 무조건 <Text></Text> 로 감싸줘야 에러 안남.
      <Text>제대로 연결!</Text>
      <Text>제대로 연결!</Text>
      <Text>제대로 연결!</Text>
      <Text>제대로 연결!</Text>
      <Text>제대로 연결!</Text>
      <Text>제대로 연결!</Text>
      <Text>제대로 연결!</Text>
      <Text>제대로 연결!</Text>
      <Text>제대로 연결!</Text>
      <Text>제대로 연결!</Text>
      <Text>제대로 연결!</Text>
      <Text>제대로 연결!</Text>
      <Text>제대로 연결!</Text>
      <Text>제대로 연결!</Text>
      <Text>제대로 연결!</Text>
      <Text>제대로 연결!</Text>
      <Text>제대로 연결!</Text>
      <Text>제대로 연결!</Text>
      <Text>제대로 연결!</Text>
      <Text>제대로 연결!</Text>
      <Text>제대로 연결!</Text>
      <Text>제대로 연결!</Text>
      <Text>제대로 연결!</Text>
      <Text>제대로 연결!</Text>
      <Text>제대로 연결!</Text>
      <Text>제대로 연결!</Text>
      <Text>제대로 연결!</Text>
      <Text>제대로 연결!</Text>
      //scroll화면 만들어보기 ScrollView는 contentContainerStyle-{객체}
      <Textinput
        style={{ backgroundColor: 'gray' }}
        onChangeText={setText}
        value={text}
      />
      <StatusBar style='auto' />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // flexDirection: "row"
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

// const styles = StyleSheet.create({
//   wrapper: {
//     fontSize: 100,
//     fontWeight: "500",
//     backgroundColor:'grey'
//   },
// })

//emotion native...

//SafeAreaView: 윗부분 무시하고 밑에서 데이터를 채워서 핸드폰 전면부 카메라 노치 부분에 가려지지않는다.
