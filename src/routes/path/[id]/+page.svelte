<script>
	import { onMount } from 'svelte';
	import Conc1 from '../../../lib/components/Conc1.svelte';
	import Conc2 from '../../../lib/components/Conc2.svelte';
	import CoreCourses from '../../../lib/components/CoreCourses.svelte';
	import CourseOption from '../../../lib/components/CourseOption.svelte';
	import Electives from '../../../lib/components/Electives.svelte';
	import Paths from '../../../lib/components/Paths.svelte';
	import Requirements from '../../../lib/components/Requirements.svelte';
	import toast, { Toaster } from 'svelte-french-toast';
	import LeftBar from '../../../lib/components/LeftBar.svelte';
	import UpperBar from '../../../lib/components/UpperBar.svelte';
	export let data;
	const { program } = data;

	let concentration1;
	let concentration1Details = {};
	let concentration2;
	let concentration2Details = {};
	let showProgramRequirements = false;
	let showCoreRequirements = false;
	let showConcRequirements = false;
	let check = false;
	let option;
	let selectedCoreCourses = {};
	let selectedConc1Courses = {};
	let selectedConc2Courses = {};
	let totalHours = 0;
	let allCourses = [];
	let finalCourses = [];
	let selectedElective;
	let hoursConc1;
	let hoursConc2;
	let selectedCoursesPopup = false;
	let step = 0;
	let courses = [];
	let title = 'Bradley University Academic Planner';
	let finalAllCourses = [];
	let allProfessors = [];

	onMount(async () => {
		try {
			const response = await fetch('/api/course');
			if (response.ok) {
				courses = await response.json();
			} else {
				console.error('Failed to fetch courses');
			}
		} catch (error) {
			console.error('Error fetching courses:', error);
		}
	});
	const showReq = (num) => {
		if (num == 1) {
			showProgramRequirements = !showProgramRequirements;
		} else if (num == 2) {
			showCoreRequirements = !showCoreRequirements;
		} else if (num == 3) {
			showConcRequirements = !showConcRequirements;
		}
	};

	const setOption = (opt) => {
		option = opt;
	};

	const addCoreCourse = (code, toRemove) => {
		selectedCoreCourses[code] = true;
		toast.success(`Added ${code} to core courses`);

		// Remove alternate course only if it exists in selectedCoreCourses
		if (toRemove && toRemove in selectedCoreCourses) {
			delete selectedCoreCourses[toRemove];
		}

		// If exactly 4 courses are selected, update step to -3
		if (Object.keys(selectedCoreCourses).length === 4) {
			step = -3;
		}
	};

	const addConc1Course = (code, hoursConc1) => {
		if (selectedConc1Courses[code] == true) {
			selectedConc1Courses[code] = false;
			delete selectedConc1Courses[code];

			return;
		}
		let electivesCanTake;
		let electivesTaken;

		let course = concentration1Details.concentration_elective_courses.filter(
			(conc) => conc.course_code == code.split(' ')[0]
		);

		if (Object.keys(selectedConc1Courses).length == 1 && hoursConc1 == 6) {
			electivesCanTake = 1;
			electivesTaken = Object.keys(selectedConc1Courses).length - 1;
		} else if (Object.keys(selectedConc1Courses).length == 2 && hoursConc1 == 6) {
			if (concentration1Details.name == 'Emerging Topics in CS/CIS') {
				electivesCanTake = 0;
				electivesTaken = 1;
			} else {
				electivesCanTake = 1;
				electivesTaken = Object.keys(selectedConc1Courses).length - 2;
			}
		} else if (Object.keys(selectedConc1Courses).length == 1 && hoursConc1 == 3) {
			electivesCanTake = 2;
			electivesTaken = Object.keys(selectedConc1Courses).length - 1;
		} else if (Object.keys(selectedConc1Courses).length == 2 && hoursConc1 == 3) {
			electivesCanTake = 1;
			electivesTaken = Object.keys(selectedConc1Courses).length - 1;
		}

		if (electivesTaken <= electivesCanTake) {
			selectedConc1Courses[code] = true;
			totalHours += course[0].course_credit_hours;
		} else {
			toast.error('Maximum electives reached, click on a selected elective to remove it!');
		}

		if (totalHours == 9) {
			step = -4;
			totalHours = 0;
		}
	};

	const addConc2Course = (code, hoursConc2) => {
		if (selectedConc2Courses[code] == true) {
			selectedConc2Courses[code] = false;
			delete selectedConc2Courses[code];
			return;
		}

		let electivesCanTake;
		let electivesTaken;

		let course = concentration2Details.concentration_elective_courses.filter(
			(conc) => conc.course_code == code.split(' ')[0]
		);

		if (Object.keys(selectedConc2Courses).length == 1 && hoursConc2 == 6) {
			electivesCanTake = 1;
			electivesTaken = Object.keys(selectedConc2Courses).length - 1;
		} else if (Object.keys(selectedConc2Courses).length == 2 && hoursConc2 == 6) {
			if (concentration2Details.name == 'Emerging Topics in CS/CIS') {
				electivesCanTake = 0;
				electivesTaken = 1;
			} else {
				electivesCanTake = 1;
				electivesTaken = Object.keys(selectedConc2Courses).length - 2;
			}
		} else if (Object.keys(selectedConc2Courses).length == 1 && hoursConc2 == 3) {
			electivesCanTake = 2;
			electivesTaken = Object.keys(selectedConc2Courses).length - 1;
		} else if (Object.keys(selectedConc2Courses).length == 2 && hoursConc2 == 3) {
			electivesCanTake = 1;
			electivesTaken = Object.keys(selectedConc2Courses).length - 1;
		}

		if (electivesTaken <= electivesCanTake) {
			selectedConc2Courses[code] = true;
			totalHours += course[0].course_credit_hours;
		} else {
			toast.error('Maximum electives reached, click on a selected elective to remove it!');
		}

		if (totalHours == 9) {
			step = -5;
			totalHours = 0;
		}
	};

	const setConcentration1 = (con, num) => {
		step = 3;
		selectedConc1Courses = {};
		num == 1 ? (concentration1 = con) : (concentration2 = con);
		concentration1Details = program.program_concentrations.filter(
			(concen) => concen.concentration_name == con
		)[0];
		for (let i = 0; i < concentration1Details.concentration_required_courses.length; i++) {
			selectedConc1Courses[
				`${concentration1Details.concentration_required_courses[i].course_code} : ${concentration1Details.concentration_required_courses[i].course_title}`
			] = true;
		}
		hoursConc1 = concentration1Details.concentration_required_courses.reduce((total, course) => {
			return total + course.course_credit_hours;
		}, 0);
		totalHours = hoursConc1;
		if (totalHours == 9) {
			step = -4;
			totalHours = 0;
		}
	};

	const setConcentration2 = (con, num) => {
		step = 4;
		selectedConc2Courses = {};
		num == 1 ? (concentration1 = con) : (concentration2 = con);
		concentration2Details = program.program_concentrations.filter(
			(concen) => concen.concentration_name == con
		)[0];
		for (let i = 0; i < concentration2Details.concentration_required_courses.length; i++) {
			selectedConc2Courses[
				`${concentration2Details.concentration_required_courses[i].course_code} : ${concentration2Details.concentration_required_courses[i].course_title}`
			] = true;
		}
		hoursConc2 = concentration2Details.concentration_required_courses.reduce((total, course) => {
			return total + course.course_credit_hours;
		}, 0);
		totalHours = hoursConc2;
		if (totalHours == 9) {
			step = -5;
			totalHours = 0;
		}
	};

	const moveAhead = () => {
		step = Math.abs(step);
		if (step == 5) {
			allCourses = Object.keys({
				...selectedCoreCourses,
				...selectedConc1Courses,
				...selectedConc2Courses
			});
		}
		if (step == 6) {
			finalCourses = [...allCourses, selectedElective];

			// Make call here
		}
	};

	let selectedProfessors = [];
	let showFilters = false;
	let currProbability = 0;
