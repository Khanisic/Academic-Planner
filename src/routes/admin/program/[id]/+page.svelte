<!-- +page.svelte -->
<script>
	import AddProgram from '../../../../lib/components/AddProgram.svelte';

	export let data;
	const { program } = data;
	console.log(program);
	let openAddProgramModal = false;
	let edit = true;
</script>

<main>
	{#if openAddProgramModal}
		<AddProgram bind:openAddProgramModal bind:edit {program} />
	{/if}
	<div class="p-10">
		<div class="flex gap-2 items-center">
			<h1 class="font-calm text-bradley text-[60px]">{program.program_name}</h1>
			<button
				on:click={() => {
					openAddProgramModal = true;
				}}
				class="bg-blue flex h-fit px-4 items-center gap-2 hover:bg-black rounded-md text-xl"
			>
				<p class="text-white font-calm">Edit</p>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="size-6 stroke-white"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
					/>
				</svg>
			</button>
		</div>
		<p class="font-base text-3xl leading-3 mb-2">{program.program_dept}</p>
		<p class="font-base">{program.program_desc}</p>
		<p class="font-base">{program.program_concentration_requirements}</p>
		<p class="font-base">{program.program_core_requirements}</p>
		<p class="font-base">{program.program_requirements}</p>
		<p class="font-base">{program.program_visa_requirements}</p>

		<p class="font-calm text-bradley text-4xl">
			Concentrations: {program.program_concentrations.length}
		</p>
		{#each program.program_concentrations as concentration, index}
			<a
				href={`${program._id}/concentration/${concentration._id}`}
				class="flex gap-2 cursor-pointer mt-2 items-center"
			>
				<p
					class="dark:bg-blue bg-purple flex justify-center items-center text-white font-calm min-w-8 min-h-8 rounded-xl"
				>
					{index + 1}.
				</p>
				<div class="flex flex-col gap-0 leading-4">
					<p class="font-calm m-0 text-2xl w-fit hover:bg-purple hover:text-white px-2 rounded-md">
						{concentration.concentration_name}
					</p>
					<p class="px-2 m-0 font-base text-[16px] italic">{concentration.concentration_about}</p>
				</div>
			</a>
		{/each}
		<p class="font-calm text-bradley text-4xl">
			Required Courses: {program.program_required_courses.length}
		</p>
		{#each program.program_required_courses as courses, index}
			<div class="flex gap-2 cursor-pointer mt-2 items-center">
				<p
					class="dark:bg-blue bg-green flex justify-center items-center text-white font-calm min-w-8 min-h-8 rounded-xl"
				>
					{index + 1}.
				</p>
				<div class="flex flex-col gap-0 leading-6">
					<a
						href={`/admin/course/${courses.required_course._id}`}
						class="flex gap-2 cursor-pointer mt-2 items-center w-fit"
					>
						<p class="font-base m-0 text-[20px] hover:bg-green hover:text-white px-2 rounded-md">
							{courses.required_course.course_dept.split(' ')[0]}
							{courses.required_course.course_code}
							{courses.required_course.course_title}
						</p>
						{#if courses.altername_course}
							<span class="italic font-calm">or</span>
						{/if}
					</a>
					{#if courses.altername_course}
						<a href={`/course/${courses.altername_course._id}`} class="">
							<p class="font-base m-0 text-[20px] hover:bg-green hover:text-white px-2 rounded-md">
								{courses.altername_course.course_dept.split(' ')[0]}
								{courses.altername_course.course_code}
								{courses.altername_course.course_title}
							</p>
						</a>
					{/if}
				</div>
			</div>
		{/each}
	</div>
</main>
