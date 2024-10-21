<script>
	import { csis } from '$lib/assets/mscs.js';
	export let concentration1Details, setConcentration1, concentration1, hoursConc1, addConc1Course, selectedConc1Courses;

</script>

<div class="flex gap-5 items-start bg-transparent">
	<div
		class="dark:bg-purple bg-purple flex justify-center items-center text-white font-calm w-10 h-10 rounded-xl"
	>
		3.
	</div>
	<div class="flex flex-col gap-2 bg-transparent">
		<p class="dark:text-purple text-dark font-calm text-2xl bg-transparent">
			Select Concentration 1
		</p>
	</div>
</div>
<div class="flex flex-wrap gap-2">
	{#each csis.concentrations as concentrationSelect}

		<button
			on:click={() => {
				setConcentration1(concentrationSelect.name, 1);
			}}
			class={`${concentration1 == concentrationSelect.name ? ' border-purple bg-purple' : 'bg-lightpurple'} border-2 border-lightpurple  shadow-md font-base hover:bg-purple rounded-lg px-3 cursor-pointer hover:text-navy`}
		>
			{concentrationSelect.name}
		</button>
	{/each}
</div>
{#if concentration1 && concentration1Details}
	<div class="flex flex-col gap-2">
		<p class="dark:text-purple text-dark font-calm text-xl bg-transparent">
			{concentration1Details.name}
		</p>
		<p class="dark:text-purple text-dark font-base text-base bg-transparent">
			{concentration1Details.about}
		</p>
		<p class="dark:text-purple text-dark font-calm text-lg bg-transparent">
			Required Courses - {hoursConc1} hours
		</p>
		{#each concentration1Details.required_courses as courses, index}
			<button
				class={`bg-purple  border-2 border-lightpurple max-w-[350px] shadow-md font-base hover:bg-purple rounded-lg px-3 cursor-pointer `}
				>{courses.course_code} {courses.course_name}</button
			>
		{/each}

		{#if concentration1Details.electives}
			<p class="dark:text-purple text-dark font-calm text-lg bg-transparent">Electives</p>
			{#each concentration1Details.electives as courses, index}
				<button
					on:click={() => {
						addConc1Course(`${courses.course_code} : ${courses.course_name}`, hoursConc1);
					}}
					class={`${selectedConc1Courses[`${courses.course_code} : ${courses.course_name}`] == true ? 'bg-purple' : 'bg-lightpurple'} border-2 border-lightpurple max-w-[350px] shadow-md font-base hover:bg-purple rounded-lg px-3 cursor-pointer `}
					>{courses.course_code} {courses.course_name}</button
				>
			{/each}
		{/if}
	</div>
{/if}
