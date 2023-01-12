import { waitOnElem, waitOnElemOrTimeout } from '../utils/wait'
import { imageToBlob } from '../utils/imageToBlob'
import { setFavicon } from '../utils/favicon'
import { PageType } from '../find-type'

const changeTitleFeature = async () => {
    const prodTitle = await waitOnElem('.goods-title_text')
    const isFav = document.querySelector('#app').querySelectorAll('.favorite').length > 0
    setFavicon(isFav, PageType.PRODUCT)
    document.title = `${prodTitle.textContent}`
}

const preloadImages = async () => {
    const slider = await waitOnElemOrTimeout('.storageQcImg-dialog', 2000)

    if (slider) {
        const box = document.querySelector<HTMLDivElement>('.storageQcImg-dialog-box')
        box.setAttribute('style', 'position: absolute; top: 0; left: 0; width: 0px; height: 0px;')

        await new Promise((resolve) => setTimeout(resolve, 0))
        document.querySelector<HTMLImageElement>('img.timeInfo-img').click()

        const img = (await waitOnElem('img.swiper-big-img-item[data-src^="https"]')) as HTMLImageElement

        // // document.querySelectorAll<HTMLImageElement>('img.swiper-big-img-item').forEach((img, ix) => {
        // //     if (ix < imagesToLoad) {
        // //         // img.loading = 'eager'
        // //         imageToBlob(img['data-src']).then((url) => {
        // //             console.log(ix, ' loaded img ', url)
        // //             img.src = url
        // //         })
        // //     }
        // // })

        ;(await waitOnElem('#storageqcimg-dialog-close')).click()
        await new Promise((resolve) => setTimeout(resolve, 2000))
        box.setAttribute('style', 'z-index: 2001; display: none;')
    }
}

const hookTitleChange = async () => {
    await waitOnElem('.favorite, .is-favorite')
    document.querySelectorAll('.favorite, .is-favorite').forEach((button) => {
        button.addEventListener('click', () => {
            setTimeout(changeTitleFeature, 500)
        })
    })
}

export default async () => {
    console.log('product page - pandabuy-script')
    await Promise.any([changeTitleFeature(), hookTitleChange(), preloadImages()])
}
