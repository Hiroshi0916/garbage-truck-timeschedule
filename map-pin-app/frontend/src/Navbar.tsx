import React from 'react';
import { Link } from 'react-router-dom';

const isAdmin = true; // 管理者フラグを適宜設定

const linkStyle = {
  color: 'white',
  padding: '0 10px',
  textDecoration: 'none'
};

const Navbar = () => {
  return (
    <nav className="navbar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#007bff', color: 'white', padding: '10px 20px', marginBottom: '20px' }}>
      <h1 className="navbar-logo" style={{ margin: 0 }}>Trash car routes</h1>
      <div>
        {/* トップページへのリンク */}
        <Link className="menu-item" to="/" style={linkStyle}>Home</Link>
        
        {/* ユーザー情報登録ページへのリンク */}
        <Link className="menu-item" to="/user-registration" style={linkStyle}>ユーザー登録</Link>

        {/* プロフィール関連のリンク */}
        <Link className="menu-item" to="/user/profile" style={linkStyle}>プロフィール</Link>
        <Link className="menu-item" to="/user/edit" style={linkStyle}>プロフィール編集</Link>

        {/* 管理者向けボタン（条件に応じて表示） */}
        {isAdmin && <Link className="menu-item" to="/admin" style={linkStyle}>Admin</Link>}
      </div>
    </nav>
  );
};

export default Navbar;
