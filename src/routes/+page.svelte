<script>
	let degree = '';
	let course = '';
	let concentration = '';
	let courses = ['Computer Science', 'Civil', 'Mechanical', 'Biology', 'Data Science'];
	let concentrations = [
		'Software Engineering',
		'Data Analytics',
		'Cybersecurity',
		'Game Development',
		'Web Developement'
	];

	const setDegree = (deg) => {
		degree = deg;
	};
	const setCourse = (cou) => {
		course = cou;
	};
	const setConcentration = (con) => {
		concentration = con;
	};
</script>

<div class="w-full items-center justify-center px-5 md:px-15 py-5 md:py-10 flex flex-col gap-1">
	<h1 class="text-red font-calm text-xl md:text-4xl">Bradley University Academic Planner</h1>
	<p class="text-white font-base">
		Your one stop destination to <i class="text-sky font-bold">carve</i> out your academic path
	</p>
</div>
<div class="flex gap-10 flex-wrap w-full px-5 md:px-10">
	<div class="flex gap-5 items-start">
		<div class="bg-navy flex justify-center items-center text-white font-calm w-10 h-10 rounded-xl">
			1.
		</div>
		<div class="flex flex-col gap-2">
			<p class="text-white font-calm text-xl">Select Degree Level</p>
			<div class="flex gap-5 relative text-white font-base">
				<button
					on:click={() => {
						setDegree('bachelor');
					}}
					class="relative cursor-pointer px-2"
				>
					<div
						class={`bg-sky -left-2 ${degree === 'bachelor' ? 'w-full translate-x-[7px]' : 'w-1'}  h-6 rounded-lg transition-all ease-in-out duration-300 absolute z-0`}
					></div>
					<p class="relative bg-transparent">Bachelor's</p>
				</button>
				<button
					on:click={() => {
						setDegree('master');
					}}
					class="relative cursor-pointer px-2"
				>
					<div
						class={`bg-sky -left-2 ${degree === 'master' ? 'w-full translate-x-[7px]' : 'w-1'}  h-6 rounded-lg transition-all ease-in-out duration-300 absolute z-0`}
					></div>
					<p class="relative bg-transparent">Master's</p>
				</button>
			</div>
		</div>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke-width="1.5"
			stroke="currentColor"
			class="size-8 stroke-sky"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5"
			/>
		</svg>
	</div>

	<div class="flex gap-2 items-start">
		<div class="flex gap-5 items-start">
			<div
				class="bg-navy flex justify-center items-center text-white font-calm w-10 h-10 rounded-xl"
			>
				2.
			</div>
			<div class="flex flex-col gap-2">
				<p class="text-white font-calm text-xl">Select Course</p>
				<div class="flex flex-col gap-2 group">
					<div
						class="bg-sky justify-center items-center flex text-white cursor-pointer w-[150px] font-base rounded-lg"
					>
						<p class="bg-transparent">{course ? course : 'Select'}</p>
					</div>
					<div
						class="bg-navy hidden group-hover:flex text-white font-base flex-col items-center px-2 gap-2 py-2 rounded-lg"
					>
						{#each courses as courseSelect}
							<button
								on:click={() => {
									setCourse(courseSelect);
								}}
								class="bg-transparent hover:bg-sky rounded-lg px-2 cursor-pointer hover:text-navy duration-300 ease-in-out transition-all"
							>
								{courseSelect}
							</button>
						{/each}
					</div>
				</div>
			</div>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="size-8 stroke-sky"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
				/>
			</svg>
		</div>
	</div>

	<div class="flex gap-2 items-start">
		<div class="flex gap-5 items-start">
			<div
				class="bg-navy flex justify-center items-center text-white font-calm w-10 h-10 rounded-xl"
			>
				3.
			</div>
			<div class="flex flex-col gap-2">
				<p class="text-white font-calm text-xl">Select Concentration</p>
				<div class="flex flex-col gap-2 group">
					<div
						class="bg-sky justify-center items-center flex text-white cursor-pointer w-[150px] font-base rounded-lg"
					>
						<p class="bg-transparent">{concentration ? concentration : 'Select'}</p>
					</div>
					<div
						class="bg-navy hidden group-hover:flex text-white font-base flex-col items-center px-2 gap-2 py-2 rounded-lg"
					>
						{#each concentrations as concentrationSelect}
							<button
								on:click={() => {
									setConcentration(concentrationSelect);
								}}
								class="bg-transparent hover:bg-sky rounded-lg px-2 cursor-pointer hover:text-navy duration-300 ease-in-out transition-all"
							>
								{concentrationSelect}
							</button>
						{/each}
					</div>
				</div>
			</div>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="size-8 stroke-sky"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z"
				/>
			</svg>
		</div>
	</div>
</div>
