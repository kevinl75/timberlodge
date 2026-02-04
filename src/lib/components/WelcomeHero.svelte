<script lang="ts">
	import logo from "$lib/assets/logo/logo-256.png";
	import SignInModal from "./auth/SignInModal.svelte";
	import SignUpModal from "./auth/SignUpModal.svelte";

	let isSignInModalOpen = false;
	let isSignUpModalOpen = false;

	function closeModal(modalType: string) {
		if (modalType === "signIn") {
			isSignInModalOpen = false;
		} else {
			isSignUpModalOpen = false;
		}
	}

	function handleKeyDown(event: KeyboardEvent): void {
		if (event.key === "Escape" && isSignInModalOpen) {
			closeModal("signIn");
		}
		if (event.key === "Escape" && isSignUpModalOpen) {
			closeModal("signUp");
		}
	}
</script>

<div class="hero mt-20">
	<div class="hero-content text-center">
		<img alt="website logo" src={logo} class="" />
		<div class="max-w-md">
			<h1 class="text-5xl font-bold">Welcome on TimberLodge</h1>
			<p class="py-6">
				Happy to see you here. Looking for a quiet place to organise your mind? Please, make this
				space your own lodge.
			</p>
			<div class="flex w-full">
				<div class="h-24 grow content-center">
					<button class="btn" onclick={() => (isSignInModalOpen = true)}> Sign In </button>
					<SignInModal {isSignInModalOpen} {closeModal} {handleKeyDown} />
				</div>
				<div class="divider divider-horizontal">OR</div>
				<div class="h-24 grow content-center">
					<button class="btn" onclick={() => (isSignUpModalOpen = true)}> Sign Up </button>
					<SignUpModal {isSignUpModalOpen} {closeModal} {handleKeyDown} />
				</div>
			</div>
		</div>
	</div>
</div>
