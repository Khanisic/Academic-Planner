<script>
	import { flip } from 'svelte/animate';
	import { dndzone } from 'svelte-dnd-action';
	import { createEventDispatcher } from 'svelte';

	export let items;
	export let semSelection;
	export let calculateTotalProb;
	export let semester; // New prop to identify which semester this list represents
	export let lockedSemesters = {}; // Add prop for locked semesters

	const dispatch = createEventDispatcher();
	const flipDurationMs = 300;

	// Function to get the appropriate color class based on course type
	function getTypeColorClass(type) {

		switch (type) {
			case 'core':
				return 'bg-white dark:bg-darkInner text-bradley border-bradley border-[1px] dark:hover:border-bradley dark:hover:bg-bradley dark:hover:text-white hover:bg-bradley hover:text-white hover:border-white'; // Blue
			case 'concentration1':
				return 'bg-white dark:border-lightpurple dark:text-lightpurple dark:bg-darkInner text-purple border-purple border-[1px] dark:hover:border-purple dark:hover:bg-purple dark:hover:text-white hover:bg-purple hover:text-white hover:border-white'; // Green
			case 'concentration2':
				return 'bg-white dark:border-skyblue dark:text-skyblue dark:bg-darkInner text-blue border-blue border-[1px] dark:hover:border-blue dark:hover:bg-blue dark:hover:text-white hover:bg-blue hover:text-white hover:border-white'; // Green
			case 'elective':
				return 'bg-white dark:border-yellow dark:text-yellow dark:bg-darkInner text-yellow border-yellow border-[1px] dark:hover:border-yellow dark:hover:bg-yellow dark:hover:text-white hover:bg-yellow hover:text-white hover:border-white'; // Green
			default:
				return 'bg-gray dark:bg-lightGray'; // Gray
		}
	}

	function handleDndConsider(e) {
		items = e.detail.items;
	}

	function handleDndFinalize(e) {
		items = e.detail.items;
		dispatch('courseMove', {
			course: items[items.length - 1],
			from: null,
			to: semester
		});
		if (semSelection) {
			calculateTotalProb();
		}
	}

	function isThereAProf(str, isFirst) {
		let padding = isFirst == 1 ? '' : '& ';
		if (str) {
			return padding + str;
		} else return '';
	}

	// Function to determine if this is a fall or spring semester
	function isFallSemester() {
		return semester.toLowerCase().includes('fall');
	}

	function isSpringSemester() {
		return semester.toLowerCase().includes('spring');
	}

	function isSummerSemester() {
		return semester.toLowerCase().includes('summer');
	}

	function isJanuarySemester() {
		return semester.toLowerCase().includes('january');
	}

	// Function to get the appropriate availability percentage
	function getAvailability(item) {
		if (isFallSemester()) return item.fall_availability;
		if (isSpringSemester()) return item.spring_availability;
		if (isSummerSemester()) return item.summer_availability;
		if (isJanuarySemester()) return item.january_availability;
		return 0;
	}

	// Function to get the appropriate professors
	function getProfessors(item) {
		if (isFallSemester()) return item.fall_professors;
		if (isSpringSemester()) return item.spring_professors;
		if (isSummerSemester()) return item.summer_professors;
		if (isJanuarySemester()) return item.january_professors;
		return [];
	}
</script>

<!-- <button
	on:click={() => {
		console.log(items);
	}}>Check this array</button 
	>
	-->
<section
	class={`w-full flex min-h-[120px] min-w-[200px] flex-col gap-2 outline-none p-2 border-lightBorder dark:border-darkBorder rounded-xl border-[1px] ${lockedSemesters[semester] ? ' bg-bradley cursor-not-allowed' : ''}`}
	use:dndzone={{ items, flipDurationMs }}
	on:consider={handleDndConsider}
	on:finalize={handleDndFinalize}
>
	{#each items as item (item.id)}
		<div animate:flip={{ duration: flipDurationMs }} class="border-none outline-none">
			<div
				class={` group outline-none relative text-center w-fit justify-center items-center  flex gap-2 font-calm ${getTypeColorClass(item.type)} px-3 py-1 ${lockedSemesters[semester] ? 'cursor-not-allowed' : ''} rounded-2xl`}
			>
				<p class="font-base">
					{item.course_details.course_dept.split(' ')[0]}
					{item.course_details.course_code}
					{item.course_details.course_title.slice(0, 40)}
				</p>

				{#if semSelection && !lockedSemesters[semester]}
					<p class="font-calm text-dark dark:text-white">
						{getAvailability(item) * 100}%
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
								class="text-white min-w-6 h-6"
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
							{isThereAProf(getProfessors(item)[0]?.active ? getProfessors(item)[0]?.faculty : '')}
							{isThereAProf(getProfessors(item)[1]?.active ? getProfessors(item)[1]?.faculty : '')}
							{isThereAProf(getProfessors(item)[2]?.active ? getProfessors(item)[2]?.faculty : '')}
						</p>
					</div>
				{/if}
			</div>
		</div>
	{/each}
</section>
