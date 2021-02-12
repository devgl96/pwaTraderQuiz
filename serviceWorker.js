const staticTraderQuiz = "trader-quiz-app-v1";

const assets = [
    "/", 
    "/index.html",
    "/css/styles.css",
    "/js/index.js",
    "/images/candlestick_3_soldados_alta.png", 
    "/images/candlestick_3_soldados_baixa.png",
    "/images/candlestick_candle_forca.png",
    "/images/candlestick_doji.png",
    "/images/candlestick_enforcado.png",
    "/images/candlestick_engolfo_alta.png",
    "/images/candlestick_engolfo_baixa.png",
    "/images/candlestick_estrela_cadente.png",
    "/images/candlestick_estrela_da_manha.png",
    "/images/candlestick_estrela_da_noite.png",
    "/images/candlestick_harami.png",
    "/images/candlestick_martelo_invertido.png",
    "/images/candlestick_martelo.png",
    "/images/candlestick_nuvem_negra.png",
    "/images/candlestick_piercing_alta.png",
    "/images/bullTrader.png",
    "/images/bearTrader.png"
];

self.addEventListener("install", installEvent => {
    installEvent.waitUntil(
        caches.open(staticTraderQuiz).then(cache => {
            cache.addAll(assets);
        })
    )
});

self.addEventListener("fetch", fetchEvent => {
    fetchEvent.respondWith(
        caches.match(fetchEvent.request).then(res => {
            return res || fetch(fetchEvent.request);
        }).catch((err) => {
            return err;
        })
    )
});