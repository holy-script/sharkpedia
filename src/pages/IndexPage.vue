<template>
  <q-page class="flex items-center justify-evenly column">
    <div v-if="splash">
      <q-img
        :src="splashGif"
        width="90vw"
      />
    </div>
    <div
      v-else
      class="text-center align-center"
    >
      <div class="row q-ma-md align-center justify-center">
        <q-img
          :src="sharkIcon"
          width="5em"
        />
        <div class="text-h2 q-mx-lg text-center">Sharkpedia</div>
        <q-img
          :src="sharkIcon"
          width="5em"
          style="transform: scale(-1, 1)"
        />
      </div>
      <div>
        <q-carousel
          animated
          v-model="fact"
          navigation
          infinite
          :autoplay="true"
          height="40vh"
          arrows
          ref="factCarousel"
          @mouseenter="autoplay = false"
          @mouseleave="autoplay = true"
          class="q-pa-md full-width"
        >
          <q-carousel-slide
            :name="1"
            :img-src="sharkOne"
            class="sharkImgs"
          />
          <q-carousel-slide
            :name="2"
            :img-src="sharkTwo"
            class="sharkImgs"
          />
          <q-carousel-slide
            :name="3"
            :img-src="sharkThree"
            class="sharkImgs"
          />
          <template v-slot:control>
            <q-carousel-control
              position="bottom-right"
              :offset="[18, 18]"
              class="q-gutter-xs"
            >
              <q-btn
                push
                round
                dense
                color="orange"
                text-color="black"
                icon="arrow_left"
                @click="$refs.factCarousel.previous()"
              />
              <q-btn
                push
                round
                dense
                color="orange"
                text-color="black"
                icon="arrow_right"
                @click="$refs.factCarousel.next()"
              />
            </q-carousel-control>
          </template>
        </q-carousel>
        <q-card
          class="q-ma-md"
          id="factCard"
        >
          <q-card-section>
            {{facts[fact - 1]}}
          </q-card-section>
        </q-card>
      </div>
      <q-timeline class="q-pa-md">
        <q-timeline-entry heading>Posts</q-timeline-entry>
        <q-timeline-entry
          v-for="(post, index) in docs"
          :key="index"
          :title="post.title"
          :subtitle="Date(post.$updatedAt).toLocaleString()"
        >
          <q-card class="my-card bg-secondary text-white">
            <q-card-section
              horizontal
              class="flex justify-between"
            >
              <q-card-section>
                <div>{{post.about}}</div>
              </q-card-section>
              <q-card-actions vertical>
                <q-btn
                  color="indigo"
                  push
                  @click="readPost(post.title, post.content, post.images)"
                >
                  Read
                </q-btn>
              </q-card-actions>
            </q-card-section>
          </q-card>
        </q-timeline-entry>
      </q-timeline>
      <q-btn
        label="Create Post"
        color="indigo"
        push
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
              arrows
              v-if="images.length"
              ref="carousel"
            >
              <q-carousel-slide
                v-for="(url, index) in images"
                :key="index"
                :name="index"
                :img-src=url
                class="sharkImgs"
              />

              <template v-slot:control>
                <q-carousel-control
                  position="bottom-right"
                  :offset="[18, 18]"
                  class="q-gutter-xs"
                >
                  <q-btn
                    push
                    round
                    dense
                    color="orange"
                    text-color="black"
                    icon="arrow_left"
                    @click="$refs.carousel.previous()"
                  />
                  <q-btn
                    push
                    round
                    dense
                    color="orange"
                    text-color="black"
                    icon="arrow_right"
                    @click="$refs.carousel.next()"
                  />
                </q-carousel-control>
              </template>
            </q-carousel>
          </q-card-section>
        </q-card>
      </q-dialog>
      <div class="q-ma-lg">To become an author, please send an email to <a href="mailto:palashjohricool@gmail.com">palashjohricool@gmail.com</a>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import sharkIcon from "assets/conifer-1016.png";
import { useRouter } from "vue-router";
import {
  listDocuments,
  getDocument,
  getFile,
  getUser,
  createSession,
} from "boot/appwrite";
import { useQuasar } from "quasar";
import sharkOne from "assets/second_image.png";
import sharkTwo from "assets/blahaj.png";
import sharkThree from "assets/pic_3.png";
import splashGif from "assets/SharkPedia_4.gif";

const facts = [
  "Every year, sharks attack approximately 100 people, of which about 10 results in a human fatality. On the other hand, humans kill 10’s millions of sharks every year for their skin, fins, meat, and liver oil. This would imply that humans are far more dangerous than sharks.",
  "Do you know Blahaj's are very popular in the Major League Hacking(MLH) community?",
  "Sharks can hear a fish swimming over one mile away, and can smell one drop of blood in a million drops of water.",
];

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
    const $q = useQuasar();
    const emailVal = ref("");
    const pwdVal = ref("");
    const fact = ref(0);
    const splash = ref(true);

    setTimeout(() => {
      splash.value = false;
    }, 2000);

    const newPost = async () => {
      const res = await getUser();
      if (res?.$id) {
        router.push({
          name: "New Post",
        });
      } else {
        $q.dialog({
          dark: true,
          title: "Author Log In",
          message: "What is your email?",
          prompt: {
            filled: true,
            model: emailVal,
            type: "email",
            isValid: (val) =>
              /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
                val
              ),
          },
          cancel: true,
          persistent: true,
        }).onOk((data) => {
          $q.dialog({
            dark: true,
            title: "Author Log In",
            message: "Enter your password!",
            prompt: {
              filled: true,
              maxlength: 15,
              counter: true,
              model: pwdVal,
              type: "password",
              isValid: (val) =>
                /^(?=(.*[a-zA-Z].*){2,})(?=.*\d.*)(?=.*\W.*)[a-zA-Z0-9\S]{8,15}$/.test(
                  val
                ),
              // Strong password with min 8 - max 15 character length, at least two letters (not case sensitive), one number, one special character (all, not just defined), space is not allowed.
            },
            cancel: true,
            persistent: true,
          }).onOk(async (data) => {
            const res = await createSession(emailVal.value, pwdVal.value);
            if (res?.$id) {
              router.push({
                name: "New Post",
              });
            } else {
              $q.notify(res);
            }
          });
        });
      }
    };

    onMounted(async () => {
      docs.value = (await listDocuments()).documents;
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
      facts,
      sharkOne,
      sharkTwo,
      sharkThree,
      fact,
      splash,
      splashGif,
    };
  },
});
</script>

<style lang="sass">
.sharkImgs
  background-size: contain
  background-repeat: no-repeat

#factCard
  width: 90vw
</style>
