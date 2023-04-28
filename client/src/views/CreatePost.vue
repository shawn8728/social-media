<script setup>
import NavBar from "@/components/NavBar.vue";
</script>

<template>
    <NavBar />
    <section class="bg-white dark:bg-gray-900">
      <div class="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
        <h2
          class="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white"
        >
          Contact Us
        </h2>
        <form action="#" class="space-y-8">
          <div class="sm:col-span-2">
            <label for="post" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
              >Your Post</label
            >
            <textarea
              id="post"
              name="post"
              rows="6"
              class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="Content..."
            ></textarea>
          </div>
          <button
            type="submit"
            class="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-primary-700 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            Post
          </button>
        </form>
      </div>
    </section>
  </template>
  

  