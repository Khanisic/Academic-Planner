<script>
	import { departments } from '$lib/assets/departments.js';
	import { onMount } from 'svelte';
	import toast, { Toaster } from 'svelte-french-toast';
	import { goto } from '$app/navigation';

	export let openAddProgramModal, edit, program;
	let program_name,
		program_dept,
		program_required_courses,
		program_hours,
		program_maximum_concentrations,
		program_minimum_concentrations,
		program_concentrations,
		program_desc,
		program_core_requirements,
		program_requirements,
		program_visa_requirements,
		program_concentration_requirements,
		program_level;

	let courses = [];
	let concentrations = [];

	onMount(async () => {
		try {
			const response = await fetch('/api/course');
			if (response.ok) {
				courses = await response.json();
			} else {
				console.error('Failed to fetch courses');
			}
		} catch (error) {
			console.error('Error fetching courses:', error);
		}

		try {
			const response = await fetch('/api/concentration');
			if (response.ok) {
				concentrations = await response.json();
			} else {
				console.error('Failed to fetch concentrations');
			}
		} catch (error) {
			console.error('Error fetching concentrations:', error);
		}

		if (edit && program) {
			program_name = program.program_name;
			program_dept = program.program_dept;
			program_hours = program.program_hours;
			program_maximum_concentrations = program.program_maximum_concentrations;
			program_minimum_concentrations = program.program_minimum_concentrations;
			program_desc = program.program_desc;
			program_core_requirements = program.program_core_requirements;
			program_requirements = program.program_requirements;
			program_visa_requirements = program.program_visa_requirements;
			program_concentration_requirements = program.program_concentration_requirements;
			program_level = program.program_level;

			selectedConcentrations = program.program_concentrations.map(
				(conc) => conc.concentration_name
			);
			selectedConcentrations_api = program.program_concentrations.map((conc) => conc._id);

			required_courses = program.program_required_courses.map((rc) => ({
				required_course: `${rc.required_course.course_dept.split(' ')[0]} ${rc.required_course.course_code} ${rc.required_course.course_title}`,
				altername_course: rc.altername_course
					? `${rc.altername_course.course_dept.split(' ')[0]} ${rc.altername_course.course_code} ${rc.altername_course.course_title}`
					: 'N/A'
			}));

			required_courses_api = program.program_required_courses.map((rc) => {
				const obj = {
					required_course: rc.required_course._id
				};
				if (rc.altername_course && rc.altername_course._id) {
					obj.altername_course = rc.altername_course._id;
				}
				return obj;
			});

			requiredHours = program.program_required_courses.reduce(
				(sum, rc) => sum + rc.required_course.course_credit_hours,
				0
			);
		}
	});

	function removeConcentration(index) {
		selectedConcentrations.splice(index, 1);
		selectedConcentrations = [...selectedConcentrations];

		selectedConcentrations_api.splice(index, 1);
		selectedConcentrations_api = [...selectedConcentrations_api];
	}

	function removeRequiredCourse(index) {
		const removedRC = required_courses.splice(index, 1)[0];
		required_courses = [...required_courses];

		const removedRC_api = required_courses_api.splice(index, 1)[0];
		required_courses_api = [...required_courses_api];

		all_courses = all_courses.filter((course) => {
			return course !== removedRC.required_course && course !== removedRC.altername_course;
		});

		const course1 = courses.find((c) => {
			return (
				`${c.course_dept.split(' ')[0]} ${c.course_code}` === removedRC.required_course.slice(0, 7)
			);
		});
		if (course1) {
			requiredHours -= parseInt(course1.course_credit_hours);
		}
	}

	let selectedConcentration = '';
	let selectedConcentrations = [];
	let selectedConcentrations_api = [];

	let requiredHours = 0;
	let selectedRequiredCourse1 = '';
	let selectedRequiredCourse2 = '';
	let required_courses = [];
	let required_courses_api = [];
	let all_courses = [];

	const addConcentration = () => {
		console.log("All concentrations",concentrations)
		let concentration = concentrations.filter(
			(conc) => conc.concentration_name == selectedConcentration
		)[0];

		if (selectedConcentration && !selectedConcentrations.includes(selectedConcentration)) {
			selectedConcentrations = [...selectedConcentrations, selectedConcentration];
			selectedConcentrations_api = [...selectedConcentrations_api, concentration._id];
		}
		console.log("Add button",selectedConcentrations_api);
	};

	const addRequiredCourse = () => {
		let course1 = courses.filter(
			(c) =>
				c.course_dept.split(' ')[0] == selectedRequiredCourse1.split(' ')[0] &&
				c.course_code == selectedRequiredCourse1.split(' ')[1]
		)[0];
		let course2 = courses.filter(
			(c) =>
				c.course_dept.split(' ')[0] == selectedRequiredCourse2.split(' ')[0] &&
				c.course_code == selectedRequiredCourse2.split(' ')[1]
		)[0];

		if (
			selectedRequiredCourse1 &&
			!all_courses.includes(selectedRequiredCourse1) &&
			!all_courses.includes(selectedRequiredCourse2) &&
			selectedRequiredCourse1 != selectedRequiredCourse2
		) {
			all_courses = [...all_courses, selectedRequiredCourse1, selectedRequiredCourse2];
			required_courses = [
				...required_courses,
				{
					required_course: selectedRequiredCourse1,
					altername_course: selectedRequiredCourse2 ? selectedRequiredCourse2 : 'N/A'
				}
			];
			if (!course2) {
				required_courses_api = [
					...required_courses_api,
					{
						required_course: course1._id
					}
				];
			} else if (course2) {
				required_courses_api = [
					...required_courses_api,
					{
						required_course: course1._id,
						altername_course: course2._id
					}
				];
			}

			requiredHours += parseInt(course1.course_credit_hours);
			selectedRequiredCourse1 = '';
			selectedRequiredCourse2 = '';
		}
	};

	async function submitProgram() {
		const method = edit ? 'PUT' : 'POST';
		const endpoint = '/api/program'; // Same endpoint for both POST and PUT

		const requestBody = {
			program_name,
			program_dept,
			program_required_courses: required_courses_api,
			program_hours,
			program_maximum_concentrations,
			program_minimum_concentrations,
			program_concentrations: selectedConcentrations_api,
			program_desc,
			program_core_requirements,
			program_requirements,
			program_visa_requirements,
			program_concentration_requirements,
			program_level
		};
		console.log('Client', selectedConcentrations_api);
		if (edit) {
			requestBody.id = program._id;
		}

		const response = await fetch(endpoint, {
			method,
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(requestBody)
		});

		if (response.ok) {
			toast.success(`Program ${edit ? 'updated' : 'added'} successfully`);
			if (edit) {
				setTimeout(() => {
					openAddProgramModal = false;
					location.reload();
				}, 2000);
			}
		} else {
			const errorData = await response.json();
			console.error(`Failed to ${edit ? 'update' : 'add'} program`, errorData.message);
			toast.error(`Failed to ${edit ? 'update' : 'add'} program: ${errorData.message}`);
		}
	}

	async function deleteProgram() {
		const response = await fetch('/api/program', {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ id: program._id })
		});

		if (response.ok) {
			toast.success('Program deleted successfully');
			setTimeout(() => {
				goto('/admin');
			}, 2000);
		} else {
			const errorData = await response.json();
			console.error('Failed to delete program', errorData.message);
			toast.error(`Failed to delete program: ${errorData.message}`);
		}
	}
