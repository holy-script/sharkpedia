![SharkPedia (4)](https://user-images.githubusercontent.com/81790585/193444474-fec7a202-2f92-4ceb-a53c-7c31b9c29b64.gif)

# 📝Inspiration

A shark is a large, stealthy fish with many teeth 😁. It is generally depicted as a gray shark in full profile facing left, as a tiger, bull, or great white shark hunting in the water and shown with a white underside and three gills, its pointed nose and teeth-lined mouth curving down to a sharp dorsal fin and long, pointed tail. So being a Shark lover I have been always curious about learning more about sharks but for this one would need to go to different places and search on different platforms. This made me very frustrated. So we came up with the idea of Sharkpedia. A free Encyclopedia on Sharks, for Shark Enthusiasts, by Shark Lovers!

# 🦈Sharkpedia

Sharkpedia is a free online encyclopedia for Sharks. Where you can read more about sharks, Also able to see content regarding the same, and the admin can post more about the shark as well

# 💡What it does

The Sharkpedia is capable of doing a multitude of things such as:

- Read more about the shark
- Search the shark
- Write about the shark
- Read shark-themed articles and images It's shark time y'all!

# 💭How we build it

- For the frontend, we use Quasar UI and hosted it on Vercel
- The backend as a self-hosted Appwrite Server
- Used GoDaddy for a custom domain [sharkpedia.study](https://sharkpedia.study)
- Manually populated the document attributes, author credentials and storage bucket using Appwrite's dashboard
- Published an SPA built with Vue

![vuejs](https://user-images.githubusercontent.com/46082799/193446913-22871063-1e78-41e6-ac7f-0093bb6d8fdf.jpg)

- For the backend, we used **Appwrite**

![download](https://user-images.githubusercontent.com/46082799/193443601-8db31b01-52c4-4f87-945f-bcb4542d71a0.jpg)

# 🪄Challenges we ran into

- It was the first time we worked with Appwrite and the Quasar framework. At first, it was very challenging for us to understand. But in the end, we were able to do that. For the Appwrite backend, we had to do a lot of reading in the docs. For most of the members of the group, it was the first time we used Vue and we had to adjust how to convert our react components to Vue. The other challenge was learning about the Quasar framework that used Vue.
- Timing conflicts between teammates, internet/electricity outage, upload bugs etc.
- Setting up and configuring the Appwrite Server on an Azure VM

# 💫Accomplishments that we're proud of

- Able to build our first web app with Appwrite as a backend that really solved a real-world problem.
- We learned a lot about Vue frameworks like Quasar. We are also happy to make this project in the given time frame.
- Thankfully, the Appwrite Docs were very helpful, and we implemented storage buckets, databases, user accounts and even an SSL certificate for our API sub-domain at [appwrite.sharkpedia.study](https://appwrite.sharkpedia.study)

# 🖋What we learned

- We learned that sharks are really cool creatures, but also how to make use of Appwrite as backend. Blahaj Never Gonna You Up, Never Gonna Let You Down:)
- Working together remotely as a team
- Customizing Appwrite instances

# 📝What's next for Sharkpedia

At the moment there is no way for users to write without having an admin privilege so we want to add a feature for users to submit articles. The other feature is that we don't support video at the moment and we want to have a video feature. The third one is we want to award most readers with sharkcoin and have a leaderboard for it.

# Used GitHub as a collaboration tool

# Installation guide

## Install the dependencies

```bash
yarn
# or
npm install
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)

```bash
quasar dev
```

### Lint the files

```bash
yarn lint
# or
npm run lint
```

### Format the files

```bash
yarn format
# or
npm run format
```

### Build the app for production

```bash
quasar build
```

### Customize the configuration

See [Configuring quasar.config.js](https://v2.quasar.dev/quasar-cli-webpack/quasar-config-js).
