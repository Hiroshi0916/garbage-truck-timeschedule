import React, { useEffect, useState } from "react";
import GoogleMapDisplay from "./GoogleMapDisplay";

type AddressInfo = {
  address: string;
  latitude?: number;
  longitude?: number;
  order: number;
};

const AdminPage = () => {
  const [addresses, setAddresses] = useState<AddressInfo[]>(
    JSON.parse(localStorage.getItem("addresses") || "[]")
  );
  const [currentAddress, setCurrentAddress] = useState("");
  const [currentOrder, setCurrentOrder] = useState("");

  useEffect(() => {
    // アドレスリストが更新されたらローカルストレージに保存する
    localStorage.setItem("addresses", JSON.stringify(addresses));
  }, [addresses]);

  const addAddress = () => {
    const order = parseInt(currentOrder);
    if (currentAddress.trim() !== "" && !isNaN(order)) {
      // 既存の順番を更新
      const updatedAddresses = addresses.map((addr) => ({
        ...addr,
        order: addr.order >= order ? addr.order + 1 : addr.order,
      }));

      // 新しいアドレス情報を追加
      updatedAddresses.push({
        address: currentAddress,
        // 緯度と経度はAPIから取得
        order,
      });

      // 順番に従ってソート
      updatedAddresses.sort((a, b) => a.order - b.order);

      setAddresses(updatedAddresses);
      setCurrentAddress("");
      setCurrentOrder("");

      // ローカルストレージに保存
      localStorage.setItem("addresses", JSON.stringify(updatedAddresses));
    }
  };

  const removeAddress = (orderToRemove: number) => {
    // 順番に基づいてアドレスを削除し、それ以降のアドレスの順番をデクリメントする
    const updatedAddresses = addresses
      .filter((addr) => addr.order !== orderToRemove)
      .map((addr) => ({
        ...addr,
        order: addr.order > orderToRemove ? addr.order - 1 : addr.order,
      }));

    setAddresses(updatedAddresses);

    // ローカルストレージを更新
    localStorage.setItem("addresses", JSON.stringify(updatedAddresses));
  };

  // 住所リストを表形式で表示する関数
  const renderAddressTable = () => {
    return (
      <table>
        <thead>
          <tr>
            <th>順番</th>
            <th>登録住所</th>
            <th>緯度</th>
            <th>経度</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          {addresses.map((info) => (
            <tr key={info.order}>
              <td>{info.order}</td>
              <td>{info.address}</td>
              <td>{info.latitude || "未設定"}</td>
              <td>{info.longitude || "未設定"}</td>
              <td>
                <button onClick={() => removeAddress(info.order)}>削除</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div>
      <input
        type="number"
        value={currentOrder}
        onChange={(e) => setCurrentOrder(e.target.value)}
        placeholder="順番を入力"
      />
      <input
        type="text"
        value={currentAddress}
        onChange={(e) => setCurrentAddress(e.target.value)}
        placeholder="住所を入力"
      />
      <button onClick={addAddress}>住所を追加</button>
      {renderAddressTable()}
      <GoogleMapDisplay addresses={addresses.map((info) => info.address)} />
    </div>
  );
};

export default AdminPage;
