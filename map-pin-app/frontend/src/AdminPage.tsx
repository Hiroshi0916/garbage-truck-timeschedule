import React, { useEffect, useState } from 'react';
import GoogleMapDisplay from './GoogleMapDisplay';

const AdminPage = () => {

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

        // 住所リストを表形式で表示する関数
        const renderAddressTable = () => {
          return (
              <table>
                  <thead>
                      <tr>
                          <th>登録住所</th>
                      </tr>
                  </thead>
                  <tbody>
                      {addresses.map((address, index) => (
                          <tr key={index}>
                              <td>{address}</td>
                          </tr>
                      ))}
                  </tbody>
              </table>
          );
      };


  return (
    <div>
      <input
        type="text"
        value={currentAddress}
        onChange={(e) => setCurrentAddress(e.target.value)}
      />
      <button onClick={addAddress}>住所を追加</button>
      {renderAddressTable()} {/* この行を追加 */}
      <GoogleMapDisplay addresses={addresses} />
    </div>
  );
};

export default AdminPage;
