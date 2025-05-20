<script>
	import { Toaster } from 'svelte-french-toast';
	import LeftBar from '../lib/components/LeftBar.svelte';
	import UpperBar from '../lib/components/UpperBar.svelte';

	let title = 'Bradley University Academic Planner';
	let showLeftBar = false;

	function toggleLeftBar() {
		showLeftBar = !showLeftBar;
	}
</script>

<Toaster />

<div class="flex h-full relative top-0">
	<button
		class="absolute top-4 left-4 z-50 bg-leftBar dark:bg-black p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
		on:click={toggleLeftBar}
	>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke-width="1.5"
			stroke="currentColor"
			class="size-6 text-bradley dark:text-white"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12"
			/>
		</svg>
	</button>
	<div
		class="bg-leftBar top-0 absolute z-40 dark:bg-black rounded-l-xl border-r-lightBorder dark:border-r-darkBorder border-t-0 border-b-0 border-l-0 border-[1px] h-full w-1/6 transition-transform duration-300 ease-in-out"
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
						<h1 class="text-4xl font-calm text-text mb-4">
							Welcome to Bradley University Academic Planner
						</h1>
						<p class="text-lg text-text/80 font-base">
							Your personalized guide to academic success at Bradley University
						</p>
					</div>

					<div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
						<div class="bg-leftBar border-lightBorder dark:border-darkBorder border-2 dark:bg-darkLeftBar p-6 rounded-xl">
							<div class="flex items-center gap-3 mb-4">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="1.5"
									stroke="currentColor"
									class="size-6 text-bradley"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z"
									/>
								</svg>

								<h2 class="text-xl font-calm text-text">Academic Planning</h2>
							</div>
							<p class="text-text/80 font-base ">
								Plan your academic journey with our intuitive course planning tools. Generate
								personalized paths based on your major and interests.
							</p>
						</div>

						<div class="bg-leftBar border-lightBorder dark:border-darkBorder border-2 dark:bg-darkLeftBar p-6 rounded-xl">
							<div class="flex items-center gap-3 mb-4">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
									fill="currentColor"
									class="size-8 text-purple"
								>
									<path
										d="M4.5 6.375a4.125 4.125 0 1 1 8.25 0 4.125 4.125 0 0 1-8.25 0ZM14.25 8.625a3.375 3.375 0 1 1 6.75 0 3.375 3.375 0 0 1-6.75 0ZM1.5 19.125a7.125 7.125 0 0 1 14.25 0v.003l-.001.119a.75.75 0 0 1-.363.63 13.067 13.067 0 0 1-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 0 1-.364-.63l-.001-.122ZM17.25 19.128l-.001.144a2.25 2.25 0 0 1-.233.96 10.088 10.088 0 0 0 5.06-1.01.75.75 0 0 0 .42-.643 4.875 4.875 0 0 0-6.957-4.611 8.586 8.586 0 0 1 1.71 5.157v.003Z"
									/>
								</svg>
								<h2 class="text-xl font-calm text-text">Faculty Insights</h2>
							</div>
							<p class="text-text/80 font-base">
								Get to know your professors and their teaching styles. Access course reviews and
								faculty information to make informed decisions.
							</p>
						</div>

						<div class="bg-leftBar border-lightBorder dark:border-darkBorder border-2 dark:bg-darkLeftBar p-6 rounded-xl">
							<div class="flex items-center gap-3 mb-4">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
									fill="currentColor"
									class="size-8 text-yellow"
								>
									<path
										d="M11.7 2.805a.75.75 0 0 1 .6 0A60.65 60.65 0 0 1 22.83 8.72a.75.75 0 0 1-.231 1.337 49.949 49.949 0 0 0-9.902 3.912l-.003.002-.34.18a.75.75 0 0 1-.707 0A50.009 50.009 0 0 0 7.5 12.174v-.224c0-.131.067-.248.172-.311a54.614 54.614 0 0 1 4.653-2.52.75.75 0 0 0-.65-1.352 56.129 56.129 0 0 0-4.78 2.589 1.858 1.858 0 0 0-.859 1.228 49.803 49.803 0 0 0-4.634-1.527.75.75 0 0 1-.231-1.337A60.653 60.653 0 0 1 11.7 2.805a.75.75 0 0 1 .6 0A60.65 60.65 0 0 1 22.83 8.72a.75.75 0 0 1-.231 1.337 49.949 49.949 0 0 0-9.902 3.912l-.003.002-.34.18a.75.75 0 0 1-.707 0A50.009 50.009 0 0 0 7.5 12.174v-.224c0-.131.067-.248.172-.311a54.614 54.614 0 0 1 4.653-2.52.75.75 0 0 0-.65-1.352 56.129 56.129 0 0 0-4.78 2.589 1.858 1.858 0 0 0-.859 1.228 49.803 49.803 0 0 0-4.634-1.527.75.75 0 0 1-.231-1.337A60.653 60.653 0 0 1 11.7 2.805Z"
									/>
									<path
										d="M13.06 15.473a48.45 48.45 0 0 1 7.666-3.282c.134 1.414.22 2.843.255 4.285a.75.75 0 0 1-.46.71 47.878 47.878 0 0 0-8.105 4.342.75.75 0 0 1-.832 0 47.877 47.877 0 0 0-8.104-4.342.75.75 0 0 1-.461-.71c.035-1.442.121-2.87.255-4.286A48.4 48.4 0 0 1 6.223 4.97a.75.75 0 0 1 1.03-.293 48.4 48.4 0 0 0 5.36 2.332c.51-.162 1.02-.314 1.533-.456a.75.75 0 0 1 .65 1.352 56.129 56.129 0 0 1-4.78 2.589 1.858 1.858 0 0 0-.859 1.228 49.803 49.803 0 0 1-4.634-1.527.75.75 0 0 1-.231-1.337A60.653 60.653 0 0 1 11.7 2.805a.75.75 0 0 1 .6 0A60.65 60.65 0 0 1 22.83 8.72a.75.75 0 0 1-.231 1.337 49.949 49.949 0 0 0-9.902 3.912l-.003.002-.34.18a.75.75 0 0 1-.707 0A50.009 50.009 0 0 0 7.5 12.174v-.224c0-.131.067-.248.172-.311a54.614 54.614 0 0 1 4.653-2.52.75.75 0 0 0-.65-1.352 56.129 56.129 0 0 0-4.78 2.589 1.858 1.858 0 0 0-.859 1.228 49.803 49.803 0 0 0-4.634-1.527.75.75 0 0 1-.231-1.337A60.653 60.653 0 0 1 11.7 2.805Z"
									/>
								</svg>
								<h2 class="text-xl font-calm text-text">Course Resources</h2>
							</div>
							<p class="text-text/80 font-base">
								Access comprehensive course information, including prerequisites, descriptions, and
								semester availability to plan your schedule effectively.
							</p>
						</div>

						<div class="bg-leftBar border-lightBorder dark:border-darkBorder border-2 dark:bg-darkLeftBar p-6 rounded-xl">
							<div class="flex items-center gap-3 mb-4">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
									fill="currentColor"
									class="size-8 text-green"
								>
									<path
										d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z"
									/>
								</svg>
								<h2 class="text-xl font-calm text-text">AI Assistance</h2>
							</div>
							<p class="text-text/80 font-base">
								Get personalized recommendations and insights using our AI-powered tools. Make
								informed decisions about your academic path.
							</p>
						</div>
					</div>

					<div class="text-center flex w-full justify-center">
						<a
							href="/path"
							class="flex justify-center w-fit items-center gap-2 bg-bradley text-white px-6 py-3 rounded-lg hover:bg-blue/90 transition-colors"
						>
							<span class="font-calm text-xl">Start Planning</span>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="currentColor"
								class="size-5"
							>
								<path
									fill-rule="evenodd"
									d="M12.97 3.97a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06l6.22-6.22-6.22-6.22a.75.75 0 0 1 0-1.06Z"
									clip-rule="evenodd"
								/>
							</svg>
						</a>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
