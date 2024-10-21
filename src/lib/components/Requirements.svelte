<script>
	import { csis } from '$lib/assets/mscs.js';
	export let showProgramRequirements,
		showCoreRequirements,
		showConcRequirements,
		showReq,
		check,
		startSelection, step;
</script>

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
					At least 21 of the 33 required hours must be earned in courses labeled CS. At most, six
					hours may be earned in approved courses other than those labeled CS or CIS.
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
					To satisfy the core (breadth) requirement, four courses must be taken, one from each pair
					given below (either by taking the course or showing evidence of the completion of an
					equivalent course elsewhere)
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
					concentrations offered by the department. No course taken to satisfy the core requirement
					may be counted as one of the three courses in this requirement.
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
					step = 1;
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
