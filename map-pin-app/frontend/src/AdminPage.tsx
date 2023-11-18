import React, { useEffect, useState } from "react";
import './AdminPage.css';
import axios from 'axios';
import { GoogleMap, LoadScript, Polyline } from '@react-google-maps/api';
import { AddressInfo } from "./types";

const AdminPage = () => {
  const [addresses, setAddresses] = useState<AddressInfo[]>(
    JSON.parse(localStorage.getItem("addresses") || "[]")
  );
  const [currentAddress, setCurrentAddress] = useState("");
  const [currentPostalCode, setCurrentPostalCode] = useState("");
  const [currentOrder] = useState("");

  const mapStyles = {
    height: "400px",
    width: "100%"
  };
  const defaultCenter = { lat: 35.6895, lng: 139.6917 }; // 初期の中心点（例：東京）




  useEffect(() => {
    localStorage.setItem("addresses", JSON.stringify(addresses));
  }, [addresses]);

  const fetchGeocode = async (address:string, postalCode:string) => {
    try {
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
 return { latitude: location.lat, longitude: location.lng };
    } catch (error) {
      console.error("There was an error fetching the geocode:", error);
    }
  };
  
  const addAddress = async () => {
    const order = parseInt(currentOrder);
    if (currentAddress.trim() !== "") {
            const newId = addresses.length + 1;

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
    id: newId, // 新しいIDを設定
    address: currentAddress,
    postalCode: currentPostalCode,
    latitude: geoData.latitude,
    longitude: geoData.longitude,
    order: newOrder,
  });

    updatedAddresses.sort((a, b) => a.order - b.order);
      setAddresses(updatedAddresses);
      setCurrentAddress("");
      setCurrentPostalCode("");

      localStorage.setItem("addresses", JSON.stringify(updatedAddresses));
    }
    fetchGeocode(currentAddress, currentPostalCode);
  };

  const removeAddress = (orderToRemove: number) => {
  
    const updatedAddresses = addresses
      .filter((addr) => addr.order !== orderToRemove)
      .map((addr) => ({
        ...addr,
        order: addr.order > orderToRemove ? addr.order - 1 : addr.order,
      }));

    setAddresses(updatedAddresses);

    localStorage.setItem("addresses", JSON.stringify(updatedAddresses));
  };

  const renderAddressTable = () => {
    return (
      <div className="table-container">
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
              <td>{info.postalCode || "未設定"}</td>

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
      </div>

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
      <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY!}>

  <GoogleMap
    mapContainerStyle={mapStyles}
    zoom={10}
    center={defaultCenter}
  >
    <Polyline />
  </GoogleMap>
</LoadScript>


    </div>
  );
};

export default AdminPage;
