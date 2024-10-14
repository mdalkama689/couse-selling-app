import React from 'react'
import HomeLayout from './HomeLayout'
import MyCarousel from '@/pages/MyCarousel'
import CourseList from '@/pages/CourseList'
import About from '@/pages/About'

const Home = () => {

  return (
<HomeLayout>
<MyCarousel />
<CourseList />
<div className=' my-12'>
  <img src="https://coursell-app.vercel.app/why-100x.jpeg" alt="" />
</div>
<About  />
</HomeLayout>
  )
}

export default Home