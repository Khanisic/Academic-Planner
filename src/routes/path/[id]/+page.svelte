<script>
	import { onMount } from 'svelte';
	import Conc1 from '../../../lib/components/Conc1.svelte';
	import Conc2 from '../../../lib/components/Conc2.svelte';
	import CoreCourses from '../../../lib/components/CoreCourses.svelte';
	import CourseOption from '../../../lib/components/CourseOption.svelte';
	import Electives from '../../../lib/components/Electives.svelte';
	import Paths from '../../../lib/components/Paths.svelte';
	import Requirements from '../../../lib/components/Requirements.svelte';
	import IntakeSelection from '../../../lib/components/IntakeSelection.svelte';
	import toast, { Toaster } from 'svelte-french-toast';
	import LeftBar from '../../../lib/components/LeftBar.svelte';
	import UpperBar from '../../../lib/components/UpperBar.svelte';
	import RightPath from '../../../lib/components/RightPath.svelte';
	export let data;
	const { program } = data;

	let concentration1;
	let concentration1Details = {};
	let concentration2;
	let concentration2Details = {};
	let showProgramRequirements = false;
	let showCoreRequirements = false;
	let showConcRequirements = false;
	let selectingSecondConcentration = false;
	let check = false;
	let option;
	let selectedCoreCourses = {};
	let selectedConc1Courses = {};
	let selectedConc2Courses = {};
	let totalHours = 0;
	let allCourses = [];
	let finalCourses = [];
	let selectedElective = [];
	let hoursConc1;
	let hoursConc2;
	let selectedCoursesPopup = false;
	let step = 0;
	let courses = [];
	let title = 'Bradley University Academic Planner';
	let finalAllCourses = [];
	let allProfessors = [];
	let selectedIntake = '';

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
		let course = concentration1Details.concentration_elective_courses.filter(
			(conc) => conc.course_code == code.split(' ')[1]
		);

		if (selectedConc1Courses[code] == true) {
			selectedConc1Courses[code] = false;
			console.log('total house before', totalHours);
			console.log('course credit hours', course[0].course_credit_hours);
			totalHours -= course[0].course_credit_hours;
			console.log('total house after', totalHours);
			delete selectedConc1Courses[code];
			if (totalHours < 9) {
				step = 3;
			}

			return;
		}
		let electivesCanTake;
		let electivesTaken;

		if (Object.keys(selectedConc1Courses).length == 1 && hoursConc1 == 6) {
			electivesCanTake = 1;
			electivesTaken = Object.keys(selectedConc1Courses).length - 1;
		} else if (Object.keys(selectedConc1Courses).length == 2 && hoursConc1 == 6) {
			if (concentration1Details.name == 'Emerging Topics in Computer Information Systems') {
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
		} else {
			step = 3;
		}

		console.log(totalHours);
		console.log(step);
	};

	const addConc2Course = (code, hoursConc2) => {
		let course = concentration2Details.concentration_elective_courses.filter(
			(conc) => conc.course_code == code.split(' ')[1]
		);

		if (selectedConc2Courses[code] == true) {
			selectedConc2Courses[code] = false;
			totalHours -= course[0].course_credit_hours;
			delete selectedConc2Courses[code];
			if (totalHours < 9) {
				step = 4;
			}

			return;
		}

		let electivesCanTake;
		let electivesTaken;

		if (Object.keys(selectedConc2Courses).length == 1 && hoursConc2 == 6) {
			electivesCanTake = 1;
			electivesTaken = Object.keys(selectedConc2Courses).length - 1;
		} else if (Object.keys(selectedConc2Courses).length == 2 && hoursConc2 == 6) {
			if (concentration2Details.name == 'Emerging Topics in Computer Information Systems') {
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
		} else {
			step = 4;
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
			const courseKey = `${concentration1Details.concentration_required_courses[i].course_dept.split(' ')[0]} ${concentration1Details.concentration_required_courses[i].course_code} : ${concentration1Details.concentration_required_courses[i].course_title}`;
			// Only add if not already in core courses
			if (!selectedCoreCourses[courseKey]) {
				selectedConc1Courses[courseKey] = true;
			}
		}
		hoursConc1 = concentration1Details.concentration_required_courses.reduce((total, course) => {
			const courseKey = `${course.course_dept.split(' ')[0]} ${course.course_code} : ${course.course_title}`;
			// Only count hours if course is not in core courses
			return total + (!selectedCoreCourses[courseKey] ? course.course_credit_hours : 0);
		}, 0);
		totalHours = hoursConc1;
		if (totalHours == 9) {
			step = -4;
			totalHours = 0;
		}
	};

	const setConcentration2 = (con, num) => {
		totalHours = 0;
		step = 4;
		selectedConc2Courses = {};
		num == 1 ? (concentration1 = con) : (concentration2 = con);
		concentration2Details = program.program_concentrations.filter(
			(concen) => concen.concentration_name == con
		)[0];
		for (let i = 0; i < concentration2Details.concentration_required_courses.length; i++) {
			const courseKey = `${concentration2Details.concentration_required_courses[i].course_dept.split(' ')[0]} ${concentration2Details.concentration_required_courses[i].course_code} : ${concentration2Details.concentration_required_courses[i].course_title}`;
			// Only add if not already in core courses
			if (!selectedCoreCourses[courseKey]) {
				selectedConc2Courses[courseKey] = true;
			}
		}
		hoursConc2 = concentration2Details.concentration_required_courses.reduce((total, course) => {
			const courseKey = `${course.course_dept.split(' ')[0]} ${course.course_code} : ${course.course_title}`;
			// Only count hours if course is not in core courses
			return total + (!selectedCoreCourses[courseKey] ? course.course_credit_hours : 0);
		}, 0);
		totalHours = hoursConc2;
		if (totalHours == 9) {
			step = -5;
			totalHours = 0;
		}
	};

	const moveAhead = (type) => {
		console.log(type);
		console.log(step);

		if (type == 'electives') {
			step = 5;
			allCourses = Object.keys({
				...selectedCoreCourses,
				...selectedConc1Courses
			});
			return;
		}

		if (step == -3) {
			if (!type) {
				step = Math.abs(step);
				selectingSecondConcentration = true;
			}
		} else {
			step = Math.abs(step);
		}

		if (step == 5) {
			allCourses = Object.keys({
				...selectedCoreCourses,
				...selectedConc1Courses,
				...selectedConc2Courses
			});
		}
		if (step == 6) {
			// step = 7; // Move to the next step after intake selection
		}

		if (step == 7) {
			finalCourses = [...allCourses, ...selectedElective];
			console.log(finalCourses);
		}

		console.log(step);
	};

	let selectedProfessors = [];
	let showFilters = false;
	let currProbability = 0;

	let showLeftBar = false;

	function toggleLeftBar() {
		showLeftBar = !showLeftBar;
	}
</script>

<Toaster />

<div class="flex h-full relative top-0">
	<button
		class="absolute top-4 left-4 z-50 bg-leftBar dark:bg-black p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
		on:click={toggleLeftBar}
	>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke-width="1.5"
			stroke="currentColor"
			class="size-6 text-bradley dark:text-white"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12"
			/>
		</svg>
	</button>
	<div
		class="bg-leftBar min-w-[200px] top-0 absolute z-40 dark:bg-black rounded-l-xl border-r-lightBorder dark:border-r-darkBorder border-t-0 border-b-0 border-l-0 border-[1px] h-full w-1/6 transition-transform duration-300 ease-in-out"
		class:translate-x-0={showLeftBar}
		class:-translate-x-[100%]={!showLeftBar}
	>
		<LeftBar />
	</div>

	<div class="w-full flex flex-col h-full">
		<UpperBar bind:title />
		<div class="flex flex-col lg:flex-row h-full overflow-hidden">
			<div class="w-full lg:hidden flex justify-center items-center h-full font-calm text-4xl text-center px-10">
				<p>Please use a laptop to continue, we are not compatible with smartphones</p>
			</div>

			<div
				class="w-full hidden lg:block lg:w-[80%] overflow-auto bar pb-40 border-r-lightBorder dark:border-r-darkBorder border-t-0 border-b-0 border-l-0 border-[1px]"
			>
				<div class="p-4 sm:p-5 md:px-10 flex flex-col gap-4 relative bg-transparent">
					<div class="w-full items-start justify-start flex flex-col gap-1 relative">
						<h1 class="text-bradley font-calm text-xl sm:text-2xl md:text-4xl bg-transparent">
							{program.program_name}
						</h1>
						<p class="dark:text-white text-dark font-base text-sm sm:text-base bg-transparent">
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

					{#if (step >= 1 && step < 7) || step <= -2}<CourseOption
							bind:option
							bind:step
							{setOption}
						/>{/if}
					{#if (step >= 2 && step < 7) || step <= -3}<CoreCourses
							bind:selectedCoreCourses
							{addCoreCourse}
							{program}
						/>{/if}

					{#if (step >= 3 && step < 7) || step <= -4}<Conc1
							bind:concentration1Details
							{setConcentration1}
							bind:concentration1
							bind:hoursConc1
							bind:selectedConc1Courses
							{addConc1Course}
							{program}
							{selectedCoreCourses}
						/>{/if}

					{#if (step >= 4 && step < 7 && selectingSecondConcentration) || (step <= -5 && selectingSecondConcentration)}<Conc2
							bind:concentration2Details
							{setConcentration2}
							bind:concentration2
							bind:hoursConc2
							bind:selectedConc2Courses
							bind:concentration1Details
							{addConc2Course}
							{program}
							{selectedCoreCourses}
						/>{/if}

					{#if (step >= 5 && step < 7) || step <= -6}<Electives
							bind:allCourses
							bind:selectedElective
							bind:step
							bind:finalAllCourses
							bind:selectingSecondConcentration
							{courses}
						/>{/if}

					{#if (step >= 6 && step < 7) || step <= -7}
						<IntakeSelection bind:selectedIntake bind:step />
					{/if}

					{#if step >= 7 || step <= -8}<Paths
							bind:currProbability
							bind:selectedProfessors
							bind:allProfessors
							bind:finalCourses
							bind:step
							{selectedIntake}
							{selectedCoreCourses}
							{selectedConc1Courses}
							{selectedConc2Courses}
							{selectedElective}
						/>{/if}

					{#if step < 0}
						<div class="flex justify-start gap-2 items-start bg-transparent">
							<button
								on:click={() => {
									moveAhead();
								}}
								class="flex justify-center items-center px-7 rounded-lg dark:hover:text-sky transition-all ease-in-out duration-100 align-middle justify-self-center font-base text-lg hover:text-bradley hover:bg-white hover:border-bradley hover:border-[1px] bg-bradley text-white cursor-pointer"
								><p class="bg-transparent">{step == -4 ? 'Select Second Concentration' : 'Next'}</p>
							</button>
							{#if step == -4}
								<button
									on:click={() => {
										selectingSecondConcentration = false;
										moveAhead('electives');
									}}
									class="flex justify-center items-center px-7 rounded-lg dark:hover:text-sky transition-all ease-in-out duration-100 align-middle justify-self-center font-base text-lg hover:text-bradley hover:bg-white hover:border-bradley hover:border-[1px] bg-bradley text-white cursor-pointer"
									><p class="bg-transparent">Skip to Electives</p>
								</button>
							{/if}
						</div>
					{/if}
				</div>
			</div>

			<div
				class="w-[20%] hidden top-0 sticky lg:flex flex-col gap-3 px-2 pt-3 items-center overflow-y-auto bar"
			>
				<RightPath
					bind:step
					bind:currProbability
					bind:showFilters
					bind:allProfessors
					bind:selectedProfessors
					bind:selectedCoreCourses
					bind:selectedConc1Courses
					bind:selectedConc2Courses
					bind:selectedElective
					bind:selectingSecondConcentration
					bind:concentration1Details
					bind:concentration2Details
				/>
			</div>
		</div>
	</div>
</div>
