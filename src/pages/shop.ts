import { waitOnElem } from '../utils/wait'
import { setFavicon } from '../utils/favicon'
import { PageType } from '../find-type'

const remarksToTitle = async () => {
    console.log('changing title')
    await waitOnElem('section.information')
    const shopName = (await waitOnElem('a.shop-link.ellipsis')) as HTMLAnchorElement
    await waitOnElem('span.btn')
    const favNot = document.querySelector('span.btn > span.gray')

    const remarks = document.querySelector<HTMLSpanElement>('span.shop-remark>span:nth-child(2)')
    setFavicon(!favNot, PageType.SHOP)
    document.title = `${remarks ? remarks.textContent : ''} ${shopName.innerText}`
}

const hookTitleChange = async () => {
    // remarks change & favorite change
    ;((await waitOnElem('.collect-store_dailog')) as HTMLDivElement)
        .querySelectorAll('button')
        .forEach((button) => {
            button.addEventListener('click', () => {
                setTimeout(remarksToTitle, 500)
            })
        })
    // de-favorite
    ;((await waitOnElem('span.btn')) as HTMLSpanElement).addEventListener('click', () => {
        setTimeout(remarksToTitle, 500)
    })
}

export default async () => {
    await Promise.any([remarksToTitle(), hookTitleChange()])
}
