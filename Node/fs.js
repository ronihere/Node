const path = require('path')
const fsPromises = require('fs').promises;

const readWrite = async () => {
    const write = await fsPromises.writeFile(path.join(__dirname, 'files', 'write.txt'), 'Hi bro');
    const append = await fsPromises.appendFile(path.join(__dirname, 'files', 'write.txt'), '\n\nHope you are doing just fine');
    const data = await fsPromises.readFile(path.join(__dirname, 'files', 'write.txt'), 'utf8')
    console.log(data)
    await fsPromises.unlink(path.join(__dirname, 'files', 'write.txt'));
}
readWrite()