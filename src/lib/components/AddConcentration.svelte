<script>
	import { departments } from '$lib/assets/departments.js';
	import { onMount } from 'svelte';
	import toast, { Toaster } from 'svelte-french-toast';
	export let openAddConcentrationModal, edit, concentration;

	let concentration_name = '';
	let concentration_about = '';
	let concentration_credit_hours = '';
	let concentration_dept = '';
	let concentration_level = '';
	let concentration_required_courses = [];
	let concentration_required_courses_api = [];
	let concentration_elective_courses = [];
	let concentration_elective_courses_api = [];

	let courses = [];

	onMount(async () => {
		try {
			const response = await fetch('/api/course'); // Adjust the API endpoint as needed
			if (response.ok) {
				courses = await response.json();
			} else {
				console.error('Failed to fetch courses');
			}
		} catch (error) {
			console.error('Error fetching courses:', error);
		}

		if (edit && concentration) {
			concentration_name = concentration.concentration_name;
			concentration_about = concentration.concentration_about;
			concentration_credit_hours = concentration.concentration_credit_hours;
			concentration_dept = concentration.concentration_dept;
			concentration_level = concentration.concentration_level;

			// Map required courses
			concentration_required_courses = concentration.concentration_required_courses.map(
				(course) =>
					`${course.course_dept.split(' ')[0]} ${course.course_code} ${course.course_title}`
			);
			concentration_required_courses_api = concentration.concentration_required_courses.map(
				(course) => course._id
			);
			requiredHours = concentration.concentration_required_courses.reduce(
				(sum, course) => sum + course.course_credit_hours,
				0
			);

			// Map elective courses
			concentration_elective_courses = concentration.concentration_elective_courses.map(
				(course) =>
					`${course.course_dept.split(' ')[0]} ${course.course_code} ${course.course_title}`
			);
			concentration_elective_courses_api = concentration.concentration_elective_courses.map(
				(course) => course._id
			);
			electiveHours = concentration.concentration_elective_courses.reduce(
				(sum, course) => sum + course.course_credit_hours,
				0
			);
		}
	});

	// TODO: 1. Check if concentration hours  == required hours provided that electives are none. Else logic to validate correct number of required courses
	// 2. Delete from selected in concentrations

	async function submitConcentration() {
		const method = edit ? 'PUT' : 'POST';
		const url = '/api/concentration';

		const requestBody = {
			concentration_name,
			concentration_about,
			concentration_level,
			concentration_required_courses: concentration_required_courses_api,
			concentration_dept,
			concentration_elective_courses: concentration_elective_courses_api,
			concentration_credit_hours
		};

		if (edit) {
			requestBody.id = concentration._id;
		}

		const response = await fetch(url, {
			method: method,
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(requestBody)
		});

		if (response.ok) {
			toast.success(`Concentration ${edit ? 'updated' : 'added'} successfully`);
			if (edit) {
				setTimeout(() => {
					openAddConcentrationModal = false;
					location.reload();
				}, 2000);
			}
		} else {
			toast.error(`Failed to ${edit ? 'update' : 'add'} concentration`);
		}
	}
	let selectedRequiredCourse = '';
	let selectedElectiveCourse = '';

	let requiredHours = 0;
	let electiveHours = 0;
	const addRequiredCourse = () => {
		let course = courses.filter(
			(c) =>
				c.course_dept.split(' ')[0] == selectedRequiredCourse.split(' ')[0] &&
				c.course_code == selectedRequiredCourse.split(' ')[1]
		)[0];
		
		if (
			selectedRequiredCourse &&
			!concentration_required_courses.includes(selectedRequiredCourse) &&
			!concentration_elective_courses.includes(selectedElectiveCourse)
		) {
			concentration_required_courses = [...concentration_required_courses, selectedRequiredCourse];
			concentration_required_courses_api = [...concentration_required_courses_api, course._id];
			requiredHours += parseInt(course.course_credit_hours);
		}
	
	};

	const addElectiveCourse = () => {
		let course = courses.filter(
			(c) =>
				c.course_dept.split(' ')[0] == selectedElectiveCourse.split(' ')[0] &&
				c.course_code == selectedElectiveCourse.split(' ')[1]
		)[0];
		if (
			selectedElectiveCourse &&
			!concentration_elective_courses.includes(selectedElectiveCourse) &&
			!concentration_required_courses.includes(selectedElectiveCourse)
		) {
			concentration_elective_courses = [...concentration_elective_courses, selectedElectiveCourse];
			concentration_elective_courses_api = [...concentration_elective_courses_api, course._id];

			electiveHours += parseInt(course.course_credit_hours);
		}
		
	};

	const removeRequiredCourse = (index) => {
		const removedCourse = concentration_required_courses.splice(index, 1)[0];
		concentration_required_courses = [...concentration_required_courses];
		concentration_required_courses_api.splice(index, 1);
		const course = courses.find(
			(c) => `${c.course_dept.split(' ')[0]} ${c.course_code}` === removedCourse
		);
		if (course) {
			requiredHours -= parseInt(course.course_credit_hours);
		}
	};

	const removeElectiveCourse = (index) => {
		const removedCourse = concentration_elective_courses.splice(index, 1)[0];
		concentration_elective_courses = [...concentration_elective_courses];
		concentration_elective_courses_api.splice(index, 1);
		const course = courses.find(
			(c) => `${c.course_dept.split(' ')[0]} ${c.course_code}` === removedCourse
		);
		if (course) {
			electiveHours -= parseInt(course.course_credit_hours);
		}
	};
