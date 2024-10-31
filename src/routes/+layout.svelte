<script>
	import '../app.css';
</script>

<div class="dark:bg-darkBg bg-blue min-h-screen max-h-full flex justify-center h-screen p-10">
	<div class="bg-white dark:bg-darkInner relative rounded-xl w-full h-full shadow-lg max-w-[1440px] overflow-auto bar">
		<slot />
	</div>
</div>
