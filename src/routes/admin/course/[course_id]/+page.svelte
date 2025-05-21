<script>
	import AddCourse from '../../../../lib/components/AddCourse.svelte';

	export let data;
	let edit = true;
	let openAddCourseModal = false;

	const { course } = data;

</script>

<main>
	{#if openAddCourseModal}
		<AddCourse bind:openAddCourseModal bind:edit {course} />
	{/if}
</main>

<div class="p-10">
	<div class="flex gap-2 items-center ">
		<h1 class="font-calm text-bradley text-2xl">
			{course.course_dept.split(' ')[0]}
			{course.course_code}
			{course.course_title}
			<span class="text-base text-dark dark:text-text">( {course.course_credit_hours} Credit Hours )</span>
		</h1>
		<button
			on:click={() => {
				openAddCourseModal = true;
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
	<p class="font-base text-lg leading-5 mb-2 text-black dark:text-text">{course.course_description}</p>


</div>
