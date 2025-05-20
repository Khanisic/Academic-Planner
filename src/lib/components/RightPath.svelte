<script>
	export let step;
	export let currProbability;
	export let showFilters;
	export let allProfessors;
	export let selectedProfessors;
	export let selectedCoreCourses;
	export let selectedConc1Courses, concentration1Details;
	export let selectedConc2Courses, concentration2Details;
	export let selectedElective;
	export let selectingSecondConcentration;
</script>

<div class="group flex flex-col gap-2 px-2 pb-3">
	{#if step >= 7}
		<p class="font-base text-text">
			Drag and drop the courses in the respective semesters to know the probability of getting that
			course for that semester, additionally apply filters to get the best outcome.
		</p>

		<p class="flex flex-wrap mt-3 gap-2 font-base text-text">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="2.5"
				stroke="currentColor"
				class={`size-5 text-bold cursor-pointer dark:text-white text-bradley`}
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
				/>
			</svg> Use to lock a semester, by doing this the overall probability will not change as it indicated
			that you have already taken that course and are finished with that semester
		</p>
		<div
			class="text-text w-[220px] justify-center items-center border-lightBorder dark:hover:text-bradley dark:hover:border-bradley hover:text-blue hover:border-blue dark:border-darkBorder border-[1px] flex flex-col gap-2 font-calm bg-leftBar dark:bg-darkLeftBar px-3 py-2 rounded-2xl"
		>
			<p class="font-calm text-xl text-center text-black dark:text-white">
				Probability of Current Path:
			</p>
			<p class="text-xl">{currProbability.toFixed(2)} %</p>
		</div>

		<!-- Removing filters option for now as there are less number of professors
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
					<path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
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
		</div> -->
	{:else if Object.keys(selectedCoreCourses).length > 0}
		<div class="mb-10 flex flex-col items-center gap-2">
			<p class="font-calm text-lg dark:text-green text-bradley">Core Courses</p>
			{#each Object.keys(selectedCoreCourses) as courses, index}
				<div
					class="text-text w-[220px] justify-center items-center border-lightBorder dark:hover:text-green dark:hover:border-green hover:text-black hover:border-black dark:border-darkBorder border-[1px] flex gap-2 font-calm bg-leftBar dark:bg-darkLeftBar px-3 py-1 rounded-2xl"
				>
					<p class="font-calm">{index + 1}:</p>
					<p class="font-calm text-center overflow-hidden">{courses.slice(0, 20)}</p>
				</div>
			{/each}

			<div
				class="border-b-lightBorder w-1/2 mb-3 group dark:border-b-darkBorder border-r-0 border-l-0 border-t-0 border-[1px] flex flex-col gap-2 px-2 pb-3 text-center items-center"
			></div>

			{#if Object.keys(selectedConc1Courses).length > 0}
				<p class="font-calm text-lg text-center dark:text-lightpurple text-bradley">
					Concentration 1: <br />
					{concentration1Details.concentration_name} Courses
				</p>
				{#each Object.keys(selectedConc1Courses) as courses, index}
					<div
						class="text-text w-[220px] justify-center items-center border-lightBorder dark:hover:text-blue dark:hover:border-blue hover:text-black hover:border-black dark:border-darkBorder border-[1px] flex gap-2 font-calm bg-leftBar dark:bg-darkLeftBar px-3 py-1 rounded-2xl"
					>
						<p class="font-calm">{index + 5}:</p>
						<p class="font-calm text-center overflow-hidden">{courses.slice(0, 25)}</p>
					</div>
				{/each}
			{/if}
			<div
				class="border-b-lightBorder w-1/2 mb-3 group dark:border-b-darkBorder border-r-0 border-l-0 border-t-0 border-[1px] flex flex-col gap-2 px-2 pb-3 text-center items-center"
			></div>
			{#if Object.keys(selectedConc2Courses).length > 0}
				<p class="font-calm text-lg text-center dark:text-yellow text-bradley">
					Concentration 2: <br />
					{concentration2Details.concentration_name} Courses
				</p>

				{#each Object.keys(selectedConc2Courses) as courses, index}
					<div
						class="text-text w-[220px] justify-center items-center border-lightBorder dark:hover:text-yellow dark:hover:border-yellow hover:text-black hover:border-black dark:border-darkBorder border-[1px] flex gap-2 font-calm bg-leftBar dark:bg-darkLeftBar px-3 py-1 rounded-2xl"
					>
						<p class="font-calm">{index + 8}:</p>
						<p class="font-calm text-center overflow-hidden">{courses.slice(0, 25)}</p>
					</div>
				{/each}
			{/if}
			<div
				class="border-b-lightBorder w-1/2 mb-3 group dark:border-b-darkBorder border-r-0 border-l-0 border-t-0 border-[1px] flex flex-col gap-2 px-2 pb-3 text-center items-center"
			></div>

			{#if selectedElective.length > 0}
				<p class="font-calm text-lg text-center dark:text-bradley text-bradley">Electives</p>

				{#each selectedElective as courses, index}
					<div
						class="text-text w-[220px] justify-center items-center border-lightBorder dark:hover:text-bradley dark:hover:border-bradley hover:text-black hover:border-black dark:border-darkBorder border-[1px] flex gap-2 font-calm bg-leftBar dark:bg-darkLeftBar px-3 py-1 rounded-2xl"
					>
						<p class="font-calm">{selectingSecondConcentration ? index + 11 : index + 8}:</p>
						<p class="font-calm text-center overflow-hidden">{courses.slice(0, 25)}</p>
					</div>
				{/each}
			{/if}
		</div>
	{/if}
</div>
