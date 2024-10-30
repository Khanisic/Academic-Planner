<script>
	import AddConcentration from '../../../../../../lib/components/AddConcentration.svelte';

	export let data;
	let edit = true;
	const { concentration } = data;
	let openAddConcentrationModal = false;

</script>

<main>
	{#if openAddConcentrationModal}
		<AddConcentration bind:openAddConcentrationModal bind:edit {concentration} />
	{/if}
	<div class="p-10">
		<div class="flex gap-2 items-center">
			<h1 class="font-calm text-bradley text-[60px]">{concentration.concentration_name}</h1>
			<button
				on:click={() => {
					openAddConcentrationModal = true;
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
		<p class="font-base text-3xl leading-3 mb-2">{concentration.concentration_dept}</p>
		<p class="font-base">{concentration.concentration_about}</p>
		<p class="font-calm text-bradley text-4xl">
			Required Courses: {concentration.concentration_required_courses.length}
		</p>
		{#each concentration.concentration_required_courses as course, index}
			<a href={`/admin/course/${course._id}`} class="flex gap-2 cursor-pointer mt-2 items-center">
				<p
					class="dark:bg-blue bg-purple flex justify-center items-center text-white font-calm min-w-8 min-h-8 rounded-xl"
				>
					{index + 1}.
				</p>
				<div class="flex flex-col gap-0 leading-4">
					<p class="font-calm m-0 text-2xl w-fit hover:bg-purple hover:text-white px-2 rounded-md">
						{course.course_title}
					</p>
					<p class="px-2 m-0 font-base text-[16px] italic">{course.course_description}</p>
				</div>
			</a>
		{/each}

		<p class="font-calm text-bradley text-4xl">
			Elective Courses: {concentration.concentration_elective_courses.length}
		</p>
		{#each concentration.concentration_elective_courses as course, index}
			<a href={`/admin/course/${course._id}`} class="flex gap-2 cursor-pointer mt-2 items-center">
				<p
					class="dark:bg-blue bg-purple flex justify-center items-center text-white font-calm min-w-8 min-h-8 rounded-xl"
				>
					{index + 1}.
				</p>
				<div class="flex flex-col gap-0 leading-4">
					<p class="font-calm m-0 text-2xl w-fit hover:bg-purple hover:text-white px-2 rounded-md">
						{course.course_title}
					</p>
					<p class="px-2 m-0 font-base text-[16px] italic">{course.course_description}</p>
				</div>
			</a>
		{/each}
	</div>
</main>
