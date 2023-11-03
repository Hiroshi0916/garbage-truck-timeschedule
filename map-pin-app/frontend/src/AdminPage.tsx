import React, { useEffect, useState } from 'react';
import GoogleMapDisplay from './GoogleMapDisplay';

const AdminPage = () => {
    // 初期状態でローカルストレージからアドレスを読み込む
    const [addresses, setAddresses] = useState<string[]>(
      JSON.parse(localStorage.getItem('addresses') || '[]')
    );
    const [currentAddress, setCurrentAddress] = useState('');
  
    useEffect(() => {
      // アドレスリストが更新されたらローカルストレージに保存する
      localStorage.setItem('addresses', JSON.stringify(addresses));
    }, [addresses]);
  
    const addAddress = () => {
      if (currentAddress.trim() !== '') {
        // テキストが空欄でなければアドレスを追加
        const newAddresses = [...addresses, currentAddress];
        setAddresses(newAddresses);
        setCurrentAddress('');
  
        // ローカルストレージに保存
        localStorage.setItem('addresses', JSON.stringify(newAddresses));
      }
    };

  return (
    <div>
      <input
        type="text"
        value={currentAddress}
        onChange={(e) => setCurrentAddress(e.target.value)}
      />
      <button onClick={addAddress}>住所を追加</button>
      <GoogleMapDisplay addresses={addresses} />
    </div>
  );
};

export default AdminPage;
