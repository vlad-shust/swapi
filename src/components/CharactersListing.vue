<script setup lang="ts">
  import { onMounted, ref, computed } from 'vue';
  import { useRouter } from 'vue-router';
  import { Person } from '@/types/Person';
  import { fetchCharacters } from '@/api/swapiService';

  const people = ref<Person[]>([]);
  const router = useRouter();

  const headers = [
    { title: 'Name', value: 'name' },
    { title: 'Eye Color', value: 'eye_color' },
    { title: 'Gender', value: 'gender' },
    { title: 'Birth Year', value: 'birth_year' },
    { title: '', value: 'action' }
  ];

  const goToEdit = (person: Person) => {
    if (canEdit(person)) {
      router.push({ path: '/edit', query: { person: JSON.stringify(person) } });
    } else {
      router.push({ path: '/edit' });
    }
  };
  const canEdit = (person: Person) => person.gender === 'female' && person.birth_year === '19BBY';

  const menCount = computed(() => people.value.filter(person => person.gender === 'male').length);
  const womenCount = computed(() => people.value.filter(person => person.gender === 'female').length);

  onMounted(async () => {
    for await (const newPeople of fetchCharacters()) {
      people.value = [...people.value, ...newPeople];
    }
  });
</script>

<template>
  <div>
    <v-chip color="blue" theme="dark">Men: {{ menCount }}</v-chip>
    <v-chip color="pink">Women: {{ womenCount }}</v-chip>
    <v-data-table :items="people" :headers="headers" :items-per-page="25" theme="dark">
      <template v-slot:item.name="{ item }">
        <div :style="{ color: item.eye_color }">{{ item.name }}</div>
      </template>
      <template v-slot:item.eye_color="{ item }">
        <div>{{ item.eye_color }}</div>
      </template>
      <template v-slot:item.gender="{ item }">
        <div>{{ item.gender }}</div>
      </template>
      <template v-slot:item.birth_year="{ item }">
        <div>{{ item.birth_year }}</div>
      </template>
      <template v-slot:item.action="{ item }">
        <v-btn @click="goToEdit(item)">Edit</v-btn>
      </template>
    </v-data-table>
  </div>
</template>
