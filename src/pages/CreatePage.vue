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
    <q-input
      filled
      v-model="about"
      label="About Post"
      placeholder="Adventures of me and Sharky"
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
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "CreatePage",

  setup() {
    const title = ref("");
    const content = ref("");
    const files = ref([]);
    const progress = ref(false);
    const images = [];
    const $q = useQuasar();
    const router = useRouter();
    const about = ref("");

    const create = async () => {
      progress.value = true;
      for (let img of files.value) {
        let val = await createFile(img);
        if (val?.$id) {
          images.push(val.$id);
        } else {
          $q.notify(val);
        }
      }
      const res = await createDocument({
        title: title.value,
        content: content.value,
        images,
        about: about.value,
      });
      progress.value = false;
      if (res?.$id) {
        $q.notify("Created Post Successfully!");
        router.push({
          name: "Home",
        });
      } else {
        $q.notify(res);
      }
    };

    return {
      title,
      content,
      files,
      progress,
      create,
      about,
    };
  },
});
</script>
