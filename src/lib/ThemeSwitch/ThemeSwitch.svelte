<script lang="ts">
    let darkMode = true;

    function handleSwitchDarkMode() {
        darkMode = !darkMode;

        darkMode
            ? document.documentElement.classList.add('dark')
            : document.documentElement.classList.remove('dark');
    }
</script>

<div>
    <input checked={darkMode} on:click={handleSwitchDarkMode} type="checkbox" id="theme-toggle" />
    <label for="theme-toggle" />
</div>

<style lang="postcss">
	#theme-toggle {
		@apply invisible;
	}

	#theme-toggle + label {
		@apply inline-block cursor-pointer h-12 w-12 absolute top-6 right-24 rounded-full duration-300 content-[''];
	}

	#theme-toggle:not(:checked) + label {
		@apply bg-amber-400;
	}

	#theme-toggle:checked + label {
		@apply bg-transparent;
		box-shadow: inset -18px -16px 1px 1px #ddd;
	}
</style>
