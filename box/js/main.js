const apiUrl = "https://api.github.com/users/"
const search = document.getElementById('q')
const form = document.getElementById('form')
const main = document.getElementById('main')

form.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log(search.value)
    getUser(search.value)
})

let getUser = async (user) => {

    let res = await fetch(apiUrl + user)

    if(res.status == 200){

        createCard(await res.json())
        getRepo(await user)

    }else if (res.status == 404)
        createFoundCard('not found user')
    else
        createFoundCard('there is a problem')    

    
}

let getRepo = async (e) => {

    await fetch(apiUrl + e + '/repos')
        .then(res => res.json())
        .then(data => {
            console.log(data)
            data.forEach(e => {
                let repos = document.createElement('a')
                    repos.href = e.full_name
                    repos.innerHTML = e.name
                    repos.classList.add('repo')

                    document.getElementById('repos').appendChild(repos)
            })
        })
}

let createCard = (e) => {
    console.log(e)
    let card = `
    <div class="card">
        <div class="card-img">
            <img src="${e.avatar_url}" alt="">
        </div>
        <div class="card-detail">
            <a target="_blank" href="${e.html_url}">
                ${dataControl(e.name, 'h1')}
            </a>
            ${dataControl(e.login, 'h2')}
            ${dataControl(e.bio, 'p')}

            <ul class="repo-list">
                <li>${e.followers} <strong>Followers</strong></li>
                <li>${e.following} <strong>Following</strong></li>
            </ul>

            <div id="repos"></div>            
        </div>
    </div>
    `

    main.innerHTML = card
}

let createFoundCard = (e) => {
    let card = `
    <div class="card">
        <h1 class="mx-auto">${e}</h1>
    </div>
    `

    main.innerHTML = card
}

let dataControl = (data, attr) => {

   if(data)
    return `<${attr}>${data}</${attr}>` 
   else 
    return `` 

}