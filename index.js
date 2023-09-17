//ローディング画面表示
const displayLoading = () => new Promise(resolve => {
  const loading = document.querySelector('.loading');
  loading.classList.add('active');
  setTimeout(() => {
    loading.classList.remove("active");
    resolve();
  }, 400);
});

//以前のcharacterListのli要素があれば取り除く
const characterList = document.querySelector('.characterList');

const removeCharacterListItems = () => {
  while (characterList.firstChild) {
    characterList.removeChild(characterList.firstChild);
  }
};

//DOM要素を生成
const createElement = (data) => {
  for (const character of data) {
    const li = document.createElement("li");
    const name = document.createElement("h3");
    name.textContent = character.name;
    const category = document.createElement("span");
    category.textContent = character.category;
    const image = new Image();
    image.classList.add("imageStyle");
    const imageURL = (`https://ihatov08.github.io/${character.image}`);
    image.src = imageURL;
    li.appendChild(name);
    li.appendChild(category);
    li.appendChild(image);
    characterList.appendChild(li);
  }
};

//鬼滅APIからデータを取得し、画面に表示
async function callKimetsuApi(selectCharacter) {
  const url = `https://ihatov08.github.io/kimetsu_api/api/${selectCharacter}.json`;
  const response = await fetch(url);
  const data = await response.json();
  removeCharacterListItems();
  await displayLoading();
  createElement(data);
}

//ラジオボタンで選択された値を取得
let selectCharacter = "";

document.getElementsByName("character").forEach((radio) => {
  radio.addEventListener('change', () => {
    if (radio.checked) {
      selectCharacter = radio.value;
    }
    callKimetsuApi(selectCharacter);
  });
});