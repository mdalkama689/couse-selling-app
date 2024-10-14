import React, { useEffect, useState } from 'react'
import HomeLayout from './HomeLayout'
import axiosInstance from '@/config/axiosInstance'
import { useToast } from '@/hooks/use-toast'
import { ClipLoader } from 'react-spinners'
import AdminCourseCard from '@/pages/AdminCourseCard'


const YourCourses = () => {
  const {toast} = useToast()
const [isLoading, setIsLoading] = useState(false)
const [allCourses, setAllCourses] = useState([])


  useEffect(() => {
const fetchAllCoursesCreatedByAdmin = async () => {
  setIsLoading(true)
  try {
    const response = await axiosInstance.get('course/admin')

    setAllCourses(response.data.courses)
  } catch (error) {
      toast({
          description: "Failed to fetch all courses created by you",
          className:
            "bg-red-700 text-white font-semibold p-4 rounded-lg shadow-lg text-center max-w-md mx-auto",
        });
      
  }finally{
    setIsLoading(false)
  }
}
fetchAllCoursesCreatedByAdmin()
  }, [])

  return (
<HomeLayout>
{isLoading && (
  <div className="h-[300px] flex items-center justify-center flex-col">
  <p className="text-lg text-center text-gray-600 py-4">
    Please wait, the course is loading...
  </p>
  <ClipLoader />
</div>
)}
<div className='mt-24'>
<h1 className='text-4xl font-bold text-center text-gray-800'>
    My Created Courses
  </h1>
  <p className='text-lg text-center text-gray-600'>
    Discover and manage all the courses you've created.
  </p>
  <div  className="mt-4 flex gap-3 items-center justify-start flex-wrap mb-6">
<AdminCourseCard courses={allCourses} />
</div>
</div>
  </HomeLayout>
  )
}

export default YourCourses