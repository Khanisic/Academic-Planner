<script>
	import { Toaster, toast } from 'svelte-french-toast';
	import LeftBar from '../../lib/components/LeftBar.svelte';
	import UpperBar from '../../lib/components/UpperBar.svelte';

	let title = 'Contact Us';
	let showLeftBar = false;
	let isSubmitting = false;

	function toggleLeftBar() {
		showLeftBar = !showLeftBar;
	}

	let formData = {
		name: '',
		email: '',
		subject: '',
		message: ''
	};

	async function handleSubmit() {
		try {
			isSubmitting = true;
			
			const response = await fetch('/api/contact', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(formData)
			});

			const result = await response.json();

			if (result.success) {
				toast.success('Message sent successfully!');
				formData = {
					name: '',
					email: '',
					subject: '',
					message: ''
				};
			} else {
				toast.error(result.message || 'Failed to send message');
			}
		} catch (error) {
			console.error('Error submitting form:', error);
			toast.error('Failed to send message. Please try again later.');
		} finally {
			isSubmitting = false;
		}
	}
</script>

<Toaster />

<div class="flex h-full relative top-0">
	<button
		class="absolute top-4 left-4 z-50  bg-leftBar dark:bg-black p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
		on:click={toggleLeftBar}
	>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke-width="1.5"
			stroke="currentColor"
			class="size-6 text-bradley dark:text-text "
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12"
			/>
		</svg>
	</button>
	<div
		class="bg-leftBar min-w-[200px] top-0 absolute z-40 dark:bg-black rounded-l-xl border-r-lightBorder dark:border-r-darkBorder border-t-0 border-b-0 border-l-0 border-[1px] h-full w-1/6 transition-transform duration-300 ease-in-out"
		class:translate-x-0={showLeftBar}
		class:-translate-x-[100%]={!showLeftBar}
	>
		<LeftBar />
	</div>
	<div class="w-full flex flex-col h-full">
		<UpperBar bind:title />
		<div class="flex h-full overflow-hidden">
			<div
				class="w-full overflow-auto bar py-10 h-full border-r-lightBorder dark:border-r-darkBorder border-t-0 border-b-0 border-l-0 border-[1px] px-8"
			>
				<div class="max-w-4xl mx-auto">
					<div class="text-center mb-12">
			
						<p class="text-lg font-base text-text dark:text-text ">
							Have questions or feedback? We'd love to hear from you.
						</p>
					</div>

					<div class="grid grid-cols-1 md:grid-cols-2 gap-12">
						<!-- Contact Information -->
						<div class="space-y-8">
							<div class="bg-leftBar dark:bg-darkLeftBar p-6 rounded-xl">
								<div class="flex items-center gap-3 mb-4">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 24 24"
										fill="currentColor"
										class="size-8 text-blue"
									>
										<path
											d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z"
										/>
										<path
											d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z"
										/>
									</svg>
									<h2 class="text-xl font-calm text-text">Email Us</h2>
								</div>
								<p class="text-text dark:text-text  font-base">amkhan357@gmail.com</p>
							</div>

						

							<div class="bg-leftBar dark:bg-darkLeftBar p-6 rounded-xl">
								<div class="flex items-center gap-3 mb-4">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 24 24"
										fill="currentColor"
										class="size-6 text-bradley"
									>
										<path
											d="M5.85 3.5a.75.75 0 0 0-1.117-1 9.719 9.719 0 0 0-2.348 4.876.75.75 0 0 0 1.479.248A8.219 8.219 0 0 1 5.85 3.5ZM19.267 2.5a.75.75 0 1 0-1.118 1 8.22 8.22 0 0 1 1.987 4.124.75.75 0 0 0 1.48-.248A9.72 9.72 0 0 0 19.266 2.5Z"
										/>
										<path
											fill-rule="evenodd"
											d="M12 2.25A6.75 6.75 0 0 0 5.25 9v.75a8.217 8.217 0 0 1-2.119 5.52.75.75 0 0 0 .298 1.206c1.544.57 3.16.99 4.831 1.243a3.75 3.75 0 1 0 7.48 0 24.583 24.583 0 0 0 4.83-1.244.75.75 0 0 0 .298-1.205 8.217 8.217 0 0 1-2.118-5.52V9A6.75 6.75 0 0 0 12 2.25ZM9.75 18c0-.034 0-.067.002-.1a25.05 25.05 0 0 0 4.496 0l.002.1a2.25 2.25 0 1 1-4.5 0Z"
											clip-rule="evenodd"
										/>
									</svg>

									<h2 class="text-xl font-calm text-text">Follow Us</h2>
								</div>
								<div class="flex gap-4">
									<a href="https://x.com/KXhakov" target="_blank" class="text-text  dark:text-text hover:text-blue transition-colors">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 24 24"
											fill="currentColor"
											class="size-6"
										>
											<path
												d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0 0 22 5.92a8.19 8.19 0 0 1-2.357.646 4.118 4.118 0 0 0 1.804-2.27 8.224 8.224 0 0 1-2.605.996 4.107 4.107 0 0 0-6.993 3.743 11.65 11.65 0 0 1-8.457-4.287 4.106 4.106 0 0 0 1.27 5.477A4.073 4.073 0 0 1 2.8 9.713v.052a4.105 4.105 0 0 0 3.292 4.022 4.093 4.093 0 0 1-1.853.07 4.108 4.108 0 0 0 3.834 2.85A8.233 8.233 0 0 1 2 18.407a11.615 11.615 0 0 0 6.29 1.84"
											/>
										</svg>
									</a>
									<a target="_blank" href="https://github.com/Khanisic" class="text-text dark:text-text hover:text-blue transition-colors">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 24 24"
											fill="currentColor"
											class="size-6"
										>
											<path
												d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"
											/>
										</svg>
									</a>
									<a target="_blank" href="https://www.linkedin.com/in/abdulmoidkhan/" class="text-text  dark:text-text hover:text-blue transition-colors">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 24 24"
											fill="currentColor"
											class="size-6"
										>
											<path
												d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"
											/>
										</svg>
									</a>
								</div>
							</div>
						</div>

						<!-- Contact Form -->
						<form on:submit|preventDefault={handleSubmit} class="space-y-6">
							<div>
								<label for="name" class="block font-base text-sm font-medium text-text mb-2"
									>Name</label
								>
								<input
									type="text"
									id="name"
									bind:value={formData.name}
									class="w-full font-base px-4 py-2 rounded-lg bg-leftBar dark:bg-darkLeftBar border border-lightBorder dark:border-darkBorder text-text focus:outline-none focus:ring-2 focus:ring-blue"
									required
								/>
							</div>

							<div>
								<label for="email" class="block font-base text-sm font-medium text-text mb-2"
									>Email</label
								>
								<input
									type="email"
									id="email"
									bind:value={formData.email}
									class="w-full font-base px-4 py-2 rounded-lg bg-leftBar dark:bg-darkLeftBar border border-lightBorder dark:border-darkBorder text-text focus:outline-none focus:ring-2 focus:ring-blue"
									required
								/>
							</div>

							<div>
								<label for="subject" class="block font-base text-sm font-medium text-text mb-2"
									>Subject</label
								>
								<input
									type="text"
									id="subject"
									bind:value={formData.subject}
									class="w-full font-base px-4 py-2 rounded-lg bg-leftBar dark:bg-darkLeftBar border border-lightBorder dark:border-darkBorder text-text focus:outline-none focus:ring-2 focus:ring-blue"
									required
								/>
							</div>

							<div>
								<label for="message" class="block font-base text-sm font-medium text-text mb-2"
									>Message</label
								>
								<textarea
									id="message"
									bind:value={formData.message}
									rows="4"
									placeholder="Enter your message here..."
									class="w-full font-base px-4 py-2 rounded-lg bg-leftBar dark:bg-darkLeftBar border border-lightBorder dark:border-darkBorder text-text focus:outline-none focus:ring-2 focus:ring-blue resize-none max-h-[200px] overflow-y-auto"
									required
								></textarea>
							</div>

							<button
								type="submit"
								class="w-full font-base bg-bradley text-white  px-6 py-3 rounded-lg hover:bg-blue/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
								disabled={isSubmitting}
							>
								{#if isSubmitting}
									Sending...
								{:else}
									Send Message
								{/if}
							</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
