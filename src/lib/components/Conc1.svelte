<script>

	export let concentration1Details,
		setConcentration1,
		concentration1,
		hoursConc1,
		addConc1Course,
		selectedConc1Courses,
		program;
</script>

<div class="flex gap-5 items-start bg-transparent">
	<div
		class="dark:bg-purple bg-purple flex justify-center items-center text-white font-calm w-10 h-10 rounded-xl"
	>
		3.
	</div>
	<div class="flex flex-col gap-2 bg-transparent">
		<p class="dark:text-white text-dark font-calm text-2xl bg-transparent">
			Select Concentration 1
		</p>
	</div>
</div>
<div class="flex flex-wrap gap-2">
	{#each program.program_concentrations as concentrationSelect}
		<button
			on:click={() => {
				setConcentration1(concentrationSelect.concentration_name, 1);
			}}
			class={`${concentration1 == concentrationSelect.concentration_name ? ' bg-purple text-white' : 'bg-lightpurple'} hover:bg-purple hover:text-white shadow-md font-base rounded-lg px-3 cursor-pointer hover:text-navy`}
		>
			{concentrationSelect.concentration_name}
		</button>
	{/each}
</div>
{#if concentration1 && concentration1Details}
	<div class="flex flex-col gap-2">
		<p class="dark:text-lightpurple text-dark font-calm text-xl bg-transparent">
			{concentration1Details.concentration_name}
		</p>
		<p class="dark:text-lightpurple text-dark font-base text-base bg-transparent">
			{concentration1Details.concentration_about}
		</p>
		<p class="dark:text-lightpurple text-dark font-calm text-lg bg-transparent">
			Required Courses - {hoursConc1} hours
		</p>
		{#each concentration1Details.concentration_required_courses as courses, index}
			<button
				class={`bg-purple text-white max-w-[350px] shadow-md font-base hover:bg-purple rounded-lg px-3 cursor-pointer `}
				>{courses.course_dept.split(" ")[0]}  {courses.course_code} {courses.course_title}</button
			>
		{/each}

		{#if concentration1Details.concentration_elective_courses}
			<p class="dark:text-lightpurple text-dark font-calm text-lg bg-transparent">Electives</p>
			{#each concentration1Details.concentration_elective_courses as courses, index}
				<button
					on:click={() => {
						addConc1Course(`${courses.course_dept.split(" ")[0]} ${courses.course_code} : ${courses.course_title}`, hoursConc1);
					}}
					class={`${selectedConc1Courses[`${courses.course_dept.split(" ")[0]} ${courses.course_code} : ${courses.course_title}`] == true ? 'bg-purple text-white' : 'bg-lightpurple'} text-ellipsis whitespace-nowrap h-6 max-w-[350px] shadow-md font-base hover:bg-purple hover:text-white rounded-lg px-3 cursor-pointer `}
					>{courses.course_dept.split(" ")[0]} {courses.course_code} {courses.course_title}</button
				>
			{/each}
		{/if}
	</div>
{/if}
