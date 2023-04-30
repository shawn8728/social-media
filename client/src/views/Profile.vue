<template>
  <NavBar />
  <section class="bg-white dark:bg-gray-900">
    <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
      <div class="flex flex-col min-w-0 break-words bg-white w-full mb-6 rounded-lg">
        <div class="px-6">
          <div class="flex flex-wrap justify-center">
            <img
              class="shadow-xl rounded-full h-auto align-middle border-none lg:w-3/12 lg:order-2"
              alt="..."
              src="https://demos.creative-tim.com/notus-js/assets/img/team-2-800x800.jpg"
            />
          </div>
          <div class="text-center mt-12">
            <h3 class="text-4xl font-semibold leading-normal mb-2 text-blueGray-700">
              User name
            </h3>
            <!-- <div class="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
              <i class="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
              Los Angeles, California
            </div>
            <div class="mb-2 text-blueGray-600 mt-10">
              <i class="fas fa-briefcase mr-2 text-lg text-blueGray-400"></i>Solution Manager -
              Creative Tim Officer
            </div>
            <div class="mb-2 text-blueGray-600">
              <i class="fas fa-university mr-2 text-lg text-blueGray-400"></i>University of Computer
              Science
            </div> -->
          </div>
          <div class="mt-10 py-10 border-t border-blueGray-200 text-center">
            <div class="flex flex-wrap justify-center">
              <div class="w-full lg:w-9/12 px-4">
                <p class="mb-4 text-lg leading-relaxed text-blueGray-700">
                  An artist of considerable range, Jenna the name taken by Melbourne-raised,
                  Brooklyn-based Nick Murphy writes, performs and records all of his own music,
                  giving it a warm, intimate feel with a solid groove structure. An artist of
                  considerable range.
                </p>
                <a href="#pablo" class="font-normal text-pink-500">Show more</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import NavBar from '../components/NavBar.vue'
</script>
