<script>
	import { csis } from '$lib/assets/mscs.js';
	export let concentration2Details,
		setConcentration2,
		concentration2,
		hoursConc2,
		addConc2Course,
		selectedConc2Courses,
		concentration1Details, program;
</script>

<div class="flex gap-5 items-start bg-transparent">
	<div
		class="dark:bg-purple bg-purple flex justify-center items-center text-white font-calm w-10 h-10 rounded-xl"
	>
		4.
	</div>
	<div class="flex flex-col gap-2 bg-transparent">
		<p class="dark:text-white text-dark font-calm text-2xl bg-transparent">
			Select Concentration 2
		</p>
	</div>
</div>
<div class="flex flex-wrap gap-2">
	{#each program.program_concentrations as concentrationSelect}
		{#if concentration1Details.concentration_name != concentrationSelect.concentration_name}
			<button
				on:click={() => {
					setConcentration2(concentrationSelect.concentration_name, 2);
				}}
				class={`${concentration2 == concentrationSelect.concentration_name ? ' bg-purple text-white' : 'bg-lightpurple'} hover:bg-purple hover:text-white shadow-md font-base rounded-lg px-3 cursor-pointer hover:text-navy`}
			>
				{concentrationSelect.concentration_name}
			</button>
		{/if}
	{/each}
</div>
{#if concentration2 && concentration2Details}
	<div class="flex flex-col gap-2">
		<p class="dark:text-lightpurple text-dark font-calm text-xl bg-transparent">
			{concentration2Details.concentration_name}
		</p>
		<p class="dark:text-lightpurple text-dark font-base text-base bg-transparent">
			{concentration2Details.concentration_about}
		</p>
		<p class="dark:text-lightpurple text-dark font-calm text-lg bg-transparent">
			Required Courses - {hoursConc2} hours
		</p>
		{#each concentration2Details.concentration_required_courses as courses, index}
			<button
				class={`bg-purple text-white  border-lightpurple max-w-[350px] shadow-md font-base hover:bg-purple rounded-lg px-3 cursor-pointer `}
				>{courses.course_dept.split(" ")[0]} {courses.course_code} {courses.course_title}</button
			>
		{/each}

		{#if concentration2Details.concentration_elective_courses}
			<p class="dark:text-purple text-dark font-calm text-lg bg-transparent">Electives</p>
			{#each concentration2Details.concentration_elective_courses as courses, index}
				<button
					on:click={() => {
						addConc2Course(`${courses.course_dept.split(" ")[0]} ${courses.course_code} : ${courses.course_title}`, hoursConc2);
					}}
					class={`${selectedConc2Courses[`${courses.course_dept.split(" ")[0]} ${courses.course_code} : ${courses.course_title}`] == true ? 'bg-purple text-white' : 'bg-lightpurple'} text-ellipsis whitespace-nowrap h-6 max-w-[350px] shadow-md font-base hover:bg-purple hover:text-white rounded-lg px-3 cursor-pointer `}
					>{courses.course_dept.split(" ")[0]} {courses.course_code} {courses.course_title}</button
				>
			{/each}
		{/if}
	</div>
{/if}
