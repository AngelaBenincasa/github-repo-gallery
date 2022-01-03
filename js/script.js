// Div where profile info will appear 
const overview = document.querySelector(".overview");
const username = "AngelaBenincasa";
const displayReposList = document.querySelector(".repo-list");

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
        displayReposList.append(repoItem);
    }
};
