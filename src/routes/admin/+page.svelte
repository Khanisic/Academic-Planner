<script>
	import AddProgram from '../../lib/components/AddProgram.svelte';
	import AddCourse from '../../lib/components/AddCourse.svelte';
	import AddConcentration from '../../lib/components/AddConcentration.svelte';
	import AddFaculty from '../../lib/components/AddFaculty.svelte';
	// import { semesters } from '$lib/assets/semesters.js';
	import { departments } from '$lib/assets/departments.js';

	import AddSemester from '../../lib/components/AddSemester.svelte';
	import LeftBar from '../../lib/components/LeftBar.svelte';
	import UpperBar from '../../lib/components/UpperBar.svelte';
	let title = 'Academic Planner Admin Dashboard';
	let openAddCourseModal,
		openAddProgramModal,
		openAddConcentrationModal,
		openFacultyModal,
		openSemesterModal = false;

	export let data;

	const { programs, semesters } = data;

	console.log(semesters);

	let selection = 'programs';
	const setSelection = (selected) => {
		selection = selected;
	};
</script>

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
<div class="flex h-full relative top-0">
	<div
		class="bg-leftBar top-0 sticky dark:bg-black rounded-l-xl border-r-lightBorder dark:border-r-darkBorder border-t-0 border-b-0 border-l-0 border-[1px] h-full w-1/6"
	>
		<LeftBar />
	</div>

	<div class="w-5/6 flex flex-col h-full relative">
		<UpperBar bind:title />
		<div class="flex h-full overflow-hidden">
			<div
				class="w-[77%] h-full border-r-lightBorder dark:border-r-darkBorder border-t-0 border-b-0 border-l-0 border-[1px]"
			>
				<div
					class="border-b-lightBorder dark:border-b-darkBorder border-r-0 border-l-0 border-t-0 border-[1px] py-3 font-calm text-text px-4 flex justify-around items-center text-xl"
				>
					<button
						on:click={() => {
							setSelection('programs');
						}}
						><p
							class={`${selection == 'programs' && 'text-blue'} hover:text-blue dark:hover:text-blue cursor-pointer`}
						>
							Programs
						</p></button
					>
					<button
						on:click={() => {
							setSelection('semesters');
						}}
						><p
							class={`${selection == 'semesters' && 'text-blue'} hover:text-blue dark:hover:text-blue cursor-pointer`}
						>
							Semesters
						</p></button
					>
					<button
						on:click={() => {
							setSelection('departments');
						}}
						><p
							class={`${selection == 'departments' && 'text-blue'} hover:text-blue dark:hover:text-blue cursor-pointer`}
						>
							Departments
						</p></button
					>
					<button
						on:click={() => {
							setSelection('courses');
						}}
						><p
							class={`${selection == 'courses' && 'text-blue'} hover:text-blue dark:hover:text-blue cursor-pointer`}
						>
							Courses
						</p></button
					>
					<button
						on:click={() => {
							setSelection('faculty');
						}}
						><p
							class={`${selection == 'faculty' && 'text-blue'} hover:text-blue dark:hover:text-blue cursor-pointer`}
						>
							Faculty
						</p></button
					>
				</div>

				<div class="p-4 flex flex-col items-center">
					{#if selection == 'programs'}
						{#each programs as program, index}
							<div
								class="flex gap-2 mt-2 h-full items-start bg-leftBar dark:bg-darkLeftBar p-5 rounded-xl max-w-[650px]"
								data-sveltekit-preload-data="off"
							>
								<div
									class="flex flex-col gap-4 pr-2 w-4/6 dark:border-darkBorder border-r-white border-[1px] border-l-0 border-t-0 border-b-0"
								>
									<div class="flex gap-3 items-center">
										<p
											class="bg-blue flex justify-center items-center text-white font-calm w-8 h-8 rounded-xl"
										>
											{index + 1}.
										</p>
										<p
											class="font-calm text-text text-xl group-hover:text-black dark:group-hover:text-blue"
										>
											{program.program_name}
										</p>
										<a href="https://www.bradley.edu/academic/departments/csis/gradprograms/cs/">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												viewBox="0 0 24 24"
												fill="currentColor"
												class="size-6 text-text"
											>
												<path
													fill-rule="evenodd"
													d="M15.75 2.25H21a.75.75 0 0 1 .75.75v5.25a.75.75 0 0 1-1.5 0V4.81L8.03 17.03a.75.75 0 0 1-1.06-1.06L19.19 3.75h-3.44a.75.75 0 0 1 0-1.5Zm-10.5 4.5a1.5 1.5 0 0 0-1.5 1.5v10.5a1.5 1.5 0 0 0 1.5 1.5h10.5a1.5 1.5 0 0 0 1.5-1.5V10.5a.75.75 0 0 1 1.5 0v8.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V8.25a3 3 0 0 1 3-3h8.25a.75.75 0 0 1 0 1.5H5.25Z"
													clip-rule="evenodd"
												/>
											</svg>
										</a>
									</div>

									<p class="font-base text-text">
										The master’s degree in computer science is a 33 credit-hour program that
										enhances your skills for a career in network, database or intelligent systems
										administration, software engineering, programming and other related fields.
									</p>
								</div>
								<div class="w-2/6 flex flex-col gap-4 text-text h-full font-base items-center">
									<div>
										<p>Concentrations: {program.program_concentrations.length}</p>
										<p>Required Courses: {program.program_required_courses.length}</p>
										<p>Credit Hours: {program.program_hours}</p>
									</div>
									<button
										class="b bg-blue px-4 hover:px-6 transition-all ease-in-out duration-200 rounded-lg group cursor-pointer"
									>
										<a href={`admin/program/${program._id}`}
											><svg
												xmlns="http://www.w3.org/2000/svg"
												viewBox="0 0 24 24"
												fill="currentColor"
												class="size-6 group-hover:translate-x-3 transition-all ease-in-out duration-200 text-black"
											>
												<path
													fill-rule="evenodd"
													d="M16.72 7.72a.75.75 0 0 1 1.06 0l3.75 3.75a.75.75 0 0 1 0 1.06l-3.75 3.75a.75.75 0 1 1-1.06-1.06l2.47-2.47H3a.75.75 0 0 1 0-1.5h16.19l-2.47-2.47a.75.75 0 0 1 0-1.06Z"
													clip-rule="evenodd"
												/>
											</svg>
										</a>
									</button>
								</div>
							</div>
						{/each}
					{/if}

					{#if selection == 'semesters'}
						<div class="flex flex-wrap gap-4">
							{#each semesters as semester, index}
								<a
									href={`admin/semester/${semester.season}/${semester.year}`}
									class="flex gap-2 cursor-pointer mt-2 items-center group hover:border-black border-[1px] hover:dark:border-yellow dark:border-darkBorder p-4 rounded-lg w-fit bg-leftBar dark:bg-darkLeftBar"
									data-sveltekit-preload-data="off"
								>
									<p
										class=" bg-yellow flex justify-center group-hover:text-black items-center text-text font-calm w-8 h-8 rounded-xl"
									>
										{index + 1}.
									</p>
									<div class="flex flex-col gap-0 leading-3">
										<p
											class="font-calm m-0 px-2 text-text dark:group-hover:text-yellow group-hover:text-black rounded-lg text-lg"
										>
											{semester.season}
											{semester.year}
										</p>
									</div>
								</a>
							{/each}
						</div>{/if}

					{#if selection == 'departments'}
						<div class="flex flex-wrap gap-4">
							{#each departments as department, index}
								<a
									href={`admin/department/${department.code}`}
									class="flex gap-2 cursor-pointer mt-2 items-center group hover:border-black border-[1px] hover:dark:border-blue dark:border-darkBorder p-4 rounded-lg w-fit bg-leftBar dark:bg-darkLeftBar"
									data-sveltekit-preload-data="off"
								>
									<p
										class=" bg-blue flex justify-center items-center text-white font-calm w-8 h-8 rounded-xl"
									>
										{index + 1}.
									</p>
									<div class="flex flex-col gap-0 leading-3">
										<p
											class="font-calm m-0 px-2 text-text dark:group-hover:text-blue group-hover:text-black rounded-lg text-lg"
										>
											{department.name}
											({department.code})
										</p>
									</div>
								</a>
							{/each}
						</div>
					{/if}
				</div>
			</div>
			<div class="w-[23%] flex flex-col gap-3 px-2 pt-3 items-center relative overflow-y-auto bar">
				<div
					class="border-b-lightBorder group dark:border-b-darkBorder border-r-0 border-l-0 border-t-0 border-[1px] flex flex-col gap-2 px-2 pb-3 text-center items-center"
				>
					<button
						class="text-text border-lightBorder dark:hover:border-green hover:border-black dark:border-darkBorder border-[1px] items-center flex gap-2 font-calm bg-leftBar dark:bg-darkLeftBar px-3 py-1 rounded-2xl"
						on:click={() => {
							openAddCourseModal = true;
						}}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="currentColor"
							class="size-5 group-hover:fill-black dark:group-hover:fill-green"
						>
							<path
								fill-rule="evenodd"
								d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z"
								clip-rule="evenodd"
							/>
						</svg>
						<p class="dark:group-hover:text-green hover:text-black">Add Course</p>
					</button>
					<p class="font-base text-text leading-4">
						Add a course to add to your concentrations and programs.
					</p>
				</div>

				<div
					class="border-b-lightBorder group dark:border-b-darkBorder border-r-0 border-l-0 border-t-0 border-[1px] flex flex-col gap-2 px-2 pb-3 text-center items-center"
				>
					<button
						on:click={() => {
							openAddConcentrationModal = true;
						}}
						class="text-text border-lightBorder dark:hover:border-purple hover:border-black dark:border-darkBorder border-[1px] items-center flex gap-2 font-calm bg-leftBar dark:bg-darkLeftBar px-3 py-1 rounded-2xl"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="currentColor"
							class="size-5 group-hover:fill-black dark:group-hover:fill-purple"
						>
							<path
								fill-rule="evenodd"
								d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z"
								clip-rule="evenodd"
							/>
						</svg>
						<p class="dark:group-hover:text-purple hover:text-black">Add Concentration</p>
					</button>
					<p class="font-base text-text leading-4">Add a concentration to add to your programs.</p>
				</div>

				<div
					class="border-b-lightBorder group dark:border-b-darkBorder border-r-0 border-l-0 border-t-0 border-[1px] flex flex-col gap-2 px-2 pb-3 text-center items-center"
				>
					<button
						on:click={() => {
							openAddProgramModal = true;
						}}
						class="text-text border-lightBorder dark:hover:border-bradley hover:border-black dark:border-darkBorder border-[1px] items-center flex gap-2 font-calm bg-leftBar dark:bg-darkLeftBar px-3 py-1 rounded-2xl"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="currentColor"
							class="size-5 group-hover:fill-black dark:group-hover:fill-bradley"
						>
							<path
								fill-rule="evenodd"
								d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z"
								clip-rule="evenodd"
							/>
						</svg>
						<p class="dark:group-hover:text-bradley hover:text-black">Add Program</p>
					</button>
					<p class="font-base text-text leading-4">
						Add a program to let students choose from when they select their paths.
					</p>
				</div>

				<div
					class="border-b-lightBorder group dark:border-b-darkBorder border-r-0 border-l-0 border-t-0 border-[1px] flex flex-col gap-2 px-2 pb-3 text-center items-center"
				>
					<button
						on:click={() => {
							openSemesterModal = true;
						}}
						class="text-text border-lightBorder dark:hover:border-yellow hover:border-black dark:border-darkBorder border-[1px] items-center flex gap-2 font-calm bg-leftBar dark:bg-darkLeftBar px-3 py-1 rounded-2xl"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="currentColor"
							class="size-5 group-hover:fill-black dark:group-hover:fill-yellow"
						>
							<path
								fill-rule="evenodd"
								d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z"
								clip-rule="evenodd"
							/>
						</svg>
						<p class="dark:group-hover:text-yellow hover:text-black">Add Semester</p>
					</button>
					<p class="font-base text-text leading-4">Add a semester and courses offered in them.</p>
				</div>
				<div
					class="border-b-lightBorder group dark:border-b-darkBorder border-r-0 border-l-0 border-t-0 border-[1px] flex flex-col gap-2 px-2 pb-3 text-center items-center"
				>
					<button
						on:click={() => {
							openFacultyModal = true;
						}}
						class="text-text border-lightBorder dark:hover:border-white hover:border-black dark:border-darkBorder border-[1px] items-center flex gap-2 font-calm bg-leftBar dark:bg-darkLeftBar px-3 py-1 rounded-2xl"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="currentColor"
							class="size-5 group-hover:fill-black dark:group-hover:fill-white"
						>
							<path
								fill-rule="evenodd"
								d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z"
								clip-rule="evenodd"
							/>
						</svg>
						<p class="dark:group-hover:text-white hover:text-black">Add Faculty</p>
					</button>
					<p class="font-base text-text leading-4">
						Add a faculty to refer them back to the courses added.
					</p>
				</div>
			</div>
		</div>
	</div>
</div>
