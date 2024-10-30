<script>
	import AddProgram from '../../lib/components/AddProgram.svelte';
	import AddCourse from '../../lib/components/AddCourse.svelte';
	import AddConcentration from '../../lib/components/AddConcentration.svelte';
	import AddFaculty from '../../lib/components/AddFaculty.svelte';
	// import { semesters } from '$lib/assets/semesters.js';
	import { departments } from '$lib/assets/departments.js';

	import AddSemester from '../../lib/components/AddSemester.svelte';
	let openAddCourseModal,
		openAddProgramModal,
		openAddConcentrationModal,
		openFacultyModal,
		openSemesterModal = false;

	export let data;
	console.log(data)
	const { programs, semesters } = data;
	
</script>

<div class="p-5 md:p-10">
	{#if openAddCourseModal}
		<AddCourse bind:openAddCourseModal />
	{/if}
	{#if openAddConcentrationModal}
		<AddConcentration bind:openAddConcentrationModal />
	{/if}
	{#if openAddProgramModal}
		<AddProgram bind:openAddProgramModal />
	{/if}
	{#if openFacultyModal}
		<AddFaculty bind:openFacultyModal />
	{/if}
	{#if openSemesterModal}
		<AddSemester bind:openSemesterModal />
	{/if}
	<p class="font-calm text-4xl text-bradley">Academic Planner Admin Dashboard</p>

	<!-- <p class="text-2xl font-calm mt-3">Programs</p> -->

	<button
		class="bg-skyblue px-4 py-1 rounded-lg font-calm mt-3 hover:bg-blue"
		on:click={() => {
			openAddCourseModal = true;
		}}
	>
		+ Add Course
	</button>

	<button
		class="bg-skyblue px-4 py-1 rounded-lg font-calm mt-3 hover:bg-blue"
		on:click={() => {
			openAddConcentrationModal = true;
		}}
	>
		+ Add Concentration
	</button>

	<button
		class="bg-skyblue px-4 py-1 rounded-lg font-calm mt-3 hover:bg-blue"
		on:click={() => {
			openAddProgramModal = true;
		}}
	>
		+ Add Program
	</button>

	<button
		class="bg-skyblue px-4 py-1 rounded-lg font-calm mt-3 hover:bg-blue"
		on:click={() => {
			openFacultyModal = true;
		}}
	>
		+ Add Faculty
	</button>

	<button
		class="bg-skyblue px-4 py-1 rounded-lg font-calm mt-3 hover:bg-blue"
		on:click={() => {
			openSemesterModal = true;
		}}
	>
		+ Add Semester
	</button>

	<h1 class="mt-10 font-calm text-3xl text-purple">Programs:</h1>
	{#each programs as program, index}
		<a
			href={`admin/program/${program._id}`}
			class="flex gap-2 cursor-pointer mt-2 items-center group w-fit"
		>
			<p
				class="dark:bg-blue bg-purple flex justify-center items-center text-white font-calm w-8 h-8 rounded-xl"
			>
				{index + 1}.
			</p>
			<div class="flex flex-col gap-0 leading-4">
				<p class="font-base m-0 text-lg group-hover:bg-purple px-2 rounded-lg py-0 font-semibold">
					{program.program_name}
				</p>
				<p
					class="m-0 font-base italic group-hover:translate-x-[25%] px-2 transition-all ease-in-out duration-150"
				>
					{program.program_dept}
				</p>
			</div>
		</a>
	{/each}

	<h1 class="mt-10 font-calm text-3xl text-yellow">Semesters:</h1>
	{#each semesters as semester, index}
		<a
			href={`admin/semester/${semester.season}/${semester.year}`}
			class="flex gap-2 cursor-pointer mt-2 items-center group w-fit"
		>
			<p
				class=" bg-yellow flex justify-center items-center text-white font-calm w-8 h-8 rounded-xl"
			>
				{index + 1}.
			</p>
			<div class="flex flex-col gap-0 leading-3">
				<p class="font-calm m-0 group-hover:bg-yellow px-2 rounded-lg text-lg">
					{semester.season}
					{semester.year}
				</p>
			</div>
		</a>
	{/each}

	<h1 class="mt-10 font-calm text-3xl text-blue">Departments:</h1>
	{#each departments as department, index}
		<a
			href={`/admin/department/${department.code}`}
			class="flex gap-2 cursor-pointer mt-2 items-center group w-fit"
		>
			<p class=" bg-blue flex justify-center items-center text-white font-calm w-8 h-8 rounded-xl">
				{index + 1}.
			</p>
			<div class="flex flex-col gap-0 leading-3">
				<p class="font-calm m-0 group-hover:bg-skyblue px-2 rounded-lg text-lg">
					{department.name}
					({department.code})
				</p>
			</div>
		</a>
	{/each}
</div>
