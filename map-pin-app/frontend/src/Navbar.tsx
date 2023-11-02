import React from 'react';
import { Link } from 'react-router-dom';

// 仮の管理者フラグ（実際のアプリでは、このフラグは認証状態やユーザーロールに基づいて決定されるかもしれません）
const isAdmin = true; // これを動的に設定する必要がある場合は、propsやstateを通じて設定してください

const Navbar = () => {
  return (
    <nav className="navbar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#333', color: 'white', padding: '10px 20px' }}>
      <h1 className="navbar-logo">My Application</h1>
      <div>
        {/* トップページへのリンク */}
        <Link className="menu-item" to="/" style={{ color: 'white', padding: '0 10px', textDecoration: 'none' }}>Home</Link>
        
        {/* ユーザー情報登録ページへのリンク */}
        <Link className="menu-item" to="/user-registration" style={{ color: 'white', padding: '0 10px', textDecoration: 'none' }}>Register</Link>

        {/* 管理者向けボタン（条件に応じて表示） */}
        {isAdmin && <Link className="menu-item" to="/admin" style={{ color: 'white', padding: '0 10px', textDecoration: 'none' }}>Admin</Link>}
      </div>
    </nav>
  );
};

export default Navbar;
