export const waitOnElem = (selector: string): Promise<HTMLElement> => {
    return new Promise((resolve) => {
        if (document.querySelector(selector)) {
            return resolve(document.querySelector(selector) as HTMLElement)
        }

        const observer = new MutationObserver((mutations) => {
            if (document.querySelector(selector)) {
                resolve(document.querySelector(selector) as HTMLElement)
                observer.disconnect()
            }
        })

        observer.observe(document.body, {
            childList: true,
            subtree: true,
        })
    })
}

export const waitOnElemOrTimeout = async (selector: string, timeoutMs: number): Promise<HTMLElement> => {
    return new Promise((resolve, reject) => {
        waitOnElem(selector).then(resolve)

        setTimeout(() => {
            reject(new Error('Timeout'))
        }, timeoutMs)
    })
}
