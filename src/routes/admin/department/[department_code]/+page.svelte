<script>
	import { onMount } from 'svelte';
	import AddFaculty from '../../../../lib/components/AddFaculty.svelte';

	export let data;
	let openFacultyModal;
	let faculty;
	let edit = true;
	const { professors, department } = data;
	// onMount(async () => {
	// 	try {
		
	// 	} catch (error) {
	// 		console.error('Error fetching courses:', error);
	// 	}
	// });

	const openFaculty = (prof) => {
		openFacultyModal = true;
		faculty = prof;
	};
</script>

{#if openFacultyModal}
	<AddFaculty bind:openFacultyModal {faculty} bind:edit />
{/if}
<div class="p-10 overflow-y-auto bar h-full">
	<div class="flex gap-2 items-center">
		<h1 class="font-calm text-bradley text-[60px]">{department.name} ({department.code})</h1>
	</div>

	<h1 class="mt-10 font-calm text-3xl text-blue">Faculty:</h1>
	{#each professors as professor, index}
		<button
			on:click={() => {
				openFaculty(professor);
			}}
			class="flex gap-2 cursor-pointer mt-2 items-center group w-fit"
		>
			<p class=" bg-blue flex justify-center items-center text-white font-calm w-8 h-8 rounded-xl">
				{index + 1}.
			</p>
			<div class="flex gap-2 items-center leading-3">
				<p class="font-calm m-0 dark:text-white dark:hover:bg-bradley group-hover:bg-skyblue px-2 rounded-lg text-lg">
					{professor.name}
				</p>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="size-4 hidden group-hover:block dark:text-text"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
					/>
				</svg>
			</div>
		</button>
	{/each}
</div>
