declare module '@allpass/web-sdk' {

  interface InitOptions {
    container: string
    onLoad?: () => void
    onStart?: (data: any) => void
    onComplete?: (data: any) => void
    onError?: (data: any) => void
  }

  interface AllpassInstance {
    start: (token: string) => void
  }

  function init(options: InitOptions): AllpassInstance

  export default {
    init
  }
}