import { useEffect, useState } from "react";
import { User } from "./models/User";


// ローカルストレージからユーザーデータを取得する関数
const fetchUserDataFromLocalStorage = (): User => {
    const userData = localStorage.getItem('userData');
    return userData ? JSON.parse(userData) : { username: '', address: '', residence: '' };
  };
  
  const UserEditForm: React.FC = () => {
    const [user, setUser] = useState<User>(fetchUserDataFromLocalStorage());
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setUser({ ...user, [e.target.name]: e.target.value });
    };
  
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      // ローカルストレージにユーザーデータを保存
      localStorage.setItem('userData', JSON.stringify(user));
      // 保存完了などの通知を行う
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
          <button type="submit">保存</button>
        </form>
      );
    };
  
    export default UserEditForm;