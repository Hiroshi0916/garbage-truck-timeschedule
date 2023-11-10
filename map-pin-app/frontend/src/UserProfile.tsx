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
  const [isEditing, setIsEditing] = useState<boolean>(false);

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

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (user) {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (user) {
      localStorage.setItem('userData', JSON.stringify(user));
      setIsEditing(false); // 編集モードを終了
    }
  };

  if (!user) {
    return <div>データを読み込み中...</div>;
  }

  if (isEditing) {
    return (
      <form onSubmit={handleSubmit}>
        {/* 編集フォームのフィールド */}
        {/* ... */}
        <button type="submit">保存</button>
      </form>
    );
  }



  return (
    <div>
      <h1>ユーザー情報</h1>
      <p>ユーザー名: {user.username}</p>
      <p>アドレス: {user.address}</p>
      <p>居住地: {user.residence}</p>
        <button onClick={handleEdit}>編集</button>
    </div>
  );
};

export default UserProfile;
