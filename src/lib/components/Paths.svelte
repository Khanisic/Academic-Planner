<script>
	import { onMount } from 'svelte';
	import VerticalList from './VerticalList.svelte';
	import toast from 'svelte-french-toast';
	export let step, finalCourses, allProfessors, selectedProfessors, currProbability, selectedIntake;
	let generatedData = [];

	let semesters = [];
	let semesterData = {};
	let semSelection = true;
	let availableCourses = []; // New variable to track available courses

	// Function to generate semesters based on selected intake
	function generateSemesters(startIntake) {
		const [season, year] = startIntake.split(' ');
		const yearNum = parseInt(year);
		const seasons = ['Spring', 'Fall'];
		const startIndex = seasons.indexOf(season);
		
		semesters = [];
		semesterData = {};
		
		// Generate 4 semesters starting from the selected intake
		for (let i = 0; i < 4; i++) {
			const currentSeason = seasons[(startIndex + i) % 2];
			const currentYear = yearNum + Math.floor((startIndex + i) / 2);
			const semesterName = `${currentSeason} ${currentYear}`;
			semesters.push(semesterName);
			semesterData[semesterName] = [];
		}
	}

	// Initialize semesters when selectedIntake changes
	$: if (selectedIntake) {
		generateSemesters(selectedIntake);
	}

	onMount(async () => {
		try {
			// Make the API call to /api/generate
			const response = await fetch('/api/generate', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ courses: finalCourses })
			});

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.error || 'Failed to generate course data');
			}

			// Parse the JSON response
			let res = await response.json();

			generatedData = res.courseData;
			availableCourses = [...generatedData]; // Initialize available courses
			allProfessors = res.allProfessors;
			selectedProfessors = [...allProfessors];
		} catch (error) {
			console.error('Error fetching generated data:', error);
		}
	});

	const calculateTotalProb = () => {
		if (reset) {
			currProbability = 0;
			return;
		}
		let totalProbability = 0;
		let totalCourses = 0;

		// Calculate probability for each semester
		semesters.forEach(semester => {
			const semesterCourses = semesterData[semester] || [];
			const semesterTotal = semesterCourses.reduce((acc, course) => acc + course.fall_availability, 0);
			totalProbability += semesterTotal;
			totalCourses += semesterCourses.length;
		});

		currProbability = (totalProbability * 100) / totalCourses;
	};

	// Function to check if a semester has reached its course limit
	function canAddCourse(semester) {
		const semesterIndex = semesters.indexOf(semester);
		// First 3 semesters have a limit of 3 courses
		if (semesterIndex < 3) {
			return (semesterData[semester]?.length || 0) < 3;
		}
		return true; // No limit for the last semester
	}

	// Function to handle course movement between semesters
	function handleCourseMove(course, fromSemester, toSemester) {
		if (!canAddCourse(toSemester)) {
			toast.error('Maximum 3 courses allowed in the first 3 semesters');
			return false;
		}

		if (fromSemester) {
			semesterData[fromSemester] = semesterData[fromSemester].filter(c => c !== course);
			availableCourses = [...availableCourses, course];
		}
		if (toSemester) {
			semesterData[toSemester] = [...(semesterData[toSemester] || []), course];
			availableCourses = availableCourses.filter(c => c !== course);
		}
		calculateTotalProb();
		return true;
	}

	// Function to reset all courses
	function resetCourses() {
		// Move all courses back to available courses
		semesters.forEach(semester => {
			if (semesterData[semester]) {
				availableCourses = [...availableCourses, ...semesterData[semester]];
				semesterData[semester] = [];
			}
		});
		calculateTotalProb("reset");
	}
</script>

<div class="flex flex-col gap-2">
	<div class="flex gap-5 items-center bg-transparent mt-1">
		<div
			class="dark:bg-purple bg-purple flex justify-center items-center text-white font-calm w-10 h-10 rounded-xl"
		>
			7.
		</div>
		<div class="flex flex-col gap-2 bg-transparent">
			<p class="dark:text-lightpurple text-dark font-calm text-2xl bg-transparent">Create your path</p>
		</div>
		<button
			on:click={resetCourses}
			class="flex items-center gap-2 px-4 py-2 rounded-lg bg-bradley text-white hover:bg-white dark:bg-darkInner hover:text-bradley dark:hover:bg-darkBg dark:hover:text-white transition-colors duration-200"
		>
			<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
				<path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
			</svg>
			<p class="font-base">Reset Courses</p>
		</button>
	</div>
	{#if generatedData.length > 0 && semesters.length > 0}
		<div class="flex gap-4">
			<div class="w-1/2">
				<p class="font-calm text-black dark:text-white">Your Courses:</p>
				<VerticalList items={availableCourses} semSelection={false} />
			</div>
			<div class="w-1/2">
				{#each semesters as semester}
					<div>
						<p class="font-calm text-black dark:text-white">{semester}:</p>
						<VerticalList
							{calculateTotalProb}
							bind:semSelection
							items={semesterData[semester] || []}
							{semester}
							on:courseMove={(e) => handleCourseMove(e.detail.course, e.detail.from, semester)}
						/>
						{#if semesters.indexOf(semester) < 3}
							<p class="text-sm font-base text-gray-500">(Max 3 courses)</p>
						{/if}
					</div>
				{/each}
			</div>
		</div>
	{:else}
		<p class="font-base text-text">Loading...</p>
	{/if}
</div>
