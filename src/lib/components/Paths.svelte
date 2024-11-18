<script>
	import { onMount } from 'svelte';
	import VerticalList from './VerticalList.svelte';
	export let step, finalCourses, allProfessors, selectedProfessors, currProbability;
	let generatedData = [];

	let test = [
		'514 : Algorithms',
		'571 : Database Management Systems',
		'520 : Advanced Computer Architecture',
		'590 : Fundamentals of Software Engineering',
		'561 : Artificial Intelligence',
		'562 : Machine Learning',
		'563 : Knowledge Discovery and Data Mining',
		'535 : Computer Networks and System Security',
		'515 : Applied Cryptography',
		'560 : Fundamentals of Data Science',
		'531 : Web Development Technologies'
	];

	let fall2024 = [];
	let spring2025 = [];
	let fall2025 = [];
	let spring2026 = [];
	let semSelection = true;

	onMount(async () => {
		try {
			// Make the API call to /api/generate
			const response = await fetch('/api/generate', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ courses: test })
			});

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.error || 'Failed to generate course data');
			}

			// Parse the JSON response
			let res = await response.json();

			generatedData = res.courseData;
			allProfessors = res.allProfessors;
			console.log('Generated Data:', generatedData);
			console.log('Proessors:', allProfessors);
			selectedProfessors = [...allProfessors];
		} catch (error) {
			console.error('Error fetching generated data:', error);
		}
	});

	let fall24 = true;
	let spring25 = true;
	let fall25 = true;
	let spring26 = true;

	const calculateTotalProb = () => {
		console.log(fall2024);
		let fall2024total = fall2024.reduce((accumulator, currentValue) => {
			return accumulator + currentValue.fall_availability;
		}, 0);
		let fall2025total = fall2025.reduce((accumulator, currentValue) => {
			return accumulator + currentValue.fall_availability;
		}, 0);
		let spring2025total = spring2025.reduce((accumulator, currentValue) => {
			return accumulator + currentValue.fall_availability;
		}, 0);
		let spring2026total = spring2026.reduce((accumulator, currentValue) => {
			return accumulator + currentValue.fall_availability;
		}, 0);
		console.log(fall2024total);
		console.log(fall2025total);
		console.log(spring2025total);
		console.log(spring2026total);
		currProbability = (fall2024total + fall2025total + spring2025total + spring2026total)*100 / 11;
	};
</script>

<div class="flex flex-col gap-2">
	<div class="flex gap-5 items-center bg-transparent mt-1">
		<div
			class="dark:bg-purple bg-purple flex justify-center items-center text-white font-calm w-10 h-10 rounded-xl"
		>
			6.
		</div>
		<div class="flex flex-col gap-2 bg-transparent">
			<p class="dark:text-purple text-dark font-calm text-2xl bg-transparent">Create your path</p>
			<!-- <button
				on:click={() => {
					console.log(fall2024);
				}}>Check Fall 2024 array</button
			> -->
		</div>
	</div>
	{#if generatedData.length > 0}
		<div class="flex gap-4">
			<div class="w-1/2">
				<p class="font-calm text-black dark:text-white">Your Courses:</p>
				<VerticalList items={generatedData} />
			</div>
			<div class="w-1/2">
				<div>
					<p class="font-calm text-black dark:text-white">Fall 2024:</p>
					<VerticalList
						{calculateTotalProb}
						bind:fall24
						bind:semSelection
						bind:fall2024
						items={fall2024}
					/>
				</div>
				<div>
					<p class="font-calm text-black dark:text-white">Spring 2025:</p>
					<VerticalList
						{calculateTotalProb}
						bind:spring25
						bind:semSelection
						bind:spring2025
						items={spring2025}
					/>
				</div>
				<div>
					<p class="font-calm text-black dark:text-white">Fall 2025:</p>
					<VerticalList
						{calculateTotalProb}
						bind:fall25
						bind:semSelection
						bind:fall2025
						items={fall2025}
					/>
				</div>
				<div>
					<p class="font-calm text-black dark:text-white">Spring 2026:</p>
					<VerticalList
						{calculateTotalProb}
						bind:spring26
						bind:semSelection
						bind:spring2026
						items={spring2026}
					/>
				</div>
			</div>
		</div>
	{:else}
		<p class="font-base text-text">Loading...</p>
	{/if}
</div>
