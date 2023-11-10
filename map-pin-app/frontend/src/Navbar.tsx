import React from 'react';
import { Link } from 'react-router-dom';

const isAdmin = true; // 管理者フラグを適宜設定

const Navbar = () => {
  return (
    <nav className="navbar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#007bff', color: 'white', padding: '10px 20px', marginBottom: '20px' }}>
      <h1 className="navbar-logo">Trash car routes</h1>
      <div>
        {/* トップページへのリンク */}
        <Link className="menu-item" to="/" style={{ color: 'white', padding: '0 10px', textDecoration: 'none' }}>Home</Link>
        
        {/* ユーザー情報登録ページへのリンク */}
        <Link className="menu-item" to="/user-registration" style={{ color: 'white', padding: '0 10px', textDecoration: 'none' }}>ユーザー登録</Link>

        {/* 管理者向けボタン（条件に応じて表示） */}
        {isAdmin && <Link className="menu-item" to="/admin" style={{ color: 'white', padding: '0 10px', textDecoration: 'none' }}>Admin</Link>}
      
    
      <Link to="/user/profile">プロフィール</Link>
      <Link to="/user/edit">プロフィール編集</Link>
      
      </div>
    </nav>
  );
};

export default Navbar;
