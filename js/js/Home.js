const eventList = document.querySelector('.Events');
const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');
const accountdetails = document.querySelector('.account-details')

const setupUI = (user) => {
    if (user) {

        const html = `
        <div>Logged in as ${user.email}</div>
        `;
        accountdetails.innerHTML = html;

        loggedInLinks.forEach(item => item.style.dislpay = 'block');
        loggedOutLinks.forEach(item => item.style.dislpay = 'none');
    } else {
        accountdetails.innerHTML = ' '; 
        loggedInLinks.forEach(item => item.style.dislpay = 'none');
        loggedOutLinks.forEach(item => item.style.dislpay = 'block');
    }
};

    



const findEvents = (data) => {

    if (data.length){

    
        let html = '';
        data.forEach(doc => {
            const Event = doc.data();
            const li = `
                <li>
                    <div class="collapsible-header white lighten-4>Location: ${Event.Location}</div>
                    <div class="collapsible-header white>Event: ${Event.Name}</div>
                    <div class="collapsible-header white>Time: ${Event.Time}</div>
                </li>
            `;
            html += li 
        });
        

        eventList.innerHTML = html;
    } else {
        eventList.innerHTML ='<h3 class="center-align"> Login to check in to events</h3>'
    }
}

//setup materalize components

document.addEventListener('DOMContentLoaded', function(){

    var modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);

    var items = document.querySelectorAll('.collapsible');
    M.collapsible.init(items);
});