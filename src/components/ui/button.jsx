import React from 'react'
export function Button({className='',variant='solid',...props}){
  const base='inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-2xl transition'
  const styles={
    solid:'bg-[#ee05fa] text-white hover:opacity-90',
    outline:'border border-white/20 text-white hover:bg-white/10',
    secondary:'bg-white text-black hover:opacity-90'
  }
  return <button className={`${base} ${styles[variant]||styles.solid} ${className}`} {...props}/>
}
