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
  postalCode?: string;
  address: string;
  email?: string;
  isEditing?: boolean;
}

const UserRegistration = () => {
  const [newUserName, setNewUserName] = useState<string>("");
  const [newAddress, setNewAddress] = useState<string>("");
  const [users, setUsers] = useState<User[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
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

  const handleRegister = () => {
    if (validateForm()) {
      const newUser: User = {
        id: Date.now(),
        userName: newUserName,
        address: newAddress,
        // Add userEmail to newUser if needed
      };
      setUsers([...users, newUser]);
      // Clear the form fields
      setNewUserName("");
      setNewAddress("");
      setNewUserEmail(""); // Clear userEmail if state hook is added
      setErrors({});
    }
  };

  const handleSave = () => {
    if (editingId !== null && validateForm()) {
      setUsers(
        users.map((user) => {
          if (user.id === editingId) {
            return {
              ...user,
              userName: newUserName,
              address: newAddress,
              email: newUserEmail, // Set isEditing flag to false after saving
            };
          }
          return user;
        })
      );
      // Reset the form and editing state
      setEditingId(null);
      setNewUserName("");
      setNewAddress("");
      // setNewUserEmail("");
      setErrors({});
    }
  };

  const handleEdit = (id: number) => {
    const user = users.find((u) => u.id === id);
    if (user) {
      setEditingId(id);
      setNewUserName(user.userName);
      setNewAddress(user.address);
      // Set the email if you're using it
      // setNewUserEmail(user.email);
      // Set isEditing flag to true for the editing user
      setUsers(users.map((u) => (u.id === id ? { ...u, isEditing: true } : u)));
    }
  };

  const validateForm = () => {
    let formIsValid = true;
    let tempErrors: Errors = {};

    if (!newUserName.trim()) {
      formIsValid = false;
      tempErrors.userName = "ユーザー名を入力してください。";
    }
    if (!newAddress.trim()) {
      formIsValid = false;
      tempErrors["address"] = "住所を入力してください。";
    }

    setErrors(tempErrors); // Update the errors state
    return formIsValid;
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
      value={newUserEmail}
      onChange={(e) => setNewUserEmail(e.target.value)}
      placeholder="ユーザーアドレス"
    />
    {/* Implement error display for newUserEmail if applicable */}
  </td>
            </tr>
            <tr>
              <th>居住地</th>
              <td>
                <input
                  type="text"
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
        {/* Conditionally render the buttons based on whether editingId is not null */}
        {editingId === null ? (
          // Show this button only when not editing
          <button onClick={handleRegister}>登録</button>
        ) : (
          // Show this button only when editing
          <button onClick={handleSave}>編集</button>
        )}
        {/* Render edit buttons next to each user row instead */}
      </div>

      {users.map((user) => (
  <div key={user.id} className="user-item">
    <span>
      {user.userName} - {user.address} {user.email && `- ${user.email}`}
    </span>
    {editingId === user.id ? (
      <button onClick={handleSave}>保存</button>
    ) : (
      <button onClick={() => handleEdit(user.id)}>編集</button>
    )}
  </div>
))}
    </div>
  );
};


export default UserRegistration;
