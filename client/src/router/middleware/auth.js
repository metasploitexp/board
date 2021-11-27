export default function auth({next}) {
    if (!localStorage.getItem('auth')) {
        return next({
            name: 'auth'
        })
    } 
    return next()
}