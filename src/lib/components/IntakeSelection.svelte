<script>
	import { onMount } from 'svelte';
	export let selectedIntake = '';
	export let step;

	const intakes = ['Fall 24', 'Spring 25', 'Fall 25', 'Spring 26'];

	let openIntakeOptions = false;
	let dropdownRef;

	function toggleIntakeOptions(event) {
		event.stopPropagation();
		openIntakeOptions = !openIntakeOptions;
	}

	function handleClickOutside(event) {
		if (dropdownRef && !dropdownRef.contains(event.target)) {
			openIntakeOptions = false;
		}
	}

	onMount(() => {
		document.addEventListener('click', handleClickOutside);
		return () => {
			document.removeEventListener('click', handleClickOutside);
		};
	});

	const addIntake = (intake) => {
		selectedIntake = intake;    
		if (selectedIntake) {
			step = -7;
		}
	};
</script>

<div class="flex gap-5 items-center bg-transparent mt-1">
	<div
		class="dark:bg-purple bg-purple flex justify-center items-center text-white font-calm w-10 h-10 rounded-xl"
	>
		6.
	</div>
	<div class="flex flex-col gap-2 bg-transparent">
		<p class="dark:text-white text-dark font-calm text-2xl bg-transparent">Select Your Intake</p>
	</div>
</div>

<div class="mt-4 mb-10">
	<button on:click={toggleIntakeOptions} class="flex flex-col gap-2 relative bg-transparent">
		<div
			class="dark:bg-purple bg-purple justify-center px-2 items-center flex text-white cursor-pointer w-[150px] font-base rounded-lg"
		>
			<p class="bg-transparent">{selectedIntake ? selectedIntake : 'Select'}</p>
		</div>
		{#if openIntakeOptions}
			<div
				bind:this={dropdownRef}
				class="dark:bg-skyblue bg-white shadow-lg top-8 absolute px-3 py-2 w-[150px] text-white font-base flex flex-col items-center gap-2 border border-lightpurple rounded-lg"
			>
				{#each intakes as intake}
					<button
						on:click|stopPropagation={() => {
							addIntake(intake);
							openIntakeOptions = false;
						}}
						class="bg-transparent px-4 hover:bg-lightpurple dark:hover:bg-blue rounded-lg cursor-pointer text-dark duration-100 ease-in-out transition-all"
					>
						{intake}
					</button>
				{/each}
			</div>
		{/if}
	</button>
</div>
