<script setup lang="ts">
    import { ref } from 'vue';
    import { useRoute } from 'vue-router';
    import { Person } from '@/types/Person';

    const route = useRoute();
    
    const defaultPerson: Person = {
        name: '',
        eye_color: '',
        gender: '',
        birth_year: ''
    };  

    const person = ref<Person>(
        route.query.person ? JSON.parse(route.query.person.toString()) : defaultPerson
    );
</script>

<template>
    <div>
      <h1 class="text-center">Edit Person</h1>
      <v-container>
        <div v-if="person">
        <form>
          <v-text-field label="Name" v-model="person.name" />
          <v-text-field label="Eye Color" v-model="person.eye_color" />
          <v-text-field label="Gender" v-model="person.gender" />
          <v-text-field label="Birth Year" v-model="person.birth_year" />
          <v-btn type="submit">Save</v-btn>
        </form>
      </div>
      </v-container>
    </div>
  </template>

  