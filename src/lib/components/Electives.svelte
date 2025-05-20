<script>
	import { csis } from '$lib/assets/mscs.js';
	import toast, { Toaster } from 'svelte-french-toast';
	export let allCourses,
		selectedElective,
		step,
		courses,
		finalAllCourses,
		selectingSecondConcentration;

	let searchQuery = '';

	$: filteredCourses = courses.filter((course) => {
		const courseString =
			`${course.course_dept.split(' ')[0]} ${course.course_code} : ${course.course_title}`.toLowerCase();
		return courseString.includes(searchQuery.toLowerCase());
	});

	const addLastCourse = (course) => {
		// Check if course is already selected
		if (selectedElective.includes(course)) {
			// Remove the course if it's already selected
			selectedElective = selectedElective.filter((c) => c !== course);
			finalAllCourses = [...allCourses, ...selectedElective];
			return;
		}

		// resrtict the number of electives to 4 if selectingSecondConcentration is false else only 1
		if (selectingSecondConcentration) {
			if (selectedElective.length == 1) {
				toast.error('You can only select one elective');
				return;
			}
		} else {
			if (selectedElective.length == 4) {
				toast.error('You can only select four electives');
				return;
			}
		}

		selectedElective = [...selectedElective, course];

		finalAllCourses = [...allCourses, ...selectedElective];

		if (finalAllCourses.length == 11) {
			step = -6;
		}
		console.log(finalAllCourses);
	};
</script>

<Toaster />

<div class="flex gap-5 items-center bg-transparent mt-1">
	<div
		class="dark:bg-purple bg-purple flex justify-center items-center text-white font-calm w-10 h-10 rounded-xl"
	>
		5.
	</div>
	<div class="flex flex-col gap-2 bg-transparent">
		<p class="dark:text-white text-dark font-calm text-2xl bg-transparent">Select Elective(s)</p>
	</div>
</div>

<div class="mb-4 w-fit px-4 font-base py-1 rounded-full border flex justify-between dark:border-darkBorder dark:bg-darkInner  border-lightpurple focus:outline-none focus:border-purple dark:text-white">
	<input
		type="text"
		bind:value={searchQuery}
		placeholder="Search electives..."
		class="font-base rounded-full dark:bg-darkInner text-dark outline-none dark:text-white"
	/>

	<svg
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		viewBox="0 0 24 24"
		stroke-width="1.5"
		stroke="currentColor"
		class="size-6 stroke-lightpurple"
	>
		<path
			stroke-linecap="round"
			stroke-linejoin="round"
			d="m15.75 15.75-2.489-2.489m0 0a3.375 3.375 0 1 0-4.773-4.773 3.375 3.375 0 0 0 4.774 4.774ZM21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
		/>
	</svg>
</div>

<div class="flex flex-wrap gap-2">
	{#each filteredCourses as required}
		{#if !allCourses.includes(`${required.course_dept.split(' ')[0]} ${required.course_code} : ${required.course_title}`)}
			<button
				on:click={() => {
					addLastCourse(
						`${required.course_dept.split(' ')[0]} ${required.course_code} : ${required.course_title}`
					);
				}}
				class={`${selectedElective.includes(`${required.course_dept.split(' ')[0]} ${required.course_code} : ${required.course_title}`) ? 'bg-purple text-white' : 'bg-lightpurple'} text-ellipsis whitespace-nowrap h-6 hover:text-white border-lightpurple  shadow-md font-base hover:bg-purple rounded-lg px-3 cursor-pointer hover:text-navy`}
			>
				{required.course_dept.split(' ')[0]}
				{required.course_code} : {required.course_title}
			</button>
		{/if}

		<!-- {#if !allCourses.includes(`${required.alternative.course_code} : ${required.alternative.course_title}`)}
			<button
				on:click={() => {
					addLastCourse(
						`${required.alternative.course_code} : ${required.alternative.course_title}`
					);
				}}
				class={`${selectedElective == `${required.alternative.course_code} : ${required.alternative.course_title}` ? 'bg-purple' : 'bg-lightpurple'} border-2 border-lightpurple  shadow-md font-base hover:bg-purple rounded-lg px-3 cursor-pointer hover:text-navy`}
			>
				{required.alternative.course_code} : {required.alternative.course_title}
			</button>
		{/if} -->
	{/each}
	<!-- {#each csis.concentrations as concentrations}
		{#each concentrations.required_courses as required_conc}
			{#if !allCourses.includes(`${required_conc.course_code} : ${required_conc.course_title}`)}
				<button
					on:click={() => {
						addLastCourse(`${required_conc.course_code} : ${required_conc.course_title}`);
					}}
					class={`${selectedElective == `${required_conc.course_code} : ${required_conc.course_title}` ? 'bg-purple' : 'bg-lightpurple'} border-2 border-lightpurple  shadow-md font-base hover:bg-purple rounded-lg px-3 cursor-pointer hover:text-navy`}
				>
					{required_conc.course_code} : {required_conc.course_title}
				</button>
			{/if}
		{/each}
		{#if concentrations.electives}
			{#each concentrations.electives as electives_conc}
				{#if !allCourses.includes(`${electives_conc.course_code} : ${electives_conc.course_title}`)}
					<button
						on:click={() => {
							addLastCourse(`${electives_conc.course_code} : ${electives_conc.course_title}`);
						}}
						class={`${selectedElective == `${electives_conc.course_code} : ${electives_conc.course_title}` ? 'bg-purple' : 'bg-lightpurple'} border-2 border-lightpurple  shadow-md font-base hover:bg-purple rounded-lg px-3 cursor-pointer hover:text-navy`}
					>
						{electives_conc.course_code} : {electives_conc.course_title}
					</button>
				{/if}
			{/each}
		{/if}
	{/each} -->
</div>
