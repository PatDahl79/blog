import React from 'react'
import Layout from '../../Components/layout/Layout'
import HeroSection from '../../Components/heroSectiom/HeroSection'
import BlogPostCard from '../../Components/blogPostCard/BlogPostCard'

const Home = () => {
  return (
    <Layout>
      <HeroSection/>
      <BlogPostCard/>
    </Layout>
  )
}

export default Home
