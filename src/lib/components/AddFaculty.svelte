<script>
	import { onMount } from 'svelte';
	import toast, { Toaster } from 'svelte-french-toast';
	export let openFacultyModal, edit, faculty;
	import { departments } from '$lib/assets/departments.js';

	let name = 'Dr.',
		faculty_dept,
		link,
		active = true;

	onMount(async () => {
		if (edit && faculty) {
			name = faculty.name;
			faculty_dept = faculty.faculty_dept;
			link = faculty.link;
			active = faculty.active;
		}
	});

	async function submitFaculty() {

		let method = edit ? 'PUT' : 'POST';
		let url = '/api/faculty';
		const requestBody = { name, faculty_dept, link, active };

		if (edit) {
			requestBody.id = faculty._id;
		}

		const response = await fetch(url, {
			method,
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(requestBody)
		});
		
		if (response.ok) {
			toast.success(`Faculty ${edit ? 'updated' : 'added'} successfully`);
			if (edit) {
				setTimeout(() => {
					openFacultyModal = false;
					location.reload();
				}, 2000);
			}
			name = 'Dr. ';
			// faculty_dept = '';
			link = '';
			active = true;
		} else {
			toast.error('Failed to add faculty');
		}
	}
</script>

<Toaster />
<div class="w-full h-full absolute top-0 left-0 flex justify-center items-center z-50 bg-[#000000de]">
	<div
		class="bg-yellow max-w-[95%] relative flex gap-4 flex-col p-4 rounded-lg max-h-[95%] bar overflow-y-auto border-2 border-dark"
	>
		<button
			on:click={() => {
				openFacultyModal = false;
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

		<h1 class="font-calm text-2xl">{edit ? 'Edit' : 'Add'} a Faculty Member</h1>

		<form
			on:submit|preventDefault={submitFaculty}
			class="flex flex-col gap-2 items-start justify-start w-full"
		>
			<div class="w-full flex items-start justify-start flex-col">
				<label for="" class="font-base">Name:</label>
				<input
					bind:value={name}
					type="text"
					class="bg-skyblue outline-none w-60 rounded-md px-3 font-base"
				/>
			</div>

			<div class="w-full flex items-start justify-start flex-col">
				<label for="" class="font-base">Department:</label>
				<select
					class="bg-skyblue border-white text-dark text-sm font-base w-60 rounded-lg px-2 outline-none py-1"
					bind:value={faculty_dept}
				>
					<option disabled value="">Please select one!</option>
					{#each departments as dept}
						<option>{dept.code} {dept.name}</option>
					{/each}
				</select>
			</div>

			<div class="w-full flex items-start justify-start flex-col">
				<label for="" class="font-base">Link:</label>
				<input
					bind:value={link}
					type="url"
					class="bg-skyblue w-60 outline-none rounded-md px-3 font-base"
				/>
			</div>

			<div class="w-full flex gap-3 justify-start items-center">
				<label for="active" class="font-base">Active:</label>
				<input type="checkbox" bind:checked={active} class="w-4 h-4 accent-skyblue" />
			</div>

			<button
				type="submit"
				class="bg-lightgreen mb-2 hover:bg-green self-center w-fit rounded-lg px-3 py-1 mt-5 font-calm"
			>
				{edit ? 'Update Faculty' : 'Add Faculty'}
			</button>
		</form>
	</div>
</div>
