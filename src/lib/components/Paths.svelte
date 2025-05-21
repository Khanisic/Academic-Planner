<script>
	import { onMount } from 'svelte';
	import VerticalList from './VerticalList.svelte';
	import toast from 'svelte-french-toast';
	import Modal from './Modal.svelte';
	export let step, finalCourses, allProfessors, selectedProfessors, currProbability, selectedIntake;
	export let selectedCoreCourses = {};
	export let selectedConc1Courses = {};
	export let selectedConc2Courses = {};
	export let selectedElective = [];
	let generatedData = [];

	let semesters = [];
	let semesterData = {};
	let semSelection = true;
	let availableCourses = []; // New variable to track available courses

	// Add state for tracking expanded semesters
	let expandedSemesters = {};

	// Add state for locked semesters
	let lockedSemesters = {};

	let showModal = false;

	// Function to generate semesters based on selected intake
	function generateSemesters(startIntake) {
		const [season, year] = startIntake.split(' ');
		const yearNum = parseInt(year);
		const seasons = ['Spring', 'Summer', 'Fall', 'January'];
		const startIndex = seasons.indexOf(season);

		semesters = [];
		semesterData = {};

		// Generate 6 semesters starting from the selected intake
		for (let i = 0; i < 8; i++) {
			const currentSeason = seasons[(startIndex + i) % 4];
			const currentYear = yearNum + Math.floor((startIndex + i) / 4);
			const semesterName = `${currentSeason} ${currentYear}`;
			semesters.push(semesterName);
			semesterData[semesterName] = [];
		}
	}

	// Initialize semesters when selectedIntake changes
	$: if (selectedIntake) {
		generateSemesters(selectedIntake);
	}

	// Initialize expanded state for each semester
	$: if (semesters) {
		semesters.forEach((sem) => {
			if (expandedSemesters[sem] === undefined) {
				expandedSemesters[sem] = true; // Start with all semesters expanded
			}
		});
	}

	// Function to get course type
	function getCourseType(course) {
		const courseKey = `${course.course_details.course_dept.split(' ')[0]} ${course.course_details.course_code} : ${course.course_details.course_title}`;
		if (selectedCoreCourses[courseKey]) {
			return 'core';
		} else if (selectedConc1Courses[courseKey]) {
			return 'concentration1';
		} else if (selectedConc2Courses[courseKey]) {
			return 'concentration2';
		} else if (selectedElective.includes(courseKey)) {
			return 'elective';
		}
		return 'unknown';
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

			let res = await response.json();

			// Add type information to each course
			generatedData = res.courseData.map((course) => ({
				...course,
				type: getCourseType(course)
			}));

			availableCourses = [...generatedData]; // Initialize available courses
			allProfessors = res.allProfessors;
			selectedProfessors = [...allProfessors];
		} catch (error) {
			console.error('Error fetching generated data:', error);
		}
	});

	const calculateTotalProb = (reset) => {
		if (reset) {
			currProbability = 0;
			return;
		}

		let totalProbability = 0;
		let totalCourses = 0;

		// Calculate probability for each semester
		semesters.forEach((semester) => {
			const semesterCourses = semesterData[semester] || [];
			const isFall = semester.toLowerCase().includes('fall');
			const isSpring = semester.toLowerCase().includes('spring');
			const isLocked = lockedSemesters[semester];

			// Calculate total probability for the semester
			const semesterTotal = semesterCourses.reduce((acc, course) => {
				// If semester is locked, count as 100% probability
				const availability = isLocked
					? 1
					: isFall
						? course.fall_availability
						: course.spring_availability;
				return acc + availability;
			}, 0);

			// Only count major semesters (Fall/Spring) in the first 3 positions
			const semesterIndex = semesters.indexOf(semester);
			if ((isFall || isSpring) && semesterIndex < 3) {
				totalProbability += semesterTotal;
				totalCourses += semesterCourses.length;
			}
		});

		// Calculate final probability, defaulting to 0 if no courses
		currProbability = totalCourses > 0 ? (totalProbability * 100) / totalCourses : 0;
	};

	function isMajorSemester(semester) {
		return semester.toLowerCase().includes('fall') || semester.toLowerCase().includes('spring');
	}

	function getMajorSemesterIndex(semester) {
		let majorCount = 0;
		for (let i = 0; i <= semesters.indexOf(semester); i++) {
			if (isMajorSemester(semesters[i])) {
				majorCount++;
			}
		}
		return majorCount;
	}

	function canAddCourse(semester, course) {
		const semesterIndex = semesters.indexOf(semester);
		const isSummerOrJanuary =
			semester.toLowerCase().includes('summer') || semester.toLowerCase().includes('january');
		const currentCourses = semesterData[semester]?.length || 0;
		const majorSemesterIndex = getMajorSemesterIndex(semester);

		// Check if trying to add a core course in 3rd or 4th major semester
		if (course?.type === 'core' && (majorSemesterIndex === 3 || majorSemesterIndex === 4)) {
			toast.error('Core courses cannot be taken in 3rd or 4th major semester');
			return false;
		}

		if (isSummerOrJanuary) {
			return currentCourses < 2;
		}

		if (semesterIndex < 7) {
			return currentCourses < 4;
		}

		return true; // No limit for other semesters
	}

	function handleCourseMove(courseTaken, fromSemester, toSemester) {
	
		if (!canAddCourse(toSemester, courseTaken)) {
			const isSummerOrJanuary =
				toSemester.toLowerCase().includes('summer') || toSemester.toLowerCase().includes('january');
			if (isSummerOrJanuary) {
				toast.error('Maximum 1 course allowed in Summer/January semesters');
			} else {
				toast.error('Maximum 3 courses allowed in Fall/Spring semesters');
			}
			semesterData[toSemester] = semesterData[toSemester].filter(
				(course) => course.id != courseTaken.id
			);
			const allSemesterCourseIds = Object.values(semesterData)
				.flat()
				.map((course) => course.id);

			availableCourses = generatedData.filter(
				(course) => !allSemesterCourseIds.includes(course.id)
			);
			return false;
		}

		calculateTotalProb();
		return true;
	}

	// Function to reset all courses
	function resetCourses() {
		// Move all courses back to available courses
		availableCourses = [...generatedData];
		semesters.forEach((semester) => {
			if (semesterData[semester]) {
				semesterData[semester] = [];
			}
		});
		calculateTotalProb('reset');
	}

	// Toggle function for semester expansion
	const toggleSemester = (semester) => {
		expandedSemesters[semester] = !expandedSemesters[semester];
		expandedSemesters = expandedSemesters; // Trigger reactivity
	};

	// Function to reset courses for a specific semester
	const resetSemesterCourses = (semester) => {

		if (semesterData[semester]) {
			// Get the IDs of courses in the current semester
			const currentSemesterCourseIds = semesterData[semester].map((course) => course.id);

			// Clear the current semester
			semesterData[semester] = [];

			// Rebuild available courses from generatedData
			// First, get all course IDs that are currently in any semester
			const allSemesterCourseIds = Object.values(semesterData)
				.flat()
				.map((course) => course.id);

			// Then, available courses are all courses from generatedData that are not in any semester
			availableCourses = generatedData.filter(
				(course) => !allSemesterCourseIds.includes(course.id)
			);

			// Force a UI update
			semesterData = { ...semesterData };
			calculateTotalProb();
		}
	};

	// Function to toggle semester lock
	const toggleSemesterLock = (semester) => {
		lockedSemesters[semester] = !lockedSemesters[semester];
		lockedSemesters = { ...lockedSemesters }; // Trigger reactivity
		calculateTotalProb();
	};

	function handleDone() {
		showModal = true;
	}

	function downloadCoursePlan() {
		let content = `Academic Course Plan\n`;
		content += `==================\n\n`;
		content += `Intake: ${selectedIntake}\n\n`;

		// Add semester-wise courses
		semesters.forEach((semester) => {
			content += `${semester}\n`;
			content += `${'-'.repeat(semester.length)}\n`;

			semesterData[semester].forEach((course) => {
				const courseType = course.type.charAt(0).toUpperCase() + course.type.slice(1);
				content += `[${courseType}] ${course.course_details.course_dept.split(' ')[0]} ${course.course_details.course_code}: ${course.course_details.course_title}\n`;
			});
			content += '\n';
		});

		// Add probability
		content += `Overall Probability: ${currProbability.toFixed(1)}%\n`;

		// Create and download file
		const blob = new Blob([content], { type: 'text/plain' });
		const url = window.URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = `Bradley_Course_Plan.txt`;
		document.body.appendChild(a);
		a.click();
		window.URL.revokeObjectURL(url);
		document.body.removeChild(a);
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
			<p class="dark:text-lightpurple text-dark font-calm text-2xl bg-transparent">
				Create your path
			</p>
		</div>
		<button
			on:click={resetCourses}
			class="flex items-center gap-2 px-4 py-1 rounded-lg bg-bradley text-white hover:bg-white dark:bg-darkInner hover:text-bradley dark:hover:bg-darkBg dark:hover:text-white transition-colors duration-200"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="size-5"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
				/>
			</svg>
			<p class="font-base">Reset Courses</p>
		</button>
	</div>

	<!-- Course Type Legend -->
	<div class="flex flex-wrap gap-3 mt-2 mb-4">
		<div class="flex items-center gap-2">
			<div
				class="w-4 h-4 rounded-full bg-bradley dark:bg-bradley border-bradley border-[1px]"
			></div>
			<p class="font-base text-dark dark:text-white">Core Courses</p>
		</div>
		<div class="flex items-center gap-2">
			<div
				class="w-4 h-4 rounded-full bg-purple dark:bg-lightpurple border-purple border-[1px]"
			></div>
			<p class="font-base text-dark dark:text-white">Concentration 1</p>
		</div>
		<div class="flex items-center gap-2">
			<div class="w-4 h-4 rounded-full bg-blue dark:bg-blue border-blue border-[1px]"></div>
			<p class="font-base text-dark dark:text-white">Concentration 2</p>
		</div>
		<div class="flex items-center gap-2">
			<div class="w-4 h-4 rounded-full bg-yellow dark:bg-yellow border-yellow border-[1px]"></div>
			<p class="font-base text-dark dark:text-white">Electives</p>
		</div>
	</div>

	{#if generatedData.length > 0 && semesters.length > 0}
		<div class="flex gap-4">
			<div class="w-1/2 sticky top-4 h-fit">
				<p class="font-calm text-xl text-black dark:text-white">Your Courses:</p>
				<VerticalList items={availableCourses} semSelection={false} />
				<div class="mt-4 flex justify-end">
					<button
						on:click={handleDone}
						class="px-6 py-2 font-calm bg-bradley text-white rounded-lg hover:bg-white hover:text-blue hover:border-blue border-bradley border-[1px] dark:hover:bg-darkBg dark:hover:text-white transition-colors duration-200"
					>
						Done
					</button>
				</div>
			</div>
			<div class="w-1/2">
				{#each semesters as semester}
					<div>
						<div class="flex justify-between items-center pr-4">
							<button
								on:click={() => toggleSemester(semester)}
								class="flex gap-4 relative group transition-colors duration-200 border-darkBorder cursor-pointer border-b-0 w-fit my-1 px-2 rounded-lg items-center"
							>
								<p class="font-calm text-black text-xl group-hover:text-bradley dark:text-white">
									{semester}:
								</p>
								<span
									class=" dark:text-lightpurple text-purple font-calm bottom-2 -left-2 absolute text-sm px-2 py-0.5 rounded-full"
								>
									{semesterData[semester]?.length || ''}
								</span>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="1.5"
									stroke="currentColor"
									class={`size-4 group-hover:-translate-y-1 transition-all ease-in-out duration-200 group-hover:text-bradley dark:text-white ${expandedSemesters[semester] ? 'rotate-180' : ''}`}
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="m4.5 18.75 7.5-7.5 7.5 7.5"
									/>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="m4.5 12.75 7.5-7.5 7.5 7.5"
									/>
								</svg>
							</button>
							<div class="flex gap-2">
								<button
									on:click={() => toggleSemesterLock(semester)}
									class="px-2 py-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										stroke-width="1.5"
										stroke="currentColor"
										class={`size-4 cursor-pointer dark:text-white ${lockedSemesters[semester] ? 'text-bradley dark:text-bradley' : 'hover:text-bradley'}`}
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
										/>
									</svg>
								</button>
								<button
									on:click={() => resetSemesterCourses(semester)}
									class="px-2 py-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										stroke-width="1.5"
										stroke="currentColor"
										class="size-4 hover:text-bradley dark:hover:text-bradley cursor-pointer dark:text-white"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
										/>
									</svg>
								</button>
							</div>
						</div>
						{#if expandedSemesters[semester]}
							<VerticalList
								{calculateTotalProb}
								bind:semSelection
								bind:items={semesterData[semester]}
								{semester}
								{lockedSemesters}
								on:courseMove={(e) => handleCourseMove(e.detail.course, e.detail.from, semester)}
							/>
						{/if}
					</div>
				{/each}
			</div>
		</div>
	{:else}
		<p class="font-base text-text">Loading...</p>
	{/if}
</div>

{#if showModal}
	<Modal on:close={() => (showModal = false)}>
		<div class="p-6">
			<div class="flex justify-between items-center mb-4">
				<h2 class="text-2xl font-calm text-black dark:text-white">Your Course Plan</h2>
			</div>
			<div class="space-y-4">
				{#each semesters as semester}
					<div class="border-b border-gray-200 dark:border-gray-700 pb-4">
						<h3 class="text-xl font-calm mb-2 text-black dark:text-white">{semester}</h3>
						<div class="space-y-2">
							{#each semesterData[semester] as course}
								<div class="flex items-center gap-2">
									<div
										class={`w-3 h-3 rounded-full ${course.type === 'core' ? 'bg-bradley' : course.type === 'concentration1' ? 'bg-purple' : course.type === 'concentration2' ? 'bg-blue' : 'bg-yellow'}`}
									></div>
									<p class="text-black dark:text-white font-base">
										<span class="font-bold"
											>{course.course_details.course_dept.split(' ')[0]}
											{course.course_details.course_code}</span
										>
										: {course.course_details.course_title}
									</p>
								</div>
							{/each}
						</div>
					</div>
				{/each}
				<div class="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
					<h3 class="text-xl font-calm mb-2 text-black dark:text-white">Overall Probability</h3>
					<p class="text-2xl font-calm text-bradley">{currProbability.toFixed(1)}%</p>
				</div>

				<button
					on:click={downloadCoursePlan}
					class="flex items-center gap-2 px-4 py-2 font-calm bg-bradley text-white rounded-lg hover:bg-white hover:text-blue hover:border-blue border-bradley border-[1px] dark:hover:bg-darkBg dark:hover:text-white transition-colors duration-200"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="w-5 h-5"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
						/>
					</svg>
					Download Plan
				</button>
			</div>
		</div>
	</Modal>
{/if}
