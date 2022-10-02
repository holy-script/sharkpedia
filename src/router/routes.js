const routes = [
	{
		path: "/",
		component: () => import("layouts/MainLayout.vue"),
		children: [
			{
				name: "Home",
				meta: {
					requiresAuth: false,
				},
				path: "",
				component: () => import("pages/IndexPage.vue"),
			},
			{
				name: "New Post",
				meta: {
					requiresAuth: true,
				},
				path: "create",
				component: () => import("pages/CreatePage.vue"),
			},
		],
	},

	// Always leave this as last one,
	// but you can also remove it
	{
		path: "/:catchAll(.*)*",
		component: () => import("pages/ErrorNotFound.vue"),
	},
];

export default routes;
