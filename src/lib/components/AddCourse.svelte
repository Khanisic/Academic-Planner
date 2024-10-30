<script>
	import { departments } from '$lib/assets/departments.js';
	import { onMount } from 'svelte';
	import toast, { Toaster } from 'svelte-french-toast';
	export let openAddCourseModal, edit, course;

	let course_title,
		course_code,
		course_dept,
		course_description,
		course_level,
		course_credit_hours,
		course_prereq;

	onMount(async () => {
		if (edit && course) {
			course_title = course.course_title;
			course_code = course.course_code;
			course_dept = course.course_dept;
			course_description = course.course_description;
			course_level = course.course_level;
			course_credit_hours = course.course_credit_hours;
		}
	});
	async function submitCourse() {

		let method = edit ? 'PUT' : 'POST';
		let url = '/api/course';
		const requestBody = {
			course_title,
			course_code,
			course_dept,
			course_description,
			course_level,
			course_credit_hours
		};
		if (edit) {
			requestBody.id = course._id;
		}

		const response = await fetch(url, {
			method: method,
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(requestBody)
		});

		if (response.ok) {
			toast.success(`Course ${edit ? 'updated' : 'added'} successfully`);
			if (edit) {
				setTimeout(() => {
					openAddCourseModal = false;
					location.reload();
				}, 2000);
			}
			course_title = '';
			course_code = '';
			course_dept = '';
			course_description = '';
			course_level = '';
			course_credit_hours = '';
		} else {
			toast.error('Failed to add course');
		}
	}
</script>

<Toaster />
<div class="w-full h-full absolute top-0 left-0 flex justify-center items-center">
	<div
		class="bg-blue relative flex gap-4 max-w-[95%] max-h-[95%] bar flex-col p-4 rounded-lg border-2 border-dark"
	>
		<button
			on:click={() => {
				openAddCourseModal = false;
			}}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="size-6 absolute top-2 right-2 cursor-pointer"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
				/>
			</svg>
		</button>

		<h1 class="font-calm text-2xl">Add a Course</h1>

		<form
			on:submit|preventDefault={submitCourse}
			class="flex flex-col gap-2 items-start justify-start w-full"
		>
			<div class="flex gap-4">
				<div class="w-full flex items-start justify-start flex-col">
					<label for="" class="font-base">Title:</label>
					<input
						bind:value={course_title}
						type="text"
						class="outline-none rounded-md px-3 font-joan"
					/>
				</div>

				<div class="w-full flex items-start justify-start flex-col">
					<label for="" class="font-base">Code:</label>
					<input
						bind:value={course_code}
						type="text"
						maxlength="3"
						class="outline-none rounded-md px-3 font-joan w-16"
					/>
				</div>
			</div>

			<div class="w-full flex items-start justify-start flex-col">
				<label for="" class="font-base">Department:</label>
				<select
					class="bg-skyblue border-white text-dark text-sm font-base rounded-lg px-2 outline-none py-1"
					bind:value={course_dept}
				>
					<option disabled value="">Please select one!</option>
					{#each departments as dept}
						<option>{dept.code} {dept.name}</option>
					{/each}
				</select>
			</div>

			<div class="w-full flex items-start justify-start flex-col">
				<label for="level" class="font-base">Level:</label>
				<div class="flex gap-2">
					<div class="flex items-center gap-2">
						<input
							class="accent-bradley w-3 h-3"
							type="radio"
							name="level"
							id="undergraduate"
							value="Undergraduate"
							bind:group={course_level}
						/>
						<label for="undergraduate" class="font-base">Undergraduate</label>
					</div>
					<div class="flex items-center gap-2">
						<input
							class="accent-bradley w-3 h-3"
							type="radio"
							name="level"
							id="graduate"
							value="Graduate"
							bind:group={course_level}
						/>
						<label for="graduate" class="font-base">Graduate</label>
					</div>
					<div class="flex items-center gap-2">
						<input
							class="accent-bradley w-3 h-3"
							type="radio"
							name="level"
							id="both"
							value="Both"
							bind:group={course_level}
						/>
						<label for="both" class="font-base">Both</label>
					</div>
				</div>
			</div>

			<div class="flex gap-4">
				<div class="w-full flex items-start justify-start flex-col">
					<label for="" class="font-base">Hours:</label>
					<input
						bind:value={course_credit_hours}
						type="text"
						maxlength="2"
						class="outline-none rounded-md px-3 font-joan w-12"
					/>
				</div>

				<div class="w-full flex items-start justify-start flex-col">
					<label for="" class="font-base">Prereq(s):</label>
					<input type="text" class="outline-none rounded-md px-3 font-joan" />
				</div>
			</div>

			<div class="flex gap-4">
				<div class="w-full flex items-start justify-start flex-col">
					<label for="" class="font-base">Description:</label>
					<textarea
						bind:value={course_description}
						rows="3"
						cols="32"
						type="text"
						class="outline-none rounded-md px-3 py-1 font-joan w-full"
					/>
				</div>
			</div>

			<button
				type="submit"
				class="bg-lightgreen mb-2 hover:bg-green self-center w-fit rounded-lg px-3 py-1 mt-5 font-calm"
				>Add Course</button
			>
		</form>
	</div>
</div>
