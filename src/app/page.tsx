'use client'

import Button from '@/components/button/Button'
import CategoryTag from '@/components/button/CategoryTag'
import Upvote from '@/components/button/Upvote'
import Image from 'next/image'

export default function Home() {
  const handleButtonClick = () => {
    console.log("Clicked")
  }

  return (
    <main>
      <h1 className='text-hxl text-blue-dark'>Product Feedback App</h1>
      <h2 className='text-hl  '>Product Feedback App</h2>
      <h3 className='text-hm'>Product Feedback App</h3>
      <h4 className='text-hs'>Product Feedback App</h4>
      <p className='text-b1'>Product Feedback App</p>
      <p className='text-b2'>Product Feedback App</p>
      <p className='text-b3'>Product Feedback App</p>

    <div className='flex flex-row- gap-4'>
      <Button onClick={handleButtonClick} className='bg-purple-light' btnColor='purple-light'>Button 1</Button>
      <Button onClick={handleButtonClick} className='' btnColor='blue-primary'>Button 2</Button>
      <Button onClick={handleButtonClick} className='' btnColor='blue-dark'>Button 3</Button>
      <Button onClick={handleButtonClick}  btnColor='danger'>Button 4</Button>
      <Button onClick={handleButtonClick}  btnColor='goback-dark'> Go Back</Button>
      <Button onClick={handleButtonClick}  btnColor='goback-light'> Go Back</Button>
  </div>

  <div className='mt-4 flex gap-4'>
    <Upvote />
    <CategoryTag>ALL</CategoryTag>
    <CategoryTag>UX</CategoryTag>
    <CategoryTag>UI</CategoryTag>
    <CategoryTag>Enhancement</CategoryTag>
    <CategoryTag>Bug</CategoryTag>
    <CategoryTag>Feature</CategoryTag>
  </div>
    </main>
  )
}
