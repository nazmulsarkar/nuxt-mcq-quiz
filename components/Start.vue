<!-- Please remove this file from your project -->
<template>
  <div
    class="
      home
      relative
      flex
      items-top
      justify-center
      min-h-screen
      bg-gray-100
      sm:items-center sm:pt-0
    "
  >
    <!-- <link
      href="https://cdn.jsdelivr.net/npm/tailwindcss@2.1.2/dist/tailwind.min.css"
      rel="stylesheet"
    /> -->
    <div class="max-w-4xl mx-auto sm:px-6 lg:px-8">
      <div class="home-content">
        <h2 class="title-home">MCQ TEST</h2>
        <p class="mt-3 text-gray-600">Total 6 questions</p>

        <NuxtLink to="/mcq" class="btn">START</NuxtLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
.home {
  border-radius: 20px;
  background: #fceafe;
  width: 576px;
  margin: 0 auto;
  vertical-align: middle;
  align-items: center;
  padding: 20px;
}
.home-content {
  text-align: center;
  font-size: 14px;
}
</style>
