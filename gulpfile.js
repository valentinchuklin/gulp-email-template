//ЗАДАЧИ GULP:
const construction = require('./gulp/tasks/construction')
// const build = require('./gulp/tasks/build')

//Комплексная задача разработки на лету DEV-BUILD (Праллельно: Live-server, преобразование pug в html, sass в css, оптимизация img и т.д.)
module.exports.construction = construction
//Финальная сборка в BUILD
// module.exports.build = build