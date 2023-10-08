import React from 'react'
import Header from './Header'
import NoFeedback from './NoFeedback'
import SuggestionItem from './SuggestionItem'

const Content = () => {
  return (
    <div className='w-[825px] rounded-[10px]'>
      <div className='flex flex-col gap-6'>
      <Header />
      <SuggestionItem />
      <NoFeedback />
      </div>
    </div>
  )
}

export default Content