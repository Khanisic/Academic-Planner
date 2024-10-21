<script>
	import ThemeSwitch from '$lib/ThemeSwitch/ThemeSwitch.svelte';
	import { csis } from '$lib/assets/mscs.js';
	import Conc1 from '../../../lib/components/Conc1.svelte';
	import Conc2 from '../../../lib/components/Conc2.svelte';

	import CoreCourses from '../../../lib/components/CoreCourses.svelte';
	import CourseOption from '../../../lib/components/CourseOption.svelte';
	import Electives from '../../../lib/components/Electives.svelte';
	import Paths from '../../../lib/components/Paths.svelte';
	import Requirements from '../../../lib/components/Requirements.svelte';
	import { onMount } from 'svelte';
	import toast, { Toaster } from 'svelte-french-toast';

	let concentration1;
	let concentration1Details = {};

	let concentration2;
	let concentration2Details = {};

	// Step: 1 Seeing the requirements
	let showProgramRequirements = false;
	let showCoreRequirements = false;
	let showConcRequirements = false;
	let check = false;

	let option;

	let selectedCoreCourses = {};

	let selectedConc1Courses = {};
	let selectedConc2Courses = {};

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
		toast.success(`Added ${code} to core courese`);

		if (toRemove in selectedCoreCourses) {
			delete selectedCoreCourses[toRemove];
		}
		if (Object.keys(selectedCoreCourses).length == 4) {
			step = -3;
		}
	};
	let totalHours = 0;
	const addConc1Course = (code, hoursConc1) => {
		if (selectedConc1Courses[code] == true) {
			selectedConc1Courses[code] = false;
			delete selectedConc1Courses[code];

			return;
		}
		let electivesCanTake;
		let electivesTaken;

		let course = concentration1Details.electives.filter(
			(conc) => conc.course_code.split(' ')[1] == code.split(' ')[1]
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
			totalHours += course[0].hours;
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

		let course = concentration2Details.electives.filter(
			(conc) => conc.course_code.split(' ')[1] == code.split(' ')[1]
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
			totalHours += course[0].hours;
		} else {
			toast.error('Maximum electives reached, click on a selected elective to remove it!');
		}
		console.log(totalHours);

		if (totalHours == 9) {
			step = -5;
			totalHours = 0;
		}
	};

	const setConcentration1 = (con, num) => {
		step = 3;
		selectedConc1Courses = {};
		num == 1 ? (concentration1 = con) : (concentration2 = con);
		concentration1Details = csis.concentrations.filter((concen) => concen.name == con)[0];
		for (let i = 0; i < concentration1Details.required_courses.length; i++) {
			selectedConc1Courses[
				`${concentration1Details.required_courses[i].course_code} : ${concentration1Details.required_courses[i].course_name}`
			] = true;
		}
		hoursConc1 = concentration1Details.required_courses.reduce((total, course) => {
			return total + course.hours;
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
		concentration2Details = csis.concentrations.filter((concen) => concen.name == con)[0];
		for (let i = 0; i < concentration2Details.required_courses.length; i++) {
			selectedConc2Courses[
				`${concentration2Details.required_courses[i].course_code} : ${concentration2Details.required_courses[i].course_name}`
			] = true;
		}
		hoursConc2 = concentration2Details.required_courses.reduce((total, course) => {
			return total + course.hours;
		}, 0);
		totalHours = hoursConc2;
		if (totalHours == 9) {
			step = -5;
			totalHours = 0;
		}
	};
	let allCourses = [];
	let finalCourses = []
	let selectedElective;
	const moveAhead = () => {
		step = Math.abs(step);
		if (step == 5) {
			console.log('selected courses: ', selectedCoreCourses);
			console.log('concentration 1 courses: ', selectedConc1Courses);
			console.log('concentration 2 courses: ', selectedConc2Courses);
			allCourses = Object.keys({
				...selectedCoreCourses,
				...selectedConc1Courses,
				...selectedConc2Courses
			});
		}
		if (step == 6) {
			finalCourses = [...allCourses, selectedElective];
		}
	};
	let hoursConc1;
	let hoursConc2;

	let selectedCoursesPopup = false;

	let step = 0;
</script>

<Toaster class="font-calm" />
<!-- Overlay on the right that shows what courses hae been selected so far. -->
{#if Object.keys(selectedCoreCourses).length > 0}
	<div class="fixed bottom-5 right-10 z-10 flex flex-col gap-2 max-w-40">
		{#if selectedCoursesPopup}
			<div
				class="bg-purple px-2 py-1 rounded-l-xl flex-col flex gap-1 max-h-[125px] overflow-y-auto bar"
			>
				{#each Object.keys(selectedCoreCourses) as courses, index}
					<div class=" px-2 py-1 rounded-xl gap-1 flex">
						<p class="font-calm">{index + 1}:</p>
						<p class="font-calm">{courses}</p>
					</div>
				{/each}
			</div>
			{#if Object.keys(selectedConc1Courses).length > 0}
				<div
					class="bg-green px-2 py-1 rounded-l-xl flex-col flex gap-1 max-h-[125px] overflow-y-auto bar"
				>
					{#each Object.keys(selectedConc1Courses) as courses, index}
						<div class=" px-2 py-1 rounded-xl gap-1 flex">
							<p class="font-calm">{index + 5}:</p>
							<p class="font-calm">{courses}</p>
						</div>
					{/each}
				</div>
			{/if}

			{#if Object.keys(selectedConc2Courses).length > 0}
				<div
					class="bg-blue px-2 py-1 rounded-l-xl flex-col flex gap-1 max-h-[125px] overflow-y-auto bar"
				>
					{#each Object.keys(selectedConc2Courses) as courses, index}
						<div class=" px-2 py-1 rounded-xl gap-1 flex">
							<p class="font-calm">{index + 8}:</p>
							<p class="font-calm">{courses}</p>
						</div>
					{/each}
				</div>
			{/if}
			{#if selectedElective}
				<div
					class="bg-bradley px-2 py-1 rounded-l-xl flex-col flex gap-1 max-h-[125px] overflow-y-auto bar"
				>
					<div class=" px-2 py-1 rounded-xl gap-1 flex">
						<p class="font-calm">{11}:</p>
						<p class="font-calm">{selectedElective}</p>
					</div>
				</div>
			{/if}
		{/if}

		<button
			class=" bg-bradley flex justify-around px-2 py-1 rounded-xl items-center min-w-40"
			on:click={() => {
				selectedCoursesPopup = !selectedCoursesPopup;
			}}
		>
			<p class="font-base text-white cursor-pointer">Selected Coruses</p>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="size-5 stroke-white"
			>
				<path stroke-linecap="round" stroke-linejoin="round" d="m4.5 18.75 7.5-7.5 7.5 7.5" />
				<path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 7.5-7.5 7.5 7.5" />
			</svg>
		</button>
	</div>
{/if}

<div class="p-5 md:p-20 flex flex-col gap-4 relative bg-transparent">
	<ThemeSwitch />
	<div class="w-full items-start justify-start flex flex-col gap-1 relative">
		<h1 class="text-bradley font-calm text-2xl md:text-4xl bg-transparent">
			Master's in Computer Science
		</h1>
		<p class="dark:text-white text-dark font-base bg-transparent">
			The master’s degree in computer science is a 33 credit-hour program that enhances your skills
			for a career in network, database or intelligent systems administration, software engineering,
			programming and other related fields.
		</p>
	</div>
	<!-- {#if !startSelection} -->
	{#if step == 0}
		<Requirements
			bind:step
			bind:check
			bind:showProgramRequirements
			bind:showCoreRequirements
			bind:showConcRequirements
			{showReq}
		/>
	{/if}
	<!-- {#if startSelection} -->
	{#if step >= 1 || step <= -2}
		<CourseOption bind:option bind:step {setOption} />

		<!-- Select Core courses -->
		<!-- {#if option && optionSelected == true} -->
		{#if step >= 2 || step <= -3}
			<CoreCourses bind:selectedCoreCourses bind:step {addCoreCourse} />
		{/if}

		<!-- Select Concentration 1 courses -->
		<!-- {#if coreSelected && option && optionSelected == true} -->
		{#if step >= 3 || step <= -4}
			<Conc1
				bind:concentration1Details
				{setConcentration1}
				bind:concentration1
				bind:hoursConc1
				bind:selectedConc1Courses
				{addConc1Course}
			/>
		{/if}

		{#if step >= 4 || step <= -5}
			<Conc2
				bind:concentration2Details
				{setConcentration2}
				bind:concentration2
				bind:hoursConc2
				bind:selectedConc2Courses
				bind:concentration1Details
				{addConc2Course}
			/>
		{/if}

		{#if step >= 5 || step <= -6}
			<Electives bind:allCourses bind:selectedElective bind:step />
		{/if}

		{#if step >= 6 || step <= -7}
			<Paths bind:finalCourses  bind:step />
		{/if}

		<!-- {#if (option && optionSelected == false) || (Object.keys(selectedCoreCourses).length == 4 && coreSelected == false) || (conc1Selected = false && concentration1 || (hoursConc1 == 3 && Object.keys(selectedConc1Courses).length == 3) || (hoursConc1 == 6 && Object.keys(selectedConc1Courses).length == 2 && concentration1Details.name == "Emerging Topics in CS/CIS") || (hoursConc1 == 6 && Object.keys(selectedConc1Courses).length == 3 && concentration1Details.name != "Emerging Topics in CS/CIS") )} -->

		{#if step < 0}
			<div class="flex justify-start items-start bg-transparent">
				<button
					on:click={() => {
						moveAhead();
					}}
					class="flex justify-center items-center px-7 rounded-lg dark:hover:text-sky transition-all ease-in-out duration-100 align-middle justify-self-center font-base text-lg bg-bradley text-white cursor-pointer"
					><a class="bg-transparent" href="/department/csis">Next</a>
				</button>
			</div>
		{/if}
	{/if}
</div>
