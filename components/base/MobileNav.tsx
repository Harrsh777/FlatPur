import { Search, SlidersHorizontal } from 'lucide-react'
import React from 'react'

export default function MobileNav() {
  return (
    <div className='m-3 md:hidden'>
        <div className='flex justify-between items-center border
        rounded-3xl px-5 py-1'>
        <div className='flex items-center'>
        <Search/>
        <div className="flex flex-col ml-5">
            <span className="text-sm font-semibold">Anywhere</span>
            <span> Any week . Add guest</span>
        </div>
        </div>
        <SlidersHorizontal/>
        </div>
       
    </div>
  );
}

