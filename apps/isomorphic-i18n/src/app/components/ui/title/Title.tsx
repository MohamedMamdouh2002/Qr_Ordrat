import React from 'react'

const Title= ({title}: {title:string})=> {
  return <>
    <div className="">
        <h1 className="font-monbold text-xl md:text-3xl 4xl:text-5xl">
            {title}
        </h1>
    </div>
  </>
}

export default Title