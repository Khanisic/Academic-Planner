<script>
	import { csis } from '$lib/assets/mscs.js';
	export let selectedCoreCourses, addCoreCourse, step;
    console.log(selectedCoreCourses)
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
		{#each csis.requirements.required_courses as courses, index}
			<button
				on:click={() => {
					addCoreCourse(
						`${courses.course_code} : ${courses.course_name}`,
						`${courses.alternative.course_code} : ${courses.alternative.course_name}`
					);
				}}
				class={` ${selectedCoreCourses[`${courses.course_code} : ${courses.course_name}`] == true ? 'bg-purple' : 'bg-lightpurple'}  border-2 border-lightpurple max-w-[350px] shadow-md font-base hover:bg-purple rounded-lg px-3 cursor-pointer `}
				>{courses.course_code} {courses.course_name}</button
			>
		{/each}
	</div>

	<div class="flex flex-col gap-3">
		{#each csis.requirements.required_courses as courses, index}
			<button
				on:click={() => {
					addCoreCourse(
						`${courses.alternative.course_code} : ${courses.alternative.course_name}`,
						`${courses.course_code} : ${courses.course_name}`
					);
				}}
				class={`${selectedCoreCourses[`${courses.alternative.course_code} : ${courses.alternative.course_name}`] == true ? 'bg-purple' : 'bg-lightpurple'}  border-2 border-lightpurple max-w-[350px] shadow-md font-base hover:bg-purple rounded-lg px-3 cursor-pointer `}
				>{courses.alternative.course_code} {courses.alternative.course_name}</button
			>
		{/each}
	</div>
</div>
