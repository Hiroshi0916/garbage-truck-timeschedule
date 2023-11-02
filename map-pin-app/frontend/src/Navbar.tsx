// Navbar.tsx
import React from 'react';
// import { Link } from 'react-router-dom';


const Navbar = () => {




  return (
    <nav className="navbar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#333', color: 'white', padding: '10px 20px' }}>
      <h1 className="navbar-logo">My Application</h1>
      <div>
        {/* トップページへのリンク */}
        {/* <Link className="menu-item" to="/" style={{ color: 'white', padding: '0 10px', textDecoration: 'none' }}>Home</Link> */}
        {/* 管理者向けボタン（条件に応じて表示） */}
        {/* isAdmin && <Link className="menu-item" to="/admin" style={{ color: 'white', padding: '0 10px', textDecoration: 'none' }}>Admin</Link> */}
        {/* 上記の条件に基づいてコメントアウトを外してください */}
      </div>
    </nav>
  );
};

export default Navbar;
