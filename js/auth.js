window.onload = () => {
    const logged = localStorage.getItem('logged');

    if (logged == 'false') {
        console.log('Return to login');
        window.location.assing('login.html');
    }
}