<script>
	import toast, { Toaster } from 'svelte-french-toast';
	import { departments } from '$lib/assets/departments.js';

	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	export let openSemesterModal, edit, semester;
	let season, year, course, semester_dept;
	let courses = [];
	let faculty = [];

	let selectedCourse = '';
	let selectedFaculty = '';
	let selectedOfferings = [];
	let selectedOfferings_api = [];

	onMount(async () => {
		try {
			const response = await fetch('/api/course'); // Adjust the API endpoint as needed
			if (response.ok) {
				courses = await response.json();
				console.log(courses);
			} else {
				console.error('Failed to fetch courses');
			}
		} catch (error) {
			console.error('Error fetching courses:', error);
		}

		try {
			const response = await fetch('/api/faculty'); // Adjust the API endpoint as needed
			if (response.ok) {
				faculty = await response.json();
				console.log(faculty);
			} else {
				console.error('Failed to fetch courses');
			}
		} catch (error) {
			console.error('Error fetching courses:', error);
		}

		if (edit && semester) {
			season = semester.season;
			year = semester.year;
			semester_dept = semester.semester_dept;

			selectedOfferings = semester.course_offerings.map((offering) => ({
				course: `${offering.course.course_dept.split(' ')[0]} ${offering.course.course_code}`,
				faculty: offering.faculty.name
			}));

			selectedOfferings_api = semester.course_offerings.map((offering) => ({
				course: offering.course._id,
				faculty: offering.faculty._id,
				season,
				year
			}));
		}
	});

	const addOffering = () => {
		let course = courses.filter(
			(c) =>
				c.course_dept.split(' ')[0] == selectedCourse.split(' ')[0] &&
				c.course_code == selectedCourse.split(' ')[1]
		)[0];
		console.log(course);

		let fac = faculty.filter((f) => f.name == selectedFaculty);
		console.log(fac);

		if (course && fac) {
			selectedOfferings = [
				...selectedOfferings,
				{
					course: `${course.course_dept.split(' ')[0]} ${course.course_code}`,
					faculty: fac[0].name
				}
			];

			selectedOfferings_api = [
				...selectedOfferings_api,
				{
					course: course._id,
					faculty: fac[0]._id,
					season,
					year
				}
			];
		}
	};

	const removeOffering = (index) => {
		const removedOffering = selectedOfferings.splice(index, 1)[0];
		selectedOfferings = [...selectedOfferings];
		const removedOffering_api = selectedOfferings_api.splice(index, 1)[0];
		selectedOfferings_api = [...selectedOfferings_api];

		console.log(selectedOfferings);
		console.log(selectedOfferings_api);
	};

	async function submitOffering() {
		const method = edit ? 'PUT' : 'POST';
		const endpoint = '/api/semester';

		const requestBody = {
			year,
			season,
			selectedOfferings_api,
			semester_dept
		};

		if (edit) {
			requestBody.id = semester._id;
		}

		const response = await fetch(endpoint, {
			method,
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(requestBody)
		});

		if (response.ok) {
			toast.success(`Semester ${edit ? 'updated' : 'added'} successfully`);
			setTimeout(() => {
				location.reload();
			}, 2000);
		} else {
			const errorData = await response.json();
			console.error(`Failed to ${edit ? 'update' : 'add'} program`, errorData.message);
			toast.error(`Failed to ${edit ? 'update' : 'add'} program: ${errorData.message}`);
		}
	}

	async function deleteSemester() {
		const method = 'DELETE';
		const endpoint = '/api/semester';
		const requestBody = {
			id: semester._id
		};

		const response = await fetch(endpoint, {
			method,
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(requestBody)
		});

		if (response.ok) {
			toast.success(`Semester deleted successfully`);
			openSemesterModal = false;
			if (edit) {
				setTimeout(() => {
					goto('/admin');
				}, 2000);
			}
		} else {
			const errorData = await response.json();
			console.error(`Failed to delete semester`, errorData.message);
			// toast.error(`Failed to delete semester: ${errorData.message}`);
		}
	}
</script>

