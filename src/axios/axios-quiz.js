import axios from 'axios'

export default axios.create({
    baseURL: 'https://xtr-minin-react-quiz-default-rtdb.europe-west1.firebasedatabase.app/'
})