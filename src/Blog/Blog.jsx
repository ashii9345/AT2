
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './Blog.css'
import Footer from '../components/Footer'
function Blog() {
  const [banner, setBanner] = useState(null)
  const [posts, setPosts] = useState([])


  useEffect(() => {
    axios.get('http://localhost:3000/banner')
      .then(res => setBanner(res.data[0]))
      .catch(() => console.log('Error fetching banner'))

    axios.get('http://localhost:3000/AllProducts')
      .then(res => {
        const mapped = res.data.slice(0, 6).map(p => ({
          id: p.id,
          title: `The Craft of ${p.name}`,
          excerpt: `Step inside the artistry behind the ${p.name} — a precision timepiece priced at ₹${p.price}.`,
          image: p.image,
          date: new Date().toDateString(),
          author: "Aurum Editorial"
        }))
        setPosts(mapped)
      })
      .catch(() => console.log('Error fetching posts'))
  }, [])

  if (!banner) return <div>Loading...</div>

  return (
    <div className="blog-page">
    
      <section className="blog-hero">
        <img src={banner.image} alt="banner" />
        <div className="blog-hero-text">
          <h1>AT2</h1>
          <p>We don’t sell watches… we sell punctual style.</p>
        </div>
      </section>

    
      <section className="blog-list">
        {posts.map((post, i) => (
          <article key={post.id} className={`blog-post ${i % 2 === 0 ? 'left' : 'right'}`}>
            <div className="blog-image">
              <img src={post.image} />
            </div>
            <div className="blog-info">
              <h2>{post.title}</h2>
              <p className="blog-meta">{post.date} | by Ashin KP</p>
              <p>{post.excerpt}</p>
              <a href="https://www.rolex.com/about-rolex" target='_self'>Read More →</a>
            </div>
          </article>
        ))}
      </section>
      <Footer/>
    </div>
  )
}

export default Blog
