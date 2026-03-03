export function useAllpass() {

  const start = async ({
                         token,
                         container,
                         onComplete
                       }: {
    token: string
    container: string
    onComplete?: () => void
  }) => {

    // 🔥 Dynamic import — решает проблему Vite + SDK
    const module = await import('@allpass/web-sdk')

    const Allpass = module.default ?? module

    const instance = Allpass.init({

      container,

      onLoad: () => {
        console.log('Allpass loaded')
      },

      onStart: (data: any) => {
        console.log('Started:', data)
      },

      onComplete: (data: any) => {
        console.log('Completed:', data)

        onComplete?.()
      },

      onError: (error: any) => {
        console.error('Allpass error:', error)
      }

    })

    instance.start(token)
  }

  return { start }
}