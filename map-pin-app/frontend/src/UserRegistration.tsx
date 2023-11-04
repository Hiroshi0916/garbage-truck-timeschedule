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
  postalCode?: string;  // Make postalCode optional
  address: string;
  isEditing?: boolean;  // Make isEditing optional
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
      setNewUserName('');
      setNewAddress('');
      setNewUserEmail(''); // Clear userEmail if state hook is added
      setErrors({});
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault(); // Prevent the default form submit behavior
    if (validateForm()) {
      handleRegister();
    }
  };

  const handleEdit = (id: number) => {
    const user = users.find((user) => user.id === id);
    if (user) {
      setEditingId(id);
      setNewUserName(user.userName);
      setNewAddress(user.address);
    }
  };

  const handleSave = (id: number) => {
    setUsers(
      users.map((user) =>
        user.id === id
          ? { ...user, userName: newUserName, address: newAddress }
          : user
      )
    );
    setEditingId(null);
    setNewUserName("");
    setNewAddress("");
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
              {errors.userName && <div className="error">{errors.userName}</div>}
            </td>
          </tr>
          <tr>
            <th>ユーザーアドレス</th>
            <td>
              <input
                type="text"
                // Update the state accordingly if you have a newUserEmail state
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
              {errors.address && <div className="error">{errors.address}</div>}
            </td>
          </tr>
        </tbody>
      </table>
      <div>
        <button onClick={handleRegister}>登録</button>
        {/* Implement the edit button functionality if needed */}
      </div>
    </div>
  );
};

export default UserRegistration;
