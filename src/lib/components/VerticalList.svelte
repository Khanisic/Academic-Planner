<script>
	import { flip } from 'svelte/animate';
	import { dndzone } from 'svelte-dnd-action';
	export let items,
		semSelection,
		fall24,
		spring25,
		fall25,
		spring26,
		fall2024,
		spring2025,
		spring2026,
		fall2025,
		calculateTotalProb;
	console.log(items);

	const flipDurationMs = 300;
	function handleDndConsider(e) {
		items = e.detail.items;
	}
	function handleDndFinalize(e) {
		items = e.detail.items;
		if (fall24) {
			fall2024 = [...items];
		} else if (spring25) {
			spring2025 = [...items];
		} else if (fall25) {
			fall2025 = [...items];
		} else if (spring26) {
			spring2026 = [...items];
		}
		if(semSelection){
			calculateTotalProb();
		}
		
	}

	function isThereAProf(str, isFirst) {
		let padding = isFirst == 1 ? '' : '& ';
		if (str) {
			return padding + str;
		} else return '';
	}
</script>

<!-- <button
	on:click={() => {
		console.log(items);
	}}>Check this array</button 
	>
	-->
<section
	class="w-full flex min-h-[120px] min-w-[200px] flex-col gap-2 outline-none p-2 border-lightBorder dark:border-darkBorder rounded-xl border-[1px]"
	use:dndzone={{ items, flipDurationMs }}
	on:consider={handleDndConsider}
	on:finalize={handleDndFinalize}
>
	{#each items as item (item.id)}
		<div animate:flip={{ duration: flipDurationMs }} class="border-none outline-none">
			<div
				class="text-text group outline-none relative text-center w-fit justify-center items-center border-lightBorder dark:hover:text-bradley dark:hover:border-bradley hover:text-black hover:border-black dark:border-darkBorder border-[1px] flex gap-2 font-calm bg-leftBar dark:bg-darkLeftBar px-3 py-1 rounded-2xl"
			>
				<p class="font-base">
					{item.course_details.course_dept.split(' ')[0]}
					{item.course_details.course_code}
					{item.course_details.course_title}
				</p>

				{#if semSelection && (fall24 || fall25)}
					<p class="font-base">
						{item.fall_availability * 100}%
					</p>

					<div
						class="dark:bg-bradley gap-2 bg-black w-full h-full group absolute overflow-hidden items-center rounded-xl top-0 left-0 hidden group-hover:flex pr-2"
					>
						<div class="z-10 dark:bg-bradley bg-black pl-2">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								class=" text-white min-w-6 h-6"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
								/>
							</svg>
						</div>
						<p
							class="text-white transition-all duration-[4000ms] ease-in-out hover:-translate-x-[100%] whitespace-nowrap"
						>
							<span class="text-white">Professors: </span>
							{isThereAProf(item.fall_professors[0]?.faculty, 1)}
							{isThereAProf(item.fall_professors[1]?.faculty)}
							{isThereAProf(item.fall_professors[2]?.faculty)}
						</p>
					</div>
				{/if}

				{#if semSelection && (spring25 || spring26)}
					<p class="font-base">
						{item.spring_availability * 100}%
					</p>

					<div
						class="dark:bg-bradley gap-2 bg-black w-full h-full group absolute overflow-hidden items-center rounded-xl top-0 left-0 hidden group-hover:flex pr-2"
					>
						<div class="z-10 dark:bg-bradley bg-black pl-2">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								class=" text-white min-w-6 h-6"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
								/>
							</svg>
						</div>
						<p
							class="text-white transition-all duration-[4000ms] ease-in-out hover:-translate-x-[100%] whitespace-nowrap"
						>
							<span class="text-white">Professors: </span>
							{isThereAProf(item.spring_professors[0]?.faculty, 1)}
							{isThereAProf(item.spring_professors[1]?.faculty)}
							{isThereAProf(item.spring_professors[2]?.faculty)}
						</p>
					</div>
				{/if}
			</div>
		</div>
	{/each}
</section>
