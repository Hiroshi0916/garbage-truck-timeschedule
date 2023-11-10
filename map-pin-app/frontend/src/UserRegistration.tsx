import React, { useState } from 'react';
import { User } from './models/User';  // 正しいパスに調整

const UserForm: React.FC = () => {
  const [user, setUser] = useState<User>({ username: '', address: '', residence: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // ここでユーザー情報を処理（例: データベースに保存）
    console.log(user);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>ユーザー名:</label>
        <input type="text" name="username" value={user.username} onChange={handleChange} />
      </div>
      <div>
        <label>ユーザーアドレス:</label>
        <input type="text" name="address" value={user.address} onChange={handleChange} />
      </div>
      <div>
        <label>居住地:</label>
        <input type="text" name="residence" value={user.residence} onChange={handleChange} />
      </div>
      <button type="submit">登録</button>
    </form>
  );
};

export default UserForm;
