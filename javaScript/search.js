
document.addEventListener("DOMContentLoaded", function () {

  const api = 'https://elen-tenekejyan.github.io/practice.testJson/search-items.json';
  const searchInput = document.querySelector("#searchField");
  const searchOptions = document.querySelector(".options");
  const items = [];

  searchInput.addEventListener('change', displayOptions);
  searchInput.addEventListener('focus', () => {
    searchOptions.classList.remove('hidden');
  });
  searchInput.addEventListener('keyup', () => {
    displayOptions();
  });

  searchInput.addEventListener('input', function () {
    if (searchInput.value.trim() === '') {
      searchOptions.classList.add('hidden');
    } else {
      searchOptions.classList.remove('hidden');
    }
  });
  fetch(api)
    .then(res => res.json())
    .then(data => {
      data.forEach(itemGroup => {
        items.push(...itemGroup.items);
      });
    })
    .catch(error => {
      console.error('Ошибка при поиске:', error);
    });

  function getOptions(word, items) {
    return items.filter(item => {
      const regex = new RegExp(word, 'gi');
      return item.name.match(regex);
    });
  }

  function displayOptions() {
    const inputValue = searchInput.value.trim();
    if (!inputValue) {
      searchOptions.classList.add('hidden');
      return;
    }
    const options = getOptions(inputValue, items);
    if (options.length === 0) {
      searchOptions.innerHTML = '<li class="lng-notFound" style="background: #d64d4d; color: white;"><span class="no-results">Nothing found</span></li>';
    } else {
      const html = options.map(item => {
        const regex = new RegExp(inputValue, "gi");
        const itemName = item.name.replace(regex,
          `<span class="hl">${inputValue}</span>`
        );
        const isActive = item.name.toLowerCase().includes(inputValue.toLowerCase()) ? 'result' : '';

        return `<li><a href="${item.path}" data-index="${item.dataIndex}" class="${isActive}">${itemName}</a></li>`;
      }).slice(0, 5).join("");

      searchOptions.innerHTML = inputValue ? html : null;
    }

    searchOptions.classList.remove('hidden');
    const resultLinks = searchOptions.querySelectorAll('a');
    resultLinks.forEach(link => {
      link.addEventListener('click', handleResultClick);
    });
  }
  function handleResultClick(e) {
    e.preventDefault();
    const dataIndex = e.target.getAttribute('data-index');
    if (dataIndex) {
      window.location.href = `./listing.html#listingNaccs?data-index=${dataIndex}`;
    }
  }
  

});



