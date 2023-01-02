import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// 아래 데이터는 본인의 Firebase 프로젝트 설정에서 확인할 수 있습니다.
const firebaseConfig = {
  apiKey: 'AIzaSyCg_AgvBkT7qUkS_Cy22D7xGwIXxcVQ3NU',
  authDomain: 'rn-prac-37d5d.firebaseapp.com',
  projectId: 'rn-prac-37d5d',
  storageBucket: 'rn-prac-37d5d.appspot.com',
  messagingSenderId: '76918638276',
  appId: '1:76918638276:web:2a55fc7c3c46059edbab91',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const dbService = getFirestore(app);
