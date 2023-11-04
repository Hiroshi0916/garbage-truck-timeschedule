import React, { useEffect, useState } from "react";
import "./UserRegistration";

interface Errors {
  userName?: string;
  postalCode?: string;
  address?: string;
}

interface User {
  id: number;
  userName: string;
  postalCode: string;
  address: string;
  isEditing: boolean;
}

const UserRegistration = () => {
  const [userName, setUserName] = useState<string>("");
  const [postalCode, setPostalCode] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [errors, setErrors] = useState<Errors>({});
  const [users, setUsers] = useState<User[]>([]); // ユーザーリストの状態
  const [editingId, setEditingId] = useState<number | null>(null);

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

  const handleEdit = (id: number) => {
    setEditingId(id);
    const user = users.find((user) => user.id === id);
    if (user) {
      setUserName(user.userName);
      setPostalCode(user.postalCode);
      setAddress(user.address);
    }
  };

  const handleSave = (id: number) => {
    setUsers(
      users.map((user) =>
        user.id === id
          ? { ...user, userName, postalCode, address, isEditing: false }
          : user
      )
    );
    resetForm();
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (editingId !== null) {
      handleSave(editingId);
    } else {
      if (validateForm()) {
        const newUser: User = {
          id: Date.now(), // ユニークなIDを生成
          userName,
          postalCode,
          address,
          isEditing: false,
        };
        setUsers([...users, newUser]);
        resetForm();
      }
    }
  };

  const resetForm = () => {
    setUserName("");
    setPostalCode("");
    setAddress("");
    setEditingId(null);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {/* 略: フォームフィールドと送信/保存ボタン */}
        <button type="submit">{editingId !== null ? "保存" : "登録"}</button>
      </form>

      {users.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>ユーザー名</th>
              <th>郵便番号</th>
              <th>住所</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>
                  {user.isEditing ? (
                    <input
                      type="text"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                    />
                  ) : (
                    user.userName
                  )}
                </td>
                <td>
                  {user.isEditing ? (
                    <input
                      type="text"
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                    />
                  ) : (
                    user.postalCode
                  )}
                </td>
                <td>
                  {user.isEditing ? (
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  ) : (
                    user.address
                  )}
                </td>
                <td>
                  {user.isEditing ? (
                    <button onClick={() => handleSave(user.id)}>保存</button>
                  ) : (
                    <button onClick={() => handleEdit(user.id)}>編集</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserRegistration;
