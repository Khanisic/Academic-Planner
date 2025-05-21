import { redirect } from '@sveltejs/kit';

export function checkAuth(cookies, isMainAdminPage = false) {
    const adminLoggedIn = cookies.get('adminLoggedIn');
    
    if (!adminLoggedIn && !isMainAdminPage) {
        throw redirect(303, '/admin');
    }
}