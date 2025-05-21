<script>
	import { createEventDispatcher } from 'svelte';
	import { fade, scale } from 'svelte/transition';

	const dispatch = createEventDispatcher();

	function handleClose() {
		dispatch('close');
	}

	function handleBackdropClick(event) {
		if (event.target === event.currentTarget) {
			handleClose();
		}
	}
</script>

<div
	class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
	on:click={handleBackdropClick}
	transition:fade={{ duration: 200 }}
>
	<div
		class="bg-white dark:bg-darkBg rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] bar overflow-y-auto"
		transition:scale={{ duration: 200 }}
	>
		<div class="relative">
			<button
				on:click={handleClose}
				class="absolute right-4 top-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="w-6 h-6"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M6 18L18 6M6 6l12 12"
					/>
				</svg>
			</button>
			<slot />
		</div>
	</div>
</div> 