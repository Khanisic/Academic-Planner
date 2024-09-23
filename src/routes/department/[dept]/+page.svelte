<script>
	import ThemeSwitch from '$lib/ThemeSwitch/ThemeSwitch.svelte';
	import { csis } from '$lib/assets/mscs.js';

	let concentrations = [
		'Software Engineering',
		'Data Analytics',
		'Cybersecurity',
		'Computer Game Technology',
		'Web Developement',
		'Computing Management',
		'Emerging Topics in CS or CIS'
	];
	let selectedCoreCourses = {};
	// to make it nothing
	let option;

	let concentration1;
	let concentration1Details = {};

	console.log(concentration1Details);
	let concentration2;
	const setConcentration = (con, num) => {
		num == 1 ? (concentration1 = con) : (concentration2 = con);
		concentration1Details = csis.concentrations.filter((concen) => concen.name == con)[0];
		hours = concentration1Details.required_courses.reduce((total, course) => {
			return total + course.hours;
		}, 0);
		console.log(concentration1Details);
	};
	let showProgramRequirements = false;
	let showCoreRequirements = false;
	let showConcRequirements = false;
	let check = false;
	let startSelection = false;
	// to make it false
	let optionSelected = false;

	let coreSelected = false;
	let conc1Selected = false;

	function showReq(num) {
		if (num == 1) {
			showProgramRequirements = !showProgramRequirements;
		} else if (num == 2) {
			showCoreRequirements = !showCoreRequirements;
		} else if (num == 3) {
			showConcRequirements = !showConcRequirements;
		}
	}

	const setOption = (opt) => {
		option = opt;
	};

	const addCourse = (code, toRemove) => {
		selectedCoreCourses[code] = true;
		if (toRemove in selectedCoreCourses) {
			delete selectedCoreCourses[toRemove];
		}
		console.log(selectedCoreCourses);
	};

	const moveAhead = () => {
		if (option && optionSelected == false) {
			optionSelected = true;
		} else if (Object.keys(selectedCoreCourses).length == 4 && optionSelected == true) {
			coreSelected = true;
		}
	};

	let hours;
