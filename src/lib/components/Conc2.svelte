<script>
	import { csis } from '$lib/assets/mscs.js';
	export let concentration2Details,
		setConcentration2,
		concentration2,
		hoursConc2,
		addConc2Course,
		selectedConc2Courses,
		concentration1Details;
</script>

<div class="flex gap-5 items-start bg-transparent">
	<div
		class="dark:bg-purple bg-purple flex justify-center items-center text-white font-calm w-10 h-10 rounded-xl"
	>
		4.
	</div>
	<div class="flex flex-col gap-2 bg-transparent">
		<p class="dark:text-purple text-dark font-calm text-2xl bg-transparent">
			Select Concentration 2
		</p>
	</div>
</div>
<div class="flex flex-wrap gap-2">
	{#each csis.concentrations as concentrationSelect}
		{#if concentration1Details.name != concentrationSelect.name}
			<button
				on:click={() => {
					setConcentration2(concentrationSelect.name, 2);
				}}
				class={`${concentration2 == concentrationSelect.name ? ' border-purple bg-purple' : 'bg-lightpurple'} border-2 border-lightpurple  shadow-md font-base hover:bg-purple rounded-lg px-3 cursor-pointer hover:text-navy`}
			>
				{concentrationSelect.name}
			</button>
		{/if}
	{/each}
</div>
{#if concentration2 && concentration2Details}
	<div class="flex flex-col gap-2">
		<p class="dark:text-purple text-dark font-calm text-xl bg-transparent">
			{concentration2Details.name}
		</p>
		<p class="dark:text-purple text-dark font-base text-base bg-transparent">
			{concentration2Details.about}
		</p>
		<p class="dark:text-purple text-dark font-calm text-lg bg-transparent">
			Required Courses - {hoursConc2} hours
		</p>
		{#each concentration2Details.required_courses as courses, index}
			<button
				class={`bg-purple  border-2 border-lightpurple max-w-[350px] shadow-md font-base hover:bg-purple rounded-lg px-3 cursor-pointer `}
				>{courses.course_code} {courses.course_name}</button
			>
		{/each}

		{#if concentration2Details.electives}
			<p class="dark:text-purple text-dark font-calm text-lg bg-transparent">Electives</p>
			{#each concentration2Details.electives as courses, index}
				<button
					on:click={() => {
						addConc2Course(`${courses.course_code} : ${courses.course_name}`, hoursConc2);
					}}
					class={`${selectedConc2Courses[`${courses.course_code} : ${courses.course_name}`] == true ? 'bg-purple' : 'bg-lightpurple'} border-2 border-lightpurple max-w-[350px] shadow-md font-base hover:bg-purple rounded-lg px-3 cursor-pointer `}
					>{courses.course_code} {courses.course_name}</button
				>
			{/each}
		{/if}
	</div>
{/if}
