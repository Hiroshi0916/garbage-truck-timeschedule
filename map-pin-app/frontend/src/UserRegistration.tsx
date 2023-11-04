import React, { useState } from 'react';

const UserRegistration = () => {
  const [userName, setUserName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [address, setAddress] = useState('');
  const [streetNumber, setStreetNumber] = useState('');
  const [errors, setErrors] = useState<string[]>([]);
  const [showModal, setShowModal] = useState(false);

  const validateForm = () => {
    const newErrors: string[] = [];

    if (!userName.trim()) newErrors.push('ユーザー名を入力してください。');
    if (!firstName.trim()) newErrors.push('名を入力してください。');
    if (!lastName.trim()) newErrors.push('姓を入力してください。');
    if (!postalCode.trim()) newErrors.push('郵便番号を入力してください。');
    if (!address.trim()) newErrors.push('住所を入力してください。');
    if (!streetNumber.trim()) newErrors.push('番地を入力してください。');

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (validateForm()) {
      setShowModal(true);
    }
  };

  return (
    <div>
      <h1>ユーザー情報登録</h1>
      <form onSubmit={handleSubmit}>
        <input
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="ユーザー名"
        />
        <input
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="名"
        />
        <input
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="姓"
        />
        <input
          value={postalCode}
          onChange={(e) => setPostalCode(e.target.value)}
          placeholder="郵便番号"
        />
        <input
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="住所"
        />
        <input
          value={streetNumber}
          onChange={(e) => setStreetNumber(e.target.value)}
          placeholder="番地"
        />
        <button type="submit">登録</button>
      </form>
      {errors.length > 0 && (
        <ul>
          {errors.map((error, index) => (
            <li key={index} style={{ color: 'red' }}>
              {error}
            </li>
          ))}
        </ul>
      )}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowModal(false)}>
              &times;
            </span>
            <p>登録完了</p>
          </div>
        </div>
      )}
      {/* Add the appropriate CSS for the modal in your CSS file */}
    </div>
  );
};

export default UserRegistration;
