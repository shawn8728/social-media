<template>
  <NavBar />
  <section class="bg-white dark:bg-gray-900">
    <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
      <div class="mx-auto max-w-screen-sm text-center lg:mb-16 mb-8">
        <h2
          class="mb-4 text-3xl lg:text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white"
        >
          My Post
        </h2>
      </div>
      <div class="grid gap-8 lg:grid-cols-1">
        <Post
          v-for="post in posts.data"
          :content="post.content"
          :userid="post.userid"
          :username="post.username"
          :createtime="post.createtime"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
import axios from 'axios'
import jwtDecode from 'jwt-decode'
import { onMounted } from 'vue'
import { reactive } from 'vue'

import NavBar from '../components/NavBar.vue'
import Post from '../components/Post.vue'

const posts = reactive({
  data: []
})

const token = localStorage.getItem('token')
const decodedToken = jwtDecode(token)
const userData = decodedToken.userData

onMounted(async () => {
  try {
    const response = await axios.get(`http://localhost:3000/mypost?userid=${userData._id}`)
    posts.data = response.data
  } catch (error) {
    console.log(error)
  }
})
</script>
