import React, { useEffect, useState } from "react";
import "./UserRegistration.css";

interface Errors {
  userName?: string;
  postalCode?: string;
  address?: string;
  email?: string;
}

interface User {
  id: number;
  userName: string;
  postalCode?: string;
  address: string;
  email?: string;
  isEditing?: boolean;
}

const UserRegistration = () => {
  const [newUserName, setNewUserName] = useState<string>("");
  const [newAddress, setNewAddress] = useState<string>("");
  const [newUserEmail, setNewUserEmail] = useState<string>("");
  const [users, setUsers] = useState<User[]>([]);
  const [errors, setErrors] = useState<Errors>({});

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

  const validate = () => {
    let tempErrors: Errors = {};
    if (!newUserName) tempErrors.userName = "ユーザー名を入力してください。";
    if (!newUserEmail) tempErrors.email = "メールアドレスを入力してください。";
    if (!newAddress) tempErrors.address = "住所を入力してください。";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const addUser = (userId: number) => {
    if (validate()) {
      const newUser = {
        id: users.length + 1, // ID生成はサーバー側で行うべきですが、ここでは仮の処理としています。
        userName: newUserName,
        address: newAddress,
        email: newUserEmail,
        isEditing: false,
      };

      setUsers([...users, newUser]);

      // フォームをクリアしたくない場合は、以下の行をコメントアウトします
      // setNewUserName('');
      // setNewAddress('');
      // setNewUserEmail('');
    }
  };

  const toggleEdit = (userId: number) => {
    setUsers(users.map(user => {
      if (user.id === userId) {
        // 編集中のユーザーがあれば、編集状態を反転させる
        return { ...user, isEditing: !user.isEditing };
      }
      return user;
    }));
  };

  return (
    <div>
      <div className="table-container">
        <table className="table">
          <tbody>
            <tr>
              <th>ユーザー名</th>
              <td>
                <input
                  type="text"
                  className="input-no-border"
                  value={newUserName}
                  onChange={(e) => setNewUserName(e.target.value)}
                  placeholder="ユーザー名"
                />
                {errors.userName && (
                  <div className="error">{errors.userName}</div>
                )}
              </td>
            </tr>
            <tr>
              <th>ユーザーアドレス</th>
              <td>
                <input
                  type="text"
                  className="input-no-border"
                  value={newUserEmail}
                  onChange={(e) => setNewUserEmail(e.target.value)}
                  placeholder="ユーザーアドレス"
                />
                {errors.email && <div className="error">{errors.email}</div>}
              </td>
            </tr>
            <tr>
              <th>居住地</th>
              <td>
                <input
                  type="text"
                  className="input-no-border"
                  value={newAddress}
                  onChange={(e) => setNewAddress(e.target.value)}
                  placeholder="居住地"
                />

                {errors.address && (
                  <div className="error">{errors.address}</div>
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="button-container">
        {users.map((user) =>
          user.isEditing ? (
            // 編集保存ボタン
            <button onClick={() => addUser(user.id)}>保存</button>
          ) : (
            // 通常の編集ボタン
            <button onClick={() => toggleEdit(user.id)}>編集</button>
          )
        )}
      </div>


      {/* <div className="button-container">
      <button onClick={addUser}>登録</button>
        <button>編集</button>
      </div> */}
    </div>
  );
};

export default UserRegistration;
