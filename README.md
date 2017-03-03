# MyReactMap
React map using react-leaflet on front-end and socket-io on server side.

1. Для того чтобы начать работу необходимо запустить серверную часть c помощью node.js

текущий путь папки server-socket-io node index.js

В результате запустится websocket на 3000 порту (он будет отправлять координаты точек).

2. Затем запускаем интерфейс. Представлены два варианта: 
  1) с обычными маркерами, где каждая точка отмечена на карте индивидуальной меткой (папка reactMap)
  2) с макерами объединенными в кластеры (папка reactMapClusters)
Оба варианта запускаются аналогичным способом:
текущий путь папки reactMap или reactMapClusters npm run dev (в случае если нужен режим отладки) или npm run build ("собранная" версия)

В браузере открываем http://127.0.0.1:8080/ смотрим результат
