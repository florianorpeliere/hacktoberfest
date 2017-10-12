function calculate() {
  const users = ['SiegfriedEhret', 'florianorpeliere'];

  Promise.all(users.map(getPullRequestHacktoberfest))
      .then(results => results.reduce((total, count) => total += count, 0))
      .then(total => {
        document.getElementById('pr').innerHTML =  `<span class="count">${total}</span>`
      });
}

function getPullRequestHacktoberfest(author) {
  return fetch(`https://api.github.com/search/issues?q=type:pr+author:${author}+created:%3E2017-10-01`)
      .then(response => response.json())
      .then(json => json['total_count']);
}

calculate();


