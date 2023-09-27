

const on = (type, el, listener, all = false) => {
  let selectEl = select(el, all)
  if (selectEl) {
    if (all) {
      selectEl.forEach(e => e.addEventListener(type, listener))
    } else {
      selectEl.addEventListener(type, listener)
    }
  }
}

const select = (el, all = false) => {
  el = el.trim()
  if (all) {
    return [...document.querySelectorAll(el)]
  } else {
    return document.querySelector(el)
  }
}


// ----------------------------scrolled header---------------------
const onscroll = (el, listener) => {
  el.addEventListener('scroll', listener)
}
let selectHeader = select('#header')
let selectButton = select('#menu_link_button')
let selectLogo = select("#logo")
let selectIcon = select('.plusIcon')

if (selectHeader) {
  const headerScrolled = () => {
    if (window.scrollY > 100) {
      selectHeader.classList.add('scrollderHeader');
      if (selectButton) {
        selectButton.classList.add('scrolledButton');
      }
      if (selectLogo) {
        selectLogo.classList.add('scrolled')
      }
      if (selectIcon) {
        selectIcon.classList.add('scrolledIcon')
      }

      const menuLinks = select('.menu_link', true);
      if (menuLinks.length > 0) {
        menuLinks.forEach(menuItem => {
          menuItem.classList.add('scrolled');
        });
      }
    } else {
      selectHeader.classList.remove('scrollderHeader');
      if (selectButton) {
        selectButton.classList.remove('scrolledButton');
      }
      if (selectLogo) {
        selectLogo.classList.remove('scrolled')
      }
      if (selectIcon) {
        selectIcon.classList.remove('scrolledIcon')
      }

      const menuLinks = select('.menu_link', true);
      if (menuLinks.length > 0) {
        menuLinks.forEach(menuItem => {
          menuItem.classList.remove('scrolled');
        });
      }
    }
  };

  window.addEventListener('load', headerScrolled);
  onscroll(document, headerScrolled);
}


// ---------------------------menu toggle----------------------

let mediaMenu = document.querySelector(".menuBar")
let burgerToggle = document.querySelector('.headerBurger')

burgerToggle.addEventListener("click",()  =>{
  burgerToggle.classList.toggle("active")
  mediaMenu.classList.toggle("active")
})

// ----------------------------popular categories--tabs-------------------

let categories = document.querySelectorAll(".naccs .category-menu div");
let listItems = document.querySelectorAll(".nacc li");

categories.forEach(function(category, index) {
  category.addEventListener("click", function() {
    category.classList.add("active")

    let dataIndex = category.getAttribute("data-index");

    categories.forEach(function(cat){
      if (cat !== category) {
        cat.classList.remove("active");
      }
    })
    if (listItems[dataIndex]) {
      listItems.forEach(function(item) {
        item.classList.remove("active");
      });
      
      listItems[dataIndex].classList.add("active");
    }
  });
});


// -------------------moving from categories to listing page with scrolling--------------


document.addEventListener("DOMContentLoaded", function() {
  let links = document.querySelectorAll('.categories li[data-index]');
  let hash = window.location.hash;
  let dataIndex = hash.split('?data-index=')[1];

  links.forEach(function(link) {
    link.addEventListener('click', function(e) {
      let dataIndex = link.getAttribute('data-index');
      window.location.href = './listing.html#listingNaccs?data-index=' + dataIndex;
    });
  });

  if (dataIndex !== undefined) {
    let allDivs = document.querySelectorAll('.listing-page .naccs .category-menu div[data-index]');
    let allInfo = document.querySelectorAll('.listing-page .naccs .nacc li[data-index]');
    
    allDivs.forEach(function(div) {
      div.classList.remove('active');
    });
    
    allInfo.forEach(function(info) {
      info.classList.remove('active');
    });

    let listingActiveDiv = document.querySelector('.listing-page .naccs .category-menu div[data-index="' + dataIndex + '"]');
    let listingactiveInfo = document.querySelector('.listing-page .naccs .nacc li[data-index="' + dataIndex + '"]');
    
    if (listingActiveDiv) {
      listingActiveDiv.classList.add('active');
    }
    if (listingactiveInfo) {
      listingactiveInfo.classList.add('active');
    }

    let listingsElement = document.getElementById('listings');
    if (listingsElement) {
      listingsElement.scrollIntoView({ behavior: 'smooth' });
    }
  }
});



// --------------moving from popular-category link to category.html page with scrolling-------

document.addEventListener("DOMContentLoaded", function() {
let urlParams = new URLSearchParams(window.location.search);
let dataIndex = urlParams.get('data-index');

  if (dataIndex !== null) {
    let activeDiv = document.querySelector('.category-menu div[data-index="' + dataIndex + '"]');
    let activeInfo = document.querySelector('.category-post .nacc li[data-index="' + dataIndex + '"]');

    if (activeDiv) {
      activeDiv.classList.add('active');
    }
    if (activeInfo) {
      activeInfo.classList.add('active');
    }
    let categoryMenuDivs = document.querySelectorAll('.category-menu div');
    categoryMenuDivs.forEach(function(div) {
      if (div !== activeDiv) {
        div.classList.remove('active');
      }
    });
    let naccLiItems = document.querySelectorAll('.category-post .nacc li');
    naccLiItems.forEach(function(li) {
      if (li !== activeInfo) {
        li.classList.remove('active');
      }
    });
  }

  let shoppingLi = document.getElementById('shopping');
  if (shoppingLi) {
    shoppingLi.addEventListener('click', function() {
      let dataIndex = 3; 

      window.location.href = './category.html?data-index=' + dataIndex + '#info';
    });
  }


  setTimeout(function() {
    var naccsElement = document.querySelector('.category-post');
    if (naccsElement) {
      naccsElement.style.display = 'flex';
    }
  }, 500); // !!! Միլիվայրկյանը 500-ից ավել չդնել !!!
});






