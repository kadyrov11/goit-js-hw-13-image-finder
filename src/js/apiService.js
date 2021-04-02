const BASIC_URL = 'https://pixabay.com/api/'
const API_KEY = '20962845-be92ff9dd02a983b16d8c331e'
const IMG_PARAMS = 'image_type=photo&orientation=horizontal'


const getPixabayPhotoUrl = function ({ search, page, perPage }) {
    const url =  fetch(`${BASIC_URL}?${IMG_PARAMS}&q=${search}&page=${page}&per_page=${perPage}&key=${API_KEY}`)
   return url
        .then(response => {
            if (!response.ok) {
             throw new Error('error!')
            }
            return response.json()
        })
        .then(result => {
            page += 1;
            return result.hits;
        })
    .catch(error => console.log(error))
    
}

export default getPixabayPhotoUrl