<Toaster />
<div class="w-full h-full absolute top-0 left-0 flex justify-center items-center">
	<div
		class="bg-lightgrey relative flex max-w-[95%] gap-4 items-center flex-col p-4 rounded-lg max-h-[95%] bar overflow-y-auto border-2 border-dark"
	>
		<button
			on:click={() => {
				openSemesterModal = false;
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

		<h1 class="font-calm text-2xl">{edit ? 'Edit' : 'Add'} Semester</h1>
		<form on:submit|preventDefault={submitOffering} class="flex flex-col gap-3 items-center">
			<div class="w-full flex items-start justify-start flex-col">
				<label for="" class="font-base">Department:</label>
				<select
					class="bg-dark border-white text-white text-sm font-base rounded-lg px-2 outline-none py-1"
					bind:value={semester_dept}
				>
					<option disabled value="">Please select one!</option>
					{#each departments as dept}
						<option>{dept.code} {dept.name}</option>
					{/each}
				</select>
			</div>
			<div class="w-full flex items-start justify-start flex-col">
				<label for="level" class="font-base">Season:</label>
				<div class="flex gap-2 flex-wrap">
					<div class="flex items-center gap-2">
						<input
							class="accent-dark w-3 h-3"
							type="radio"
							name="level"
							id="fall"
							value="Fall"
							bind:group={season}
						/>
						<label for="fall" class="font-base">Fall</label>
					</div>
					<div class="flex items-center gap-2">
						<input
							class="accent-dark w-3 h-3"
							type="radio"
							name="level"
							id="spring"
							value="Spring"
							bind:group={season}
						/>
						<label for="spring" class="font-base">Spring</label>
					</div>
					<div class="flex items-center gap-2">
						<input
							class="accent-dark w-3 h-3"
							type="radio"
							name="level"
							id="january"
							value="January"
							bind:group={season}
						/>
						<label for="january" class="font-base">January Interim</label>
					</div>
				</div>
			</div>

			<div class="w-full flex items-start justify-start flex-col">
				<label for="" class="font-base">Year:</label>
				<select
					class="bg-dark border-white text-white text-sm font-base rounded-lg px-2 outline-none py-1"
					bind:value={year}
				>
					<option disabled value="">Please select one!</option>

					<option>2025</option>
					<option>2024</option>
					<option>2023</option>
					<option>2022</option>
					<option>2021</option>
				</select>
			</div>

			<div class="w-full flex-wrap flex items-start justify-start flex-col">
				<label for="" class="font-base">Course Offerings: </label>
				<div class="flex justify-around w-full">
					<p class="font-calm">Course:</p>
					<p class="font-calm">Faculty:</p>
				</div>
				<div class="flex gap-2">
					<select
						class="bg-dark w-36 md:w-48 border-white text-white text-sm font-base rounded-lg px-2 outline-none py-1"
						bind:value={selectedCourse}
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
							class="bg-dark w-36 md:w-48 border-white text-white text-sm font-base rounded-lg px-2 outline-none py-1"
							bind:value={selectedFaculty}
						>
							<option class="" disabled value="">Please select one!</option>

							{#each faculty as fac}
								<option>{`${fac.name}`}</option>
							{/each}
						</select>
					</div>
				</div>

				<button
					type="button"
					class="bg-dark text-white w-fit self-center rounded-lg px-2 font-calm mt-4"
					on:click={() => {
						addOffering();
					}}>Add Course Offering +</button
				>
				{#if selectedOfferings.length > 0}
					<div class="flex flex-col gap-1 mt-2">
						{#each selectedOfferings as offering, index}
							<button
								type="button"
								on:click={() => removeOffering(index)}
								class="focus:outline-none group"
							>
								<div class="font-calm flex gap-2 items-center">
									<div
										class="bg-dark rounded-lg w-5 h-5 text-white flex justify-center items-center"
									>
										{index + 1}.
									</div>
									<p>{offering.course.slice(0, 7)}</p>
									<p>{offering.faculty}</p>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										stroke-width="1.5"
										stroke="currentColor"
										class="size-4 group-hover:stroke-bradley stroke-lightgrey"
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
					class="bg-dark hover:bg-grey text-white hover:text-dark w-fit rounded-lg px-3 py-1 font-calm"
					>{#if edit}<span>Edit</span>
					{:else}Add{/if} Semester</button
				>
				{#if edit}
					<button
						class="bg-grey hover:bg-dark hover:text-white w-fit rounded-lg px-3 py-1 font-calm"
						on:click={deleteSemester}
					>
						Delete Semester
					</button>
				{/if}
			</div>
		</form>
	</div>
</div>
