<script>
	import { csis } from '$lib/assets/mscs.js';
	export let selectedCoreCourses, addCoreCourse, program;

</script>

<div class="flex gap-5 items-start bg-transparent">
	<div
		class="dark:bg-purple bg-purple flex justify-center items-center text-white font-calm w-10 h-10 rounded-xl"
	>
		2.
	</div>
	<div class="flex flex-col gap-2 bg-transparent">
		<p class="dark:text-purple text-dark font-calm text-2xl bg-transparent">Select Core Courses</p>
	</div>
</div>
<p class="font-base dark:text-purple text-dark">Select either course from each row</p>
<div class="flex gap-4">
	<div class="flex flex-col gap-3">
		{#each program.program_required_courses as courses, index}
			<div class="flex gap-2">
				<button
					on:click={() => {
						addCoreCourse(
							`${courses.required_course.course_code} : ${courses.required_course.course_title}`,
							courses.altername_course
								? `${courses.altername_course.course_code} : ${courses.altername_course.course_title}`
								: null
						);
					}}
					class={`${selectedCoreCourses[`${courses.required_course.course_code} : ${courses.required_course.course_title}`] ? 'bg-purple' : 'bg-lightpurple'} border-2 border-lightpurple max-w-[350px] shadow-md font-base hover:bg-purple rounded-lg px-3 cursor-pointer`}
				>
					CS {courses.required_course.course_code}
					{courses.required_course.course_title}
				</button>

				{#if courses.altername_course}
					<button
						on:click={() => {
							addCoreCourse(
								`${courses.altername_course.course_code} : ${courses.altername_course.course_title}`,
								`${courses.required_course.course_code} : ${courses.required_course.course_title}`
							);
						}}
						class={`${selectedCoreCourses[`${courses.altername_course.course_code} : ${courses.altername_course.course_title}`] ? 'bg-purple' : 'bg-lightpurple'} border-2 border-lightpurple max-w-[350px] shadow-md font-base hover:bg-purple rounded-lg px-3 cursor-pointer`}
					>
						CS {courses.altername_course.course_code}
						{courses.altername_course.course_title}
					</button>
				{/if}
			</div>
		{/each}
	</div>
</div>
