<template>
  <q-page class="flex flex-center column justify-evenly">
    <q-input
      filled
      v-model="title"
      label="Title"
      placeholder="The Cuddly Shark"
      hint="What is the name of the post?"
      class="q-ma-lg"
    />
    <q-editor
      v-model="content"
      min-height="5rem"
    />
    <q-file
      color="teal"
      filled
      v-model="files"
      label="Upload Images"
      multiple
      accept="image/*"
      max-file-size="4718592"
      max-files="10"
    >
      <template v-slot:prepend>
        <q-icon name="cloud_upload" />
      </template>
    </q-file>
    <q-btn
      label="Post"
      :loading="progress"
      @click="create"
    />
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";
import { createFile, createDocument } from "boot/appwrite";

export default defineComponent({
  name: "CreatePage",

  setup() {
    const title = ref("");
    const content = ref("");
    const files = ref([]);
    const progress = ref(false);
    const images = [];

    const create = async () => {
      for (let img of files.value) {
        let id = await createFile(img);
        images.push(id);
      }
      createDocument({
        title: title.value,
        content: content.value,
        images,
      });
    };

    return {
      title,
      content,
      files,
      progress,
      create,
    };
  },
});
</script>
