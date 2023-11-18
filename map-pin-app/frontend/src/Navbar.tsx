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
        

        {/* 管理者向けボタン（条件に応じて表示） */}
        {isAdmin && <Link className="menu-item" to="/admin" style={linkStyle}>Admin</Link>}
      </div>
    </nav>
  );
};

export default Navbar;
