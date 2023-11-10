import React, { useEffect, useState } from 'react';
import { User } from './models/User'; 

const UserForm: React.FC = () => {
  const [user, setUser] = useState<User>({ username: '', address: '', residence: '' });
  const [isRegistered, setIsRegistered] = useState<boolean>(false);
  const [isAlreadyRegistered, setIsAlreadyRegistered] = useState<boolean>(false);

  useEffect(() => {
    // ローカルストレージにデータがあるか確認
    const userData = localStorage.getItem('userData');
    if (userData) {
      setIsAlreadyRegistered(true);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // ローカルストレージにユーザー情報を保存
    localStorage.setItem('userData', JSON.stringify(user));
    setIsRegistered(true);
    console.log('Saved to localStorage:', user);
  };


  return (
    <div>
      {isAlreadyRegistered ? (
        <p>すでに登録されています。</p>
      ) : (
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
      )}
            {isRegistered && <p>登録が完了しました。</p>}
    </div>
  );
};

export default UserForm;