</script>

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

	{#if !startSelection}
		<div>
			<button
				on:click={() => {
					showReq(1);
				}}
				class="flex items-center gap-4 cursor-pointer w-full"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="min-w-5 max-w-7 stroke-green"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
					/>
				</svg>

				<p class="text-dark dark:text-white font-calm text-2xl">Program Requirements</p>

				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class={` ${!showProgramRequirements ? 'rotate-0' : 'rotate-180'} min-w-5 max-w-7 stroke-green transition-all duration-150 ease-in-out`}
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3"
					/>
				</svg>
			</button>
			{#if showProgramRequirements}
				<div class="flex flex-col gap-2 py-2">
					<div class="flex gap-2">
						<p class="font-base text-dark dark:text-white">
							At least 21 of the 33 required hours must be earned in courses labeled CS. At most,
							six hours may be earned in approved courses other than those labeled CS or CIS.
						</p>
					</div>
				</div>
			{/if}
		</div>

		<div>
			<button
				on:click={() => {
					showReq(2);
				}}
				class="flex items-center gap-4 cursor-pointer w-full"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="min-w-5 max-w-7 stroke-green"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
					/>
				</svg>

				<p class="text-dark dark:text-white font-calm text-2xl">Core Requirements</p>

				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class={` ${!showCoreRequirements ? 'rotate-0' : 'rotate-180'} min-w-5 max-w-7 stroke-green transition-all duration-150 ease-in-out`}
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3"
					/>
				</svg>
			</button>
			{#if showCoreRequirements}
				<div class="flex flex-col gap-2">
					<div class="flex gap-2 py-2">
						<p class="font-base text-dark dark:text-white w-fit">
							To satisfy the core (breadth) requirement, four courses must be taken, one from each
							pair given below (either by taking the course or showing evidence of the completion of
							an equivalent course elsewhere)
						</p>
					</div>
					<div class="flex flex-col">
						{#each csis.requirements.required_courses as courses}
							<p class="font-base text-dark dark:text-white w-fit">
								<span class="font-semibold">{courses.course_code} {courses.course_name}</span> or
								<span class="font-semibold"
									>{courses.alternative.course_code} {courses.alternative.course_name}</span
								>
							</p>
						{/each}
					</div>
				</div>
			{/if}
		</div>

		<div>
			<button
				on:click={() => {
					showReq(3);
				}}
				class="flex items-center gap-4 cursor-pointer w-full"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="min-w-5 max-w-7 stroke-green"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
					/>
				</svg>

				<p class="text-dark dark:text-white font-calm text-2xl">Concentration Requirements</p>

				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class={` ${!showConcRequirements ? 'rotate-0' : 'rotate-180'} min-w-5 max-w-7 stroke-green transition-all duration-150 ease-in-out`}
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3"
					/>
				</svg>
			</button>
			{#if showConcRequirements}
				<div class="flex flex-col gap-2 py-2">
					<div class="flex gap-2">
						<p class="font-base text-dark dark:text-white w-fit">
							To satisfy the depth requirements, the student must take three courses from one of the
							concentrations offered by the department. No course taken to satisfy the core
							requirement may be counted as one of the three courses in this requirement.
						</p>
					</div>
				</div>
			{/if}
		</div>

		<div class="flex flex-col items-center md:items-start gap-4 py-3 font-base text-silver">
			<div class="flex items-center dark:text-white text-dark font-base gap-3">
				<input
					on:click={() => {
						check = !check;
					}}
					placeholder="Confirm Password"
					class="w-4 h-4 accent-green dark:text-white text-dark outline-none"
					type="checkbox"
				/>
				<p class="">I have read the course requirements and I'm ready to select my courses.</p>
			</div>

			{#if check}
				<div class="flex justify-center items-end bg-transparent">
					<button
						on:click={() => {
							startSelection = true;
						}}
						class="flex justify-center items-center px-7 rounded-lg dark:hover:text-sky transition-all ease-in-out duration-100 align-middle justify-self-center font-base text-lg bg-bradley text-white cursor-pointer"
						><a class="bg-transparent" href="/department/csis">Start selecting courses</a>
					</button>
				</div>
			{:else}
				<div class="flex justify-center items-end bg-transparent">
					<button
						class="flex justify-center items-center px-7 rounded-lg align-middle justify-self-center font-base text-lg bg-grey cursor-not-allowed text-white"
						>Start selecting courses</button
					>
				</div>
			{/if}
		</div>
	{/if}

	{#if startSelection}
		<h1 class="text-purple font-calm text-2xl md:text-4xl bg-transparent">Select Courses</h1>

		<!-- Put checkmark for thesis or comprehensive -->

		<div class="flex gap-5 items-start bg-transparent">
			<div
				class="dark:bg-purple bg-purple flex justify-center items-center text-white font-calm w-10 h-10 rounded-xl"
			>
				1.
			</div>
			<div class="flex flex-col gap-2 bg-transparent">
				<p class="dark:text-purple text-dark font-calm text-2xl bg-transparent">
					Select Course Option
				</p>
				<div class="flex gap-5 relative text-white font-base bg-transparent">
					<button
						on:click={() => {
							setOption('thesis');
						}}
						class="relative cursor-pointer px-2"
					>
						<div
							class={`dark:bg-lightpurple  bg-lightpurple -left-2 ${option === 'thesis' ? 'w-full translate-x-[7px] text-dark' : 'w-1 dark:text-white text-lightbradley'}  h-6 rounded-lg transition-all ease-in-out duration-300 absolute z-0`}
						></div>
						<p
							class={` ${option === 'thesis' ? ' text-dark' : ' dark:text-white text-dark'} relative bg-transparent`}
						>
							Thesis
						</p>
					</button>
					<button
						on:click={() => {
							setOption('compre');
						}}
						class="relative cursor-pointer px-2"
					>
						<div
							class={`dark:bg-lightpurple bg-lightpurple -left-2 ${option === 'compre' ? 'w-full translate-x-[7px] text-dark' : 'w-1 dark:text-white text-lightbradley'}  h-6 rounded-lg transition-all ease-in-out duration-300 absolute z-0`}
						></div>
						<p
							class={` ${option === 'compre' ? ' text-dark' : ' dark:text-white text-dark'} relative bg-transparent`}
						>
							Comprehensive
						</p>
					</button>
				</div>
			</div>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="size-8 dark:stroke-purple stroke-purple bg-transparent"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5"
				/>
			</svg>
		</div>
		{#if option == 'compre' && optionSelected == false}
			<p class="dark:text-white font-base">
				Every student must pass a written comprehensive examination that will be based on the core
				requirements for the program pursued.
			</p>
		{:else if option == 'thesis' && optionSelected == false}
			<div class="flex flex-col gap-2">
				<p class="dark:text-white font-base">
					Interested and qualified students are offered the option of writing a master’s thesis.
					Students selecting this option are encouraged to choose an advisor and topic as early as
					possible in order to plan the thesis development and any needed supporting coursework. The
					following policies apply to thesis
				</p>
				<p class="dark:text-white font-base">
					1. A minimum grade point average of 3.5 in computer science and computer information
					systems graduate courses is required for students enrolling in CS 699 (Thesis).
				</p>
				<p class="dark:text-white font-base">
					2. No student may register for CS 699 until 9 hours of graduate courses have been
					completed in the department.
				</p>
				<p class="dark:text-white font-base">
					3. Six credit hours of CS 699 are required and, upon completion, the thesis must be
					defended in an oral examination. No grade will be given for CS 699 until after the oral
					defense.
				</p>
				<p class="dark:text-white font-base">
					4. A written outline of the thesis project and a tentative schedule must be submitted to
					and approved by the graduate coordinator and the chair prior to the registration for CS
					699.
				</p>
			</div>
		{/if}

		<!-- Select Core courses -->
		{#if option && optionSelected == true}
			<div class="flex gap-5 items-start bg-transparent">
				<div
					class="dark:bg-purple bg-purple flex justify-center items-center text-white font-calm w-10 h-10 rounded-xl"
				>
					2.
				</div>
				<div class="flex flex-col gap-2 bg-transparent">
					<p class="dark:text-purple text-dark font-calm text-2xl bg-transparent">
						Select Core Courses
					</p>
				</div>
			</div>
			<p class="font-base dark:text-purple text-dark">Select either course from each row</p>
			<div class="flex gap-4">
				<div class="flex flex-col gap-3">
					{#each csis.requirements.required_courses as courses, index}
						<button
							on:click={() => {
								addCourse(courses.course_code, courses.alternative.course_code);
							}}
							class={`${selectedCoreCourses[courses.course_code] == true ? 'bg-purple' : 'bg-lightpurple'}  border-2 border-lightpurple max-w-[350px] shadow-md font-base hover:bg-purple rounded-lg px-3 cursor-pointer `}
							>{courses.course_code} {courses.course_name}</button
						>
					{/each}
				</div>

				<div class="flex flex-col gap-3">
					{#each csis.requirements.required_courses as courses, index}
						<button
							on:click={() => {
								addCourse(courses.alternative.course_code, courses.course_code);
							}}
							class={`${selectedCoreCourses[courses.alternative.course_code] == true ? 'bg-purple' : 'bg-lightpurple'}  border-2 border-lightpurple max-w-[350px] shadow-md font-base hover:bg-purple rounded-lg px-3 cursor-pointer `}
							>{courses.alternative.course_code} {courses.alternative.course_name}</button
						>
					{/each}
				</div>
			</div>
		{/if}
		<!-- Select Concentration 1 courses -->
		{#if coreSelected && option && optionSelected == true}
			<div class="flex gap-5 items-start bg-transparent">
				<div
					class="dark:bg-purple bg-purple flex justify-center items-center text-white font-calm w-10 h-10 rounded-xl"
				>
					3.
				</div>
				<div class="flex flex-col gap-2 bg-transparent">
					<p class="dark:text-purple text-dark font-calm text-2xl bg-transparent">
						Select Concentration 1
					</p>
				</div>
			</div>
			<div class="flex flex-wrap gap-2">
				{#each csis.concentrations as concentrationSelect}
					<button
						on:click={() => {
							setConcentration(concentrationSelect.name, 1);
						}}
						class={`${concentration1 == concentrationSelect.name ? ' border-purple bg-purple' : 'bg-lightpurple'} border-2 border-lightpurple  shadow-md font-base hover:bg-purple rounded-lg px-3 cursor-pointer hover:text-navy`}
					>
						{concentrationSelect.name}
					</button>
				{/each}
			</div>
			{#if concentration1 && concentration1Details}
				<div class="flex flex-col gap-2">
					<p class="dark:text-purple text-dark font-calm text-xl bg-transparent">
						{concentration1Details.name}
					</p>
					<p class="dark:text-purple text-dark font-base text-base bg-transparent">
						{concentration1Details.about}
					</p>
					<p class="dark:text-purple text-dark font-calm text-lg bg-transparent">
						Required Courses - {hours} hours
					</p>
					{#each concentration1Details.required_courses as courses, index}
						<button
							class={`bg-lightpurple  border-2 border-lightpurple max-w-[350px] shadow-md font-base hover:bg-purple rounded-lg px-3 cursor-pointer `}
							>{courses.course_code} {courses.course_name}</button
						>
					{/each}

					{#if concentration1Details.electives}
						<p class="dark:text-purple text-dark font-calm text-lg bg-transparent">Electives</p>
						{#each concentration1Details.electives as courses, index}
							<button
								class={`bg-lightpurple  border-2 border-lightpurple max-w-[350px] shadow-md font-base hover:bg-purple rounded-lg px-3 cursor-pointer `}
								>{courses.course_code} {courses.course_name}</button
							>
						{/each}
					{/if}
				</div>
			{/if}
		{/if}

		{#if (option && optionSelected == false) || (Object.keys(selectedCoreCourses).length == 4 && coreSelected == false) || (conc1Selected = false && concentration1)}
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
