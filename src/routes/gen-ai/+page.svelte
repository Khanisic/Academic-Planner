<script>
	import LeftBar from '../../lib/components/LeftBar.svelte';
	import UpperBar from '../../lib/components/UpperBar.svelte';
	import { GoogleGenerativeAI } from '@google/generative-ai';
	import { marked } from 'marked';

	import {
		spring24CS,
		fall23CS,
		spring23CS,
		fall24CS,
		fall22CS,
		spring22CS,
		spring25CIS,
		fall24CIS,
		fall23CIS,
		spring24CIS,
		spring23CIS,
		fall22CIS,
		gradCatalog,
		faculty,
		CS_courses,
		CIS_courses
	} from './schedule';
	import { tick } from 'svelte';
	let title = 'Bradley Acedemic Helper';
	let container;
	$: {
		if (container) {
			container.scrollTop = container.scrollHeight;
		}
	}

	const planAI = new GoogleGenerativeAI('AIzaSyAuyg98U40DUxD9nnf3bKRg05JcG9Rq388');
	const planModel = planAI.getGenerativeModel({
		model: 'gemini-1.5-flash',
		generationConfig: { temperature: 0 }
	});
	const planChat = planModel.startChat({
		history: [
			{
				role: 'user',
				parts: [
					{
						text: `You are an academic advisor for Bradley University who's job is to make academic plan for  graduate students. 
						Before making the plan you should ask about the student's career aspirations, if any, and then ask about his interested concentrations. 
						Please keep in mind that a student can enroll in maximum of 3 subjects or 9 credit hours per sem and he must complete his core courses in the first 2 semesters. 
						Here is the information about the graduate catalog, faculty data and course descriptions. You are to strictly refer to the following provided jsons for making the academic plan. 
						Please go through the guidelines mentioned in the graduate catalog.
						

Here is the graduate catalog
${JSON.stringify(gradCatalog)} 


Here is the faculty information
${JSON.stringify(faculty)} 


Here are the CS course descriptions
${JSON.stringify(CS_courses)} 


Here are the CIS course descriptions
${JSON.stringify(CIS_courses)}


						)} `
					}
				]
			}
		]
	});

	const genAI = new GoogleGenerativeAI('AIzaSyAuyg98U40DUxD9nnf3bKRg05JcG9Rq388');
	const model = genAI.getGenerativeModel({
		model: 'gemini-1.5-flash',
		generationConfig: { temperature: 0 }
	});
	const chat = model.startChat({
		history: [
			{
				role: 'user',
				parts: [
					{
						text: `You are an academic advisor for Bradley University. Here is the information about the course schedules, graduate catalog, faculty data and course descriptions. You are to strictly refer to the following provided jsons for answereing any questions.

Here are the CS courses offered in spring 2024 
${JSON.stringify(spring24CS)} 


Here are the CS courses offered in fall 2023 
${JSON.stringify(fall23CS)} 


Here are the CS courses offered in spring 2023 
${JSON.stringify(spring23CS)} 


Here are the CS courses offered in fall 2024 
${JSON.stringify(fall24CS)} 


Here are the CS courses offered in fall 2022 
${JSON.stringify(fall22CS)}


Here are the CS courses offered in spring 2022 
${JSON.stringify(spring22CS)}


Here are the CIS courses offered in spring 2025  
${JSON.stringify(spring25CIS)}


Here are the CIS courses offered in fall 2024   
${JSON.stringify(fall24CIS)} 


Here are the CIS courses offered in fall 2023   
${JSON.stringify(fall23CIS)} 


Here are the CIS courses offered in spring 2024   
${JSON.stringify(spring24CIS)} 


Here are the CIS courses offered in spring 2023   
${JSON.stringify(spring23CIS)} 


Here are the CIS courses offered in fall 2022   
${JSON.stringify(fall22CIS)} 


Here is the graduate catalog
${JSON.stringify(gradCatalog)} 


Here is the faculty information
${JSON.stringify(faculty)} 


Here are the CS course descriptions
${JSON.stringify(CS_courses)} 


Here are the CIS course descriptions
${JSON.stringify(CIS_courses)}


						)} `
					}
				]
			}
		]
	});

	let isAnimating = false;
	let prompt = '';
	let user = '';
	let chatHistory = [
		// {
		// 	role: 'user',
		// 	message: 'What courses are offered by Dr. Vladmir Uskov?'
		// },
		// {
		// 	role: 'ai',
		// 	message:
		// 		'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. sunt in culpa qui officia deserunt mollit anim id est laborum.'
		// },
		// {
		// 	role: 'loading'
		// }
	];

	let selection;

	async function planAi() {
		chatHistory = [...chatHistory, { role: 'user', message: prompt }];
		await tick();
		container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' });

		chatHistory = [...chatHistory, { role: 'loading' }];
		await tick();
		container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' });
		let result = await planChat.sendMessage(prompt);
		prompt = '';
		chatHistory = chatHistory.slice(0, -1); // remove loading state
		chatHistory = [...chatHistory, { role: 'ai', message: result.response.text() }];

		// After AI response
		await tick();
		container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' });
	}

	async function genAi() {
		chatHistory = [...chatHistory, { role: 'user', message: prompt }];
		await tick();
		container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' });

		chatHistory = [...chatHistory, { role: 'loading' }];
		await tick();
		container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' });

		let result = await chat.sendMessage(prompt);
		prompt = '';
		chatHistory = chatHistory.slice(0, -1); // remove loading state
		chatHistory = [...chatHistory, { role: 'ai', message: result.response.text() }];

		// After AI response
		await tick();
		container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' });
	}
