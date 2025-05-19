<script>
	import { onMount } from 'svelte';
	import ThemeSwitch from '$lib/ThemeSwitch/ThemeSwitch.svelte';
	import { departments } from '$lib/assets/departments.js';

	import toast, { Toaster } from 'svelte-french-toast';
	import { goto } from '$app/navigation';
	import UpperBar from '../../lib/components/UpperBar.svelte';
	import LeftBar from '../../lib/components/LeftBar.svelte';
	let openDeptOptions = false;
	let dropdownRef;

	function openDept(event) {
		event.stopPropagation();
		openDeptOptions = !openDeptOptions;
	}

	function handleClickOutside(event) {
		if (dropdownRef && !dropdownRef.contains(event.target)) {
			openDeptOptions = false;
		}
	}

	onMount(() => {
		document.addEventListener('click', handleClickOutside);
		return () => {
			document.removeEventListener('click', handleClickOutside);
		};
	});

	let degree = '';
	let course = '';

	const setDegree = (deg) => {
		degree = deg;
	};
	const setCourse = (cou) => {
		course = cou;
	};

	let title = 'Bradley University Academic Planner';
	let main = true;

	const submitSelection = async () => {
		let method = 'GET';
		let url = `/api/path?course=${encodeURIComponent(course)}&degree=${encodeURIComponent(degree)}`;

		const requestBody = {
			course,
			degree
		};
		const response = await fetch(url, {
			method: method,
			headers: {
				'Content-Type': 'application/json'
			}
		});
		if (response.ok) {
			toast.success(`Routing to Master's in Cpmputer Science `);
			const data = await response.json();
			goto(`/path/${data.programs[0]._id}`);
		} else {
			toast.error('Failed to add course');
		}
	};
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
				class="w-[77%] overflow-auto bar py-10 h-full border-r-lightBorder dark:border-r-darkBorder border-t-0 border-b-0 border-l-0 border-[1px]"
			>
				<div class="flex gap-10 flex-wrap w-full px-5 md:px-10">
					<div class="flex gap-5 items-start bg-transparent">
						<div
							class="dark:bg-blue bg-bradley flex justify-center items-center text-white font-calm w-10 h-10 rounded-xl"
						>
							1.
						</div>
						<div class="flex flex-col gap-2 bg-transparent">
							<p class="dark:text-blue text-dark font-calm text-2xl bg-transparent">
								Select Degree Level
							</p>
							<div class="flex gap-5 relative text-white font-base bg-transparent">
								<button
									on:click={() => {
										setDegree('bachelor');
									}}
									class="relative cursor-pointer px-2"
								>
									<div
										class={`dark:bg-blue bg-bradley -left-2 ${degree === 'bachelor' ? 'w-full translate-x-[7px]' : 'w-1'}  h-6 rounded-lg transition-all ease-in-out duration-300 absolute z-0`}
									></div>
									<p class="relative bg-transparent dark:text-white text-lightbradley">
										Undergraduate
									</p>
								</button>
								<button
									on:click={() => {
										setDegree('master');
									}}
									class="relative cursor-pointer px-2"
								>
									<div
										class={`dark:bg-blue bg-bradley -left-2 ${degree === 'master' ? 'w-full translate-x-[7px]' : 'w-1'}  h-6 rounded-lg transition-all ease-in-out duration-300 absolute z-0`}
									></div>
									<p class="relative bg-transparent dark:text-white text-lightbradley">Graduate</p>
								</button>
							</div>
						</div>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class="size-8 dark:stroke-blue stroke-bradley bg-transparent"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5"
							/>
						</svg>
					</div>

					<div class="flex gap-2 items-start bg-transparent">
						<div class="flex gap-5 items-start bg-transparent">
							<div
								class="dark:bg-blue bg-bradley flex justify-center items-center text-white font-calm w-10 h-10 rounded-xl"
							>
								2.
							</div>
							<div class="flex flex-col gap-2 bg-transparent">
								<p class="dark:text-blue text-dark font-calm text-2xl bg-transparent">
									Select Department
								</p>
								<button on:click={openDept} class="flex flex-col gap-2 relative bg-transparent">
									<div
										class="dark:bg-blue bg-bradley justify-center items-center flex text-white cursor-pointer w-[150px] font-base rounded-lg"
									>
										<p class="bg-transparent">{course ? course : 'Select'}</p>
									</div>
									{#if openDeptOptions}
										<div
											bind:this={dropdownRef}
											class="dark:bg-skyblue bg-white shadow-lg top-8 absolute text-white font-base flex flex-col items-center px-2 gap-2 py-2 rounded-lg"
										>
											<button
												on:click|stopPropagation={() => {
													setCourse(`CS Computer Science`);
												}}
												class="bg-transparent hover:bg-lightbradley dark:hover:bg-blue rounded-lg px-2 cursor-pointer text-dark duration-100 ease-in-out transition-all"
											>
												CS : Computer Science
											</button>

											<button
												class="bg-transparent hover:bg-lightbradley dark:hover:bg-blue rounded-lg px-2 cursor-pointer text-dark duration-100 ease-in-out transition-all"
											>
												More Departments Coming Soon!
											</button>
										</div>
									{/if}
								</button>
							</div>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								class="size-8 dark:stroke-blue stroke-bradley bg-transparent"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
								/>
							</svg>
						</div>
					</div>

					{#if course && degree}
						<div class="flex justify-center items-end bg-transparent">
							<button
								on:click={() => {
									submitSelection();
								}}
								class="flex justify-center items-center px-7 rounded-lg hover:text-bradley dark:hover:text-sky hover:bg-dark hover:border-sky hover:border-[1px] transition-all ease-in-out duration-100 align-middle justify-self-center font-base text-lg bg-bradley text-white cursor-pointer"
								><p class="bg-transparent">Submit</p>
							</button>
						</div>
					{:else}
						<div class="flex justify-center items-end bg-transparent">
							<button
								class="flex justify-center items-center px-7 rounded-lg align-middle justify-self-center font-base text-lg bg-grey cursor-not-allowed text-white"
								>Submit</button
							>
						</div>
					{/if}
				</div>
			</div>

			<div
				class="w-[23%] top-0 sticky flex flex-col gap-3 px-2 pt-3 items-center overflow-y-auto bar"
			></div>
		</div>
	</div>
</div>
