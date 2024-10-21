<script>


	export let option, setOption, step;
</script>

<h1 class="text-purple font-calm text-2xl md:text-4xl bg-transparent">Select Courses</h1>
<div class="flex gap-5 items-start bg-transparent">
	<div
		class="dark:bg-purple bg-purple flex justify-center items-center text-white font-calm w-10 h-10 rounded-xl"
	>
		1.
	</div>
	<div class="flex flex-col gap-2 bg-transparent">
		<p class="dark:text-purple text-dark font-calm text-2xl bg-transparent">Select Course Option</p>
		<div class="flex gap-5 relative text-white font-base bg-transparent">
			<button
				on:click={() => {
					setOption('thesis');
					step = -2;
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
					step = -2;
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
{#if option == 'compre' }
	<p class="dark:text-white font-base">
		Every student must pass a written comprehensive examination that will be based on the core
		requirements for the program pursued.
	</p>
{:else if option == 'thesis' }
	<div class="flex flex-col gap-2">
		<p class="dark:text-white font-base">
			Interested and qualified students are offered the option of writing a master’s thesis.
			Students selecting this option are encouraged to choose an advisor and topic as early as
			possible in order to plan the thesis development and any needed supporting coursework. The
			following policies apply to thesis
		</p>
		<p class="dark:text-white font-base">
			1. A minimum grade point average of 3.5 in computer science and computer information systems
			graduate courses is required for students enrolling in CS 699 (Thesis).
		</p>
		<p class="dark:text-white font-base">
			2. No student may register for CS 699 until 9 hours of graduate courses have been completed in
			the department.
		</p>
		<p class="dark:text-white font-base">
			3. Six credit hours of CS 699 are required and, upon completion, the thesis must be defended
			in an oral examination. No grade will be given for CS 699 until after the oral defense.
		</p>
		<p class="dark:text-white font-base">
			4. A written outline of the thesis project and a tentative schedule must be submitted to and
			approved by the graduate coordinator and the chair prior to the registration for CS 699.
		</p>
	</div>
{/if}
