import React, { useEffect, useState } from "react";
import "./UserRegistration";

interface Errors {
  userName?: string;
  postalCode?: string;
  address?: string;
}

interface User {
  userName: string;
  postalCode: string;
  address: string;
}

const UserRegistration = () => {
  const [userName, setUserName] = useState<string>("");
  const [postalCode, setPostalCode] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [errors, setErrors] = useState<Errors>({});
  const [users, setUsers] = useState<User[]>([]); // ユーザーリストの状態

  // コンポーネントがマウントされた時にローカルストレージからデータを読み込む
  useEffect(() => {
    const storedUsers = localStorage.getItem("users");
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    }
  }, []);

  // ユーザーリストが変更された時にローカルストレージを更新する
  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  const validateForm = () => {
    let formIsValid = true;
    let tempErrors: Errors = {};

    if (!userName.trim()) {
      formIsValid = false;
      tempErrors.userName = "ユーザー名を入力してください。";
    }
    if (!postalCode.trim()) {
      formIsValid = false;
      tempErrors.postalCode = "郵便番号を入力してください。";
    }
    if (!address.trim()) {
      formIsValid = false;
      tempErrors["address"] = "住所を入力してください。";
    }

    setErrors(tempErrors);
    return formIsValid;
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (validateForm()) {
      const newUser: User = { userName, postalCode, address };
      setUsers([...users, newUser]);
      // フォームフィールドをクリアする
      setUserName("");
      setPostalCode("");
      setAddress("");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>ユーザー名:</label>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          {errors.userName && <div className="error">{errors.userName}</div>}
        </div>
        <div>
          <label>郵便番号:</label>
          <input
            type="text"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
          />
          {errors.postalCode && (
            <div className="error">{errors.postalCode}</div>
          )}
        </div>
        <div>
          <label>住所:</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          {errors.address && <div className="error">{errors.address}</div>}
        </div>
        <button type="submit">登録</button>
      </form>

      {users.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>ユーザー名</th>
              <th>郵便番号</th>
              <th>住所</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td>{user.userName}</td>
                <td>{user.postalCode}</td>
                <td>{user.address}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserRegistration;
