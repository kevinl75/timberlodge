import { initializeApp } from "firebase/app";
import {
	type QueryDocumentSnapshot,
	type FirestoreDataConverter,
	getFirestore,
	collection,
	updateDoc,
	deleteDoc,
	getDocs,
	setDoc,
	doc,
} from "firebase/firestore";
import { format } from "@formkit/tempo";
import { authService } from "./auth.svelte";
import { SvelteMap } from "svelte/reactivity";
import { type IItem } from "$lib/models/Item";
import { firebaseConfig } from "$lib/config/firebaseConfig";
import { selectedDatesService } from "./selectedDates.svelte";

interface IItemsState {
	userId: string;
	items: IItem[];
	isInitializing: boolean;
}

const itemsState = $state<IItemsState>({
	userId: "",
	items: [],
	isInitializing: true,
});

const firebaseApp = initializeApp(firebaseConfig);
const firestoreApp = getFirestore(firebaseApp);

const itemConverter: FirestoreDataConverter<IItem> = {
	toFirestore: (item: IItem) => {
		return item;
	},
	fromFirestore: (snapshot: QueryDocumentSnapshot) => {
		const itemData = snapshot.data();
		const newItem: IItem = {
			itemId: snapshot.id,
			itemContent: itemData.itemContent,
			isDone: itemData.isDone,
			itemType: itemData.itemType,
			itemDate: itemData.itemDate?.toDate(),
		};
		return newItem;
	},
};

export const itemsService = {
	get userId() {
		return itemsState.userId;
	},
	get items() {
		return itemsState.items;
	},
	get isInitializing() {
		return itemsState.isInitializing;
	},
	set userId(userId: string) {
		itemsState.userId = userId;
	},
	set items(items: IItem[]) {
		itemsState.items = items;
	},
	async loadItemsFromFirestore() {
		if (authService.isAuthenticated && authService.user?.uid) {
			itemsState.userId = authService.user?.uid;
			const inerItemCollection = collection(
				firestoreApp,
				"userItems",
				itemsState.userId,
				"items",
			).withConverter(itemConverter);
			getDocs(inerItemCollection).then((querySnapshot) => {
				querySnapshot.forEach((docSnapshot) => {
					itemsState.items.push(docSnapshot.data());
				});
				itemsState.isInitializing = false;
			});
		} else {
			console.log("Error. No user authenticated.");
		}
	},
	addItem(item: IItem) {
		this.addItemToFirestore(item)
			.then(() => {
				itemsService.items.push(item);
			})
			.catch((error) => {
				console.log(error);
			});
	},
	async addItemToFirestore(item: IItem) {
		if (authService.isAuthenticated) {
			const docRef = doc(firestoreApp, "userItems", itemsService.userId, "items", item.itemId);
			await setDoc(docRef, {
				itemContent: item.itemContent,
				isDone: item.isDone,
				itemType: item.itemType,
				itemDate: item.itemDate,
			});
		} else {
			console.log("Error. No user authenticated.");
		}
	},
	updateItem(updatedItem: IItem) {
		this.updateItemOnFirestore(updatedItem)
			.then(() => {
				itemsService.items = itemsService.items.map((item) =>
					item.itemId === updatedItem.itemId ? updatedItem : item,
				);
			})
			.catch((error) => {
				console.log(error);
			});
	},
	async updateItemOnFirestore(item: IItem) {
		if (authService.isAuthenticated) {
			const docRef = doc(firestoreApp, "userItems", itemsService.userId, "items", item.itemId);
			await updateDoc(docRef, {
				itemContent: item.itemContent,
				isDone: item.isDone,
				itemType: item.itemType,
				itemDate: item.itemDate,
			});
		} else {
			console.log("Error. No user authenticated.");
		}
	},
	removeItem(removedItem: IItem) {
		this.removeItemOnFirestore(removedItem).then(() => {
			itemsService.items = itemsService.items.filter((item) => item.itemId !== removedItem.itemId);
		});
	},
	async removeItemOnFirestore(item: IItem) {
		if (authService.isAuthenticated) {
			const docRef = doc(firestoreApp, "userItems", itemsService.userId, "items", item.itemId);
			await deleteDoc(docRef);
		} else {
			console.log("Error. No user authenticated.");
		}
	},
	sortItemsByDate(ascending: boolean = true): IItem[] {
		return itemsState.items.sort((a, b) => {
			const timeA = a.itemDate.getTime();
			const timeB = b.itemDate.getTime();
			return ascending ? timeA - timeB : timeB - timeA;
		});
	},
	returnItemAsMapPerDate(): SvelteMap<string, IItem[]> {
		const sortedItemsDict = new SvelteMap<string, IItem[]>();
		this.sortItemsByDate().forEach((item) => {
			if (selectedDatesService.isDateBetween(item.itemDate)) {
				const formatedDate = format(item.itemDate, "short");
				if (!sortedItemsDict.has(formatedDate)) {
					sortedItemsDict.set(formatedDate, [item]);
				} else {
					sortedItemsDict.get(formatedDate)?.push(item);
				}
			}
		});
		console.log(sortedItemsDict);
		return sortedItemsDict;
	},
};