</script>

<div class="flex h-full relative top-0">
	<div
		class="bg-leftBar top-0 sticky dark:bg-black rounded-l-xl border-r-lightBorder dark:border-r-darkBorder border-t-0 border-b-0 border-l-0 border-[1px] h-full w-1/6"
	>
		<LeftBar />
	</div>

	<div class="w-5/6 flex flex-col h-full">
		<UpperBar bind:title />
		<div class="flex h-full overflow-hidden">
			<div
				class="w-[77%] overflow-auto bar h-full border-r-lightBorder dark:border-r-darkBorder border-t-0 border-b-0 border-l-0 border-[1px]"
			>
				<div
					class={`flex flex-col ${chatHistory.length == 0 ? 'items-center justify-center' : ''} w-full relative h-full`}
				>
					{#if chatHistory.length == 0}
						<div class="mb-40 flex flex-col gap-4 justify-center items-center">
							<div class="flex items-center justify-center gap-3 w-fit">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="1.5"
									stroke="currentColor"
									class="size-6 stroke-purple dark:fill-purple"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"
									/>
								</svg>
								<p
									class="font-calm title-animation transition-all ease-in-and-out duration-300 cursor text-purple dark:text-text text-4xl w-fit"
								>
									Hey, how can I help you? &nbsp;
								</p>
							</div>
							{#if !selection}
								<div class="flex w-full gap-3">
									<button
										on:click={() => {
											selection = 'plan';
										}}
										class="flex gap-3 w-fit items-center text-center font-base dark:text-text hover:dark:text-white border-purple border-[1px] px-6 text-xl rounded-2xl py-2 hover:bg-purple hover:text-white cursor-pointer"
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											stroke-width="1.5"
											stroke="currentColor"
											class="size-6"
										>
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
											/>
										</svg>

										Academic Plan Helper
									</button>
									<button
										on:click={() => {
											selection = 'qa';
										}}
										class="flex gap-3 w-fit items-center text-center font-base border-purple dark:text-text hover:dark:text-white border-[1px] px-6 text-xl rounded-2xl py-2 hover:bg-purple hover:text-white cursor-pointer"
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											stroke-width="1.5"
											stroke="currentColor"
											class="size-6"
										>
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Zm3.75 11.625a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
											/>
										</svg>

										Helper, Q/A
									</button>
								</div>
							{/if}
						</div>
					{/if}
					{#if chatHistory.length > 0}
						<div
							bind:this={container}
							class="p-10 flex flex-col gap-4 h-[85%] pb-10 bar overflow-y-auto scroll-smooth"
						>
							{#each chatHistory as chat}
								{#if chat.role == 'user'}
									<div class="self-end">
										<p
											class="font-base text-lg py-2 dark:bg-darkBg dark:border-darkBorder dark:text-text bg-lightpurple w-fit border-[1px] rounded-full px-5"
										>
											{@html marked(chat.message)}
										</p>
									</div>
								{/if}
								{#if chat.role == 'ai'}
									<div class="flex gap-3">
										<div
											class="bg-purple dark:bg-darkInner dark:border-purple hover:border-[1px] rounded-full min-w-10 min-h-10 max-w-10 max-h-10 flex justify-center items-center"
										>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												fill="none"
												viewBox="0 0 24 24"
												stroke-width="1.5"
												stroke="currentColor"
												class="size-6 stroke-white dark:stroke-purple dark:fill-purple"
											>
												<path
													stroke-linecap="round"
													stroke-linejoin="round"
													d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"
												/>
											</svg>
										</div>
										<p class="font-base text-text text-lg dark:border-darkBorder px-3">
											{@html marked(chat.message)}
										</p>
									</div>
								{/if}

								{#if chat.role == 'loading'}
									<div class="self-start flex items-start gap-3 rounded-full w-full pr-4">
										<div
											class=" dark:bg-darkInner dark:border-purple hover:border-[1px] rounded-full min-w-10 min-h-10 max-w-10 max-h-10 flex justify-center items-center"
										>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												fill="none"
												viewBox="0 0 24 24"
												stroke-width="1.5"
												stroke="currentColor"
												class="size-6 fill-purple stroke-purple dark:stroke-text dark:fill-text animate-spin"
											>
												<path
													stroke-linecap="round"
													stroke-linejoin="round"
													d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"
												/>
											</svg>
										</div>
										<div class="flex flex-col w-full gap-2">
											<div
												class=" rounded-full animate-pulse dark:bg-text bg-purple w-full h-5"
											></div>
											<div
												class=" rounded-full animate-pulse dark:bg-darkBorder bg-lightpurple w-[85%] h-5"
											></div>
											<div
												class=" rounded-full animate-pulse dark:bg-text bg-purple w-full h-5"
											></div>
											<div
												class=" rounded-full animate-pulse dark:bg-darkBorder bg-lightpurple w-[65%] h-5"
											></div>
										</div>
									</div>
								{/if}
							{/each}
						</div>
					{/if}
					{#if selection == 'qa'}
						<div
							class="flex gap-2 absolute w-full ai-input justify-center px-10"
							class:animating={chatHistory.length > 0}
						>
							<input
								placeholder="Tell me about CS 590..."
								class="bg-lightpurple dark:bg-text text-xl font-base placeholder:text-gray-100 dark:placeholder:text-gray-400 outline-none w-full border-none px-6 py-3 rounded-full"
								bind:value={prompt}
							/>

							<button
								class="bg-white hover:bg-lightpurple group dark:border-[1px] border-lightpurple border-[1px] dark:border-darkBorder dark:hover:border-purple dark:bg-darkInner flex gap-2 items-center w-fit rounded-2xl font-base text-white py-1 px-3"
								on:click={() => {
									genAi();
								}}
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="2"
									stroke="currentColor"
									class="size-5 dark:group-hover:stroke-purple group-hover:stroke-white stroke-purple"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
									/>
								</svg>
							</button>
						</div>
					{/if}
					{#if selection == 'plan'}
						<div
							class="flex gap-2 absolute w-full ai-input justify-center px-10"
							class:animating={chatHistory.length > 0}
						>
							<input
								placeholder="Hey, I'm John Doe and want to make an academic plan for my Master's in Computer Science."
								class="bg-lightpurple dark:bg-text text-xl font-base placeholder:text-gray-100 dark:placeholder:text-gray-400 outline-none w-full border-none px-6 py-3 rounded-full"
								bind:value={prompt}
							/>

							<button
								class="bg-white hover:bg-lightpurple group dark:border-[1px] border-lightpurple border-[1px] dark:border-darkBorder dark:hover:border-purple dark:bg-darkInner flex gap-2 items-center w-fit rounded-2xl font-base text-white py-1 px-3"
								on:click={() => {
									planAi();
								}}
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="2"
									stroke="currentColor"
									class="size-5 dark:group-hover:stroke-purple group-hover:stroke-white stroke-purple"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
									/>
								</svg>
							</button>
						</div>
					{/if}
				</div>
			</div>
			<div class="p-2 w-[23%]">
				<p class="text-text font-calm text-lg text-center">
					Here are some suggestions to get the best out of the Bradley Academic Helper.
				</p>
			</div>
		</div>
	</div>
</div>
