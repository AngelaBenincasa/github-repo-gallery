// Div where profile info will appear 
const overview = document.querySelector(".overview");

const username = "AngelaBenincasa";

const myGithubData = async function () {
    const githubData = await fetch (`https://api.github.com/users/${username}`);
    const data = await githubData.json();
    console.log(data);
    displayUserInfo(data);
};

myGithubData();

const displayUserInfo = function (data) {
    const userAvatar = data.avatar_url;
    const name = data.name;
    const bio = data.bio;
    const location = data.location;
    const numberOfPublicRepos = data.public_repos;

    let divItem = document.createElement("div");
    divItem.classList.add("user-info");
    divItem.innerHTML = `<figure>
    <img alt="user avatar" src=${userAvatar} />
  </figure>
  <div>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Bio:</strong> ${bio}</p>
    <p><strong>Location:</strong> ${location}</p>
    <p><strong>Number of public repos:</strong> ${numberOfPublicRepos}</p>
  </div> `;
  overview.append(divItem);
};