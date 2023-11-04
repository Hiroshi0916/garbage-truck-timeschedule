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
  const [users, setUsers] = useState<User[]>([]);
  const [errors, setErrors] = useState<Errors>({});

  const [newUserEmail, setNewUserEmail] = useState<string>("");

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
        <button>登録</button>
        <button>編集</button>
      </div>
    </div>
  );
};

export default UserRegistration;
