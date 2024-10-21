<script>
	import AddProgram from '../../lib/components/AddProgram.svelte';
	import AddCourse from '../../lib/components/AddCourse.svelte';
	import AddConcentration from '../../lib/components/AddConcentration.svelte';
	let openAddCourseModal, openAddProgramModal, openAddConcentrationModal = false;
</script>

<div class="p-5 md:p-10">
	{#if openAddProgramModal}
		<AddProgram bind:openAddProgramModal />
	{/if}
	{#if openAddCourseModal}
		<AddCourse bind:openAddCourseModal />
	{/if}
	{#if openAddConcentrationModal}
		<AddConcentration bind:openAddConcentrationModal />
	{/if}
	<p class="font-calm text-4xl text-bradley">Academic Planner Admin Dashboard</p>

	<!-- <p class="text-2xl font-calm mt-3">Programs</p> -->

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
</div>