</script>

<Toaster />
<div class="w-full h-full absolute top-0 left-0 flex justify-center items-center z-50 bg-[#000000de]">
	<div
		class="bg-bradley max-w-[95%] relative flex gap-4 flex-col p-4 rounded-lg max-h-[95%] bar overflow-y-auto border-2 border-dark"
	>
		<button
			on:click={() => {
				openAddProgramModal = false;
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

		<h1 class="font-calm text-2xl">
			{#if edit}<span>Edit</span>
			{:else}Add{/if} a Program
		</h1>

		<form on:submit|preventDefault={submitProgram} class="flex flex-col gap-3 items-center">
			<div class="w-full flex items-start gap-4">
				<div class="w-full flex items-start justify-start flex-col">
					<label for="" class="font-base">Title:</label>
					<input
						bind:value={program_name}
						type="text"
						class="outline-none rounded-md px-3 font-joan"
					/>
				</div>

				<div class="w-full flex items-start justify-start flex-col">
					<label for="" class="font-base">Credit Hours:</label>
					<input
						bind:value={program_hours}
						type="text"
						maxlength="3"
						class="outline-none rounded-md px-3 font-joan w-16"
					/>
				</div>
			</div>

			<div class="w-full flex items-start justify-start flex-col">
				<label for="" class="font-base">Department:</label>
				<select
					class="bg-lightbradley border-white text-dark text-sm font-base rounded-lg px-2 outline-none py-1"
					bind:value={program_dept}
				>
					<option disabled value="">Please select one!</option>
					{#each departments as dept}
						<option>{dept.code} {dept.name}</option>
					{/each}
				</select>
			</div>

			<div class="flex w-full">
				<div class="w-full flex items-start justify-start flex-col">
					<label for="" class="font-base">Max Concentrations:</label>
					<input
						bind:value={program_maximum_concentrations}
						type="text"
						maxlength="1"
						class="outline-none rounded-md px-3 font-joan w-16"
					/>
				</div>
				<div class="w-full flex items-start justify-start flex-col">
					<label for="" class="font-base">Min Concentrations:</label>
					<input
						bind:value={program_minimum_concentrations}
						type="text"
						maxlength="1"
						class="outline-none rounded-md px-3 font-joan w-16"
					/>
				</div>
			</div>
			<div class="w-full flex items-start justify-start flex-col">
				<label for="" class="font-base"
					>Concentrations: {selectedConcentrations.length > 0
						? `${selectedConcentrations.length}`
						: ''}</label
				>
				<div class="flex gap-2">
					<select
						class="bg-lightbradley w-48 border-white text-dark text-sm font-base rounded-lg px-2 outline-none py-1"
						bind:value={selectedConcentration}
					>
						<option class="" disabled value="">Please select one!</option>

						{#each concentrations as concentration}
							<option>{concentration.concentration_name}</option>
						{/each}
					</select>
					<button
						type="button"
						class="bg-lightbradley w-fit rounded-lg px-2 font-calm"
						on:click={() => {
							addConcentration();
						}}>Add Concentration +</button
					>
				</div>
				{#if selectedConcentrations.length > 0}
					<div class="flex flex-col gap-1 mt-2">
						{#each selectedConcentrations as sc, index}
							<button
								type="button"
								on:click={() => removeConcentration(index)}
								class=""
								title="Remove Concentration"
							>
								<div class="font-calm flex gap-2 items-center cursor-pointer group">
									<div class="bg-lightbradley rounded-lg w-5 h-5 flex justify-center items-center">
										{index + 1}.
									</div>
									<p>{sc}</p>

									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										stroke-width="1.5"
										stroke="currentColor"
										class="size-4 stroke-bradley group-hover:stroke-dark"
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
				<label for="level" class="font-base">Level:</label>
				<div class="flex gap-2">
					<div class="flex items-center gap-2">
						<input
							class="accent-bradley w-3 h-3"
							type="radio"
							name="level"
							id="undergraduate"
							value="Undergraduate"
							bind:group={program_level}
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
							bind:group={program_level}
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
							bind:group={program_level}
						/>
						<label for="both" class="font-base">Both</label>
					</div>
				</div>
			</div>

			<div class="flex w-full gap-4">
				<div class="w-full flex items-start justify-start flex-col">
					<label for="" class="font-base">About/Description:</label>
					<textarea
						bind:value={program_desc}
						rows="2"
						cols="32"
						type="text"
						class="outline-none rounded-md px-3 py-1 font-joan w-full"
					/>
				</div>
			</div>

			<div class="flex w-full gap-4">
				<div class="w-full flex items-start justify-start flex-col">
					<label for="" class="font-base">Program Requirements:</label>
					<textarea
						bind:value={program_requirements}
						rows="2"
						cols="32"
						type="text"
						class="outline-none rounded-md px-3 py-1 font-joan w-full"
					/>
				</div>
			</div>

			<div class="flex w-full gap-4">
				<div class="w-full flex items-start justify-start flex-col">
					<label for="" class="font-base">Core Requirements:</label>
					<textarea
						bind:value={program_core_requirements}
						rows="2"
						cols="32"
						type="text"
						class="outline-none rounded-md px-3 py-1 font-joan w-full"
					/>
				</div>
			</div>

			<div class="flex w-full gap-4">
				<div class="w-full flex items-start justify-start flex-col">
					<label for="" class="font-base">Visa Requirements:</label>
					<textarea
						bind:value={program_visa_requirements}
						rows="2"
						cols="32"
						type="text"
						class="outline-none rounded-md px-3 py-1 font-joan w-full"
					/>
				</div>
			</div>

			<div class="flex w-full gap-4">
				<div class="w-full flex items-start justify-start flex-col">
					<label for="" class="font-base">Concentration Requirements:</label>
					<textarea
						bind:value={program_concentration_requirements}
						rows="2"
						cols="32"
						type="text"
						class="outline-none rounded-md px-3 py-1 font-joan w-full"
					/>
				</div>
			</div>

			<div class="w-full flex-wrap flex items-start justify-start flex-col">
				<label for="" class="font-base"
					>Required Course(s): {requiredHours > 0 ? `${requiredHours} Credit Hours` : ''}</label
				>
				<div class="flex justify-around w-full">
					<p class="font-calm">Required:</p>
					<p class="font-calm">Alternate:</p>
				</div>

				<div class="flex gap-2">
					<select
						class="bg-lightbradley w-36 md:w-48 border-white text-dark text-sm font-base rounded-lg px-2 outline-none py-1"
						bind:value={selectedRequiredCourse1}
					>
						<option class="" disabled value="">Please select one!</option>

						{#each courses as course}
							<option
								>{`${course.course_dept.split(' ')[0]} ${course.course_code} ${course.course_title}`}</option
							>
						{/each}
					</select>
					<p class="font-calm self-center">or</p>
					<div class="flex gap-2">
						<select
							class="bg-lightbradley w-36 md:w-48 border-white text-dark text-sm font-base rounded-lg px-2 outline-none py-1"
							bind:value={selectedRequiredCourse2}
						>
							<option class="" disabled value="">Please select one!</option>

							{#each courses as course}
								<option
									>{`${course.course_dept.split(' ')[0]} ${course.course_code} ${course.course_title}`}</option
								>
							{/each}
						</select>
					</div>
				</div>

				<button
					type="button"
					class="bg-lightbradley w-fit self-center rounded-lg px-2 font-calm mt-4"
					on:click={() => {
						addRequiredCourse();
					}}>Add Course(s) +</button
				>
				{#if required_courses.length > 0}
					<div class="flex flex-col gap-1 mt-2">
						{#each required_courses as rc, index}
							<button
								type="button"
								on:click={() => removeRequiredCourse(index)}
								class="focus:outline-none group"
							>
								<div class="font-calm flex gap-2 items-center">
									<div class="bg-lightbradley rounded-lg w-5 h-5 flex justify-center items-center">
										{index + 1}.
									</div>
									<p>{rc.required_course.slice(0, 7)}</p>
									{#if rc.altername_course !== 'N/A'}
										<p class="font-calm self-center">or</p>
										<p>{rc.altername_course.slice(0, 7)}</p>
									{/if}

									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										stroke-width="1.5"
										stroke="currentColor"
										class="size-4 group-hover:stroke-dark stroke-bradley"
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
			<div class="flex gap-2 items-center">
				<button
					type="submit"
					class="bg-lightpurple hover:bg-purple w-fit rounded-lg px-3 py-1 mt-5 font-calm"
					>{#if edit}<span>Edit</span>
					{:else}Add{/if} Program</button
				>
				{#if edit}
					<button
						class="bg-grey hover:bg-dark hover:text-white w-fit rounded-lg px-3 py-1 mt-5 font-calm"
						on:click={deleteProgram}
					>
						Delete Program
					</button>
				{/if}
			</div>
		</form>
	</div>
</div>
