<template>
  <q-page class="flex flex-center column justify-evenly q-pa-md">
    <div
      id="postForm"
      class="full-width"
    >
      <div class="text-center text-h4 q-pa-lg">Create Content</div>
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
      <div class="text-h6 text-center">Post Body</div>
      <q-editor
        v-model="content"
        min-height="5rem"
        class="q-ma-lg"
      />
      <div class="text-h6 text-center">Attached Images</div>
      <q-file
        color="teal"
        filled
        v-model="files"
        label="Upload Images"
        multiple
        accept="image/*"
        max-file-size="4718592"
        max-files="10"
        class="q-ma-lg"
      >
        <template v-slot:prepend>
          <q-icon name="cloud_upload" />
        </template>
      </q-file>
      <div class="text-center">
        <q-btn
          label="Post"
          :loading="progress"
          color="indigo"
          push
          @click="create"
          class="q-ma-lg"
        />
      </div>
    </div>
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
      if (title.value && about.value && content.value) {
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
      } else {
        $q.notify("Please Populate The Post!");
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

<style lang="sass">
#postForm
  border: 3px solid blue
  border-radius: 7px
</style>
