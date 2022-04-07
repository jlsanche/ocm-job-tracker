import axios from "axios";
import fetch from "node-fetch";

// const url = "https://api.github.com/users/john-smilga/repos?per_page=100";

// const fetchRepos = async () => {
//   const response = await fetch(url);
//   const data = await response.json();

//   const newData = data.reduce((total, repo) => {
//     const { language } = repo;

//     if (language) {
//       total[language] = total[language] + 1 || 1;
//     }

//     return total;
//   }, {});

//   console.log(newData); // -> { JavaScript: 37, CSS: 44, HTML: 14, SCSS: 2 }
// };
// fetchRepos();

const url = "https://api.hatchways.io/assessment/blog/posts";



// const fetchPosts = async () => {
//   const endPoint = 'tech';

//   const response = await axios.get(url + `?tag=${endPoint}`);
//   console.log(response.data)
// };


//ping()
