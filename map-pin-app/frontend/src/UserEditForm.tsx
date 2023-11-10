import { useState } from "react";
import { User } from "./models/User";
import { formFieldStyle, labelStyle, inputStyle, buttonStyle } from './formStyles';


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
        <div>
          <h1>ユーザー情報の編集</h1>
          <form onSubmit={handleSubmit} style={{ margin: '20px 0' }}>
            <div style={formFieldStyle}>
              <label style={labelStyle}>ユーザー名:</label>
              <input type="text" name="username" value={user.username} onChange={handleChange} style={inputStyle} />
            </div>
            <div style={formFieldStyle}>
              <label style={labelStyle}>ユーザーアドレス:</label>
              <input type="text" name="address" value={user.address} onChange={handleChange} style={inputStyle} />
            </div>
            <div style={formFieldStyle}>
              <label style={labelStyle}>居住地:</label>
              <input type="text" name="residence" value={user.residence} onChange={handleChange} style={inputStyle} />
            </div>
            <button type="submit" style={buttonStyle}>保存</button>
          </form>
        </div>
    );
    };
  
    export default UserEditForm;