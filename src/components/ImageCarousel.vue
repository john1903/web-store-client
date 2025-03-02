<script setup lang="ts"></script>

<template>
  <div class="carousel slide" data-bs-ride="carousel" data-bs-interval="3000">
    <div class="carousel-inner">
      <div class="carousel-item active">
        <img
          class="d-block"
          src="https://aws-web-store-s3.s3.eu-central-1.amazonaws.com/public/carousel/img-1.jpg"
          alt="First slide"
        />
      </div>
      <div class="carousel-item">
        <img
          class="d-block"
          src="https://aws-web-store-s3.s3.eu-central-1.amazonaws.com/public/carousel/img-2.jpg"
          alt="Second slide"
        />
      </div>
      <div class="carousel-item">
        <img
          class="d-block"
          src="https://aws-web-store-s3.s3.eu-central-1.amazonaws.com/public/carousel/img-3.jpg"
          alt="Third slide"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
img {
  width: 100%;
  height: 55vh;
  object-fit: cover;
}
</style>
