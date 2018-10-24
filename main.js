function calculate() {
  const users = JSON.parse(localStorage.getItem('users'));

  Promise.all(users.map(getPullRequestHacktoberfest))
      .then(results => results.reduce((total, count) => total += count, 0))
      .then(total => {
        if(total < 10) {
          total = "0" + total;
        }
        document.getElementById('pr').innerHTML =  `<span class="count">${total}</span>`
      });
}

function getPullRequestHacktoberfest(author) {
  return fetch(`https://api.github.com/search/issues?q=type:pr+author:${author}+created:%3E2018-10-01`)
      .then(response => response.json())
      .then(json => json['total_count']);
}

calculate();


