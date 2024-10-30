<script>
	import AddSemester from '../../../../../lib/components/AddSemester.svelte';

	export let data;
	const { semester } = data;
	let openSemesterModal;
	console.log(semester);
	let edit = true;
</script>

<div class="p-10">
	{#if openSemesterModal}
		<AddSemester bind:openSemesterModal bind:edit {semester} />
	{/if}
	<div class="flex gap-2 items-center">
		<h1 class="font-calm text-bradley text-[60px]">{semester.season} {semester.year}</h1>

		<button
			on:click={() => {
				openSemesterModal = true;
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
	<h1 class="font-calm text-bradley text-2xl">{semester.semester_dept}</h1>

	{#each semester.course_offerings as offering, index}
		<div class="flex gap-2 cursor-pointer mt-2 items-center group w-fit">
			<p
				class=" bg-yellow flex justify-center items-center text-white font-calm w-8 h-8 rounded-xl"
			>
				{index + 1}.
			</p>
			<div class="flex flex-col gap-0 leading-4">
				<p
					class="font-base m-0 text-lg group-hover:bg-bradley group-hover:text-white px-2 rounded-lg py-0 font-semibold"
				>
					{offering.course.course_dept.split(' ')[0]}
					{offering.course.course_code}
					{offering.course.course_title}
				</p>
				<p
					class="m-0 font-base italic group-hover:translate-x-[25%] px-2 transition-all ease-in-out duration-150"
				>
					{offering.faculty.name}
				</p>
			</div>
		</div>
	{/each}
</div>
