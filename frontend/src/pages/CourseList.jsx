import axiosInstance from '@/config/axiosInstance'
import React, { useEffect, useState } from 'react'
import { useToast } from '@/hooks/use-toast'
import CourseCard from './CourseCard'
import { ClipLoader } from 'react-spinners'

const CourseList = () => {
  const {toast} = useToast()
  const [isLoading, setIsLoading] = useState(false)
const [courses, setCourses] = useState([])


useEffect(() => {
  const getcourses = async () => {
    setIsLoading(true)
   try {
    const fetchCourses = await axiosInstance.get('/course')

   setCourses(fetchCourses?.data?.threeCourses)
  
   } catch (error) {
    console.log(error?.message)
    toast({
      description: 'Failed to fetch courses!' ,
      className:
        "bg-red-700 text-white font-semibold p-4 rounded-lg shadow-lg text-center max-w-md mx-auto",
    });
  
   }finally{
    setIsLoading(false)
   }
}
getcourses()
}, [])
  return (
  <>
{isLoading ? (
  <div className="h-[300px] flex items-center justify-center flex-col">
<p className="text-lg text-center text-gray-600 py-4">Please wait, the course is loading...</p>
<ClipLoader />
            </div>
) : (
  <div className='flex gap-3 mt-5 items-center justify-center flex-wrap'>
    <CourseCard courses={courses} />
  </div>
)}
  </>
  )
}

export default CourseList
