import React, { useState, useEffect } from 'react';
import { User } from './models/User';

// // 仮の fetchUserData 関数の例（実際のAPI呼び出しに合わせて変更）
// const fetchUserData = (): Promise<User> => {
//     // API呼び出しの実装（例えば、fetch APIを使用）
//     return fetch('api/user/data').then(response => response.json());
//   };


  // ユーザーデータをローカルストレージから取得する関数
const fetchUserDataFromLocalStorage = (): User | null => {
    const userData = localStorage.getItem('userData');
    return userData ? JSON.parse(userData) : null;
  };

const UserProfile: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // APIを呼び出してユーザーデータを取得
    // fetchUserData().then(data => {
    //   setUser(data);
    // });

    // ローカルストレージからユーザーデータを取得
    const data = fetchUserDataFromLocalStorage();
    if (data) {
      setUser(data);
    }
  }, []);

  if (!user) {
    return <div>データを読み込み中...</div>;
  }

  return (
    <div>
      <h1>ユーザー情報</h1>
      <p>ユーザー名: {user.username}</p>
      <p>アドレス: {user.address}</p>
      <p>居住地: {user.residence}</p>
      {/* 編集リンクやボタンを配置 */}
    </div>
  );
};

export default UserProfile;
