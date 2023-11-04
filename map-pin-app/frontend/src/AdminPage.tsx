import React, { useEffect, useState } from "react";
import GoogleMapDisplay from "./GoogleMapDisplay";
import './AdminPage.css';
import axios from 'axios';


type AddressInfo = {
  address: string;
  postalCode?: string;
  latitude?: number;
  longitude?: number;
  order: number;
};

const AdminPage = () => {
  const [addresses, setAddresses] = useState<AddressInfo[]>(
    JSON.parse(localStorage.getItem("addresses") || "[]")
  );
  const [currentAddress, setCurrentAddress] = useState("");
  const [currentPostalCode, setCurrentPostalCode] = useState("");
  const [currentOrder, setCurrentOrder] = useState("");

  useEffect(() => {
    // アドレスリストが更新されたらローカルストレージに保存する
    localStorage.setItem("addresses", JSON.stringify(addresses));
  }, [addresses]);

  const fetchGeocode = async (address:string, postalCode:string) => {
    try {
      // Encode the address and postalCode to be URL-safe
      const encodedAddress = encodeURIComponent(address);
      const encodedPostalCode = encodeURIComponent(postalCode);
      
      const response = await axios.get(`http://localhost:3001/geocode`, {
        params: {
          address: encodedAddress,
          postalCode: encodedPostalCode
        }
      });
      
      const location = response.data.results[0].geometry.location;

      console.log(`Latitude: ${location.lat}, Longitude: ${location.lng}`);
 // 緯度と経度を返す
 return { latitude: location.lat, longitude: location.lng };
    } catch (error) {
      console.error("There was an error fetching the geocode:", error);
    }
  };
  
  const addAddress = async () => {
    const order = parseInt(currentOrder);
    if (currentAddress.trim() !== "") {
      // 新しいアドレス情報を追加する際、次の順番を自動的に設定
      const newOrder = addresses.length > 0 ? addresses[addresses.length - 1].order + 1 : 1;
  
      const updatedAddresses = addresses.map((addr) => ({
        ...addr,
        order: addr.order >= order ? addr.order + 1 : addr.order,
      }));


      const geoData = await fetchGeocode(currentAddress, currentPostalCode);
  if (!geoData) {
    console.error('Failed to fetch geocode data');
    return;
  }


  // 新しいアドレス情報を追加
  updatedAddresses.push({
    address: currentAddress,
    postalCode: currentPostalCode,
    latitude: geoData.latitude,
    longitude: geoData.longitude,
    order: newOrder,
  });

    // 順番に従ってソート（追加時には不要かもしれませんが、一応入れておきます）
    updatedAddresses.sort((a, b) => a.order - b.order);

      setAddresses(updatedAddresses);
      setCurrentAddress("");
      setCurrentPostalCode("");

      // ローカルストレージに保存
      localStorage.setItem("addresses", JSON.stringify(updatedAddresses));
    }
    fetchGeocode(currentAddress, currentPostalCode);
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
      <table className="table">
        <thead>
          <tr>
            <th>順番</th>
            <th>郵便番号</th>
            <th>登録住所</th>
            <th>緯度</th>
            <th>経度</th>
            <th>削除ボタン</th>
          </tr>
        </thead>
        <tbody>
          {addresses.map((info) => (
            <tr key={info.order}>
              <td>{info.order}</td>
              <td>{info.postalCode || "未設定"}</td>{" "}
              {/* 郵便番号のデータを表示 */}
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
        type="text"
        value={currentPostalCode}
        onChange={(e) => setCurrentPostalCode(e.target.value)}
        placeholder="郵便番号を入力"
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
