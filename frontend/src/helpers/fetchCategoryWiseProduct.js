import SummaryApi from '../common/index.js'

const fetchCategoryWiseProduct = async (category) => {
    const response = await fetch(SummaryApi.categorywiseproduct.url, {
        method: SummaryApi.categorywiseproduct.method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productCategory: category }),
    })
    const dataResponse = await response.json()

    return dataResponse
}
export default fetchCategoryWiseProduct;