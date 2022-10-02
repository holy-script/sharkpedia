<template>
  <q-page class="flex flex-center column">
    <q-img
      :src="sharkIcon"
      width="30%"
    />
    <div class="text-h6">Sharkpedia</div>
    <div>All Posts Here</div>
    <div
      v-for="(post, index) in docs"
      :key="index"
    >
      <q-card class="my-card bg-secondary text-white">
        <q-card-section horizontal>
          <q-card-section>
            <div class="text-h6">{{post.title}}</div>
            <div class="text-subtitle2">{{post.$updatedAt}}</div>
          </q-card-section>
          <q-card-actions vertical>
            <q-btn
              color="indigo"
              flat
              @click="readPost(post.title, post.content, post.images)"
            >
              Read
            </q-btn>
          </q-card-actions>
        </q-card-section>
      </q-card>
    </div>
    <q-btn
      label="Create Post"
      color="indigo"
      @click="newPost"
    />
    <q-dialog
      v-model="reading"
      persistent
      maximized
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card class="bg-primary text-white">
        <q-bar>
          Reader
          <q-space />

          <q-btn
            dense
            flat
            icon="close"
            v-close-popup
          >
            <q-tooltip class="bg-white text-primary">Close</q-tooltip>
          </q-btn>
        </q-bar>

        <q-card-section>
          <div class="text-h6">{{title}}</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div v-html="content"></div>
        </q-card-section>

        <q-card-section>
          <q-carousel
            swipeable
            animated
            v-model="current"
            thumbnails
            infinite
          >
            <q-carousel-slide
              v-for="(url, index) in images"
              :key="index"
              :name="index"
              :img-src=url
              class="sharkImgs"
            />
          </q-carousel>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import sharkIcon from "assets/conifer-1016.png";
import { useRouter } from "vue-router";
import { listDocuments, getDocument, getFile } from "boot/appwrite";

export default defineComponent({
  name: "IndexPage",

  setup() {
    const router = useRouter();
    const docs = ref([]);
    const reading = ref(false);
    const title = ref("");
    const content = ref("");
    const images = ref([]);
    const current = ref(0);

    const newPost = () => {
      router.push({
        name: "New Post",
      });
    };

    onMounted(async () => {
      docs.value = (await listDocuments()).documents;
      console.log(docs.value);
    });

    const readPost = (ttl, cnt, imgs) => {
      reading.value = true;
      title.value = ttl;
      content.value = cnt;
      images.value = [];
      for (let id of imgs) {
        let img = getFile(id);
        images.value.push(img.href);
      }
      console.log(images.value);
    };

    return {
      sharkIcon,
      newPost,
      docs,
      reading,
      readPost,
      title,
      content,
      images,
      current,
    };
  },
});
</script>

<style lang="sass">
.sharkImgs
  background-size: contain
  background-repeat: no-repeat
</style>
