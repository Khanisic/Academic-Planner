<script>
    let username = '';
    let password = '';
    let error = '';

    // Simple hardcoded credentials - in a real app, these would be stored securely
    const ADMIN_USERNAME = 'admin';
    const ADMIN_PASSWORD = 'admin123';

    function handleLogin() {
        if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
            sessionStorage.setItem('adminLoggedIn', 'true');
            window.location.reload();
        } else {
            error = 'Invalid credentials';
        }
    }
</script>

<div class="flex items-center justify-center min-h-screen bg-leftBar dark:bg-darkLeftBar">
    <div class="bg-white dark:bg-black p-8 rounded-xl shadow-lg w-96">
        <h2 class="text-2xl font-calm text-text mb-6 text-center">Admin Login</h2>
        
        {#if error}
            <p class="text-red-500 mb-4 text-center">{error}</p>
        {/if}

        <form on:submit|preventDefault={handleLogin} class="space-y-4">
            <div>
                <label for="username" class="block text-text mb-2 font-base">Username</label>
                <input
                    type="text"
                    id="username"
                    bind:value={username}
                    class="w-full font-base p-2 border border-lightBorder dark:border-darkBorder rounded-lg bg-leftBar dark:bg-darkLeftBar text-text"
                    required
                />
            </div>
            
            <div>
                <label for="password" class="block text-text mb-2 font-base">Password</label>
                <input
                    type="password"
                    id="password"
                    bind:value={password}
                    class="w-full font-base p-2 border border-lightBorder dark:border-darkBorder rounded-lg bg-leftBar dark:bg-darkLeftBar text-text"
                    required
                />
            </div>

            <button
                type="submit"
                class="font-base w-full bg-bradley  text-white py-2 rounded-lg hover:bg-blue transition-colors"
            >
                Login
            </button>
        </form>
    </div>
</div> 