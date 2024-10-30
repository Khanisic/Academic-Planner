<script>
	import { csis } from '$lib/assets/mscs.js';
	export let allCourses, selectedElective,step;

	const addLastCourse = (course) => {
		selectedElective = course;
		step = -6;
		// allCourses = [...allCourses, course];

	};
</script>

<div class="flex gap-5 items-center bg-transparent mt-1">
	<div
		class="dark:bg-purple bg-purple flex justify-center items-center text-white font-calm w-10 h-10 rounded-xl"
	>
		5.
	</div>
	<div class="flex flex-col gap-2 bg-transparent">
		<p class="dark:text-purple text-dark font-calm text-2xl bg-transparent">Select Elective(s)</p>
	</div>
</div>
<div class="flex flex-wrap gap-2">
	{#each csis.requirements.required_courses as required}
		{#if !allCourses.includes(`${required.course_code} : ${required.course_name}`)}
			<button
				on:click={() => {
					addLastCourse(`${required.course_code} : ${required.course_name}`);
				}}
				class={`${selectedElective == `${required.course_code} : ${required.course_name}` ? 'bg-purple' : 'bg-lightpurple'} border-2 border-lightpurple  shadow-md font-base hover:bg-purple rounded-lg px-3 cursor-pointer hover:text-navy`}
			>
				{required.course_code} : {required.course_name}
			</button>
		{/if}

		{#if !allCourses.includes(`${required.alternative.course_code} : ${required.alternative.course_name}`)}
			<button
				on:click={() => {
					addLastCourse(
						`${required.alternative.course_code} : ${required.alternative.course_name}`
					);
				}}
				class={`${selectedElective == `${required.alternative.course_code} : ${required.alternative.course_name}` ? 'bg-purple' : 'bg-lightpurple'} border-2 border-lightpurple  shadow-md font-base hover:bg-purple rounded-lg px-3 cursor-pointer hover:text-navy`}
			>
				{required.alternative.course_code} : {required.alternative.course_name}
			</button>
		{/if}
	{/each}
	{#each csis.concentrations as concentrations}
		{#each concentrations.required_courses as required_conc}
			{#if !allCourses.includes(`${required_conc.course_code} : ${required_conc.course_name}`)}
				<button
					on:click={() => {
						addLastCourse(`${required_conc.course_code} : ${required_conc.course_name}`);
					}}
					class={`${selectedElective == `${required_conc.course_code} : ${required_conc.course_name}` ? 'bg-purple' : 'bg-lightpurple'} border-2 border-lightpurple  shadow-md font-base hover:bg-purple rounded-lg px-3 cursor-pointer hover:text-navy`}
				>
					{required_conc.course_code} : {required_conc.course_name}
				</button>
			{/if}
		{/each}
		{#if concentrations.electives}
			{#each concentrations.electives as electives_conc}
				{#if !allCourses.includes(`${electives_conc.course_code} : ${electives_conc.course_name}`)}
					<button
						on:click={() => {
							addLastCourse(`${electives_conc.course_code} : ${electives_conc.course_name}`);
						}}
						class={`${selectedElective == `${electives_conc.course_code} : ${electives_conc.course_name}` ? 'bg-purple' : 'bg-lightpurple'} border-2 border-lightpurple  shadow-md font-base hover:bg-purple rounded-lg px-3 cursor-pointer hover:text-navy`}
					>
						{electives_conc.course_code} : {electives_conc.course_name}
					</button>
				{/if}
			{/each}
		{/if}
	{/each}
</div>
