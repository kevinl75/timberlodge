<script lang="ts">
	import { resolve } from "$app/paths";
	import { goto } from "$app/navigation";
</script>

<div class="rounded-md preset-filled-surface-400-600 p-5">
	<p class="h3">Welcome on our bujo website</p>
	<div class="mt-15 grid grid-cols-2 place-content-center divide-x-2 divide-solid">
		<div class="flex flex-col items-center">
			<p>Already have an account? Please Log In</p>
			<button
				class="mt-4 rounded preset-filled-secondary-200-800 px-4 py-2 hover:preset-filled-secondary-800-200"
				type="submit"
				onclick={() => goto(resolve("/auth/login"))}
			>
				Log In
			</button>
		</div>
		<div class="flex flex-col items-center">
			<p>You don't have an account yet? Please Sign up</p>
			<button
				class="mt-4 rounded preset-filled-secondary-200-800 px-4 py-2 hover:preset-filled-secondary-800-200"
				type="submit"
				onclick={() => goto(resolve("/auth/signup"))}
			>
				Sign Up
			</button>
		</div>
	</div>
</div>
