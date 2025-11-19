import React from 'react'
import {Link} from 'react-router-dom'
import { useTheme } from './ui/theme-provider'
import { Sun } from 'lucide-react';
import { Moon } from 'lucide-react';
import CitySearch from './city-search';

const Header = () => {
  const{theme,setTheme}=useTheme();
  const isDark = theme === 'dark';

  return (
    <header className='sticky top-0 z-50 w-full border-b bg-background/95 supports-backdrop-filter:bg-background/60 backdrop-blur py-2'>
    <div className='container mx-auto flex h-16 items-center justify-between px-4'>
      <Link to={"/"}>
      <img src={isDark?"/2.png":"/1.png"} alt="veather logo" className='h-14'/>
      </Link>
      <div className='flex gap-4'>
        <CitySearch/>
        <div onClick={()=>setTheme(isDark?"light":"dark")} className={`flex items-center cursor-pointer transition-transform duration-500 ${isDark?"rotate-180":"rotate-0"}`}>
          {isDark?(
            <Sun className='h-6 w-6 text-yellow-500 rotate-0 trasition-all'/>
          ):(
            <Moon className='h-6 w-6 text-blue-500 rotate-0 transition-all'/>
          )}
        </div>
      </div>
    </div>
    </header>
  )
}

export default Header
