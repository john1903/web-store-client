<script setup lang="ts">
import MainLayout from "@/layouts/MainLayout.vue";
import BreadCrumb from "@/components/BreadCrumb.vue";
import { ref } from "vue";

const breadcrumbItems = ref([
  { name: "Home", to: "/" },
  { name: "About Us", to: "/about" },
]);

const email = ref("");
const message = ref("");

function submitForm() {
  alert("Form submitted");
}
</script>

<template>
  <MainLayout>
    <div class="container my-4 flex-grow-1">
      <BreadCrumb :items="breadcrumbItems" />
      <h2 class="fw-bold mb-3">About Us</h2>
      <div class="my-3">
        <div class="row mt-4">
          <div class="col-md-6 mb-3 mb-md-0">
            <img src="/images/img-4.jpg" alt="Our Story" class="img-fluid" />
          </div>
          <div class="col-md-6">
            <h3 class="fw-bold mb-3">About Project</h3>
            <p>
              This project is a demonstration website built with Vue.js. It uses
              a RESTful API provided by the web-store-api, developed in Spring
              Boot. The site serves as a showcase and the products displayed are
              not real. Please refrain from providing real data to avoid any
              issues.
            </p>
            <h3 class="fw-bold mb-3">About Author</h3>
            <p>
              <strong>Jan Gluźniewicz</strong>, the creator of this project, is
              a third-year student of Applied Computer Science at Lodz
              University of Technology. His primary focus is on backend
              development, where he excels in building robust and scalable
              systems with modern frameworks. However, he is also adept at
              handling frontend tasks whenever necessary, showcasing his
              versatility as a developer. Jan’s work reflects a strong
              commitment to quality and innovation, continuously expanding his
              skills to meet the evolving demands of the software industry.
            </p>
          </div>
        </div>
      </div>
      <div class="contact-form">
        <h3>Contact Us</h3>
        <form @submit.prevent="submitForm">
          <div class="form-group">
            <input v-model="email" type="email" placeholder="Email" required />
          </div>
          <div class="form-group">
            <textarea
              v-model="message"
              placeholder="Message"
              rows="4"
              required
            ></textarea>
          </div>
          <button class="btn-minimal" type="submit">Send</button>
        </form>
      </div>
    </div>
  </MainLayout>
</template>

<style scoped>
.contact-form {
  padding: 1rem;
  border-top: 1px solid #ddd;
}

.contact-form h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 2px;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.2s;
}

.form-group input:focus,
.form-group textarea:focus {
  border-color: #888;
}
</style>
