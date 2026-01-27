import { browser } from "$app/environment";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, type User } from "firebase/auth";

import { itemsService } from "./items.svelte";
import { firebaseConfig } from "$lib/config/firebaseConfig";

interface AuthState {
	user: User | null;
	isInitializing: boolean;
}

const authState = $state<AuthState>({
	user: null,
	isInitializing: true,
});

const firebaseApp = initializeApp(firebaseConfig);

export const authFirebaseApp = getAuth(firebaseApp);

export function initAuth() {
	if (!browser) return;

	onAuthStateChanged(authFirebaseApp, (user) => {
		authState.user = user;
		authState.isInitializing = false;

		console.log(user ? `User connected : ${user.email}` : "User not connected");
		if (user != null) {
			itemsService.loadItemsFromFirestore();
			console.log(`Initializing items user connected : ${user.email}`);
		}
	});
}

export const authService = {
	get user() {
		return authState.user;
	},
	get isInitializing() {
		return authState.isInitializing;
	},
	get isAuthenticated() {
		return !!authState.user;
	},
};
