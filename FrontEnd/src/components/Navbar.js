import React from 'react'
import nklogo from '../asset/nkvlogobg.png'
import menu from'../asset/menu.png'
import BurgerMenu from './burgerMenu'
export default function Navbar({userName,data,setdata}) {
  return (
    <div className='navbar'>
      <div className='one'>
        <div className='logo'><img alt='logo' src={nklogo}></img></div>
        <div className='heading'>NV Schools and Management</div>
      </div>
      <div className='two'>
        <div className='username'>Welcome..! <span className='user'>{userName}</span> </div>
        <BurgerMenu data={data}
          setdata={setdata}/>
      </div>
    </div>
  )
}
