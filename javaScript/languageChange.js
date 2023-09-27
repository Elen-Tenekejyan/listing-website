class LanguageSwitcher {
  constructor(langURL) {

    this.selectLanguage = document.querySelector("#change-lang");
    this.allLang = ['en', 'ru', 'am'];
    this.langURL = langURL;
    this.langArr = null;
    this.selectLanguage.addEventListener('change', this.changeLanguage.bind(this));

    const selectedLanguage = sessionStorage.getItem('selectedLanguage');
    if (selectedLanguage && this.allLang.includes(selectedLanguage)) {
      this.selectLanguage.value = selectedLanguage;
    }
    this.fetchLanguageData();
  }

  fetchLanguageData() {
    fetch(this.langURL)
      .then(response => response.json())
      .then(data => {
        this.langArr = data;
        this.changeLanguage();
      })
      .catch(error => {
        console.error('Ошибка при загрузке языковых данных:', error);
      });
  }

  changeLanguage() {
    const selectedLanguage = this.selectLanguage.value;
    sessionStorage.setItem('selectedLanguage', selectedLanguage);

    document.querySelector('title').innerHTML = this.langArr['title'][selectedLanguage];

    const inputElement = document.querySelector('input[name="search"]');
    const inputName = document.querySelector('input[name="name"]')
    const inputSurname = document.querySelector('input[name="surname"]')
    const inputEmail = document.querySelector('input[name="email"]')
    const inputMessage = document.querySelector('textarea[name="message"]')
    if (inputElement) {
      inputElement.placeholder = this.langArr['placeholder'][selectedLanguage];
    }
    if (inputName) {
      inputName.placeholder = this.langArr['namePlaceHolder'][selectedLanguage];
    }
    if (inputSurname) {
      inputSurname.placeholder = this.langArr['surnamePlaceHolder'][selectedLanguage];
    }
    if (inputEmail) {
      inputEmail.placeholder = this.langArr['emailPlaceHolder'][selectedLanguage];
    }
    if (inputMessage) {
      inputMessage.placeholder = this.langArr['messagePlaceHolder'][selectedLanguage];
    }
    
    for (let key in this.langArr) {
      if (key !== 'title' && key !== 'placeholder') {
        const elements = document.querySelectorAll('.lng-' + key);
        if (elements) {
          elements.forEach(elem => {
            elem.innerHTML = this.langArr[key][selectedLanguage];
          });
        }
      }
    }
  }
}

const langSwitcher = new LanguageSwitcher('https://elen-tenekejyan.github.io/practice.testJson/lang.json');