</script>

<Toaster />

<div class="flex h-full relative top-0">
	<div
		class="bg-leftBar top-0 sticky dark:bg-black rounded-l-xl border-r-lightBorder dark:border-r-darkBorder border-t-0 border-b-0 border-l-0 border-[1px] h-full w-1/6"
	>
		<LeftBar />
	</div>

	<div class="w-5/6 flex flex-col h-full">
		<UpperBar bind:title />
		<div class="flex h-full overflow-hidden">
			<div
				class="w-[77%] overflow-auto bar pb-40 border-r-lightBorder dark:border-r-darkBorder border-t-0 border-b-0 border-l-0 border-[1px]"
			>
				<div class="p-5 md:px-10 flex flex-col gap-4 relative bg-transparent">
					<div class="w-full items-start justify-start flex flex-col gap-1 relative">
						<h1 class="text-bradley font-calm text-2xl md:text-4xl bg-transparent">
							{program.program_name}
						</h1>
						<p class="dark:text-white text-dark font-base bg-transparent">
							{program.program_desc}
						</p>
					</div>

					{#if step == 0}
						<Requirements
							bind:step
							bind:check
							bind:showProgramRequirements
							bind:showCoreRequirements
							bind:showConcRequirements
							{program}
							{showReq}
						/>
					{/if}

					{#if (step >= 1 && step < 6) || step <= -2}<CourseOption
							bind:option
							bind:step
							{setOption}
						/>{/if}
					{#if (step >= 2 && step < 6) || step <= -3}<CoreCourses
							bind:selectedCoreCourses
							{addCoreCourse}
							{program}
						/>{/if}

					{#if (step >= 3 && step < 6) || step <= -4}<Conc1
							bind:concentration1Details
							{setConcentration1}
							bind:concentration1
							bind:hoursConc1
							bind:selectedConc1Courses
							{addConc1Course}
							{program}
						/>{/if}

					{#if (step >= 4 && step < 6) || step <= -5}<Conc2
							bind:concentration2Details
							{setConcentration2}
							bind:concentration2
							bind:hoursConc2
							bind:selectedConc2Courses
							bind:concentration1Details
							{addConc2Course}
							{program}
						/>{/if}

					{#if (step >= 5 && step < 6) || step <= -6}<Electives
							bind:allCourses
							bind:selectedElective
							bind:step
							bind:finalAllCourses
							{courses}
						/>{/if}

					{#if step >= 6 || step <= -7}<Paths
					bind:currProbability
							bind:selectedProfessors
							bind:allProfessors
							bind:finalCourses
							bind:step
						/>{/if}

					{#if step < 0}
						<div class="flex justify-start items-start bg-transparent">
							<button
								on:click={() => {
									moveAhead();
								}}
								class="flex justify-center items-center px-7 rounded-lg dark:hover:text-sky transition-all ease-in-out duration-100 align-middle justify-self-center font-base text-lg bg-bradley text-white cursor-pointer"
								><p class="bg-transparent">Next</p>
							</button>
						</div>
					{/if}
				</div>
			</div>

			<div
				class="w-[23%] top-0 sticky flex flex-col gap-3 px-2 pt-3 items-center overflow-y-auto bar"
			>
				<div class=" group flex flex-col gap-2 px-2 pb-3">
					{#if step == 6}
						<p class="font-base text-text">
							Drag and drop the courses in the respective semesters to know the probability of
							getting that course for that semester, additionally apply filters to get the best
							outcome.
						</p>

						<div
							class="text-text w-[220px] justify-center items-center border-lightBorder dark:hover:text-bradley dark:hover:border-bradley hover:text-blue hover:border-blue dark:border-darkBorder border-[1px] flex flex-col gap-2 font-calm bg-leftBar dark:bg-darkLeftBar px-3 py-2 rounded-2xl"
						>
							<p class="font-calm text-xl text-center text-black dark:text-white">Probability of Current Path:</p>
							<p class="text-xl">{currProbability.toFixed(2)} %</p>
						</div>

						<div class="flex flex-col px-4 py-2">
							<button
								on:click={() => {
									showFilters = !showFilters;
								}}
								class="flex mb-2 items-center gap-2 justify-between text-blue cursor-pointer"
							>
								<div class="flex gap-2">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										stroke-width="1.5"
										stroke="currentColor"
										class="size-6"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
										/>
									</svg>
									<p class="font-base text-blue">Filters</p>
								</div>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="1.5"
									stroke="currentColor"
									class={`size-5 self-end transition-all ease-in-out duration-150 ${showFilters ? 'rotate-0' : 'rotate-180'}`}
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="m19.5 8.25-7.5 7.5-7.5-7.5"
									/>
								</svg>
							</button>

							{#if showFilters && allProfessors.length > 0}
								{#each allProfessors as professor}
									<div class="flex gap-2">
										<input
											type="checkbox"
											bind:group={selectedProfessors}
											value={professor}
											id={professor}
											checked
											class="accent-bradley"
										/>
										<label for={professor} class="font-base text-text">{professor}</label>
									</div>
								{/each}
							{/if}
						</div>
					{:else if Object.keys(selectedCoreCourses).length > 0}
						<div class="flex flex-col items-center gap-2">
							{#each Object.keys(selectedCoreCourses) as courses, index}
								<div
									class="text-text w-[220px] justify-center items-center border-lightBorder dark:hover:text-green dark:hover:border-green hover:text-black hover:border-black dark:border-darkBorder border-[1px] flex gap-2 font-calm bg-leftBar dark:bg-darkLeftBar px-3 py-1 rounded-2xl"
								>
									<p class="font-calm">{index + 1}:</p>
									<p class="font-calm text-center overflow-hidden">CS {courses.slice(0, 20)}</p>
								</div>
							{/each}

							<div
								class="border-b-lightBorder w-1/2 mb-3 group dark:border-b-darkBorder border-r-0 border-l-0 border-t-0 border-[1px] flex flex-col gap-2 px-2 pb-3 text-center items-center"
							></div>

							{#if Object.keys(selectedConc1Courses).length > 0}
								{#each Object.keys(selectedConc1Courses) as courses, index}
									<div
										class="text-text w-[220px] justify-center items-center border-lightBorder dark:hover:text-blue dark:hover:border-blue hover:text-black hover:border-black dark:border-darkBorder border-[1px] flex gap-2 font-calm bg-leftBar dark:bg-darkLeftBar px-3 py-1 rounded-2xl"
									>
										<p class="font-calm">{index + 5}:</p>
										<p class="font-calm text-center overflow-hidden">CS {courses.slice(0, 25)}</p>
									</div>
								{/each}
							{/if}
							<div
								class="border-b-lightBorder w-1/2 mb-3 group dark:border-b-darkBorder border-r-0 border-l-0 border-t-0 border-[1px] flex flex-col gap-2 px-2 pb-3 text-center items-center"
							></div>
							{#if Object.keys(selectedConc2Courses).length > 0}
								{#each Object.keys(selectedConc2Courses) as courses, index}
									<div
										class="text-text w-[220px] justify-center items-center border-lightBorder dark:hover:text-yellow dark:hover:border-yellow hover:text-black hover:border-black dark:border-darkBorder border-[1px] flex gap-2 font-calm bg-leftBar dark:bg-darkLeftBar px-3 py-1 rounded-2xl"
									>
										<p class="font-calm">{index + 5}:</p>
										<p class="font-calm text-center overflow-hidden">CS {courses.slice(0, 25)}</p>
									</div>
								{/each}
							{/if}
							<div
								class="border-b-lightBorder w-1/2 mb-3 group dark:border-b-darkBorder border-r-0 border-l-0 border-t-0 border-[1px] flex flex-col gap-2 px-2 pb-3 text-center items-center"
							></div>
							{#if selectedElective}
								<div
									class="text-text w-[220px] justify-center items-center border-lightBorder dark:hover:text-bradley dark:hover:border-bradley hover:text-black hover:border-black dark:border-darkBorder border-[1px] flex gap-2 font-calm bg-leftBar dark:bg-darkLeftBar px-3 py-1 rounded-2xl"
								>
									<div class=" px-2 py-1 rounded-xl gap-1 flex">
										<p class="font-calm">{11}:</p>
										<p class="font-calm text-center overflow-hidden">
											CS {selectedElective.slice(0, 20)}
										</p>
									</div>
								</div>
							{/if}
						</div>
					{/if}
				</div>
			</div>
		</div>
	</div>
</div>
