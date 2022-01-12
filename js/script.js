// Div where profile info will appear 
const overview = document.querySelector(".overview");
const username = "AngelaBenincasa";
const reposList = document.querySelector(".repo-list");
// Where ALL repo information appears
const allRepos = document.querySelector(".repos");
// Where individual repo data will appear
const repoData = document.querySelector(".repo-data");



const myGithubData = async function () {
    const githubData = await fetch (`https://api.github.com/users/${username}`);
    const data = await githubData.json();
    // console.log(data);
    displayUserInfo(data);
};

myGithubData();

const displayUserInfo = function (data) {
    const divItem = document.createElement("div");
    divItem.classList.add("user-info");
    divItem.innerHTML = `
    <figure>
    <img alt="user avatar" src=${data.avatar_url} />
  </figure>
  <div>
    <p><strong>Name:</strong> ${data.name}</p>
    <p><strong>Bio:</strong> ${data.bio}</p>
    <p><strong>Location:</strong> ${data.location}</p>
    <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
  </div> 
  `;
  overview.append(divItem);
  fetchRepos();
};


const fetchRepos = async function () {
    const githubRepoData = await fetch (`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const repoData = await githubRepoData.json();
    // console.log(repoData);
    displayRepos(repoData);
};

const displayRepos = function (repos) {
    for (const repo of repos) {
        const repoItem = document.createElement("li");
        repoItem.classList.add("repo");
        repoItem.innerHTML = `<h3>${repo.name}</h3>`;
        reposList.append(repoItem);
    }
};

reposList.addEventListener("click", function(e) {
        if (e.target.matches("h3")) {
            const repoName = e.target.innerText;
            specificRepoInfo(repoName);
        }
    });

const specificRepoInfo = async function (repoName) {
    const specificRepoData = await fetch (`https://api.github.com/repos/${username}/${repoName}`);
    const repoInfo = await specificRepoData.json();
    console.log(repoInfo);

    const fetchLanguages = await fetch(repoInfo.languages_url);
    const languageData = await fetchLanguages.json();
    console.log(languageData);

    const languages = [];
    for (const language in languageData) {
        languages.push(language);
    }
    displayRepoInfo(repoInfo, languages);
};


const displayRepoInfo = function (repoInfo, languages) {
    repoData.innerHTML = "";
    repoData.classList.remove("hide");
    allRepos.classList.add("hide");
    const divElement = document.createElement("div");
    divElement.innerHTML = `
    <h3>Name: ${repoInfo.name}</h3>
        <p>Description: ${repoInfo.description}</p>
        <p>Default Branch: ${repoInfo.default_branch}</p>
        <p>Languages: ${languages.join(", ")}</p>
        <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>`;

    repoData.append(divElement);
};