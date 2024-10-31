<script>
	let darkMode = true;

	function handleSwitchDarkMode() {
		darkMode = !darkMode;

		darkMode
			? document.documentElement.classList.add('dark')
			: document.documentElement.classList.remove('dark');
	}

	export let title, main;
</script>

<div
	class="dark:border-b-darkBorder border-b-lightBorder border-r-0 border-l-0 border-t-0 border-[1px] w-full flex py-4 px-4"
>
	<div class="w-5/6 flex flex-col justify-center items-center">
		<p class="font-calm text-4xl text-bradley">{title}</p>
		{#if main}
			<p class="dark:text-white text-dark font-base bg-transparent">
				Your one stop destination to <i class="text-blue font-bold">carve</i> out your academic path
			</p>
		{/if}
	</div>
	<div class="w-1/6 flex justify-around items-center">
		<button
			on:click={() => {
				handleSwitchDarkMode();
			}}
		>
			{#if darkMode}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="size-6 stroke-text"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
					/>
				</svg>
			{:else}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					fill="currentColor"
					class="size-6 stroke-text"
				>
					<path
						fill-rule="evenodd"
						d="M9.528 1.718a.75.75 0 0 1 .162.819A8.97 8.97 0 0 0 9 6a9 9 0 0 0 9 9 8.97 8.97 0 0 0 3.463-.69.75.75 0 0 1 .981.98 10.503 10.503 0 0 1-9.694 6.46c-5.799 0-10.5-4.7-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 0 1 .818.162Z"
						clip-rule="evenodd"
					/>
				</svg>
			{/if}
		</button>

		<button
			class="flex items-center dark:hover:bg-blue hover:bg-blue group text-text gap-2 dark:bg-darkLeftBar bg-leftBar rounded-lg font-calm px-3 py-1"
		>
			<p class="group-hover:text-black">Share</p>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="size-5 group-hover:stroke-black"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z"
				/>
			</svg>
		</button>
	</div>
</div>
