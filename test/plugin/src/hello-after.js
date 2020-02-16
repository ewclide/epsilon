import HTML from "dewjs/core/common/html";
import randKey from "dewjs/core/helper/rand-key";
import capitalize from "dewjs/core/helper/capitalize";
const text = capitalize('hello ' + randKey(10, ['lower', 'upper']));
const hello = HTML.create('p').text(text);
export default hello;
