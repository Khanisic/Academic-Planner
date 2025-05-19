<script>
	import LeftBar from '../../lib/components/LeftBar.svelte';
	import UpperBar from '../../lib/components/UpperBar.svelte';

	let title = 'Contact';
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
				<div class="flex flex-col gap-10 px-4 py-10">
					<p class="text-text font-calm text-2xl text-center">
						Feel free to contact us at <a href="mailto:amkhan357@gmail.com" class="text-blue font-calm">
							amkhan357@gmail.com</a
						>
					</p>
				</div>
			</div>
			<div class="p-2 w-[23%]">
				<p class="text-text font-calm text-lg text-center">
					This project was developed for new students who have
				</p>
			</div>
		</div>
	</div>
</div>
