<script>
	import '../app.css';
</script>

<div class="dark:bg-darkBg bg-blue min-h-screen max-h-full flex justify-center h-screen p-5">
	<div class="bg-white overflow-hidden dark:bg-darkInner relative rounded-xl w-full h-full shadow-lg max-w-[1440px] ">
		<slot />
	</div>
</div>
