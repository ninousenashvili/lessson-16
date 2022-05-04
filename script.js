
function getuser(page) {
    let request = new XMLHttpRequest();
    request.addEventListener('load', render);
    request.addEventListener('error', errorender);


    request.open('GET', 'https://reqres.in/api/users?page=' + page);
    request.send();

}
let currentPage = 1;
let totalPagesApi;

function render() {
    let response = this.responseText;
    let responsedata = JSON.parse(response);

    var fragment = document.createDocumentFragment();

    responsedata.data.forEach(item => {
        let image = document.createElement('img');
        image.src = item.avatar;
        image.classList.add('class', 'image-block');

        let li = document.createElement('li');

        let pemail = document.createElement('p');
        pemail.textContent = item.email;
        pemail.classList.add('class', 'p-email');

        li.classList.add('class', 'list');

        li.appendChild(image);
        li.appendChild(pemail);

        fragment.appendChild(li);

    })
    document.getElementById('ul-list').innerHTML = ' ';
    document.getElementById('ul-list').appendChild(fragment);
    totalPagesApi = responsedata.total_pages;


}
function errorender() {
    let error = document.createElement('p');
    error.textContent = 'Server error';

    document.getElementById('main-section').appendChild(error);

}



document.getElementById('previous').addEventListener('click', function () {
    if (currentPage == 1) {
        return;
    }

    currentPage -= 1;
    getuser(currentPage);

})

document.getElementById('next').addEventListener('click', function () {
    if (currentPage == totalPagesApi) {
        return;
    }
    currentPage += 1;
    getuser(currentPage);
})

getuser(currentPage);