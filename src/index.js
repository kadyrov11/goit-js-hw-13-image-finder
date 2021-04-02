import './styles.css';
import './js/apiService.js'
import imgCard from './templates/imgCard.hbs'
import getPixabayPhotoUrl from "./js/apiService.js"
import * as basicLightbox from 'basiclightbox'
import "basiclightbox/dist/basicLightbox.min.css"


const searchForm = document.getElementById('search-form')
const input = searchForm.querySelector('.input')
const cardList = document.querySelector('.gallery')
const loadMore = document.querySelector('.invisable')

const options = {
    search: "",
    page: 1,
    perPage: 12
}


searchForm.addEventListener('submit',  function (e) {
    e.preventDefault()
    options.search = input.value;
    const response = getPixabayPhotoUrl(options)
    response.then(result => {
        cardList.innerHTML = imgCard(result)
        loadMore.classList.remove('invisable')
    }
    )
})

loadMore.addEventListener('click', function (e) {
    e.preventDefault()
    options.page++
    const lastCard = cardList.querySelector('.gallery-item:last-child')
    const response = getPixabayPhotoUrl(options)
    response.then(result => {
        cardList.insertAdjacentHTML('beforeend', imgCard(result))
        const scroll = lastCard.offsetTop + lastCard.clientHeight + 20
        window.scrollTo({
            top: scroll,
            behavior: 'smooth'
        })
    })
})

cardList.addEventListener('click', function (e) {
    console.dir(e.target);
    if (e.target.nodeName !== 'IMG') {
      return
    }
      const largeImg = e.target.dataset.largeimg
        if (largeImg) {
            const instance = basicLightbox.create(`
    <img src='${largeImg}' width="800" height="600">
`)

    instance.show()
        }
})