export default defineContentScript({
    matches: ['https://www.linkedin.com/*'],
    main() {
        console.log('LinkedIn AI Reply extension loaded successfully!')
    },
  })