</script>

<Toaster />
<div class="w-full h-full absolute top-0 left-0 flex justify-center items-center z-50 bg-[#000000de] rounded-xl">
	<div
		class="bg-green relative flex max-w-[95%] gap-4 items-center flex-col p-4 rounded-lg max-h-[95%] bar overflow-y-auto border-2 border-dark"
	>
		<button
			on:click={() => {
				openAddConcentrationModal = false;
			}}
			class=""
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

		<h1 class="font-calm text-2xl">Add a Concentration</h1>

		<form
			on:submit|preventDefault={submitConcentration}
			class="flex flex-col gap-2 items-start justify-start w-full"
		>
			<div class="flex gap-4">
				<div class="w-full flex items-start justify-start flex-col">
					<label for="" class="font-base">Title:</label>
					<input
						bind:value={concentration_name}
						type="text"
						class="outline-none rounded-md px-3 font-joan"
					/>
				</div>

				<div class="w-full flex items-start justify-start flex-col">
					<label for="" class="font-base">Credit Hours:</label>
					<input
						bind:value={concentration_credit_hours}
						type="text"
						maxlength="3"
						class="outline-none rounded-md px-3 font-joan w-16"
					/>
				</div>
			</div>

			<div class="w-full flex items-start justify-start flex-col">
				<label for="" class="font-base">Department:</label>
				<select
					class="bg-skygreen border-white text-dark text-sm font-base rounded-lg px-2 outline-none py-1"
					bind:value={concentration_dept}
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
							bind:group={concentration_level}
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
							bind:group={concentration_level}
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
							bind:group={concentration_level}
						/>
						<label for="both" class="font-base">Both</label>
					</div>
				</div>
			</div>

			<div class="flex gap-4">
				<div class="w-full flex items-start justify-start flex-col">
					<label for="" class="font-base">About/Description:</label>
					<textarea
						bind:value={concentration_about}
						rows="2"
						cols="32"
						type="text"
						class="outline-none rounded-md px-3 py-1 font-joan w-full"
					/>
				</div>
			</div>

			<div class="w-full flex items-start justify-start flex-col">
				<label for="" class="font-base"
					>Required Course(s): {requiredHours > 0 ? `${requiredHours} Credit Hours` : ''}</label
				>
				<div class="flex gap-2">
					<select
						class="bg-lightgreen w-48 border-white text-dark text-sm font-base rounded-lg px-2 outline-none py-1"
						bind:value={selectedRequiredCourse}
					>
						<option class="" disabled value="">Please select one!</option>

						{#each courses as course}
							<option
								>{`${course.course_dept.split(' ')[0]} ${course.course_code} ${course.course_title}`}</option
							>
						{/each}
					</select>
					<button
						type="button"
						class="bg-lightgreen w-fit rounded-lg px-2 font-calm"
						on:click={() => {
							addRequiredCourse();
						}}>Add Course +</button
					>
				</div>
				{#if concentration_required_courses.length > 0}
					<div class="flex flex-col gap-1 mt-2">
						{#each concentration_required_courses as rc, index}
							<button
								type="button"
								on:click={() => removeRequiredCourse(index)}
								class="focus:outline-none group"
							>
								<div class="font-calm flex gap-1 items-center">
									<div class="bg-lightgreen rounded-lg w-5 h-5 flex justify-center items-center">
										{index + 1}.
									</div>
									<p>{rc}</p>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										stroke-width="1.5"
										stroke="currentColor"
										class="size-4 group-hover:stroke-bradley stroke-green"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
										/>
									</svg>
								</div>
							</button>
						{/each}
					</div>
				{/if}
			</div>

			<div class="w-full flex items-start justify-start flex-col">
				<label for="" class="font-base"
					>Elective Course(s): {electiveHours > 0 ? `${electiveHours} Credit Hours` : ''}</label
				>
				<div class="flex gap-2">
					<select
						class="bg-lightgreen w-48 border-white text-dark text-sm font-base rounded-lg px-2 outline-none py-1"
						bind:value={selectedElectiveCourse}
					>
						<option class="" disabled value="">Please select one!</option>

						{#each courses as course}
							<option
								>{`${course.course_dept.split(' ')[0]} ${course.course_code} ${course.course_title}`}</option
							>
						{/each}
					</select>
					<button
						type="button"
						class="bg-lightgreen w-fit rounded-lg px-2 font-calm"
						on:click={() => {
							addElectiveCourse();
						}}>Add Course +</button
					>
				</div>
				{#if concentration_elective_courses.length > 0}
					<div class="flex flex-col gap-1 mt-2">
						{#each concentration_elective_courses as ec, index}
							<button
								type="button"
								on:click={() => removeElectiveCourse(index)}
								class="focus:outline-none group"
							>
								<div class="font-calm flex gap-1 items-center">
									<div class="bg-lightgreen rounded-lg w-5 h-5 flex justify-center items-center">
										{index + 1}.
									</div>
									<p>{ec}</p>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										stroke-width="1.5"
										stroke="currentColor"
										class="size-4 group-hover:stroke-bradley stroke-green"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
										/>
									</svg>
								</div>
							</button>
						{/each}
					</div>
				{/if}
			</div>

			<button
				type="submit"
				class="bg-skyblue self-center w-fit hover:bg-blue rounded-lg py-1 px-3 mt-5 font-calm"
				>{#if edit}<span>Edit</span>
				{:else}Add{/if} Program Concentration</button
			>
		</form>
	</div>
</div>
