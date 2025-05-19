<script>
	import { Toaster } from "svelte-french-toast";
	import LeftBar from "../lib/components/LeftBar.svelte";
	import UpperBar from "../lib/components/UpperBar.svelte";

	let title = 'Bradley University Academic Planner';
</script>

<Toaster />

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
				class="w-[77%] overflow-auto bar py-10 h-full border-r-lightBorder dark:border-r-darkBorder border-t-0 border-b-0 border-l-0 border-[1px]"
			>
				
			</div>

			<div
				class="w-[23%] top-0 sticky flex flex-col gap-3 px-2 pt-3 items-center overflow-y-auto bar"
			></div>
		</div>
	</div>
</div>
